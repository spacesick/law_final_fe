import { io } from "socket.io-client";

const server = "http://34.123.65.241:8080";
const socket = io(server, { autoConnect: false });

export default socket;
