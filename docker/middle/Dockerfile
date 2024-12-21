FROM node:alpine

WORKDIR /workspace

COPY middle/package*.json ./

RUN <<EOF
    apk update
    npm install -g npm
    npm install
EOF

CMD ["npm", "run", "dev"]