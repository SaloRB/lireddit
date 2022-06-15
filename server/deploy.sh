#!/bin/bash

echo What should the version be?
read VERSION

docker build -t sromano/lireddit:$VERSION .
docker push sromano/lireddit:$VERSION
ssh root@143.244.183.48 "docker pull sromano/lireddit:$VERSION && docker tag sromano/lireddit:$VERSION dokku/api:$VERSION && dokku deploy api $VERSION" 