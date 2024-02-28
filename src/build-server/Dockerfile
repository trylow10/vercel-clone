FROM ubuntu:latest
RUN apt-get update && apt-get install -y \
    curl \
    git \
    gnupg \
    && rm -rf /var/lib/apt/lists/*
RUN curl -sL https://deb.nodesource.com/setup_20.x | bash - \
    && apt-get install -y nodejs
WORKDIR /home/trilo/vercel-clone/src/build-server
COPY package*.json ./
RUN npm install 
#    to from 
COPY . .

RUN chmod +x tunnel.sh
ENTRYPOINT ["./tunnel.sh"]
