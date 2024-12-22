FROM node:alpine

WORKDIR /workspace

COPY app/package*.json ./

RUN <<EOF
    npm install -g npm
    npm install
EOF

CMD ["npm", "run", "start"]