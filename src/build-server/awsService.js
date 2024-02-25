// import {
//   S3Client,
//   PutObjectCommand,
//   CreateBucketCommand,
//   GetObjectCommand,
// } from "@aws-sdk/client-s3";

// export async function main(files) {




//   const s3Client = new S3Client({
//     region: "",
//     credentials: {
//       accessKeyId: "",
//       secretAccessKey: "",
//     },
//   });

//   // Create an Amazon S3 bucket. The epoch timestamp is appended
//   // to the name to make it unique.
//   const bucketName = await s3Client.send(
//     new CreateBucketCommand({
//       Bucket: bucketName,
//     })
//   );

//   // Put an object into an Amazon S3 bucket.
//   await s3Client.send(
//     new PutObjectCommand({
//       Bucket: bucketName,
//       Key: "",
//       Body: "",
//     })
//   );

//   const { Body } = await s3Client.send(
//     new GetObjectCommand({
//       Bucket: bucketName,
//       Key: "my-first-object.txt",
//     })
//   );

//   console.log(await Body.transformToString());
// }
