import React from 'react';
import styled from 'styled-components';

const HeaderContainer = styled.div`
  position: sticky;
  top: 10px;
  z-index: 1;
  font-family: Roboto;
    font-size: 35px;
    font-weight: 500;
    line-height: 41.02px;
    letter-spacing: 0.02em;
    text-align: center;
    color: #000000;
    margin-bottom : 10px;
`;

function Header() {
  return <HeaderContainer>Pocket Notes</HeaderContainer>;
}

export default Header;
