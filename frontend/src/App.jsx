import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomeScreen from "./screens/HomeScreen/HomeScreen";
import CodeScreen from "./screens/CodeScreen/CodeScreen";
import LandingPage from "./components/LandingPage"; 
import LoginSignup from "./components/LoginSignup"; 
import PrivateRoute from "./components/PrivateRoute"; 
import CodesProvider from "./providers/CodesProvider";
import ModalProvider from "./providers/ModalProvider";

import "./App.css";


function App() {
  return (
    <CodesProvider>
      <ModalProvider>
        <BrowserRouter>
          <Routes>
    
            <Route path="/" element={<LandingPage />} /> {/* Landing page */}
            <Route path="/Login" element={<LoginSignup />} /> {/* Login page */}
            <Route path="/signup" element={<LoginSignup />} /> {/* SignUp page */}
    
            <Route
              path="/dashboard"
              element={
                <PrivateRoute>
                  <HomeScreen />
                </PrivateRoute>
              }
            />
            <Route
              path="/code/:folderId/:fileId"
              element={
                <PrivateRoute>
                  <CodeScreen />
                </PrivateRoute>
              }
            />
          </Routes>
        </BrowserRouter>
      </ModalProvider>
    </CodesProvider>
  );
}

export default App;
