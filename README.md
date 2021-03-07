# keep-lite
A lite version of Google Keep built in React/node.

## Local Development
# Client
Run `npm install` && `npm run dev`.

Client will be hosted at localhost:3000.

# Server
1. Download and install postgresql. Setup a local database and set the following environment variables:

PGUSER: your_username
PGHOST: your_host
PGPASSWORD: your_password
PGPORT: your_port

2. Run `npm install` && `npm run dev`

Server will be hosted at localhost:4000.

## Building
To build production Docker containers, run `docker-compose up` in the root folder.