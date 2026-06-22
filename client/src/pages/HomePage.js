import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/HomePage.css";

function HomePage() {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [teamName, setTeamName] = useState("");

  const createRoom = () => {
    if (!username || !teamName) {
      alert("Please fill all fields");
      return;
    }

    const roomId = Math.random()
      .toString(36)
      .substring(2, 8)
      .toUpperCase();

    navigate(`/room/${roomId}`, {
      state: {
        username,
        teamName,
      },
    });
  };

  return (
    <div className="home-container">
      <div className="card">
        <h1>🏏 IPL Mock Auction Arena</h1>

        <input
          type="text"
          placeholder="Enter Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <input
          type="text"
          placeholder="Enter Team Name"
          value={teamName}
          onChange={(e) => setTeamName(e.target.value)}
        />

        <button onClick={createRoom}>
          Create Auction Room
        </button>
      </div>
    </div>
  );
}

export default HomePage;