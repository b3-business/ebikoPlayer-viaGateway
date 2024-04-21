import { z } from "zod";

const EnvSchema = z.object({
  BGF_GUILD_ID: z.string(),
  BRUDI_GUILD_ID: z.string(),
  CLIENT_ID: z.string(),
  DISCORD_TOKEN: z.string(),
  MINIO_S3_ACCESS_KEY: z.string(),
  MINIO_S3_SECRET_KEY: z.string(),
  MINIO_S3_BUCKET_NAME: z.string(),
});

export type Env = z.infer<typeof EnvSchema>;

// Throws when not all required environment variables are set
export const env: Env = EnvSchema.parse(process.env);
