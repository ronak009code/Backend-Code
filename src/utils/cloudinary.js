import { v2 as cloudinary } from 'cloudinary';
import fs from 'fs';

    // Configuration
    cloudinary.config({ 
        cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
        api_key: process.env.CLOUDINARY_API_KEY,
        api_secret: process.env.CLOUDINARY_API_SECRET
    });
    
    
    // Upload function
    const uploadonCloudinary = async (localFilePath) => {
        try {
            if (!localFilePath) return null
            //upload the file to cloudinary 
             await cloudinary.uploader.upload(localFilePath,{
                resource_type : "auto"
            })
            //file uploaded successfully
            console.log("File uploaded successfully",
              response.url);
             return response
        } catch (error) {
            fs.unlinkSync(localFilePath) //remoove the locally saved file as th eupload operation failed
            return null
        }

    }