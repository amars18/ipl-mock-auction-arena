import { useLocation, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import socket from "../socket";

function AuctionRoom() {
  const { roomId } = useParams();
  const location = useLocation();

  const [users, setUsers] = useState([]);

  useEffect(() => {
    const userData = {
      roomId,
      username: location.state?.username,
      teamName: location.state?.teamName,
    };

    socket.emit("join-room", userData);

    socket.on("user-joined", (data) => {
  setUsers((prev) => {
    const exists = prev.find(
      (u) =>
        u.username === data.username &&
        u.teamName === data.teamName
    );

    if (exists) return prev;

    return [...prev, data];
  });
});

    return () => {
      socket.off("user-joined");
    };
  }, [roomId, location]);

  return (
    <div style={{ padding: "40px" }}>
      <h1>🏏 IPL Auction Room</h1>

      <h2>Room ID: {roomId}</h2>

      <h3>User: {location.state?.username}</h3>

      <h3>Team: {location.state?.teamName}</h3>

      <hr />

      <h2>Joined Users</h2>

      {users.map((user, index) => (
        <div key={index}>
          {user.username} ({user.teamName})
        </div>
      ))}
    </div>
  );
}

export default AuctionRoom;