import "dotenv/config";
import {
  S3Client,
  PutObjectCommand,
  CreateBucketCommand,
  HeadBucketCommand,
} from "@aws-sdk/client-s3";
import mime from "mime-types";
import fs from "node:fs";

const ACCESS_KEY_ID = process.env.ACCESS_KEY_ID;
const SECRET_ACESS_KEY = process.env.SECRET_ACESS_KEY;
const bucketName = process.env.BUCKET_NAME;
const REGION = process.env.REGION;
const PROJECT_ID = 2;

export async function main(filePath) {
  const s3Client = new S3Client({
    region: REGION,
    credentials: {
      accessKeyId: ACCESS_KEY_ID,
      secretAccessKey: SECRET_ACESS_KEY,
    },
  });

  // Ensure bucket existence
  // try {
  //   await s3Client.send(new HeadBucketCommand({ Bucket: bucketName }));
  //   console.log("Bucket exists");
  // } catch (err) {
  //   if (err.name === "NotFound") {
  //     await s3Client.send(new CreateBucketCommand({ Bucket: bucketName }));
  //     console.log("Bucket created");
  //   } else {
  //     throw err;
  //   }
  // }

  console.log(filePath);

  for (const file of filePath) {
    const { relativePath, absolutePath } = file;
    try {
      const command = new PutObjectCommand({
        Bucket: bucketName,
        Key: `__outputs/${PROJECT_ID}/${relativePath}`,
        Body: fs.createReadStream(absolutePath),
        ContentType: mime.lookup(absolutePath),
      });
      const response = await s3Client.send(command);
      console.log("Success", response);
    } catch (error) {
      console.log("Error uploading file", error);
    }
  }
}
