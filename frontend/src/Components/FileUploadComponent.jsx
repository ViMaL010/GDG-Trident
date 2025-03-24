import React, { useState, useEffect } from 'react';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import { storage } from '../../../firebase';


const FileUpload = ({ uploadedFiles, onUploadComplete }) => {
    console.log("onUploadComplete prop received in FileUpload:", onUploadComplete);
    console.log("uploadedFiles prop received in FileUpload:", uploadedFiles);

    console.log("File executed")
  const [progressList, setProgressList] = useState({});
  const [uploadResult, setUploadResult] = useState(null);

  // Handle Upload for All Files
  const handleUpload = async () => {
    const uploadPromises = Object.entries(uploadedFiles)
      .filter(([key, file]) => file !== null) // Only upload non-null files
      .map(([key, file]) => {
        const storageRef = ref(storage, `uploads/${key}/${file.name}`);
        const uploadTask = uploadBytesResumable(storageRef, file);

        return new Promise((resolve) => {
          uploadTask.on(
            'state_changed',
            (snapshot) => {
              const progressPercent =
                (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
              setProgressList((prev) => ({
                ...prev,
                [key]: progressPercent,
              }));
            },
            (error) => {
              console.error(`Error uploading ${key}:`, error);
              resolve({ key, success: false, error: error.message });
            },
            async () => {
              try {
                const url = await getDownloadURL(uploadTask.snapshot.ref);
                resolve({ key, success: true, url });
              } catch (error) {
                console.error(`Error getting URL for ${key}:`, error);
                resolve({ key, success: false, error: error.message });
              }
            }
          );
        });
      });

    // Wait for all uploads to complete
    const results = await Promise.all(uploadPromises);

    // Separate success and failure results
    const successResults = results
      .filter((res) => res.success)
      .reduce((acc, res) => {
        acc[res.key] = res.url;
        return acc;
      }, {});

    const failedResults = results
      .filter((res) => !res.success)
      .map((res) => ({
        key: res.key,
        error: res.error,
      }));

    // Set Final Result
    setUploadResult({ successResults, failedResults });

    // Trigger Callback with Results
    onUploadComplete({
      success: failedResults.length === 0,
      successResults,
      failedResults,
    });
  };

  useEffect(() => {
    if (Object.keys(uploadedFiles).length > 0) {
      handleUpload();
    }
  }, [uploadedFiles]);

  return (
    <div>
      <h3>Uploading Files...</h3>

      {Object.keys(progressList).length > 0 && (
        <div>
          {Object.entries(progressList).map(([key, progress]) => (
            <p key={key}>
              {key.replace(/([A-Z])/g, ' $1').trim()}:{' '}
              {progress.toFixed(2)}%
            </p>
          ))}
        </div>
      )}

      {uploadResult && (
        <div>
          {Object.keys(uploadResult.successResults).length > 0 && (
            <div>
              <h4>✅ Successfully Uploaded:</h4>
              {Object.entries(uploadResult.successResults).map(
                ([key, url]) => (
                  <div key={key}>
                    <p>{key.replace(/([A-Z])/g, ' $1').trim()}</p>
                    <a
                      href={url}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      View File
                    </a>
                  </div>
                )
              )}
            </div>
          )}

          {uploadResult.failedResults.length > 0 && (
            <div>
              <h4>❌ Failed to Upload:</h4>
              {uploadResult.failedResults.map(({ key, error }) => (
                <p key={key}>
                  {key.replace(/([A-Z])/g, ' $1').trim()}: {error}
                </p>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default FileUpload;
