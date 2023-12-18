const { S3Client,PutObjectCommand } = require('@aws-sdk/client-s3');
const { v4: uuidv4 } = require('uuid');
const { promise } = require('fs');

const s3 = new S3Client();
exports.s3Uploadv2 = async (file) => {

    const params = {
        Bucket: process.env.AWS_BUCKET_NAME,
        Key: `upload/${uuidv4()}-${file.originalname}`,
        Body: file.buffer,
        ACL: 'public-read',
        ContentType: file.mimetype,
    };
    try {
        const command = new PutObjectCommand(params);
        await s3.send(command);
        const modifiedKey = params.Key.replace(/ /g, '+');
        const httpString ='https://helpcarefiles.s3.ap-south-1.amazonaws.com/'
        const awsUrl=httpString+modifiedKey;
        return awsUrl;
    } catch (error) {
        console.error('Error uploading to S3:', error);
        throw error;
    }    
};