'use client';
import { PageWrapper } from '../../components';
import { CampaignsPanel } from '../../components/campaigns';
import { useKankaContext } from '../../contexts';
const Campaigns: React.FC = () => {
  const {
    campaigns,
    connection: {
      connection: { baseUrl: baseURL },
    },
  } = useKankaContext();
  return (
    <PageWrapper>
      <CampaignsPanel campaigns={campaigns || []} baseURL={baseURL} />
    </PageWrapper>
  );
};
export default Campaigns;
