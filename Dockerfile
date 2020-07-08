FROM node:12.16.1

# for caching optimisations
COPY package*.json /
RUN npm install
# required to serve the react app on the live server
RUN npm install -g serve

CMD [ "sh", "-c", "echo", "$HOME" ]

COPY . /app
WORKDIR /app

# noop files for non python projects and local development
RUN echo "#!/bin/bash" > /app/migrate.sh && chmod +x /app/migrate.sh
RUN echo "#!/bin/bash" > /usr/local/bin/start && chmod +x /usr/local/bin/start

ENV PATH=/node_modules/.bin:$PATH
ENV PORT=80
ENV HOST=0.0.0.0
ENV BROWSER='none'

RUN npm run build

#expose 80 é a porta que esta dentro do container, lado direito nas configs
#o lado esquerdo das configs é a porta que tenho que seleccionar no browser!
EXPOSE 80

CMD ["serve", "-s", "build", "-l", "80"]

# agora 'e so adicionar esta config no docker-compose, publicar e correr no aws ec2'