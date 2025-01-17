// Chatbot.js
import { useState, useRef, useEffect } from "react";
import axios from "axios";
import './chatbot.css';

function Chatbot() {
  const [question, setQuestion] = useState("");
  const [answers, setAnswers] = useState([
    {
      type: "bot",
      text: "Hi! I'm your financial assistant. You can ask me questions about finance, investment, budgeting, accounting, and more. How can I help you today?",
    },
  ]);
  const [generatingAnswer, setGeneratingAnswer] = useState(false);

  const chatRef = useRef(null);

  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
  }, [answers, generatingAnswer]);

  async function generateAnswer(e) {
    e.preventDefault();
    if (!question.trim()) return;

    setGeneratingAnswer(true);
    const currentQuestion = question;
    setQuestion(""); // Clear input immediately after sending

    // Add the user's question to the chat
    setAnswers((prev) => [...prev, { type: "user", text: currentQuestion }]);

    try {
      const instruction =
        "You are an expert in financial management. Answer questions only related to finance, money, investment, budget, expenses, revenue, profit, economy, or accounting. If a question is unrelated, respond with 'Sorry, I can only answer financial management-related questions.'";

      const response = await axios({
        url: "",
        method: "post",
        data: {
          contents: [{ parts: [{ text: `${instruction} ${currentQuestion}` }] }],
        },
      });

      const aiResponse = response.data.candidates[0].content.parts[0].text;
      setAnswers((prev) => [...prev, { type: "bot", text: aiResponse }]);
    } catch (error) {
      console.error(error);
      setAnswers((prev) => [
        ...prev,
        { type: "bot", text: "Sorry - Something went wrong. Please try again!" },
      ]);
    }

    setGeneratingAnswer(false);
  }

  return (
    <div className="chat-container">
      {/* Chat Messages */}
      <div ref={chatRef} className="chat-box">
        {answers.map((message, index) => (
          <div
            key={index}
            className={`message ${message.type === "bot" ? "bot" : "user"}`}
          >
            {message.text}
          </div>
        ))}
        {generatingAnswer && <div className="message bot thinking">Thinking...</div>}
      </div>

      {/* Input Form */}
      <form onSubmit={generateAnswer} className="input-box">
        <textarea
          className="input"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          placeholder="Type your question here..."
          rows="2"
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              generateAnswer(e);
            }
          }}
        ></textarea>
        <button type="submit" className="send-btn" disabled={generatingAnswer}>
          Send
        </button>
      </form>
    </div>
  );
}

export default Chatbot;