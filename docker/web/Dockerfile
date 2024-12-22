FROM node:alpine

WORKDIR /workspace

COPY web/package*.json ./

RUN <<EOF
    npm install -g npm
    npm install
EOF

CMD ["npm", "run", "dev"]