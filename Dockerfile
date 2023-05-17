FROM node:lts-buster

RUN curl -sL https://deb.nodesource.com/setup_14.x | bash - 

RUN apt-get update && \
  apt-get install -y \
  nodejs\
  ffmpeg \
  imagemagick \
  webp && \
  apt-get upgrade -y && \
  rm -rf /var/lib/apt/lists/*

COPY package.json .

RUN npm i

COPY . .

EXPOSE 5000

CMD ["node", "index.js"]
