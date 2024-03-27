import React, {useContext} from "react";
import FileContext from "../Context/FileContext";
import { findShortCallers } from "../Util/util";

const FileContents = () => {
    const { fileContent, setFileContent, fileName, setFileName } = useContext(FileContext);

    return (
        <div className = "test-coverage-wrapper">
            <div className = "title">
                File Contents
                <small>{fileName}</small>
                <div style={{ whiteSpace: 'pre-wrap' }}>{fileContent}</div>
                <div style={{ color: 'red' }}> 
                    Short callers:
                    {findShortCallers(fileContent).shortCallers.join(", ")}
                </div>
            </div>
            
        </div>
    )
}

export default FileContents