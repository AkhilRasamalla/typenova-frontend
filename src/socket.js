import { io } from "socket.io-client";


const SOCKET_URL = import.meta.env.VITE_BACKEND_URL;

const socket = io(SOCKET_URL,{ transports: ["websocket"] });

export default socket;
