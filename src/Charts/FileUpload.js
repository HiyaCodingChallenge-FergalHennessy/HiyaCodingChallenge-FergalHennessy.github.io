import React, {useState, useContext} from "react";
import FileContext from "../Context/FileContext"

const FileUpload = () => {
    const { fileContent, setFileContent, fileTitle, setFileName} = useContext(FileContext);
    const [lineCount, setLineCount] = useState(0);
    const MAX_FILE_SIZE = 10485760;

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (!file) {
          return;
        }

        if (file.size > MAX_FILE_SIZE) {
            alert("File size exceeds the maximum limit of 10MB.");
            return; // Abort the operation
        }
    
        const reader = new FileReader();
        reader.onload = function(e) {
          const content = e.target.result;
          // Update state with file content
          setFileContent(content);
          // Perform a simple analysis: count the number of words
          setFileName(file.name);
          setLineCount(content.trim().split('\n').length);
        };
        reader.readAsText(file);
      };
    
      return (
        <div className="test-coverage-wrapper">
          <div className="title">File Upload</div>
          <div> each line should be in the form</div>
          <div>*action* *name1* *name2* *timestamp*</div>
          <input type="file" onChange={handleFileChange} />
          {fileContent && (
            <div>
              <div>Number of call events: {lineCount}</div>
            </div>
          )}
        </div>
      );
}

export default FileUpload