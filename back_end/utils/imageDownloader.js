import download from "image-downloader";
import mime from "mime-types";
// ai instructions

import fs from "fs";

export const downloadImage = async (link, destination) => {
  const mimeType = mime.lookup(link);
  const contentType = mime.contentType(mimeType);
  //const extension = mime.extension(contentType);
  // ai instructions
  let extension = mime.extension(contentType);
  if (!extension) extension = "jpeg"; // fallback to jpeg

  // ai instructions
  if (!fs.existsSync(destination)) {
    fs.mkdirSync(destination, { recursive: true });
  }

  const filename = `${Date.now()}.${extension}`;
  const fullpath = `${destination}${filename}`;

  //console.log({ contentType, link, extension });

  try {
    const options = {
      url: link,
      dest: fullpath,
    };

    await download.image(options);

    return filename;
    //console.log("Saved to", filename);
  } catch (error) {
    console.error(error);
    throw error;
  }
};
