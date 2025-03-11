const vision = require('@google-cloud/vision');
const client = new vision.ImageAnnotatorClient();

const matchImages = async (imageUrl1, imageUrl2) => {
  try {
    const [result1] = await client.faceDetection(imageUrl1);
    const [result2] = await client.faceDetection(imageUrl2);
    
    const faces1 = result1.faceAnnotations;
    const faces2 = result2.faceAnnotations;
    
    if (faces1.length && faces2.length) {
      // Compare faces logic (e.g., using landmarks)
      return true; // If matched
    }
    return false;
  } catch (error) {
    console.error('Error matching images:', error);
    throw new Error('Image matching failed');
  }
};

module.exports = matchImages;
