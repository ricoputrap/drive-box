import styled from "@emotion/styled";

export const LogoContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

interface LogoBoxProps {
  color: string;
}

export const LogoBox = styled.div<LogoBoxProps>`
  width: 32px;
  height: 32px;

  & svg {
    width: 100%;
    height: 100%;
  }

  & svg path {
    fill: ${({ color }) => color};
  }
`;

interface LogoTextProps {
  color: string;
}

export const LogoText = styled.p<LogoTextProps>`
  font-size: 24px;
  font-weight: 900;
  color: ${({ color }) => color};
`;