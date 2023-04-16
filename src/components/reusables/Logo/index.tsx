import React from 'react'
import { LogoBox, LogoContainer, LogoText } from './index.styles';
import { ReactSVG } from 'react-svg';

interface Props {
  textColor: string;
  logoColor: string;
}

const Logo: React.FC<Props> = ({ textColor, logoColor }) => {
  return (
    <LogoContainer id="logo">
      <LogoBox color={logoColor}>
        <ReactSVG src="logo.svg" />
      </LogoBox>
      <LogoText color={textColor}>
        DriveBox
      </LogoText>
    </LogoContainer>
  )
}

export default Logo