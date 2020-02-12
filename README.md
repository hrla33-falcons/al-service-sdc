# Recommended Products & Similar Products Microservices for IKEA Backend Project

Rebuild of backend of IKEA clone recommended products & similar products services deployed to AWS EC2 T2 micros.

## Table of Contents

1. [Usage](#Usage)
2. [Requirements](#requirements)
3. [Development](#development)


## Usage

### Setting up database/seeding data

```sh
npm run setupdb
```

### start script

```sh
npm start
```

## Requirements

An `nvmrc` file is included if using [nvm](https://github.com/creationix/nvm).

- Node 6.13.0

## Development


### Installing Dependencies

From within the root directory:

```sh
npm install -g webpack
npm install
```

### CRUD API

Read/GET:
```
server.get('/products')
server.get('/products/:id')
```