import React, { useState } from 'react';
import styled from 'styled-components';

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ModalContainer = styled.div`
  background-color: #fff;
  padding: 20px 30px;
  border-radius: 10px;
  width: 90%;
  max-width: 740px;
  box-sizing: border-box;

  @media (max-width: 768px) {
    max-width: 284px;
  }
`;

const ModalHeader = styled.h2`
  margin-top: 0;
  font-family: Roboto;
  font-size: 29px;
  font-weight: 500;
  line-height: 46.45px;
  letter-spacing: 0.035em;
  text-align: left;
  color: #000000;
  @media (max-width: 768px) {
    font-family: Roboto;
    font-size: 18.4px;
    font-weight: 500;
    line-height: 29.47px;
    letter-spacing: 0.035em;
    text-align: left;
    color: #000000;
  }

`;

const InputField = styled.input`
  width: 435px;
  padding: 10px;
  margin-bottom: 15px;
  box-sizing: border-box;
  font-size: 16px;
  @media (max-width: 768px) {
    width: 150px;
  }
`;

const LabelField = styled.label`
  font-family: Roboto;
  font-size: 27.31px;
  font-weight: 500;
  line-height: 43.75px;
  letter-spacing: 0.035em;
  text-align: left;
  color: #000000;
  padding-right: 10px;
  @media (max-width: 768px) {
    font-family: Roboto;
    font-size: 14.6px;
    font-weight: 500;
    line-height: 23.39px;
    letter-spacing: 0.035em;
    text-align: left;
    color: #000000;
  }

`;


const ColorOptions = styled.div`
  display: flex;
  gap: 10px;
  margin-bottom: 15px;
  padding-top: 5px;
  flex-wrap: wrap;
`;

const ColorButton = styled.button`
  width: 30px;
  height: 30px;
  background-color: ${({ color }) => color};
  border: ${({ selected }) => (selected ? '3px solid #000' : '1px solid #ccc')};
  border-radius: 50%;
  cursor: pointer;
  @media (max-width: 768px) {
    width: 16.67px;
    height: 16.67px;
  }
`;

const ActionButtons = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 10px;
`;

const CreateButton = styled.button`
  padding: 10px 15px;
  background-color: #001F8B;
  color: #fff;
  border: none;
  cursor: pointer;
  border-radius: 5px;
  width: 154px;
  height: 38px;
  border-radius: 11px;
  opacity: 0px;

  &:disabled {
    background-color: #99cfff;
    cursor: not-allowed;
  }

  &:hover:enabled {
    background-color: #0056b3;
  }
`;

const CancelButton = styled.button`
  padding: 10px 15px;
  background-color: #6c757d;
  width: 154px;
  height: 38px;
  border-radius: 11px;
  color: #fff;
  border: none;
  cursor: pointer;
  border-radius: 5px;

  &:hover {
    background-color: #5a6268;
  }
`;

function CreateGroupModal({ onCreateGroup, onClose }) {
  const [groupName, setGroupName] = useState('');
  const [selectedColor, setSelectedColor] = useState('');

  const availableColors = [
    '#B38BFA',
    '#FF79F2',
    '#43E6FC',
    '#F19576',
    '#0047FF',
    '#6691FF',
    
  ];

  const handleCreate = () => {
    if (groupName.trim() && selectedColor) {
      onCreateGroup({
        name: groupName.trim(),
        color: selectedColor,
      });
      setGroupName('');
      setSelectedColor('');
    }
  };

  return (
    <ModalOverlay>
      <ModalContainer>
        <ModalHeader>Create New Group</ModalHeader>
        <LabelField> Group Name</LabelField>
        <InputField
          type="text"
          placeholder="Group Name"
          value={groupName}
          onChange={(e) => setGroupName(e.target.value)}
        />
        <div style={{ display: 'flex', flexDirection: 'row' }}>
          <LabelField>Choose colour </LabelField>
        <ColorOptions>
          {availableColors.map((color) => (
            <ColorButton
              key={color}
              color={color}
              selected={selectedColor === color}
              onClick={() => setSelectedColor(color)}
              title={color}
            />
          ))}
        </ColorOptions>
        </div>
        <ActionButtons>
          <CancelButton onClick={onClose}>Cancel</CancelButton>
          <CreateButton
            onClick={handleCreate}
            disabled={!groupName.trim() || !selectedColor}
          >
            Create
          </CreateButton>
        </ActionButtons>
      </ModalContainer>
    </ModalOverlay>
  );
}

export default CreateGroupModal;
