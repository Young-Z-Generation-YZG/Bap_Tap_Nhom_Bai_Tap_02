const cloudinary = require("cloudinary").v2;
const {deleteFile} = require('../utils/handle-os-file');

const uploadSingle = async (file) => {
    try{
        const result = await cloudinary.uploader.upload(file.path, {
            folder: "Bap_Tap_Nhom_Bai_Tap_02",
        });
        deleteFile(file.path);
        return result;
    } catch (error) {
        // console.log("file path:::", file.path);
        console.log("cloudinary upload error:::", error);
    }
};

const uploadMultiple = async (files) => {
    try{
        const result = await Promise.all(
            files.map(async (file) => {
                const response = await cloudinary.uploader.upload(file.path, {
                    folder: "Bap_Tap_Nhom_Bai_Tap_02",
                });
                deleteFile(file.path);
                return response;
            })
        );
        return result;
    } catch (error) {
        console.log("cloudinary upload error:::", error);
    }

};

const deleteImage = async (publicId) => {
    try {
        const response = await cloudinary.uploader.destroy(publicId);
        console.log("cloudinary delete success:::", result);
        return response;
    } catch (error) {
        console.log("cloudinary delete error:::", error);
    }
};

const getAll = async () => {
    try {
        const response = await cloudinary.api.resources({
            type:"upload",
            prefix: "Bap_Tap_Nhom_Bai_Tap_02"
        });
    
        console.log("cloudinary get all success:::", result);
    
        return response;
    } catch (error) {
        console.log("cloudinary get error:::", error);
    }
};

module.exports = {
    uploadSingle,
    uploadMultiple,
    deleteImage,
    getAll,
}