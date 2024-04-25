# client/Dockerfile
FROM node:alpine


RUN mkdir /afroquotes-app


WORKDIR /afroquotes-app
COPY ./afroquotes-app /afroquotes-app
COPY ./afroquotes-app/package*.json /afroquotes-app
# COPY ./afroquotes-app/package.json /afroquotes-app/package.json
RUN npm install

CMD ["npm", "run", "dev"]

