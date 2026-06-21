import { useLocation, useParams } from "react-router-dom";

function AuctionRoom() {
  const { roomId } = useParams();
  const location = useLocation();

  return (
    <div style={{ padding: "40px" }}>
      <h1>🏏 Auction Room</h1>

      <h2>Room ID: {roomId}</h2>

      <h3>
        User: {location.state?.username}
      </h3>

      <h3>
        Team: {location.state?.teamName}
      </h3>
    </div>
  );
}

export default AuctionRoom;
