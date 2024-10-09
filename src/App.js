import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Header from './components/Header';
import GroupList from './components/GroupList';
import ChatView from './components/ChatView';
import CreateGroupModal from './components/CreateGroupModal';
import myImage from "./image-removebg-preview 1.png";
import lock from "./Vector.png";

// Helper function to load groups from localStorage
const loadGroupsFromLocalStorage = () => {
  const storedGroups = localStorage.getItem('groups');
  return storedGroups ? JSON.parse(storedGroups) : [];
};

const AppContainer = styled.div`
  display: flex;
  height: 100vh;
  font-family: Arial, sans-serif;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const Sidebar = styled.div`
  width: 30%;
  background-color: #FFFFFFF;
  box-sizing: border-box;
  @media (max-width: 768px) {
    width: 100%;
    height: ${({ showChat }) => (showChat ? '0' : '100%')};
    display: ${({ showChat }) => (showChat ? 'none' : 'block')};
  }
`;

const ChatContainer = styled.div`
  width: 70%;
  background: #DAE5F5;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  overflow: hidden;

  @media (max-width: 768px) {
    width: 100%;
    display: ${({ showChat }) => (showChat ? 'flex' : 'none')};
    height: 100%;
  }
`;

const BottomContent = styled.div`
  text-align: center;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align items: end;
  margin-top: 40px;
  margin-bottom 10px;
`;

const BottomText = styled.p`
  font-family: Roboto;
  font-size: 22px;
  font-weight: 400;
  text-align: left;
  color: #292929;
  padding: 0;
  margin: 0;
`;

const AddGroupButton = styled.button`
  position: absolute;
  bottom: 20px;
  right: 20px;
  width: 93px;
  height: 93px;
  background-color: #16008b;
  color: white;
  border: none;
  border-radius: 50%;
  font-size: 40px;
  cursor: pointer;
  z-index: 1000;
  @media (max-width: 768px) {
    width: 75px;
    height: 75px;
  }

  &:hover {
    background-color: #0056b3;
  }
`;

function App() {
  const [showChat, setShowChat] = useState(false);
  const [activeGroup, setActiveGroup] = useState(null);
  const [groups, setGroups] = useState(loadGroupsFromLocalStorage);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedGroup, setSelectedGroup] = useState(null);

  // Save groups to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('groups', JSON.stringify(groups));
  }, [groups]);

  const handleGroupClick = (group) => {
    setActiveGroup(group);
    setShowChat(true);
    setSelectedGroup(group.name);
  };

  const handleBackClick = () => {
    setShowChat(false);
  };

  const handleCreateGroup = (newGroup) => {
    setGroups([...groups, newGroup]);
    setIsModalOpen(false);
  };

  const PlaceholderDiv = styled.div`
  text-align: center;
`;

  const Image = styled.img`
    width: 626px;
    height: 313px;
  `;

  const Headertag = styled.h2`
    font-family: Roboto;
    font-size: 50px;
    font-weight: 700;
    line-height: 58.59px;
    letter-spacing: 0.02em;
    text-align: center;
    color: #000000;
    padding: 0;
    margin: 0;
  `;

  const Paragraph = styled.p`
    font-family: Roboto;
    font-size: 22px;
    font-weight: 500;
    line-height: 32px;
    letter-spacing: 0.02em;
    text-align: center;
    color: #292929;
  `;

  return (
    <>
      <AppContainer>
        <Sidebar showChat={showChat}>
          <Header />
          <div style={{ position: 'relative', height: '90vh', overflowY: 'auto' }}>
            <GroupList groups={groups} onGroupClick={handleGroupClick} selectedGroup={selectedGroup} />
            <AddGroupButton onClick={() => setIsModalOpen(true)}>
              +
            </AddGroupButton>
          </div>
          
        </Sidebar>
        <ChatContainer showChat={showChat}>
          {activeGroup ? (
            <ChatView group={activeGroup} onBackClick={handleBackClick} />
          ) : (
            <><PlaceholderDiv>
                <Image src={myImage} alt="placeholder" />
                <Headertag>Pocket Notes</Headertag>
                <Paragraph>
                  Send and receive messages without keeping your phone online.
                  <br />
                  Use Pocket Notes on up to 4 linked devices and 1 mobile phone.
                </Paragraph>
              </PlaceholderDiv><BottomContent>
                  <img src= { lock } alt="vector" style={{ width: '17px', height: '21px' }} />
                  <BottomText>end-to-end encrypted</BottomText>
                </BottomContent></>
          )}
        </ChatContainer>
      </AppContainer>
      {isModalOpen && (
        <CreateGroupModal onCreateGroup={handleCreateGroup} onClose={() => setIsModalOpen(false)} />
      )}
    </>
  );
}

export default App;
