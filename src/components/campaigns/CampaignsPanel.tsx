import { CampaignType } from '../../types';
import { CampaignPreview } from './CampaignPreview';
import { EntityGrid } from '../entities/EntityGrid/EntityGrid';

export const CampaignsPanel = ({
  campaigns,
}: {
  campaigns: CampaignType[];
}) => {
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
