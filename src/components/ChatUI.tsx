import React, { useState } from 'react';

export interface Message {
  id: number;
  content: string;
  sender: 'user' | 'assistant';
  timestamp: Date;
}

interface ChatUIProps {
  onSendMessage?: (message: string) => void;
  messages?: Message[];
  isLoading?: boolean;
}

export const ChatUI: React.FC<ChatUIProps> = ({
  onSendMessage,
  messages = [],
  isLoading = false
}) => {
  const [inputValue, setInputValue] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputValue.trim() && onSendMessage) {
      onSendMessage(inputValue.trim());
      setInputValue('');
    }
  };

  return (
    <div className="chat-ui">
      {/* メッセージ表示エリア */}
      <div className="messages-container">
        {messages.length === 0 ? (
          <div className="no-messages">
            <p>チャットを開始してください</p>
          </div>
        ) : (
          messages.map((message) => (
            <div
              key={message.id}
              className={`message message-${message.sender}`}
            >
              <div className="message-content">
                {message.content}
              </div>
              <div className="message-timestamp">
                {message.timestamp.toLocaleTimeString()}
              </div>
            </div>
          ))
        )}
        {isLoading && (
          <div className="message message-assistant loading">
            <div className="message-content">
              <span>...</span>
            </div>
          </div>
        )}
      </div>

      {/* 入力フォーム */}
      <form onSubmit={handleSubmit} className="input-form">
        <div className="input-container">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="メッセージを入力してください..."
            className="message-input"
            disabled={isLoading}
          />
          <button
            type="submit"
            className="send-button"
            disabled={!inputValue.trim() || isLoading}
          >
            送信
          </button>
        </div>
      </form>
    </div>
  );
};

export default ChatUI;
