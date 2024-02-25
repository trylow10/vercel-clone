import "dotenv/config";
import {
  S3Client,
  PutObjectCommand,
  CreateBucketCommand,
  HeadBucketCommand,
} from "@aws-sdk/client-s3";
import mime from "mime";
import fs from "node:fs";

const ACCESS_KEY_ID = process.env.ACCESS_KEY_ID;
const SECRET_ACESS_KEY = process.env.SECRET_ACESS_KEY;
const bucketName = process.env.BUCKET_NAME;
const REGION = process.env.BUCKET_NAME;

export async function main(filesPath) {
  const s3Client = new S3Client({
    region: REGION,
    credentials: {
      accessKeyId: ACCESS_KEY_ID,
      secretAccessKey: SECRET_ACESS_KEY,
    },
  });
  try {
    await s3Client.send(new HeadBucketCommand({ Bucket: bucketName }));
  } catch (err) {
    if (err.name === "NotFound") {
      await s3Client.send(new CreateBucketCommand({ Bucket: bucketName }));
    } else {
      throw err;
    }
  }
  try {
    const command = new PutObjectCommand({
      Bucket: bucketName,
      Key: `__outputs/${PROJECT_ID}/${filesPath}`,
      Body: fs.createReadStream(filesPath),
      ContentType: mime.lookup(filesPath),
    });
  } catch (error) {
    console.log("error creatings uploads", error);
  }
  const response = await s3Client.send(command);
  console.log(response);
}
