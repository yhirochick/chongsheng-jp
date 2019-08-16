FROM node:12.8.1

COPY . /chongsheng-jp
RUN cd /chongsheng-jp; npm install
RUN npm install -g @angular/cli@8.2.2
WORKDIR /chongsheng-jp