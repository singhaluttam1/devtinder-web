import { useEffect, useState, useRef } from "react";
import { useParams } from "react-router";
import { useSelector } from "react-redux";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { io } from "socket.io-client";

const Chat = () => {
  const { targetUserId } = useParams();
  const reduxUser = useSelector((store) => store.user);
  const [user, setUser] = useState(reduxUser || null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [isOnline, setIsOnline] = useState(false);
  const socketRef = useRef(null);

  // Load user from localStorage if redux store is empty (e.g. on refresh)
  useEffect(() => {
    if (!reduxUser) {
      const storedUser = localStorage.getItem("user");
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
    } else {
      setUser(reduxUser);
    }
  }, [reduxUser]);

  const userId = user?._id;

  useEffect(() => {
    if (!userId || !targetUserId) return;

    socketRef.current = io(BASE_URL, {
      withCredentials: true,
      autoConnect: true,
    });

    const setupSocketListeners = () => {
      if (!socketRef.current) return;

      socketRef.current.emit("userOnline", userId);

      socketRef.current.on("statusUpdate", ({ userId: updatedId, isOnline }) => {
        if (updatedId === targetUserId) setIsOnline(isOnline);
      });

      socketRef.current.emit("joinChat", { userId, targetUserId });

      socketRef.current.on("messageReceived", (message) => {
        setMessages((prev) => [...prev, message]);
      });

      socketRef.current.on("chatHistory", (history) => {
        setMessages(history);
      });
    };

    setupSocketListeners();

    return () => {
      if (socketRef.current) {
        socketRef.current.emit("userOffline", userId);
        socketRef.current.disconnect();
      }
    };
  }, [userId, targetUserId]);

  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        const chatRes = await axios.get(`${BASE_URL}/chat/${targetUserId}`, {
          withCredentials: true,
        });

        if (chatRes.data?.messages) {
          setMessages(chatRes.data.messages);
        }

        const statusRes = await axios.get(`${BASE_URL}/api/user/status/${targetUserId}`);
        setIsOnline(statusRes.data.isOnline);
      } catch (error) {
        console.error("Initial data fetch error:", error);
      }
    };

    if (userId && targetUserId) {
      fetchInitialData();
    }
  }, [userId, targetUserId]);

  const sendMessage = () => {
    if (!newMessage.trim() || !socketRef.current || !userId) return;

    socketRef.current.emit("sendMessage", {
      userId,
      targetUserId,
      text: newMessage,
    });

    setNewMessage("");
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  if (!user) return null;

  return (
    <div className="w-3/4 mx-auto border border-gray-600 m-5 h-[70vh] flex flex-col rounded-2xl">
      <div className="flex flex-row border-b border-gray-600 p-5 justify-center items-center">
        <h1 className="text-2xl font-bold">Chat</h1>
        <div className="flex items-center ml-4">
          <span className="text-lg font-semibold mr-2">
            {user.firstName} {user.lastName}
          </span>
          <span className={`h-3 w-3 rounded-full ${isOnline ? 'bg-green-500' : 'bg-red-500'}`}></span>
          <span className="ml-1 text-sm">
            {isOnline ? "Online" : "Offline"}
          </span>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-5">
        {messages.map((msg, index) => {
          const senderId = typeof msg.senderId === 'object' ? msg.senderId?._id : msg.senderId;
          const isSentByUser = senderId === userId;

          return (
            <div key={index} className={`chat ${isSentByUser ? "chat-end" : "chat-start"}`}>
              <div className="chat-header">
              {msg.senderId?.firstName || "Unknown"} {msg.senderId?.lastName || ""}
                <time className="text-xs opacity-50 ml-2">
                  {new Date(msg.createdAt).toLocaleTimeString()}
                </time>
              </div>
              <div className={`chat-bubble ${isSentByUser ? 'bg-primary' : 'bg-gray-700'}`}>
                {msg.text}
              </div>
              <div className="chat-footer opacity-50">
                {isSentByUser && "Delivered"}
              </div>
            </div>
          );
        })}
      </div>

      <div className="p-4 border-t border-gray-600 flex items-center gap-2">
        <input
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          onKeyDown={handleKeyPress}
          className="flex-1 border border-gray-500 bg-gray-800 text-white rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-primary"
          placeholder="Type your message..."
        />
        <button
          onClick={sendMessage}
          className="btn btn-primary px-6 py-3 rounded-lg"
          disabled={!newMessage.trim()}
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default Chat;