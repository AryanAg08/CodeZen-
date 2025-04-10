# CodeZen - An Online Code Editor

## Backend

### ✅ Current Work

1. **Created APIs for Running Code & Fetching Templates**
   - `GET /api/` → Health check or base API route
   - `GET /api/file/:lang` → Returns code template  
     **Supported Languages:** C, C++, JavaScript, Java, Python
   - `POST /api/run` → Runs the provided code  
     **Request Body:**
     ```json
     {
       "code": "your code here",
       "lang": "Your language"
     }
     ```

2. **Docker Setup Completed**
   - Dockerfile is ready and containerized backend works smoothly.
   - To run the backend using Docker:
     ```bash
     docker-compose up --build
     ```

