import { BrowserRouter, Routes, Route } from "react-router-dom";
import AppLayout from "./features/layout/AppLayout";
import Home from "./screens/Home";
import StoryGenerationForm from "./screens/StoryGenerationForm";
import StoryDisplay from "./screens/StoryDisplay";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AppLayout />}>
          <Route index element={<Home />} />
          <Route path="/create" element={<StoryGenerationForm />} />
        </Route>
        <Route path="/story" element={<StoryDisplay />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
