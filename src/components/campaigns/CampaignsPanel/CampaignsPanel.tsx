import { useKankaContext } from '@/contexts';
import { CampaignPreview } from './../CampaignPreview';
import { EntityGrid } from '../../entities';

export const CampaignsPanel = () => {
  const { campaigns } = useKankaContext();
  if (campaigns === null) {
    return null;
  }
  const campaignPreviews = campaigns?.map((campaign) => (
    <CampaignPreview
      key={`campaign-panel-preview-${campaign.id}`}
      campaign={campaign}
    />
  ));

  return (
    <EntityGrid
      dataTestId='entity-grid-campaigns-panel'
      entities={campaignPreviews}
    />
  );
};
