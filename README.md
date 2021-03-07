## keep-lite
A simple notetaking app built using React/node/SQL/redux/graphQL tech stack. Design is inspired by Google Keep.

![App screenshot](screenshot.png?raw=true)

# Development
## Client
Run `npm install` && `npm run dev`.

Client will be hosted at localhost:3000.

## Server
1. Download and install postgresql. Setup a local database and set the following environment variables:

PGUSER: your_username
PGHOST: your_host
PGPASSWORD: your_password
PGPORT: your_port

2. Run `npm install` && `npm run dev`

Server will be hosted at localhost:4000.

# Building
To build production Docker containers, run `docker-compose up` in the root folder.