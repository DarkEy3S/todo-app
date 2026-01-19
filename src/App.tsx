import { BrowserRouter, Route, Routes } from "react-router-dom";
import { MainLayout } from "./components/MainLayout";
import { Home } from "./pages/Home";
import { SingUp } from "./pages/SingUp";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/singup" element={<SingUp />} />
          <Route path="*" element={<div>404!</div>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
