FROM node:12-alpine
WORKDIR /server
COPY . .
EXPOSE 4000
ENV PGUSER postgres
ENV PGHOST database
ENV PGPASSWORD postgres
RUN npm install
CMD ["npm", "start"]