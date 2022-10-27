FROM node:14.15.5-alpine3.13

WORKDIR /app

COPY package.json ./

RUN npm -s install --production

COPY dist/apps/cola-booking/ ./dist/apps/cola-booking

COPY .env.local.docker ./

EXPOSE 3005

CMD ["node", "dist/apps/cola-booking/main"]
