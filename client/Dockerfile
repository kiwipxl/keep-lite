# Container for a nginx server to host our build/index.html
# Make sure we run `npm install && npm run build` before hand!

FROM nginx
COPY /build /usr/share/nginx/html
RUN rm /etc/nginx/conf.d/default.conf
COPY nginx.conf /etc/nginx/conf.d
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]