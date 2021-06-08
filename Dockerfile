FROM node:12
LABEL maintainer="Jonas Tang<jonas.u6c64@gmail.com>" \
      org.label-schema.version=latest \
      org.label-schema.schema-version="1.0"
ARG JWT_AUTH_USER
ARG JWT_AUTH_PASSWORD
ARG WeChat_APP_ID
ARG WeChat_APP_SECRET
ENV JWT_AUTH_USER=$JWT_AUTH_USER
ENV JWT_AUTH_PASSWORD=$JWT_AUTH_PASSWORD
ENV WeChat_APP_ID=$WeChat_APP_ID
ENV WeChat_APP_SECRET=$WeChat_APP_SECRET
WORKDIR /usr/src/app
# Installing dependencies
COPY package*.json ./
COPY yarn.lock ./
RUN yarn install
COPY . .
RUN yarn build
CMD [ "yarn", "start" ]
