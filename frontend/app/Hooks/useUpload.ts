import { useState } from "react";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { storage } from "../firebaseConfig"; // Import the existing storage instance

const useUploadFile = () => {
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadVideoProgress, setUploadVideoProgress] = useState(0);
  const [uploadAudioProgress, setUploadAudioProgress] = useState(0);
  const [uploadPdfProgress, setUploadPdfProgress] = useState(0);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [downloadURL, setDownloadURL] = useState<string | null>(null);

  const uploadFile = (file: File, fileType: string) => {
    return new Promise((resolve, reject) => {
      let validTypes = [];
      let maxSizeInBytes = 0;
      let storagePath = "";
      const timestamp = Date.now(); // Generate a timestamp for uniqueness
      const uniqueFileName = `${timestamp}_${file.name}`;

      switch (fileType) {
        case "image":
          validTypes = [
            "image/jpeg",
            "image/png",
            "image/gif",
            "image/webp",
            "image/svg+xml",
            "image/bmp",
          ];

          maxSizeInBytes = 5 * 1024 * 1024; // 5MB
          storagePath = `images/${uniqueFileName}`;
          break;
        case "video":
          validTypes = [
            "video/mp4",
            "video/quicktime",
            "video/x-msvideo",
            "video/x-ms-wmv",
            "video/x-flv",
            "video/webm",
            "video/3gpp",
          ];
          maxSizeInBytes = 500 * 1024 * 1024; // 500MB
          storagePath = `videos/${uniqueFileName}`;
          break;
        case "pdf":
          validTypes = ["application/pdf"];
          maxSizeInBytes = 50 * 1024 * 1024; // 50MB
          storagePath = `pdfs/${uniqueFileName}`;
          break;
        case "vocal":
          validTypes = [
            "audio/mpeg",
            "audio/wav",
            "audio/ogg",
            "audio/mp3",
            "audio/x-m4a",
          ];
          maxSizeInBytes = 100 * 1024 * 1024; // 100MB
          storagePath = `audios/${uniqueFileName}`;
          break;
        default:
          setUploadError("نوع الملف غير مدعوم.");
          reject("نوع الملف غير مدعوم");
          return;
      }

      // Check if the file type is valid
      if (!validTypes.includes(file.type)) {
        setUploadError("يرجى اختيار ملف صالح.");
        reject("نوع الملف غير صالح");
        return;
      }

      // Check if the file size is within the allowed limit
      if (file.size > maxSizeInBytes) {
        setUploadError(
          `يجب ألا يتجاوز حجم الملف ${maxSizeInBytes / (1024 * 1024)}MB.`
        );
        reject("حجم الملف يتجاوز الحد المسموح");
        return;
      }

      // Proceed to upload the file to Firebase Storage
      const storageRef = ref(storage, storagePath);
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        "state_changed",
        (snapshot: any) => {
          // Progress function
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;

          // Set the appropriate progress state based on file type
          switch (fileType) {
            case "image":
              setUploadProgress(progress);
              break;
            case "video":
              setUploadVideoProgress(progress);
              break;
            case "pdf":
              setUploadPdfProgress(progress);
              break;
            case "vocal":
              setUploadAudioProgress(progress);
              break;
            default:
              break;
          }
        },
        (error: Error) => {
          // Handle unsuccessful uploads
          setUploadError(`حدث خطأ أثناء رفع الملف: ${error.message}`);
          reject(error);
        },
        () => {
          // Handle successful uploads on complete
          getDownloadURL(uploadTask.snapshot.ref).then((url: string) => {
            setDownloadURL(url);
            resolve(url);
          });
        }
      );
    });
  };

  return {
    uploadFile,
    uploadProgress,
    uploadVideoProgress,
    uploadAudioProgress,
    uploadPdfProgress,
    uploadError,
    downloadURL,
  };
};

export default useUploadFile;
