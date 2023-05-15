<h1 align="center">
  Fastify Inventory Server
</h1>

<h3 align="center">
  Web Server for managing products in an inventory system </br>
  Made with NodeJS, PrismaORM and Typescript
</h3>

<p align="center">
  <img alt="GitHub top language" src="https://img.shields.io/badge/typescript-100%25-blue">

  <a href="https://www.linkedin.com/in/odairjcjunior/" target="_blank" rel="noopener noreferrer">
    <img alt="Made by" src="https://img.shields.io/badge/Made%20by-odairdev-blue">
  </a>

  <img alt="GitHub" src="https://github.com/odairdev/fastify-inventory-server?style=plastic">

</p>

<p align="center">
  <a href="#%EF%B8%8F-about-the-project">About the project</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#-technologies">Technologies</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#-getting-started">Getting started</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#-how-to-contribute">How to contribute</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#-license">License</a>
</p>

## ✔ About the project

This app provides a server with a database coded with NodeJS, PrismaORM and Typescript.

 - You can create new users and use authentication with JWT.

 - It's possible to register new products as well as edit, read and delete them.

 - You can create Inventory Orders (in or out) that will directly affect the amount of that product amount and throwing errors if the order and product amounts don't match.

 - The server was developed with TDD with unit tests for all its use cases.

 - Restful API

## 💻 Technologies

Technologies used to develop this App
- [Node.js](https://nodejs.org/en/)
- [Fastify](https://www.fastify.io)
- [Typescript](https://www.typescriptlang.org/)
- [Prisma](https://www.prisma.io)
- [PostgreSQL](https://www.postgresql.org/)
- [JWT](https://jwt.io/)
- [Vitest](https://vitest.dev)
- [Zod](https://www.npmjs.com/package/zod)

## 🚀 Getting started

### Requirements

- [Node.js](https://nodejs.org/en/)
- [Yarn](https://classic.yarnpkg.com/) or [npm](https://www.npmjs.com/)
- [Docker](https://www.docker.com/) or any software to create isolated ambients with containers.

**Clone the API project and access the folder**

```bash
$ git clone https://github.com/odairdev/fastify-inventory-server
```

**Follow the steps below**

- Create a .env file following the .env.example, where JWT_SECRET and DATABASE_URL are required.
- Docker compose is configured in this project, so just let Docker opened and run:

```bash
# Install the dependencies
$ npm install

# Create the Database Docker Container
$ docker-compose up -d --build

# Run Prisma ORM migrations
$ npx migrate dev

# Start server
$ npm run dev

# To stop DB container
$ docker-compose stop

# To start DB container again
$ docker-compose start

# To remove DB container completely.
$ docker-compose down

```
- If you don't want to use docker-compose, just set up a container for the database in port 5432 and run the following commands:

```bash
# Install the dependencies
$ npm install

# Run TypeORM migrations
$ npx miragte dev

# Start server
$ npm run dev

# Well done, project is running!

```


## 🤔 How to contribute

**Fork this repository**

```bash
# Fork using GitHub command line or trhough website

$ gh repo fork odairdev/fastify-inventory-server
```

**Follow the steps below**

```bash
# Clone your fork
$ git clone your-fork-url && cd fastify-inventory-server

# Create a branch with your feature
$ git checkout -b my-feature

# Make the commit with your changes
$ git commit -m 'feat: My new feature'

# Send the code to your remote branch
$ git push origin my-feature
```

After your pull request is merged, you can delete your branch

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE.md) file for details.

---

Made by Odair José Custodio Junior 👍 &nbsp;[Check out my linkedin](https://www.linkedin.com/in/odairjcjunior/)