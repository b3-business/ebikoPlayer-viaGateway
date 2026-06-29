# ebikoPlayer-viaGateway

## Setup env

This repo uses Varlock for local development env loading.

1. Install dependencies with `bun install`.
2. Make sure the `jb` profile secrets exist in macOS Keychain. On a new Mac, recreate them with:
   ```fish
   varlock keychain set DISCORD_TOKEN --project ebikoplayer-viagateway --profile jb --write-to .env.jb
   varlock keychain set MINIO_S3_ACCESS_KEY --project ebikoplayer-viagateway --profile jb --write-to .env.jb
   varlock keychain set MINIO_S3_SECRET_KEY --project ebikoplayer-viagateway --profile jb --write-to .env.jb
   ```
3. Validate the env without printing secrets:
   ```fish
   varlock load >/dev/null
   ```

## Run this repo

Use `bun run dev` for local development or `bun start` for the start script.

> [!WARNING]
> The MinIO S3 bucket is gone after cancelling the subscription to `bjesuiter storage1500`.

## Deployment on Railway

=> Simply push to Branch `main`
=> Project URL: https://railway.app/project/b0c4bdea-f6ab-4b27-8fdb-1eb2b70d7575

## State of using "bun"

- cannot use bun currently, because the node:dgram api (which is used by discord voice) is not implemented in bun yet
- therefore i'm still using tsx to run in prod
