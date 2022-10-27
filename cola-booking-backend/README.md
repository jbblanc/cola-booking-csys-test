# Cola Booking

Cola Booking - Room Booking API

Introducing the project : https://docs.google.com/presentation/d/1DVsucON4EejrzVT7DpvAaQxqelqT0n826Zduc3dDzBk/edit?usp=sharing

2 versions running on public web

Development (development branch) : https://dev-cola-booking-api.octave.co/api (swagger UI)

Production/Demo (main branch) : https://cola-booking-api.octave.co (Swagger UI disabled by default on production)

# DB requirements

Using docker-compose mode (See Run mode 2), no DB setup is required (You can access the docker PostgreSQL instance on localhost:**5431**)

Using standard mode (See Run mode 1), you need to have your own PostgreSQL local setup AND adapt the .env according to this setup

# 1. creating the .env

```bash
cp .env-ref .env
```

# 2. setup the project

```bash
npm install
```

# 3-a RUN MODE 1 : Local, no docker (requires your own PosgtreSQL server)

```bash
npm run build

# !!MANDATORY!! to run properly the api :
# DB migrations (to populate a clean DB with required schema AND demo data (companies, rooms, accounts)
npm run migration-run

node dist/apps/cola-booking/main
```

# 3-b RUN MODE 2 : Docker Compose (with DB included AND populated with demo data)

```bash
npm run up:build
```

Stop compose

```bash
npm run down
```

# 4. Access the Swagger documentation (for both run modes)

http://localhost:3005/api

# 5. Run acceptance tests (for both run modes)

FIRST, you need to create your .env file (see above)

```bash
npm run test:cucumber:cola_booking
```

You can then consult tests report in HTML format : ./test-acceptance-report.html

# 5.bis Postman exploration tests

You will find a Postman collection + 2 environments (local & development server) you can import in Postman to perform calls aginst the API. Many of these requests come with tests validating the results.
Best experience with this collection is to run the requests in the chronological order (from the first request on first folder the last folder)
There might be some requests not very up to date in the list (Reservation, for instance, which still expects raw room ids), though, sorry for that.
There might also be a few env variables that are present but unused.

# 6. Now you can run the frontend application

See https://gitlab.com/rocket-studio/studio/octave/jbblanc/cola-booking-frontend/-/tree/main to clone the project and run it on your machine
