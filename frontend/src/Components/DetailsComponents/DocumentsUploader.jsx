import { useState } from "react";
import { FileInput } from "./FileInput";

export const DocumentUploader = () => {
  const [uploadedFiles, setUploadedFiles] = useState({
    aadharCard: null,
    marksheet10th: null,
    marksheet12th: null,
    bonafide: null,
    collegeId: null
  });

  const handleFileChange = (name, file) => {
    setUploadedFiles(prevState => ({
      ...prevState,
      [name]: file
    }));
  };

  const requiredDocuments = [
    { name: "aadharCard", title: "Aadhar Card" },
    { name: "marksheet10th", title: "10th Marksheet" },
    { name: "marksheet12th", title: "12th Marksheet" },
    { name: "bonafide", title: "Bonafide Certificate" },
    { name: "collegeId", title: "College ID" }
  ];

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Upload Documents</h2>
      {requiredDocuments.map(doc => (
        <FileInput
          key={doc.name}
          name={doc.name}
          title={doc.title}
          initialFiles={uploadedFiles}
          onFileChange={handleFileChange}
        />
      ))}
    </div>
  );
};