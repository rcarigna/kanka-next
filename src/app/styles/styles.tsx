import styled from 'styled-components';
import Image from 'next/image';

export const StyledPage = styled.div`
  --gray-rgb: 0, 0, 0;
  --gray-alpha-200: rgba(var(--gray-rgb), 0.08);
  --gray-alpha-100: rgba(var(--gray-rgb), 0.05);

  --button-primary-hover: #383838;
  --button-secondary-hover: #f2f2f2;

  display: grid;
  grid-template-rows: 20px 1fr 20px;
  align-items: center;
  justify-items: center;
  min-height: 100svh;
  padding: 80px;
  gap: 64px;
  font-family: var(--font-geist-sans);

  a.primary {
    background: var(--foreground);
    color: var(--background);
    gap: 8px;
  }

  a.secondary {
    border-color: var(--gray-alpha-200);
    min-width: 180px;
  }

  @media (max-width: 600px) {
    padding: 32px;
    padding-bottom: 80px;
  }
`;

export const StyledLogo = styled(Image)`
  @media (prefers-color-scheme: dark) {
    filter: invert();
  }
`;

export const StyledMain = styled.main`
  display: flex;
  flex-direction: column;
  gap: 32px;
  grid-row-start: 2;

  ol {
    font-family: var(--font-geist-mono);
    padding-left: 0;
    margin: 0;
    font-size: 14px;
    line-height: 24px;
    letter-spacing: -0.01em;
    list-style-position: inside;
    text-align: center;

    @media (max-width: 600px);
  }

  li:not(:last-of-type) {
    margin-bottom: 8px;
  }

  code {
    font-family: inherit;
    background: var(--gray-alpha-100);
    padding: 2px 4px;
    border-radius: 4px;
    font-weight: 600;
  }
`;

export const StyledHeader = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

export const StyledCTAs = styled.div`
  display: flex;
  flex-direction: column;
  a {
    appearance: none;
    border-radius: 128px;
    padding: 0 20px;
    border: none;
    border: 1px solid transparent;
    transition: background 0.2s, color 0.2s, border-color 0.2s;
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

export const StyledFooter = styled.footer`
  grid-row-start: 3;
  display: flex;
  gap: 24px;

  a {
    display: flex;
    align-items: center;
    gap: 8px;
  }

  img {
    flex-shrink: 0;
  }

  @media (max-width: 600px) {
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
  }
`;
