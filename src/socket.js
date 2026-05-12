import { io } from "socket.io-client";

const SOCKET_URL = "https://typerush-backend-on7p.onrender.com";

const socket = io(SOCKET_URL, {
  transports: ["websocket", "polling"],
  withCredentials: true,
});

export default socket;