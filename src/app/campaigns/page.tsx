'use client';
import { PageWrapper } from '../../components';
import { CampaignsPanel } from '../../components/campaigns';
import { useKankaContext } from '../../contexts';
const Campaigns: React.FC = () => {
  const { campaigns } = useKankaContext();
  return (
    <PageWrapper>
      <CampaignsPanel campaigns={campaigns || []} />
    </PageWrapper>
  );
};
export default Campaigns;
