# STEP 1 - build react
FROM node:12-alpine AS react_build
WORKDIR /client
COPY . /client
RUN ls
RUN npm install
RUN npm run-script build

# STEP 2 - Container for a nginx server to host our build/index.html
FROM nginx
COPY --from=react_build /client/build /usr/share/nginx/html
RUN rm /etc/nginx/conf.d/default.conf
COPY nginx.conf /etc/nginx/conf.d
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]