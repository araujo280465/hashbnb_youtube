import "dotenv/config";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import fs from "fs";
import download from "image-downloader";
import mime from "mime-types";
import multer from "multer";
import { __dirname } from "../../server.js";

const { S3_ACCESS_KEY, S3_SECRET_KEY, BUCKET, S3_REGION } = process.env;

// const getExtension = (path) => {
//   const mimeType = mime.lookup(path);
//   const contentType = mime.contentType(mimeType);
//   let extension = mime.extension(contentType);

//   if (!extension) extension = "jpg";

//   return extension;
// };

const getExtension = (inputPath) => {
  // Remove query string if present
  const cleanPath = inputPath.split("?")[0];

  // Try to get mime type from the cleaned path
  let mimeType = mime.lookup(cleanPath);

  // If still not found, try to get mime type from the file extension directly
  if (!mimeType) {
    const extMatch = cleanPath.match(/\.(\w+)$/);
    if (extMatch) {
      mimeType = mime.lookup(extMatch[1]);
    }
  }

  // Get extension from mime type
  let extension = mime.extension(mimeType);

  // Fallback to jpg if still not found
  if (!extension) extension = "jpg";
  if (extension === "jpeg") extension = "jpg";

  return { extension, mimeType };
};

export const sendToS3 = async (filename, path, mimetype) => {
  const client = new S3Client({
    region: S3_REGION,
    credentials: {
      accessKeyId: S3_ACCESS_KEY,
      secretAccessKey: S3_SECRET_KEY,
    },
  });
  const command = new PutObjectCommand({
    Bucket: BUCKET,
    Key: filename,
    Body: fs.readFileSync(path),
    ContentType: mimetype,
    ACL: "public-read",
  });

  //console.log("S3 mimetype : ", mimetype);

  //console.log("sendtos3 command: ", command);

  try {
    await client.send(command);
    return `https://${BUCKET}.s3.sa-east-1.amazonaws.com/${filename}`;
  } catch (error) {
    throw error;
  }
};

export const downloadImage = async (link) => {
  const { extension, mimeType } = getExtension(link);
  const destination = `${__dirname}/tmp/`;

  const filename = `${Date.now()}.${extension}`;
  const fullpath = `${destination}${filename}`;

  try {
    const options = {
      url: link,
      dest: fullpath,
    };

    await download.image(options);

    return { filename, fullpath, mimeType };
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const uploadImage = () => {
  const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, `${__dirname}/tmp/`);
    },

    filename: function (req, file, cb) {
      const { extension } = getExtension(file.originalname);
      const uniqueSuffix = Math.round(Math.random() * 1e9);

      cb(null, `${Date.now()}-${uniqueSuffix}.${extension}`);
    },
  });

  return multer({ storage });
};
