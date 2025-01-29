'use client';
import { PageWrapper } from '../../components';
import { CampaignsPanel } from '../../components/campaigns';
import { useKankaContext } from '../../contexts';

const InnerCampaigns: React.FC = () => {
  const { campaigns } = useKankaContext();
  if (campaigns === null) {
    return null;
  }
  return <CampaignsPanel campaigns={campaigns} />;
};

const Campaigns: React.FC = () => {
  return (
    <PageWrapper>
      <InnerCampaigns />
    </PageWrapper>
  );
};
export default Campaigns;
