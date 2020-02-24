# Recommended Products & Similar Products Microservices for IKEA Backend Project

Rebuild of backend of IKEA clone recommended products & similar products services deployed to AWS EC2 T2 micros.
<br/><br/>
&nbsp;
&nbsp;
image 1:
&nbsp;
<img width="1000"
alt="sample1" src="./img/img1.png">
&nbsp;
&nbsp;
image 2:
&nbsp;
<img width="1000"
alt="sample2" src="./img/img2.png">
&nbsp;
&nbsp;
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

Also, change connection params in /db-pg/query/dbGet.js to your database connection params

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