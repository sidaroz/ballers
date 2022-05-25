import "./App.css";
import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import EditProfile from "./pages/EditProfile/EditProfile";
import ViewProfile from "./pages/ViewProfile/ViewProfile";
import Home from "./pages/Home/Home";
import CreateSesh from "./pages/CreateSesh/CreateSesh";
import SingleSesh from "./components/SingleSesh/SingleSesh";
import Filter from "./pages/FilterPage/FilterPage";
import Chatroom from "./components/Chatroom/Chatroom";

function App() {
  return (
    <>
      <main>
        <Routes>
          <Route index path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/edit-profile" element={<EditProfile />} />
          <Route path="/view-profile" element={<ViewProfile />} />
          <Route path="/home" element={<Home />} />
          <Route path="/create-session" element={<CreateSesh />} />
          <Route path="/session/:id" element={<SingleSesh />} />
          <Route path="/session/chat/:id" element={<Chatroom />} />
          <Route path={`home/search/:area/:difficulty`} element={<Filter />} />;
        </Routes>
      </main>
    </>
  );
}

export default App;
