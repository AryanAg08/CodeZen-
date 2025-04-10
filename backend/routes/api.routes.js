const apiRouter = require("express").Router();
const FileApi = require("../api/FileApi");
const RunnerManager = require("../compiler/RunnerManager");

apiRouter.get("/", (req, res) => {
  res.json({ message: "Hello! welcome to our api!" });
});

apiRouter.get('/file/:lang', async (req, res) => {
    const language = req.params.lang;
    console.log(language);
    try {
        FileApi.getFile(language, (content) => {
            const file = {
                lang: language,
                code: content,
            };
            res.send(JSON.stringify(file));
        });
    }
    catch (err) {
        console.error(err);
        res.status(500).send('Error retrieving file');
    }
});

apiRouter.post('/run', async (req, res) => {
    const file = req.body;
    console.log(`file.lang: ${file.lang}`, `file.code:${file.code}`);
    RunnerManager.run(file.lang, file.code, res);
});


module.exports = apiRouter;