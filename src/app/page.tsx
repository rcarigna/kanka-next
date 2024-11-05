'use client';
import { Content, Header, Footer } from './components';
import { StyledPage, StyledMain } from './styles';
import { ErrorBoundary } from 'react-error-boundary';

const Home: React.FC = () => {
  return (
    <StyledPage>
      <StyledMain>
        <Header />
        <ErrorBoundary fallback={<div>something went wrong</div>}>
          <Content />
        </ErrorBoundary>
      </StyledMain>
      <Footer />
    </StyledPage>
  );
};
export default Home;
