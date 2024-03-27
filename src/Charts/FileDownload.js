import React, { useContext } from "react";
import FileContext from "../Context/FileContext";
import { findShortCallers } from "../Util/util";

const FileDownload = () => {
  const { fileContent, setFileContent, fileName, setFileName } = useContext(FileContext);

  const handleDownload = () => {
    if (!fileContent) {
      alert("No file content available to download.");
      return;
    }

    const shortCallers = findShortCallers(fileContent).shortCallers.join('\n');

    // Create a Blob from the fileContent
    const blob = new Blob([shortCallers], { type: 'text/plain' });

    // Generate a URL for the Blob
    const href = URL.createObjectURL(blob);

    // Create a temporary anchor element and trigger the download
    const link = document.createElement('a');
    link.href = href;
    link.download = fileName || "download.txt"; // Use fileTitle if available, or a default filename
    document.body.appendChild(link); // Required for Firefox
    link.click();

    // Clean up by revoking the Object URL and removing the temporary anchor element
    URL.revokeObjectURL(href);
    document.body.removeChild(link);
  };

  return (
    <div className="test-coverage-wrapper">
        <div className="title">Download</div>
        <div> Download a list of callers with average time less than 5 seconds (after uploading a file)</div>
        <button onClick={handleDownload} className="download-button">
            Download File
        </button>
    </div>
    
  );
};

export default FileDownload;