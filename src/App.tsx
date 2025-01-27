import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Chat from "./pages/Chatbot/Chat";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/dashboard" element={<Chat />} />
      </Routes>
    </Router>
  );
}

export default App;
