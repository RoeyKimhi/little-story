import { BrowserRouter, Routes, Route } from "react-router-dom";
import AppLayout from "./features/layout/AppLayout";
import Home from "./screens/Home";
import StoryGenerationForm from "./screens/StoryGenerationForm";
import StoryDisplay from "./screens/StoryDisplay";
import StoryBook from "./screens/StoryBook";
import MyStories from "./screens/MyStories";
import Login from "./screens/Login";
import Register from "./screens/Register";
import { GuestRoute, ProtectedRoute } from "./components/auth/ProtectedRoute";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AppLayout />}>
          <Route index element={<Home />} />
          <Route element={<ProtectedRoute />}>
            <Route path="/create" element={<StoryGenerationForm />} />
            <Route path="/story" element={<StoryDisplay />} />
            <Route path="/book" element={<StoryBook />} />
            <Route path="/my-stories" element={<MyStories />} />
          </Route>
          <Route element={<GuestRoute />}>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
