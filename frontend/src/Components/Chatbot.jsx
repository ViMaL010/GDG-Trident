import React, { useState, useEffect, useRef } from 'react';
import { MessageCircle, Send, X } from 'lucide-react';

const fetchChatbotResponse = async (userMessage) => {
  try {
    const response = await fetch("http://localhost:5000/api/gemini/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ message: userMessage })
    });

    if (!response.ok) {
      throw new Error("Failed to fetch chatbot response");
    }

    return await response.json();
  } catch (error) {
    console.error("❌ Error fetching chatbot response:", error.message);
    throw error;
  }
};

const Chatbot = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const messagesEndRef = useRef(null);
  const [isMobile, setIsMobile] = useState(false);

  // Check if the screen is mobile size
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 640);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      setMessages([{
        role: "model",
        text: "Hello! I'm the FundED Chatbot. How can I help you today?"
      }]);
    }
  }, [isOpen]);

  // Auto scroll to bottom on new messages
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  const handleSendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = { role: "user", text: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    try {
      const response = await fetchChatbotResponse(input);
      setMessages((prev) => [...prev, {
        role: "model",
        text: response.message || "Sorry, I didn't understand that."
      }]);
    } catch (error) {
      console.error("Chatbot Error:", error);
      setMessages((prev) => [...prev, {
        role: "model",
        text: "Error: Could not fetch response."
      }]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') handleSendMessage();
  };

  return (
    <div className={`fixed z-50 ${isMobile ? 'inset-x-0 bottom-0' : 'bottom-4 right-4'}`}>
      {!isOpen ? (
        <button
          onClick={() => setIsOpen(true)}
          className={`bg-blue-500 text-white p-3 rounded-full shadow-lg hover:bg-blue-600 transition-colors ${
            isMobile ? 'fixed bottom-4 right-4' : ''
          }`}
          aria-label="Open chatbot"
        >
          <MessageCircle size={24} />
        </button>
      ) : (
        <div className={`bg-white shadow-2xl border border-gray-200 flex flex-col ${
          isMobile 
            ? 'fixed inset-x-0 bottom-0 h-72 rounded-t-xl w-full' 
            : 'fixed bottom-4 right-4 sm:w-80 md:w-96 rounded-xl max-h-96'
        }`}>
          {/* Chat header */}
          <div className="bg-gray-100 p-3 flex justify-between items-center rounded-t-xl">
            <h2 className="text-lg font-semibold text-gray-800">FundED Chatbot</h2>
            <button
              onClick={() => setIsOpen(false)}
              className="text-gray-600 hover:text-gray-800"
              aria-label="Close chatbot"
            >
              <X size={20} />
            </button>
          </div>

          {/* Chat messages */}
          <div className="flex-grow overflow-y-auto p-3 space-y-3">
            {messages.map((msg, i) => (
              <div key={i} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                <div className={`max-w-[80%] p-2 rounded-lg ${
                  msg.role === "user" ? "bg-blue-500 text-white self-end" : "bg-gray-200 text-gray-800"
                }`}>
                  {msg.text}
                </div>
              </div>
            ))}
            {loading && <div className="text-center text-gray-500">Typing...</div>}
            <div ref={messagesEndRef} />
          </div>

          {/* Chat input */}
          <div className="p-2 border-t border-gray-200 flex items-center">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Type a message..."
              className="flex-grow p-2 border border-gray-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              disabled={loading}
            />
            <button
              onClick={handleSendMessage}
              disabled={loading}
              className="bg-blue-500 text-white p-2 rounded-r-lg hover:bg-blue-600 transition-colors disabled:opacity-50"
              aria-label="Send message"
            >
              <Send size={20} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Chatbot;