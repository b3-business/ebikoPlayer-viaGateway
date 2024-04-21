import { BucketItem, Client } from "minio";
import { env } from "../util/env";
import Fuse from "fuse.js";

// Uses the asnyc setup to be able to load initial data, like the folder structure etc.
export const bucketName = env.MINIO_S3_BUCKET_NAME;
export const minioClientPromise: Promise<Client> = initMinioS3Client();
export const fsCache: Array<BucketItem> = [];

export const fuse = new Fuse(fsCache, {
  keys: ["name"],
  includeScore: true,
  threshold: 0.6,
  isCaseSensitive: false,
  // shouldSort: true,
  // includeMatches: false,
  // findAllMatches: false,
  // minMatchCharLength: 1,
  // location: 0,
  // distance: 100,
  // useExtendedSearch: false,
  // ignoreLocation: false,
  // ignoreFieldNorm: false,
  // fieldNormWeight: 1,
});

export function fuseAutocomplete(query: string) {
  const autocompleteOptions = fuse.search(query).map((result) => ({
    name: result.item.name ?? "",
    value: result.item.name ?? "",
  })).filter((_item, index) => index < 25);

  return autocompleteOptions;
}

export async function initMinioS3Client() {
  const client = new Client({
    endPoint: "minio.storage1500.vserv.fun",
    port: 443,
    useSSL: true,
    accessKey: env.MINIO_S3_ACCESS_KEY,
    secretKey: env.MINIO_S3_SECRET_KEY,
  });

  // preload files in bucket
  // Example structure
  // {
  //   name: 'Bruno Gröning - Freundeskreis_MP3/Mitsing CD 2003_MP3/02 Der Heilstrom.mp3',
  //   lastModified: 2024-02-06T21:32:31.767Z,
  //   etag: '310e05efc07dc39419402a521336ccfb',
  //   size: 8367227
  // }
  const objectList = client.listObjectsV2(bucketName, "", true);
  objectList.on("data", function (obj) {
    fsCache.push(obj);
  });

  return client;
}

// export class MinioFsNode {
//   constructor(private readonly isDir: boolean) {
//   }
// }
