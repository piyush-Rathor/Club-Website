const AWS = require('aws-sdk');
const uuid = require('uuid/v4');

const s3Client = new AWS.S3({
  accessKeyId: process.env.AWS_ID,
  secretAccessKey: process.env.AWS_SECRET_KEY,
});

const uploadParams = {
  Bucket: process.env.AWS_BUCKET_NAME,
  Key: '', // pass key
  Body: null, // pass file body
  ACL: 'public-read',
};

exports.uploadFile =  async (file) =>{
  const myFileName=file.originalname.split(".");
  const fileType=myFileName[myFileName.length-1]
  uploadParams.Key=`${uuid()}.${fileType}`,
  uploadParams.Body = file.buffer;
  let data = await s3Client.upload(uploadParams).promise();
  return data;
}