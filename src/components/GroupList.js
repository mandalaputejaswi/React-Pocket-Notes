import React from 'react';
import styled from 'styled-components';

const GroupListContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  height: 70vh;
  width: 100%;
  top: 117px;
  gap: 0px;
  opacity: 0px;
`;

const GroupItemWrapper = styled.div`
  display: flex;
  align-items: center;
  background-color: ${({ isSelected }) => (isSelected ? '#2F2F2F2B' : '#FFFFFF')}; /* Background for the whole div */
  border-radius: 5px;
  cursor: pointer;
  height: 98px;
  @media (max-width: 768px ) {
    height: 66.01px;
    background-color: ${({ isSelected }) => (isSelected ? '#FFFFFF' : '#FFFFFF')};
    margin-bottom: 5px;
  }
`;

const GroupItem = styled.div`
  padding: 10px;
  background-color: transparent;
  color: '#000000';
  border-radius: 5px;
  cursor: pointer;
  text-align: center;
  font-family: Roboto;
  font-size: 24px;
  font-weight: 500;
  line-height: 28.13px;
  letter-spacing: 0.02em;
  text-align: left;
  @media (max-width: 768px ) {
    font-size: 18.6px;
    line-height: 21.8px;
  }

  &:hover {
    opacity: 0.8;
  }
  &:hover:enabled {
    background-color: #0000000;
  }
`;

function GroupList({ groups, onGroupClick,  selectedGroup }) {
  const getInitials = (name) => {
    const words = name.trim().split(' ');
    if (words.length === 1) {
      return words[0][0].toUpperCase(); // If only one word, take the first letter
    }
    return words[0][0].toUpperCase() + words[1][0].toUpperCase(); // For multiple words, take the first letter of the first two words
  };

  
  return (
    <GroupListContainer>
      {groups.map((group, index) => (
        <><GroupItemWrapper
          isSelected={selectedGroup === group.name}
          onClick={() => onGroupClick(group)}>
          {/* Logo Circle */}
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
        </div><GroupItem
          key={index}
          color={group.color}
          isSelected={selectedGroup === group.name} 
        >
            {group.name}
          </GroupItem>
        </GroupItemWrapper></>
      ))}
    </GroupListContainer>
  );
}

export default GroupList;
