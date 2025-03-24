import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { storage } from "../../../firebase";

// Function to Upload All Files
export const uploadAllFiles = async (uploadedFiles, onUploadComplete) => {
  console.log("Starting file upload...");

  // Check if uploadedFiles is empty
  if (!uploadedFiles || Object.keys(uploadedFiles).length === 0) {
    console.error("No files to upload!");
    return;
  }

  // Store upload progress
  const progressList = {};
  const uploadPromises = Object.entries(uploadedFiles).map(
    async ([key, file]) => {
      // Skip if the file is null or undefined
      if (!file) {
        console.warn(`Skipping file ${key} because it's null or undefined.`);
        return { key, success: false, error: "File is null or undefined." };
      }

      try {
        // Create a reference for the file in Firebase Storage
        const storageRef = ref(storage, `uploads/${key}/${file.name}`);
        const uploadTask = uploadBytesResumable(storageRef, file);

        // Track progress
        await new Promise((resolve, reject) => {
          uploadTask.on(
            "state_changed",
            (snapshot) => {
              const progressPercent =
                (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
              progressList[key] = progressPercent.toFixed(2);
              console.log(`Uploading ${key}: ${progressPercent.toFixed(2)}%`);
            },
            (error) => {
              console.error(`Error uploading ${key}:`, error);
              reject(error);
            },
            () => resolve()
          );
        });

        // Get the download URL
        const url = await getDownloadURL(uploadTask.snapshot.ref);
        console.log(`File ${key} uploaded successfully. URL: ${url}`);
        return { key, success: true, url };
      } catch (error) {
        console.error(`Error uploading ${key}:`, error.message);
        return { key, success: false, error: error.message };
      }
    }
  );

  // Wait for all uploads to complete
  const results = await Promise.all(uploadPromises);

  // Separate success and failure results
  const successResults = results
    .filter((res) => res && res.success)
    .reduce((acc, res) => {
      acc[res.key] = res.url;
      return acc;
    }, {});

  const failedResults = results
    .filter((res) => res && !res.success)
    .map((res) => ({
      key: res.key,
      error: res.error,
    }));

  // Return final upload results
  console.log("Upload complete. Success:", successResults, "Failures:", failedResults);
  onUploadComplete({
    success: failedResults.length === 0,
    successResults,
    failedResults,
  });
};
