'use client';
import { CampaignSelect, CampaignSelected } from '../campaigns';
import { Card } from '@mui/material';
import { StyledCTAs } from '../../app/styles/styles';
import { useKankaContext } from '../../contexts';
import { ConnectionWrapper } from '../ConnectionWrapper/ConnectionWrapper';

const InnerContent = () => {
  const { selectedCampaign } = useKankaContext();

  return (
    <Card
      style={{
        padding: '1rem',
        // width: '80%',
        minWidth: '600px',
        alignSelf: 'center',
      }}
    >
      {selectedCampaign ? <CampaignSelected /> : <CampaignSelect />}
    </Card>
  );
};

export const Content = () => (
  <StyledCTAs>
    <ConnectionWrapper>
      <InnerContent />
    </ConnectionWrapper>
  </StyledCTAs>
);
