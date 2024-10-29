// src/components/Dropdown.tsx
import React from 'react';
import { useKankaContext } from '../contexts/KankaContext';
import { Select, MenuItem, FormControl, InputLabel } from '@mui/material';

// Custom styled MUI Select component
// const StyledSelect = styled(Select)({
//   minWidth: 200,
//   backgroundColor: '#f5f5f5',
//   '& .MuiSelect-select': {
//     padding: '10px',
//   },
// });

const Dropdown: React.FC = () => {
  const { data } = useKankaContext();
  console.log(`data in dropdown: ${JSON.stringify(data)}`);

  return (
    <FormControl>
      <InputLabel id='campaign-select-label'>
        Select your campaign to begin
      </InputLabel>
      <Select
        labelId='campaign-select-label'
        label='Select your campaign to begin'
      >
        {data?.length > 0 ? (
          data.map((item) => (
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

export default Dropdown;
