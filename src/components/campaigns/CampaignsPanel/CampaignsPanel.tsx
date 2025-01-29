import { CampaignType } from '../../../types';
import { CampaignPreview } from './../CampaignPreview';
import { EntityGrid } from '../../entities';

export const CampaignsPanel = ({
  campaigns,
}: {
  campaigns: CampaignType[];
}) => {
  console.log(`in campaigns panel. campaigns: ${JSON.stringify(campaigns)}`);
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
