<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo_text.svg" width="320" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://coveralls.io/github/nestjs/nest?branch=master" target="_blank"><img src="https://coveralls.io/repos/github/nestjs/nest/badge.svg?branch=master#9" alt="Coverage" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Pre-requisites

1. Docker and docker-compose must be installed on your machine
2. This API uses Sendgrid API v3 for sending email, so you must provide your Sendgrid API key
3. This API send emails when a candidate status is set to acepted by a recruiter
4. Check docker-compose.yml for get an example of the env vars of postgres image, so your .env must fullfil the same values

## First steps

1. watch .envexample for get a guide of how provide your DB credentials, a secret pass for JsonWebToken and others env variables
2. run `docker-compose up`

## Usage

- endpoint for common login is auth/login
- payload for login is {email:string,password:string}
- endpoint for login using google auth is auth/google
- go to localhost:3000/api to see API documentation with swagger

## Environment variables required

You will need a .env and a docker.env files, check .envexample for more information

| Variable                  | Description                                                |
| :------------------------ | :--------------------------------------------------------- |
| JWT_SECRET                | Secret pass used to sign and verify JWT                    |
| DB_PORT                   | Port of the dockerized PostegreSql database                |
| DB_HOST                   | Host of the database                                       |
| DB_USER                   | User for access database                                   |
| DB_PASS                   | Password for user access                                   |
| DB_NAME                   | Name of the database                                       |
| SENDGRID_API_KEY          | Key for the Sendgrid email API                             |
| TEMPLATE_ID               | Template id of aceptance email                             |


