import { useEffect, useState } from "react";

const useWebSocket = () => {
    const [queueStatus, setQueueStatus] = useState<boolean | null>(null);
    const [queueUpdateCount, setQueueUpdateCount] = useState(0); // ✅ Forces re-render
    const [ticketStatus, setTicketStatus] = useState<string | null>(null);
    const [ticketUpdateCount, setTicketUpdateCount] = useState(0); // ✅ Forces re-render

    useEffect(() => {
        let socket: WebSocket;
        let reconnectTimeout: NodeJS.Timeout;

        const connectWebSocket = () => {
            socket = new WebSocket("ws://localhost:8080/ws/status");

            socket.onopen = () => {
                console.log("✅ WebSocket Connected");
            };

            socket.onmessage = (event) => {
                console.log("📩 WebSocket Message Received:", event.data);
                
                if (event.data.startsWith("queueStatus:")) {
                    const newQueueStatus = event.data.split(":")[1] === "true";
                    setQueueStatus(newQueueStatus);
                    setQueueUpdateCount(prev => prev + 1); // ✅ Always increment
                } else if (event.data.startsWith("ticketUpdate:")) {
                    const newTicketStatus = event.data.split(":")[1];
                    setTicketStatus(newTicketStatus);
                    setTicketUpdateCount(prev => prev + 1); // ✅ Always increment
                }
            };

            socket.onerror = (error) => {
                console.error("❌ WebSocket Error:", error);
            };

            socket.onclose = () => {
                console.warn("⚠️ WebSocket Disconnected, reconnecting in 3s...");
                reconnectTimeout = setTimeout(connectWebSocket, 3000);
            };
        };

        connectWebSocket();

        return () => {
            socket.close();
            clearTimeout(reconnectTimeout);
        };
    }, []);

    return { queueStatus, queueUpdateCount, ticketStatus, ticketUpdateCount };
};

export default useWebSocket;
