import { CampaignType } from '../../contexts';
import { CampaignPreview } from './CampaignPreview';
import { EntityGrid } from '../EntityGrid';

export const CampaignsPanel = ({
  campaigns,
  baseURL,
}: {
  campaigns: CampaignType[];
  baseURL: string;
}) => {
  const campaignPreviews = campaigns?.map((campaign) => (
    <CampaignPreview
      key={`campaign-panel-preview-${campaign.id}`}
      campaign={campaign}
      baseURL={baseURL}
    />
  ));

  return (
    <EntityGrid
      dataTestId='entity-grid-campaigns-panel'
      entities={campaignPreviews}
    />
  );
};
