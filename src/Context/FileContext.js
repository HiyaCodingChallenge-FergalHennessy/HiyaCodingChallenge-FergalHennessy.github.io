import { createContext, useState } from "react";

const FileContext = createContext("default file context value");

export const FileContextProvider = ({ children }) => {
    const [fileContent, setFileContent] = useState('');
    const [fileName, setFileName] = useState('');

    return (
        <FileContext.Provider value={{ fileContent, setFileContent, fileName, setFileName}}>
            {children}
        </FileContext.Provider>
    )
}

export default FileContext;