import multer   from 'multer'
import multers3 from 'multer-s3'
import aws      from 'aws-sdk'
import dayjs    from 'dayjs' 

import globals from '../config/globals'

aws.config.update({ secretAccessKey: globals.AWS_SECRET_ACCESS_KEY, accessKeyId: globals.AWS_ACCESS_KEY_ID, region: globals.AWS_REGION })

const s3 = new aws.S3()

const options = {
  s3,
  bucket: globals.AWS_S3_BUCKET_NAME || '',
  contentDisposition: 'attachment',
  contentType: multers3.AUTO_CONTENT_TYPE,
}

const unauth = multers3({
  ...options,
  acl: 'public-read',
  key: function (request, file, callback) {
    const masterName = 'TESTE'
    const firstPart = masterName+'/unauth/'+ file.originalname + dayjs().format('DD-MM-YYYY-HH:mm:ss') // create or use the master's folder
    const finalPart = 'test@integration'

    const fullName = firstPart + '-' + finalPart

    let extension: any = file.mimetype.split('/')[1] === 'x-icon' ? 'ico' : file.mimetype.split('/')[1]
    if(extension === 'octet-stream') extension = file.originalname.split('.').pop()

    callback(null, fullName + '.' + extension)
  }
})

const uploader = multer({ storage: unauth })

export default uploader