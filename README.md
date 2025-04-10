#CodeZen - An Online Code Editor

## Backend 
- Current Work

1. Created api for running Code & templates!! <br>
    /api/ --> Check api point <br>
    /api/file/:lang --> Sends code template <br>
                        Current Support -> C, CPP, JS, JAVA, PYTHON  <br>
    /api/run --> Run the code <br>
                    expects in Req.body = { <br>
                        "code": "your code here", <br>
                        "lang": "Your language" <br>
                    } <br>
<br>
2. Completed Docker File and running in container <br>
    To run Simply use: <br>
    ```bash
        docker-compose up --build
    ``` 