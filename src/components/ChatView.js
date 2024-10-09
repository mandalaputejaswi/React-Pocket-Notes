import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import ChatInput from './ChatInput';
import backIcon from "../backIcon.png";
import circle from "../Ellipse 23.png";

const ChatHeader = styled.div`
  padding: 10px;
  height: 66px;
  background: #001F8B;
  display: flex;
  align-items: center;
  font-family: Roboto;
  font-size: 24px;
  font-weight: 500;
  line-height: 28.13px;
  letter-spacing: 0.02em;
  text-align: left;
  color: #FFFFFF;
  @media (max-width: 769px) {
    font-family: Roboto;
    font-size: 16.72px;
    line-height: 19.59px;
  }

`;

const ChatMessages = styled.div`
  padding: 20px;
  flex-grow: 1;
  overflow-y: auto;
  background-color: #f9f9f9;
`;

const BackButton = styled.button`
  padding: 5px 10px;
  background-color: transparent;
  color: #fff;
  border: none;
  cursor: pointer;

  @media (min-width: 769px) {
    display: none;
  }

  &:hover {
    background-color: #cc0000;
  }
`;

const Message = styled.div`
    margin-bottom: 15px;
    padding: 20px;
    background-color: #FFFFFF;
    border-radius: 5px;
    max-width: 95%;
    align-items: center;
    box-shadow: 0px 4px 20px 0px #00000040;
    font-family: Roboto;
    font-size: 13px;
    font-weight: 400;
    line-height: 20.82px;
    letter-spacing: 0.035em;
    text-align: left;
    color: #000000;
    @media (min-width: 769px) {
      font-size: 18px;
      line-height: 28.83px;
    }
`;

const Timestamp = styled.small`
    display: block;
    text-align: right;
    margin-top: 5px;
    font-family: Roboto;
    font-size: 13.59px;
    font-weight: 500;
    line-height: 13.27px;
    letter-spacing: 0.02em;
    color: #353535;
    @media (min-width: 769px) {
      font-size: 18px;
      line-height: 17.28px;
    }

`;

function ChatView({ group, onBackClick }) {
   const [messages, setMessages] = useState([]);

  useEffect(() => {
    // Ensure previous groups' messages are not overwritten
    const storedMessages = JSON.parse(localStorage.getItem(`messages_${group.name}`)) || [];
    setMessages(storedMessages);
  }, [group.name]);

  useEffect(() => {
      // Safeguard: ensure messages are updated in the correct localStorage key
      if (group.name && messages.length > 0) {
          localStorage.setItem(`messages_${group.name}`, JSON.stringify(messages));
      }
  }, [messages, group.name]);

  const handleSendMessage = (text) => {
    const dateOptions = {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      };
    
    const timeOptions = {
        hour: 'numeric',
        minute: 'numeric',
        hour12: true,
      };
    
    const date = new Intl.DateTimeFormat('en-GB', dateOptions).format(new Date());
    const time = new Date().toLocaleTimeString('en-US', timeOptions);
    const newMessage = {
      text,
      timestamp: { date, time },
      isOwn: true, // For demonstration; in real apps, determine sender
    };
    setMessages([...messages, newMessage]);
  };
  const getInitials = (name) => {
    const words = name.trim().split(' ');
    if (words.length === 1) {
      return words[0][0].toUpperCase(); // If only one word, take the first letter
    }
    return words[0][0].toUpperCase() + words[1][0].toUpperCase(); // For multiple words, take the first letter of the first two words
  };

  const placeholderText = messages.length > 0 && window.innerWidth > 768 ? 
    'Here’s the sample text for sample work' : 
    messages.length > 0 && window.innerWidth < 768 ? 
    'Your sample text is here': 
    'Enter your text here...........';

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <ChatHeader>
        <BackButton onClick={onBackClick}>
          <img src= { backIcon } alt='Back Icon' />
        </BackButton>
        <div
            style={{
              width: window.innerWidth < 768 ? '62.01px' :'68.9px',
              height: window.innerWidth < 768 ? '62.01px' :'68.9px',
              backgroundColor: group.color,
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#FFFFFF',
              fontFamily: 'Roboto',
              fontWeight: 'bold',
              fontSize: window.innerWidth < 768 ? '20px' :'24px',
              fontWeight: 500,
              lineHeight: window.innerWidth < 768 ? '19.54px' : '23.45px',
              letterSpacing: '0.02em',
              textAlign: 'left',
              margin: '10px 20px'
          }}
          >
            {getInitials(group.name)}
          </div>
        <h3>{group.name}</h3>
        
      </ChatHeader>
      <ChatMessages>
        {messages.length === 0 ? (
          <p>No messages yet. Start the conversation!</p>
        ) : (
          messages.map((msg, index) => (
            <Message key={index} isOwn={msg.isOwn} style={{ wordWrap: 'break-word', whiteSpace: 'pre-wrap', maxWidth: '100%' }}>
              <p>{msg.text}</p>
              <Timestamp>
                {msg.timestamp.date}
                <img src={ circle } alt="circle" 
                style={{ 
                  width: window.innerWidth < 768 ?'3.83px': '5px', 
                  height: window.innerWidth < 768 ? '4px': '5px' , margin: '5px 10px' }}
                 />
                {msg.timestamp.time}
              </Timestamp>
            </Message>
          ))
        )}
      </ChatMessages>
      <ChatInput onSendMessage={handleSendMessage} placeholder={placeholderText} />
    </div>
  );
}

export default ChatView;
