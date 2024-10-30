import React, { useMemo } from 'react';
import { useKankaContext } from '../contexts/KankaContext';
import { Select, MenuItem, FormControl, InputLabel } from '@mui/material';

const CampaignDropdown: React.FC = () => {
  // const { useFetchCampaignsQuery } = useKankaContext();
  // const { data, loading } = useFetchCampaignsQuery();

  const { data } = useKankaContext();

  const campaigns = useMemo(() => (data ? data.data : []), [data]);
  console.log(`data in dropdown: ${JSON.stringify(data)}`);
  console.log(`campaigns in dropdown: ${JSON.stringify(campaigns)}`);
  return (
    <FormControl>
      <InputLabel id='campaign-select-label'>
        Select your campaign to begin
      </InputLabel>
      <Select
        labelId='campaign-select-label'
        label='Select your campaign to begin'
      >
        {campaigns?.length > 0 ? (
          campaigns.map((item) => (
            <MenuItem key={item.id} value={item.id}>
              {item.name}
            </MenuItem>
          ))
        ) : (
          <MenuItem key='no-campaigns' value={-1}>
            No campaigns available
          </MenuItem>
        )}
      </Select>
    </FormControl>
  );
};

export default CampaignDropdown;
