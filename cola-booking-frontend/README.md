# Cola Booking Web Application

Frontend application based on Svelte Kit

Introducing the project : https://docs.google.com/presentation/d/1DVsucON4EejrzVT7DpvAaQxqelqT0n826Zduc3dDzBk/edit?usp=sharing

2 versions running on public web

Development (development branch) : https://dev-cola-booking.octave.co

Production/Demo (main branch) : https://cola-booking.octave.co

# Pre-requisites to run this API

Grad the API here and follow steps run it : https://gitlab.com/rocket-studio/studio/octave/jbblanc/cola-booking-backend/-/tree/main

Once you're OK with it, come back here to follow below steps
# Project Setup

Create the .env

```bash
cp .env.reference .env

```

Install dependencies

```bash
npm install

```
## Developing

```bash
npm run dev

```

## Building (using the node adapter)

```bash
npm run build
node build
```

## Access the application

Browse to http://localhost:3000

## Acceptance Tests (with Cypress)

```bash
CYPRESS_ACCOUNT_DEFAULT_PASSWORD=<SET HERE THE DEFAULT ACCOUNT PASSWORD> npm run cy:open

```