FROM node:current

WORKDIR /usr/src/devcamper_api

COPY ./ ./

RUN npm install

CMD ["/bin/bash"]