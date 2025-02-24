# Online Code Editor
A full stack web application for online programming, built with React(Frontend) and Express(Backend).
<kbd>![image](/public/codeeditor.png)</kbd>

# Function
This application is used for online coding. After selecting the programming language, you can start to write code. Below are the highlighted features.
* Five programming languages are supported, including c, c++, java, javascript and python.
* Syntax highlighting for different languages.
* Compilation and execution are supported. The proper result or error message will be displayed.

# Technology
The Server is built with Express. The used libraries for server are listed as follows.
* RESTful API: express, express router, cors
* Compilation & Execution: spawn in node.js

The Client is built with React and 3rd-party libraries, see below.
* Styling: bootstrap
* Rich Text Editor: react-ace


# Docker
Build for production. All the compiled html files and js files will be generated in `dist`.
```sh
npm run build
```
Create image with nginx for frontend.
```sh
docker build -t AryanAg/code-editor-web .
```
Create image with node for backend.
```sh
docker build -t AryanAg/code-editor-server . -f Dockerfile-server
```
Create container.
```sh
docker run --name code-editor-web -p 9010:80 -d AryanAg/code-editor-web
docker run --name code-editor-server -p 9011:80 -d AryanAg/code-editor-server
```
Access http://192.168.0.2:9010/ in browser.