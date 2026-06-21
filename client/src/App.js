import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import AuctionRoom from "./pages/AuctionRoom";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/room/:roomId" element={<AuctionRoom />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;