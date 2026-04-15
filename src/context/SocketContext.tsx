import { createContext, useContext, useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";
import { getCookie } from "../utilities/auth";
import { ACCESS_TOKEN } from "../utilities/constant";

const SOCKET_URL = "http://localhost:7002";

interface SocketContextValue {
  socket: Socket | null;
  connected: boolean;
}

const SocketContext = createContext<SocketContextValue>({
  socket: null,
  connected: false,
});

export function SocketProvider({ children }: { children: React.ReactNode }) {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [connected, setConnected] = useState(false);

  useEffect(() => {
    const token = getCookie(ACCESS_TOKEN) ?? undefined;
    const s = io(SOCKET_URL, { transports: ["websocket"], auth: { token } });
    setSocket(s);

    s.on("connect", () => setConnected(true));
    s.on("disconnect", () => setConnected(false));

    return () => {
      s.disconnect();
    };
  }, []);

  return (
    <SocketContext.Provider value={{ socket, connected }}>
      {children}
    </SocketContext.Provider>
  );
}

export function useSocket() {
  return useContext(SocketContext);
}
