import multer from "multer";
import HttpError from "../helpers/HttpError";
import { resovle } from "node:path"

const tempDir = resovle("temp")

const storage = multer.diskStorage({
  destination: tempDir,
  filename: (req, file, callback) => {
    const uniquePrefix = `${Date.now()}_${Math.round(Math.random() * 1E9)}`;
        const filename = `${uniquePrefix}_${file.originalname}`;
        callback(null, filename);
  },
});

const limits = {
    fileSize: 1024 * 1024 * 10,
  }

  const fileFilter = (req, file, callback) => {
    const extension = file.originalname.split(".").pop();
    if (extension === "exe") {
      return callback(HttpError(400, ".exe extension not allow"));
    }
    callback(null, true);
  };

  const upload = multer({
    storage,
    limits,
    fileFilter,
  });

  export default upload;