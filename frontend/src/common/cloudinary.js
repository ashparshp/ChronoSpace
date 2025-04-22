import axios from "axios";

export const uploadImage = async (img) => {
  let imgUrl = null;

  try {
    // Get upload credentials from the server
    const { data: credentials } = await axios.get(
      import.meta.env.VITE_SERVER_DOMAIN + "/get-upload-url"
    );
    
    // Create form data for Cloudinary upload
    const formData = new FormData();
    formData.append("file", img);
    formData.append("api_key", credentials.apiKey);
    formData.append("timestamp", credentials.timestamp);
    formData.append("signature", credentials.signature);
    formData.append("folder", credentials.folder);
    
    // Upload directly to Cloudinary
    const uploadResponse = await axios.post(
      `https://api.cloudinary.com/v1_1/${credentials.cloudName}/image/upload`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    
    // Get the secure URL from the response
    imgUrl = uploadResponse.data.secure_url;
  } catch (err) {
    console.error("Error uploading image:", err);
    throw err;
  }

  return imgUrl;
};

/**
 * Converts a Cloudinary URL to use responsive sizing and automatic format/quality
 * @param {string} url - Original Cloudinary URL
 * @param {number} width - Desired width
 * @param {string} cropMode - Crop mode (e.g., 'fill', 'crop', 'scale')
 * @returns {string} - Transformed URL
 */
export const getResponsiveImageUrl = (url, width = 800, cropMode = 'fill') => {
  if (!url || !url.includes('cloudinary.com')) {
    return url; // Return original URL if not a Cloudinary URL
  }
  
  // Find the upload part of the URL
  const uploadIndex = url.indexOf('/upload/');
  if (uploadIndex === -1) return url;
  
  // Insert transformation parameters after /upload/
  const transformedUrl = 
    url.slice(0, uploadIndex + 8) + 
    `w_${width},c_${cropMode},q_auto,f_auto/` + 
    url.slice(uploadIndex + 8);
  
  return transformedUrl;
};

/**
 * Creates a profile image URL with face-detection cropping
 * @param {string} url - Original Cloudinary URL
 * @param {number} size - Desired size (width and height)
 * @returns {string} - Transformed URL
 */
export const getProfileImageUrl = (url, size = 200) => {
  if (!url || !url.includes('cloudinary.com')) {
    return url; // Return original URL if not a Cloudinary URL
  }
  
  const uploadIndex = url.indexOf('/upload/');
  if (uploadIndex === -1) return url;
  
  // Face-detection cropping for profile images
  const transformedUrl = 
    url.slice(0, uploadIndex + 8) + 
    `w_${size},h_${size},c_thumb,g_face,q_auto,f_auto/` + 
    url.slice(uploadIndex + 8);
  
  return transformedUrl;
};

/**
 * Creates a banner image URL optimized for blog headers
 * @param {string} url - Original Cloudinary URL
 * @returns {string} - Transformed URL
 */
export const getBannerImageUrl = (url) => {
  if (!url || !url.includes('cloudinary.com')) {
    return url; // Return original URL if not a Cloudinary URL
  }
  
  const uploadIndex = url.indexOf('/upload/');
  if (uploadIndex === -1) return url;
  
  // Banner optimization for blog headers
  const transformedUrl = 
    url.slice(0, uploadIndex + 8) + 
    `w_1200,h_630,c_fill,q_auto,f_auto/` + 
    url.slice(uploadIndex + 8);
  
  return transformedUrl;
};