const path = require('path');
const FileApi = require('../api/FileApi');
const CRunner = require('./CRunner');
const CppRunner = require('./CppRunner');
const JavaRunner = require('./JavaRunner');
const JavaScriptRunner = require('./JavaScriptRunner');
const PythonRunner = require('./PythonRunner');

function Factory() {
  this.createRunner = function createRunner(lang) {
    let runner;

    if (lang === 'c') {
      runner = new CRunner();
    } else if (lang === 'c++') {
      runner = new CppRunner();
    } else if (lang === 'java') {
      runner = new JavaRunner();
    } else if (lang === 'javascript') {
      runner = new JavaScriptRunner();
    } else if (lang === 'python') {
      runner = new PythonRunner();
    }

    return runner;
  };
}

module.exports = {
  run(lang, code, res) {
    const factory = new Factory();
    const runner = factory.createRunner(lang.toLowerCase());

    const directory = path.join(__dirname, 'temp');
    const file = path.join(directory, runner.defaultFile());
    console.log(`file: ${file}`);
    const filename = path.parse(file).name; // main
    const extension = path.parse(file).ext; // .java
    console.log(`filename: ${filename}`);
    console.log(`extension: ${extension}`);
    const getGeminiSuggestion = require('../utils/gemini');

    FileApi.saveFile(file, code, () => {
      runner.run(file, directory, filename, extension, async (status, message) => {
        let suggestion = '';
    
        if (status === '0') {
          // Code ran successfully — give suggestion or enhancement tips
          suggestion = await getGeminiSuggestion(
            `Can you provide suggestions or improvements for this ${lang} code?\n\n${code}`
          );
        } else {
          // Code has error — ask Gemini to help fix it
          suggestion = await getGeminiSuggestion(
            `This ${lang} code is throwing an error:\n\n${message}\n\nCan you help fix it or suggest what's wrong?\n\nCode:\n${code}`
          );
        }
    
        const result = {
          status,
          message,
          suggestion,
        };
    
        res.end(JSON.stringify(result));
      });
    });
  },
};
