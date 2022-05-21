import "./App.css";
import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import EditProfile from "./pages/EditProfile/EditProfile";
import ViewProfile from "./pages/ViewProfile/ViewProfile";
import Home from "./pages/Home/Home";
import CreateSesh from "./pages/CreateSesh/CreateSesh";
import SingleSesh from "./components/SingleSesh/SingleSesh";

function App() {
  return (
    <>
      <main>
        <Routes>
          <Route index path="/" element={<Login />} />
          <Route index path="/register" element={<Register />} />
          <Route index path="/edit-profile" element={<EditProfile />} />
          <Route index path="/view-profile" element={<ViewProfile />} />
          <Route index path="/home" element={<Home />} />
          <Route index path="/create-session" element={<CreateSesh />} />
          <Route index path="/session/:id" element={<SingleSesh />} />
        </Routes>
      </main>
    </>
  );
}

export default App;
