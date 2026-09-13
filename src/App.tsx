import { BrowserRouter, Route, Routes } from "react-router-dom";
import { MainLayout } from "./components/MainLayout";
import { AuthProvider } from "./hooks/useAuth";
import { Home } from "./pages/Home";
import { SignUp } from "./pages/SignUp";
import { SignIn } from "./pages/SignIn";
import { Privacy } from "./pages/Privacy";
import { Todos } from "./pages/Todos";
import { ConfirmEmail } from "./pages/ConfirmEmail";
import { EditProfile } from "./pages/EditProfile/EditProfile";
import { Error } from "./pages/Error";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route element={<MainLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/signin" element={<SignIn />} />
            <Route path="/privacy" element={<Privacy />} />
            <Route path="/confirm-email" element={<ConfirmEmail />} />
            <Route path="/profile" element={<EditProfile />} />
            <Route path="/todos" element={<Todos />} />
            <Route path="*" element={<Error />} />
          </Route>
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
