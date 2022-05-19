import "./App.css";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import Register from "./pages/Register/Register";
import EditProfile from "./pages/EditProfile/EditProfile";
import ViewProfile from "./pages/ViewProfile/ViewProfile";

function App() {
  return (
    <>
      <main>
        <Routes>
          <Route index path="/" element={<Home />} />
          <Route index path="/register" element={<Register />} />
          <Route index path="/edit-profile" element={<EditProfile />} />
          <Route index path="/view-profile" element={<ViewProfile />} />
        </Routes>
      </main>
    </>
  );
}

export default App;
