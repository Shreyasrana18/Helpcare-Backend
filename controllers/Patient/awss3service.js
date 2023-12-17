const { S3 } = require('@aws-sdk/client-s3');
const { v4: uuidv4 } = require('uuid');
const { promise } = require('fs');

const s3 = new S3();
exports.s3Uploadv2 = async (file) => {

    const param = {
        Bucket: process.env.AWS_BUCKET_NAME,
        Key: `upload/${uuidv4()}-${file.originalname}`,
        Body: file.buffer,
    };
    return await s3.upload(param).promise();    
};