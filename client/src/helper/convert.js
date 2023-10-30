import avatar from '../assets/profile.png'; 

/** image onto base64 */
export default function convertToBase64(file) {
    return new Promise((resolve, reject) => {
      if (file) {
        const fileReader = new FileReader();
        fileReader.readAsDataURL(file);
  
        fileReader.onload = () => {
          resolve(fileReader.result);
        };
  
        fileReader.onerror = (error) => {
          reject(error);
        };
      } else {
        // No file selected, resolve with the default avatar
        resolve(avatar); // Assuming `avatar` is the default avatar image
      }
    });
  }
  