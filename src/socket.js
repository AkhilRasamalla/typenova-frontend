import { io } from "socket.io-client";

const SOCKET_URL = "https://typenova-backend-on7p.onrender.com";

const socket = io(SOCKET_URL, {
  transports: ["websocket", "polling"],
  withCredentials: true,
});

export default socket;