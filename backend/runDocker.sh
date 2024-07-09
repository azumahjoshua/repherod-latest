#!/bin/bash

# docker image purne --y
# docker compose down
docker rmi -f $(docker images -aq)
# docker compose build --no-cache
# docker compose build
docker compose build
docker compose up



