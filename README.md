# ebikoPlayer-viaGateway

## Setup doppler

This Repo uses `doppler` (from doppler.com) for secrets management.
For now, doppler only manages local secrets.

1. Install doppler-cli: https://docs.doppler.com/docs/install-cli#installation
2. Run `doppler login`: https://docs.doppler.com/docs/install-cli#authentication
3. Run `doppler setup`: https://docs.doppler.com/docs/install-cli#project-setup  
   => This will use the doppler.yaml config file in this repo

## Run this repo

Use `npm start` (requires doppler already setup`d)

## Deployment on Railway

=> Simply push to Branch `main`
=> Project URL: https://railway.app/project/b0c4bdea-f6ab-4b27-8fdb-1eb2b70d7575

## State of using "bun"

- cannot use bun currently, because the node:dgram api (which is used by discord voice) is not implemented in bun yet
- therefore i'm still using tsx to run in prod
