# Article Storage Service

### SETUP
Dependencies:
- NPM
- Docker

Install dependencies locally:
`cd app/`
`npm install`

Build the Articles Server Docker image
`cd ../`
`docker build -t articles-server .`

#### Postgres
Setup and Run the Docker Postgres image
`docker run --name articles-server-postgres-dev -p 5432:5432 -e POSTGRES_DB=articles -e POSTGRES_USER=articles_user -e POSTGRES_PASSWORD=password -d postgres`

Stopping the Postgres Image:
`docker stop articles-server-postgres-dev`

#### Running the Articles Storage Server
Run the Docker image (replace with your local IP address in the command):
`docker run --name articles-server-dev --rm -p 4000:4000 -e SERVICE_PORT=4000 -e NODE_ENV=development -e POSTGRES_DB_URL='postgres://articles_user:password@<YOUR LOCAL IP ADDRESS HERE!!!!>:5432/articles' --link articles-server-postgres-dev:postgres articles-server:latest`

Stopping the Docker Image:
`docker stop articles-server-dev`

#### Running the Article Schema DB Migration Task:
Run the Docker image (replace with your local IP address in the command):
`docker run --name articles-worker-dev --rm -p 4000:4000 -e SERVICE_PORT=4000 -e NODE_ENV=development -e POSTGRES_DB_URL='postgres://articles_user:password@<YOUR LOCAL IP ADDRESS HERE!!!!>:5432/articles' -e RUN_CMD=MIGRATE_DB_SCHEMA --link articles-server-postgres-dev:postgres articles-server:latest`

Stopping the Docker Image - DB Migrate (only necessary if there's a dev bug that causes the worker to hang):
`docker stop articles-worker-dev`

### Testing

#### Lint Testing
Outside docker (in the app/ directory):
`npm run lint-tests`

#### Local Testing
Outside docker (in the app/ directory):
`npm run unit-tests`

#### Endpoint Testing
Setup and Run the Docker Postgres image (run migration task if this is the first run)
`docker run --name articles-server-postgres-dev -p 5432:5432 -e POSTGRES_DB=articles -e POSTGRES_USER=articles_user -e POSTGRES_PASSWORD=password -d postgres`

Build the Docker conatiner and Run endpoint-tests in Docker image (dev ENV):
`docker build articles-server-dev . && docker run --name articles-server-dev --rm -p 4000:4000 -e SERVICE_PORT=4000 -e NODE_ENV=development -e POSTGRES_DB_URL='postgres://articles_user:password@<YOUR LOCAL IP ADDRESS HERE!!!!>:5432/articles' --link articles-server-postgres-dev:postgres articles-server:latest npm run endpoint-tests`
