import FileUploadIcon from "@mui/icons-material/FileUpload";
import FileDownloadIcon from "@mui/icons-material/FileDownload";

import { useParams } from "react-router-dom";
import "./CodeScreen.scss";
import EditorContainer from "./EditorContainer";
import { useCallback, useState } from "react";
import { makeSubmission } from "./services";
import Assistant from "../../components/assistant/Assistant";

function CodeScreen() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [showLoader, setShowLoader] = useState(false);
  const [code, setCode] = useState("");
  const [language, setLanguage] = useState("cpp");

  const params = useParams();
  const { folderId, fileId } = params;

  const onFileImport = (event) => {
    const file = event.target.files[0];
    const fileType = file.type.includes("text");
    if (fileType) {
      const fileReader = new FileReader();
      fileReader.readAsText(file);
      fileReader.onload = function (event) {
        const importedInput = event.target.result;
        setInput(importedInput);
      };
    } else {
      alert("Please upload a valid input file");
    }
  };

  const onFileExport = () => {
    const outputValue = output.trim();
    if (!outputValue) {
      alert("Empty file cannot be exported!");
      return;
    } else {
      const outputBlob = new Blob([outputValue], { type: "text/plain" });
      const url = URL.createObjectURL(outputBlob);
      const link = document.createElement("a");
      link.href = url;
      link.download = "output.txt";
      link.click();
    }
  };

  const callback = ({ apiStatus, data }) => {
    if (apiStatus === "loading") {
      setShowLoader(true);
    } else if (apiStatus === "error") {
      setShowLoader(false);
      setOutput("Segmentation Fault");
    } else {
      setShowLoader(false);
      if (data.status.id === 3) {
        setOutput(atob(data.stdout));
      } else {
        setOutput(atob(data.stderr));
      }
    }
  };

  const runCode = useCallback(
    ({ code, language }) => {
      setCode(code);
      setLanguage(language);
      makeSubmission({ code, language, stdinput: input, callback });
    },
    [input]
  );

  return (
  <div className="content-container">
    <div className="header-container">
      <img src="/logo.png" alt="" className="code-header-logo" />
      <h1>CodeZen</h1>
    </div>

    <div className="code-container ai-layout">
      <div className="editor-ai-wrapper">
        <div className="editor-container">
          <EditorContainer
            fileId={fileId}
            folderId={folderId}
            runCode={runCode}
            setCode={setCode}
            setLanguage={setLanguage}
          />
        </div>

        {/* Combined IO + AI Panel */}
        <div className="right-panel">
          <div className="io-section">
            {/* Input Box */}
            <div className="input-box">
              <div className="input-header">
                <h4>Input:</h4>
                <label htmlFor="input">
                  <FileUploadIcon />
                  <span>Import Input</span>
                </label>
                <input
                  type="file"
                  id="input"
                  style={{ display: "none" }}
                  onChange={onFileImport}
                />
              </div>
              <textarea
                placeholder="Input goes here..."
                spellCheck="false"
                value={input}
                onChange={(e) => setInput(e.target.value)}
              />
            </div>

            {/* Output Box */}
            <div className="output-box">
              <div className="output-header">
                <h4>Output:</h4>
                <button onClick={onFileExport}>
                  <FileDownloadIcon />
                  <span>Export Output</span>
                </button>
              </div>
              <textarea
                readOnly
                placeholder="Output comes here..."
                spellCheck="false"
                value={output}
              />
            </div>
          </div>

          {/* AI Assistant Panel */}
          <div className="ai-response">
            <Assistant code={code} language={language} />
          </div>
        </div>
      </div>

      {showLoader && (
        <div className="fullpage-loader">
          <div className="loader"></div>
        </div>
      )}
    </div>
  </div>
);

}

export default CodeScreen;
