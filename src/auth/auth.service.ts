import {
  forwardRef,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { Request } from 'express';
import { JwtService } from '@nestjs/jwt';
import { UserDto } from '../users/dto/user.dto';
import { UserPayload } from './dto/user-payload.dto';

@Injectable()
export class AuthService {
  constructor(
    @Inject(forwardRef(() => UsersService))
    private userService: UsersService,
    private jwtService: JwtService,
  ) {}
  /**
   *Verifies if user and password are valid
   *
   * @param {UserDto} userDto
   * @return {*}  {Promise<any>}
   * @memberof AuthService
   */
  async validateUser(userDto: UserDto): Promise<UserPayload> {
    const userInDb = await this.userService.findOneUser(userDto.username);
    if (userInDb && userDto.password === userInDb.password) {
      const { password, ...result } = userInDb;
      return result;
    }
    throw new UnauthorizedException('invalid username or password');
  }
  /**
   *If user passes validation, signs a token and return it
   *
   * @param {UserDto} userDto
   * @return {*}
   * @memberof AuthService
   */
  async login(userDto: UserDto) {
    const validUser = await this.validateUser(userDto);
    const payload = {
      username: validUser.username,
      sub: validUser.id,
      noTimestamp: true,
    };
    return {
      access_token: this.jwtService.sign(payload, {
        expiresIn: '1h',
      }),
    };
  }
  /**
   *If a token is valid, returns true. Otherwise throws and exception
   *
   * @param {Request} request
   * @return {*}  {boolean}
   * @memberof AuthService
   */
  permissionControl(request: Request): boolean {
    try {
      this.verifyToken(request);
      return true;
    } catch {
      throw new UnauthorizedException('Invalid or expired token');
    }
  }
  /**
   *Verifies if token sent in headers is valid
   *
   * @param {Request} request
   * @return {*}
   * @memberof AuthService
   */
  verifyToken(request: Request) {
    const bearerToken = request.headers['authorization'].split(' ')[1];

    if (!bearerToken) {
      throw new UnauthorizedException('No token provided');
    }

    return this.jwtService.verify(bearerToken);
  }
}