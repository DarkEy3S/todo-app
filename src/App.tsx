import { BrowserRouter, Route, Routes } from "react-router-dom";
import { MainLayout } from "./components/MainLayout";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<div>Hello World! main page</div>} />
          <Route path="*" element={<div>404!</div>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
