#Dockerfile
FROM node:18-slim

#Set working directory
WORKDIR /app

RUN mkdir -p input && mkdir -p output && mkdir -p submissions 
RUN npm init -y

#Copy dockerRunner.js to the container
COPY ["./dockerRunner.js", "/app/dockerRunner.js"]

CMD ["bash"]
