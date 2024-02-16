FROM ubuntu:latest

RUN apt-get update && apt-get install curl
RUN curl -sL https://deb.nodesource.com/setup_20.x | bash -
RUN apt-get install -y nodejs
#install git
RUN apt-get install git -y
#specifying the working 
WORKDIR "/build/"

COPY tunnel.sh tunnel.sh

ENTRYPOINT [ "/build/tunnel.sh" ]



