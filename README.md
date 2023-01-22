# Just Remind

First off, thank you for considering contributing to this project! 🙏🥳

Just Remind helps you remember the Kindle books you read by sending you a daily email with your highlights.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development purposes.

If you have troubles with any of the information below, create a question in the [discussions](https://github.com/Just-Remind/app/discussions).

### Prerequisites

You will first need to create an account on [Just Remind](https://justremind.app/). You will be able to access the application live and locally with the same account.

### Installing

- clone the repo on your machine
- run `yarn install` to install the dependencies
- get a local postgresql database (check [this article](https://www.sqlshack.com/setting-up-a-postgresql-database-on-mac/) for all the details or follow the steps below)
  - if you don't have brew, you can install it with this command `/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"` ([brew.sh](https://brew.sh/))
  - if you do have brew installed already, make sure you have the latest version by running `brew update`
  - run `brew install postgresql` to install postgresql
  - start the service by running `brew services start postgresql`
  - once the service is started, you can run `psql postgres` to access it
  - create a new role with these commands:
  ```
  CREATE ROLE justremind WITH LOGIN PASSWORD ‘password’;
  ALTER ROLE justremind CREATEDB;
  ```
  - quit the current session with `\q` and connect a new one with `psql postgres -U justremind`
  - create the database `CREATE DATABASE justremind;`
  - you can see it by running `\l`
  - create a `.env` file and add `DATABASE_URL="postgresql://justremind:password@localhost:5432/justremind"`
  - run `npx prisma migrate dev` to apply the migrations
- run `yarn dev` to start the server
- visit [http://localhost:3000](http://localhost:3000/) and login to the application
- import the My Clippings.txt which is located in the project folder (it contains a few highlights to populate your database)
- and that's it! you now have the basic setup to start contributing! 🥳
## Built With

* [Next.js](https://nextjs.org/) - The React web framework
* [Vercel](https://vercel.com/) - Hosting platform
* [AWS Cognito](https://aws.amazon.com/cognito/?nc1=h_ls) - Management of user access and identity
* [Heroku Postgres](https://devcenter.heroku.com/articles/heroku-postgresql) - Production database
* [Prisma](https://www.prisma.io/) - Node.js and Typescript ORM
* [Beefree](https://beefree.io/) - Email design editor
* [Sendgrid](https://sendgrid.com/) - Email delivery service
* [Easycron](https://www.easycron.com/) - Cron service triggering the sending of emails

## Contributing

Please read [CONTRIBUTING.md](https://github.com/Just-Remind/app/blob/main/CONTRIBUTING.md) for details on our code of conduct, and the process for submitting pull requests to us.

## Versioning

We use [SemVer](http://semver.org/) for versioning. For the versions available, see the [tags on this repository](https://github.com/Just-Remind/app/tags).

## Authors

* [**Loïc Boset**](https://github.com/loicboset) - *Initial work*

See also the list of [contributors](https://github.com/Just-Remind/app/graphs/contributors) who participated in this project.

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details

