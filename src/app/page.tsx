/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import Image from 'next/image';
import styled from 'styled-components';
import { useKankaContext } from './contexts/KankaContext';
import { ErrorBoundary } from 'react-error-boundary';
import { Content } from './components/Content';

// Styled Components
const StyledPage = styled.div`
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

const StyledLogo = styled(Image)`
  @media (prefers-color-scheme: dark) {
    filter: invert();
  }
`;

const StyledMain = styled.main`
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

const StyledHeader = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const StyledCTAs = styled.div`
  display: flex;
  flex-direction: column;
  a {
    appearance: none;
    border-radius: 128px;
    height: 48px;
    padding: 0 20px;
    border: none;
    border: 1px solid transparent;
    transition: background 0.2s, color 0.2s, border-color 0.2s;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 16px;
    line-height: 20px;
    font-weight: 500;
    @media (max-width: 600px) {
      font-size: 14px;
      height: 40px;
      padding: 0 16px;
    }
  }
`;

const StyledFooter = styled.footer`
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

const Home: React.FC = () => {
  const { status, error } = useKankaContext();

  return (
    <StyledPage>
      <StyledMain>
        <StyledHeader>
          <StyledLogo
            src='/kanka.svg'
            alt='Kanka logo'
            width={180}
            height={180}
            priority
          />
          <StyledLogo
            src='/next.svg'
            alt='Next.js logo'
            width={180}
            height={38}
          />
        </StyledHeader>

        <StyledCTAs>
          <ErrorBoundary fallback={<div>something went wrong</div>}>
            <Content status={status} error={error} />
          </ErrorBoundary>
        </StyledCTAs>
      </StyledMain>

      <StyledFooter>
        <a href='https://kanka.io/' target='_blank' rel='noopener noreferrer'>
          <StyledLogo
            src='/kanka.svg'
            alt='Kanka icon'
            width={16}
            height={16}
          />
          Go to kanka.io →
        </a>
        <a
          href='https://nextjs.org?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app'
          target='_blank'
          rel='noopener noreferrer'
        >
          <StyledLogo
            aria-hidden
            src='/globe.svg'
            alt='Globe icon'
            width={16}
            height={16}
          />
          Go to nextjs.org →
        </a>
      </StyledFooter>
    </StyledPage>
  );
};

export default Home;
