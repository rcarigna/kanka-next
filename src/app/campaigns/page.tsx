'use client';
import { PageWrapper } from '../components';
import { CampaignsPanel } from '../components/CampaignsPanel';
import { useKankaContext } from '../contexts';
const Campaigns: React.FC = () => {
  const { campaigns } = useKankaContext();
  return (
    <PageWrapper>
      <CampaignsPanel campaigns={campaigns || []}></CampaignsPanel>
    </PageWrapper>
  );
};
export default Campaigns;
