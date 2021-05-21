import aws from 'aws-sdk';
import multer from 'multer';
import config from '../config';

const s3 = new aws.S3({
    accessKeyId: config.awsS3AccessKey,
    secretAccessKey: config.awsS3SecretAccessKey
});

export type TUpload = {
    [fieldname: string]: Express.Multer.File[];
} | Express.Multer.File[];

export const uploadS3 = (files: TUpload): Promise<any> => {
    return new Promise(async (resolve, reject) => {
        try{
            for (let i=0;i<files.length;i++){
                const uploadParams = {
                    Bucket: config.awsBucket,
                    Body: files[i].buffer,
                    Key: `test/${Date.now()}.jpeg`,
                    ContentType: 'image/jpeg',
                    ACL: 'public-read'
                };
                s3.upload(uploadParams,(err,data)=>{
                    if(err) {reject(err); return;}
                    if(data === undefined){
                        reject(new Error("Fail to file upload"));
                    } else {
                        resolve(200);
                    }
                });
            }
        } catch (err){
            reject(err);
        }
    });
};


