'use client';
import { PageWrapper, CampaignSelect } from '../components';
import { ErrorBoundary } from 'react-error-boundary';

const Home: React.FC = () => {
  return (
    <PageWrapper>
      <ErrorBoundary fallback={<div>something went wrong</div>}>
        <CampaignSelect />
      </ErrorBoundary>
    </PageWrapper>
  );
};
export default Home;
