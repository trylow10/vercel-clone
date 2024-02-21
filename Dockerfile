FROM ubuntu:latest
RUN apt-get update && apt-get install -y \
    curl \
    git \
    gnupg \
    && rm -rf /var/lib/apt/lists/*

RUN curl -sL https://deb.nodesource.com/setup_20.x | bash - \
    && apt-get install -y nodejs

WORKDIR /home/trilo/vercel-clone/src/build-server


# Copy tunnel.sh script from the build context to the working directory in the image
COPY tunnel.sh .
ENTRYPOINT ["/home/trilo/vercel-clone/tunnel.sh"]