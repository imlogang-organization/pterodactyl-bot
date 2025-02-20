FROM node:20.14.0
USER root
WORKDIR /app
# We copy the package.json and npm install before copying code so we have better cache hits.`
COPY package.json /app/package.json
RUN npm install
RUN apt-get update && apt-get upgrade -y
COPY src /app/src
ENTRYPOINT ["npm"]
CMD ["run", "ptero-bot"]