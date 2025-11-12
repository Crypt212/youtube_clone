import multer from "multer";
import path from "path";

import { createFolder } from "../utils/fileHelper";

const fileInfoMap = new Map([
    ["profilePic", {
        dependencies: ["userId"],
        mimeTypes: ["image/jpeg", "image/png"],
        generatePath: (userId) => path.join(process.cwd(), `uploads`, `user_${userId}`, `profile`),
        maxSize: 5 * 1024 * 1024
    }],
    ["video", {
        dependencies: ["userId", "videoId"],
        mimeTypes: ["video/mp4", "video/webm", "video/ogg", "video/mkv"],
        generatePath: (userId, videoId) => path.join(process.cwd(), `uploads`, `user_${userId}`, `videos`, `video_${videoId}`),
        maxSize: 100 * 1024 * 1024
    }],
    ["thumbnail", {
        dependencies: ["userId", "videoId"],
        mimeTypes: ["image/jpeg", "image/png"],
        generatePath: (userId, videoId) => path.join(process.cwd(), `uploads`, `user_${userId}`, `videos`, `video_${videoId}`),
        maxSize: 5 * 1024 * 1024
    }]
]);

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        if (!fileInfoMap.has(file.fieldname))
            cb(new Error("invalid fieldname"), null);

        const fileInfo = fileInfoMap.get(file.fieldname);

        if (!fileInfo.dependencies.every((dependency) => req.body[dependency]))
            cb(new Error("missing file name dependencies"), null);

        const destinationPath = fileInfo.generatePath(... fileInfo.dependencies.map(dep => req.body[dep]));
        createFolder(destinationPath);

        cb(null, destinationPath);
    },

    filename: function(_, file, cb) {
        const timestamp = Date.now();
        const originalName = path.parse(file.originalname).name; // Without extension
        const extension = path.extname(file.originalname);

        cb(null, `${originalName}-${timestamp}${extension}`);
    },

});

const fileFilter = (_, file, cb) => {
    if (fileInfoMap.has(file.fieldname) && fileInfoMap.get(file.fieldname).mimeTypes.includes(file.mimetype))
        cb(null, true);
    else cb(new Error("invalid file type"), false);
};

const limits = (_, file) => {
    const fileInfo = fileInfoMap.get(file.fieldname);
    return { fileSize: fileInfo?.maxSize || 5 * 1024 * 1024 };
};

export default upload = multer({ storage, fileFilter, limits });

