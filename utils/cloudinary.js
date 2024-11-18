// import { v2 as cloudinary } from 'cloudinary';
// import fs from "fs"

// import { CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET, CLOUDINARY_CLOUD_NAME } from '../config/config';

const cloudinary = require('cloudinary').v2;
const fs = require("fs")
const { CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET, CLOUDINARY_CLOUD_NAME } = require('../config/config');

cloudinary.config({
    cloud_name: CLOUDINARY_CLOUD_NAME,
    api_key: CLOUDINARY_API_KEY,
    api_secret: CLOUDINARY_API_SECRET
});

const uploadCloudinary = async (fileBuffer) => {
    try {
        if (!fileBuffer) return null;

        // Using a Promise for the upload_stream process
        return new Promise((resolve, reject) => {
            const uploadStream = cloudinary.uploader.upload_stream(
                { resource_type: "auto", folder: "pdf_files" }, // Set folder or tags if needed
                (error, result) => {
                    if (error) {
                        console.error("Cloudinary upload error:", error);
                        return reject(error);
                    }
                    resolve(result); // Resolve with the result on successful upload
                }
            );
            uploadStream.end(fileBuffer); // Send the file buffer to Cloudinary
        });
    } catch (err) {
        console.error("Cloudinary upload failed:", err);
        return null;
    }
};

const deleteFileFromCloudinary = async (localFilePath, path = "image") => {
    try {
        if (!localFilePath) return null;
        console.log("file", localFilePath)
        const response = await cloudinary.uploader.destroy(localFilePath, {
            resource_type: path
        });
        console.log(response)
        return response;
    } catch (err) {
        console.error("Error deleting file from Cloudinary:", err);
        return null;
    }
};

// export { uploadCloudinary, deleteFileFromCloudinary }
module.exports = { uploadCloudinary, deleteFileFromCloudinary }