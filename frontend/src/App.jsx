import { useEffect, useState } from "react";
import { io } from "socket.io-client";

import { FaUser } from "react-icons/fa";

function Chat() {
  const [sockets, setSockets] = useState(null);
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const socket = io("http://localhost:3000", {
      reconnection: true,
      reconnectionAttempts: 5,
      reconnectionDelay: 1000,
    });

    setSockets(socket);

    socket.on("message", (data) => {
      setMessages((prev) => [...prev, data]);
    });

    return () => socket.disconnect();
  }, []);

  const sendMessage = () => {
    if (message.trim()) {
      sockets.emit("message", message); 
      setMessage(""); 
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-mi-color">
      <div className="flex flex-col max-w-lg mx-auto mt-10 bg-mi-color p-6 rounded-xl shadow-2xl">

        <div className="flex-1 overflow-y-auto mb-4 space-y-4">
          {messages.map((msg, idx) => (
            <div key={idx} className="flex items-start space-x-3">
              <div className="flex-shrink-0">
              
                <FaUser className="w-5 h-10 text-white" />
              </div>
              <div>
                <p className="text-sm font-semibold text-white">Usuario</p>
                <p className="text-sm text-white">{msg}</p>
              </div>
            </div>
          ))}
        </div>
  
    
        <div className="flex items-center border-t pt-4 mt-4">
          <input
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="flex-1 px-4 py-2 bg-mi-color text-white rounded-lg focus:outline-none focus:ring-2"
            placeholder="Escribe un mensaje..."
          />
          <button
            onClick={sendMessage}
            className="ml-3 bg-orange-500 text-white p-2 rounded-lg focus:outline-none focus:ring-2"
          >
            Enviar
          </button>
        </div>
      </div>
    </div>
  );
  
  
}

export default Chat;
