import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { v4 as uuid } from "uuid";

function HomePage() {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [teamName, setTeamName] = useState("");

  const createRoom = () => {
    if (!username || !teamName) {
      alert("Fill all fields");
      return;
    }

    const roomId = uuid().substring(0, 6);

    navigate(`/room/${roomId}`, {
      state: {
        username,
        teamName
      }
    });
  };

return (
  <div
    style={{
      minHeight: "100vh",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      background: "linear-gradient(135deg,#0f172a,#1e293b)",
      color: "white"
    }}
  >
    <div
      style={{
        width: "400px",
        padding: "30px",
        borderRadius: "20px",
        background: "#1e293b",
        boxShadow: "0 0 20px rgba(0,0,0,0.4)"
      }}
    >
      <h1>🏏 IPL Mock Auction Arena</h1>

      <input
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        style={{
          width: "100%",
          padding: "10px",
          marginBottom: "15px"
        }}
      />

      <input
        placeholder="Team Name"
        value={teamName}
        onChange={(e) => setTeamName(e.target.value)}
        style={{
          width: "100%",
          padding: "10px",
          marginBottom: "15px"
        }}
      />

      <button
        onClick={createRoom}
        style={{
          width: "100%",
          padding: "12px",
          cursor: "pointer"
        }}
      >
        Create Auction Room
      </button>
    </div>
  </div>
);
}

export default HomePage;