/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import { useKankaContext } from './contexts/KankaContext';
import { ErrorBoundary } from 'react-error-boundary';
import { Content } from './components/Content';
import {
  StyledPage,
  StyledMain,
  StyledHeader,
  StyledLogo,
  StyledCTAs,
  StyledFooter,
} from './styles';

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
