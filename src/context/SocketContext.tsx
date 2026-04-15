import { createContext, useContext, useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";
import { getCookie } from "../utilities/auth";
import { ACCESS_TOKEN } from "../utilities/constant";
import type { SocketContextValue } from "../types";

const SocketContext = createContext<SocketContextValue>({
  socket: null,
  connected: false,
});

export function SocketProvider({ children }: { children: React.ReactNode }) {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [connected, setConnected] = useState(false);

  useEffect(() => {
    const token = getCookie(ACCESS_TOKEN) ?? undefined;
    const s = io(import.meta.env.VITE_SOCKET_URL, {
      transports: ["websocket"],
      auth: { token },
    });
    setSocket(s);

    s.on("connect", () => setConnected(true));
    s.on("disconnect", () => setConnected(false));

    return () => {
      s.disconnect();
    };
  }, []);
  console.log(connected, "--> Socket Connection");
  return (
    <SocketContext.Provider value={{ socket, connected }}>
      {children}
    </SocketContext.Provider>
  );
}

export function useSocket() {
  return useContext(SocketContext);
}
