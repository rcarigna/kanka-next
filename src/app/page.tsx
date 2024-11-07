'use client';
import { PageWrapper, Content } from './components';
import { ErrorBoundary } from 'react-error-boundary';

const Home: React.FC = () => {
  return (
    <PageWrapper>
      <ErrorBoundary fallback={<div>something went wrong</div>}>
        <Content />
      </ErrorBoundary>
    </PageWrapper>
  );
};
export default Home;
