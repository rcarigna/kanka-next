import styled from 'styled-components';

export const StyledCTAs = styled.div`
  display: flex;
  flex-direction: column;
  a {
    appearance: none;
    border-radius: 128px;
    border: none;
    border: 1px solid transparent;
    transition:
      background 0.2s,
      color 0.2s,
      border-color 0.2s;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    line-height: 20px;
    font-weight: 500;
    @media (max-width: 600px) {
      font-size: 14px;
      height: 40px;
      padding: 0 16px;
    }
  }
`;

export const StyledKeyFooter = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  margin-top: 4px;
  gap: 4px;
`;
export const StyledHelperLink = styled.div`
  display: flex;
  align-content: start;
  flex-direction: row;
  font-size: 10px;
`;
