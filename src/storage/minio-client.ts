import { BucketItem, Client } from "minio";
import { env } from "../util/env";

// Uses the asnyc setup to be able to load initial data, like the folder structure etc.
export const bucketName = env.MINIO_S3_BUCKET_NAME;
export const minioClientPromise: Promise<Client> = initMinioS3Client();
export const fsCache: Array<BucketItem> = [];

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
