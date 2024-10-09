import React, { useState } from 'react';
import styled from 'styled-components';
import SendEnable from "../send-enable.png";
import SendDisable from "../send-disable.png";

const ChatInputContainer = styled.div`
  display: flex;
  padding: 10px;
  background: #001F8B;
  position: relative;
  heigth: 255px;
`;

const TextInput = styled.textarea`
    width: 100%;
    padding: 10px;
    padding-right: 50px; /* Space for the button */
    border-radius: 5px;
    border: 1px solid #ccc;
    resize: none;
    height: 50px;
`;

const SendButton = styled.button`
    position: absolute;
    right: 20px; /* Position from the right */
    top: 50%; /* Center vertically */
    transform: translateY(-50%); /* Adjust vertical alignment */
    padding: 10px 15px;
    border-radius: 50%;
    background-color: #FFFFFF;
    color: white;
    border: none;
    cursor: pointer;

  &:disabled {
    background-color: #FFFFFF;
    cursor: not-allowed;
  }

  &:hover:enabled {
    background-color: #FFFFFF;
  }
`;

function ChatInput({ onSendMessage, placeholder }) {
  const [message, setMessage] = useState('');

  const handleSendClick = () => {
    if (message.trim()) {
      onSendMessage(message);
      setMessage('');
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendClick();
    }
  };

  return (
    <ChatInputContainer>
      <TextInput
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder={placeholder} 
        onKeyPress={handleKeyPress}
      />
      <SendButton onClick={handleSendClick} disabled={!message.trim()}>
      <img
          src={!message.trim() ? SendDisable : SendEnable}
          alt="send icon"
          style={{ width: '20px' }}
        />
      </SendButton>
    </ChatInputContainer>
  );
}

export default ChatInput;
