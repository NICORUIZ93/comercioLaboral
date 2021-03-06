const aws = require("aws-sdk");
const multer = require("multer");
const multerS3 = require("multer-s3");
const util = require("util");


const s3Bucket = new aws.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
});

const uploadS3 = multer({
  storage: multerS3({
    s3: s3Bucket,
    bucket: process.env.AWS_BUCKET_NAME,
    acl: "public-read",
    metadata: function (req, file, cb) {
      cb(null, { fieldName: file.fieldname });
    },
    key: function (req, file, cb) {
      cb(null, Date.now().toString());
    },
  }),
}).array("archivos", 5);

const service = {
  async cargarArchivosS3(req, res) {
    try {
      const cargueS3 = util.promisify(uploadS3);
      await cargueS3(req, res);

      if (req.files === undefined) {
        console.log("uploadProductsImages Error: No File Selected!");

        throw new Error({
          status: "fail",
          message: "Error: No File Selected",
        });
      } else {
        let fileArray = req.files,
          key,
          fileExtension,
          filename;
        const images = [];
        for (let i = 0; i < fileArray.length; i++) {
          key = fileArray[i].key;
          filename = fileArray[i].originalname;
          fileExtension = fileArray[i].mimetype;
          images.push({ key: key, extension: fileExtension, name: filename });
        }

        return {
          status: "ok",
          recursos: images,
        };
      }
    } catch (error) {
      console.log(`${error}`);
      throw error;
    }
  },
  async obtenerUrlRecurso(key, type) {
    return new Promise((resolve, reject) => {
      let params = {
        Bucket: process.env.AWS_BUCKET_NAME,
        Key: key,
        Expires: 60 * 30,
        ResponseContentType: type,
      };
      s3Bucket.getSignedUrl("getObject", params, (err, url) => {
        if (err) reject(err);
        resolve(url);
      });
    });
  },
};

module.exports.cargarArchivosService = service;
