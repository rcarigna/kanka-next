import { Toolbar as MuiToolbar, Button } from '@mui/material';
import Link from 'next/link';
import { useKankaContext } from '@/contexts';

const Breadcrumbs = () => {
  return null;
};
const CampaignDropdown = () => {
  return null;
};

export const Toolbar = () => {
  const { entityTypes, selectedCampaign } = useKankaContext();
  if (!entityTypes || !selectedCampaign) {
    return null;
  }
  return (
    <>
      {/* Persistent Navigation - Breadcrumbs & Campaign Selection */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          padding: '1rem',
        }}
      >
        <Breadcrumbs />
        <CampaignDropdown />
      </div>
      <MuiToolbar>
        {entityTypes.map((entityType) => (
          <Link
            data-testid={`toolbar-link-entity-${entityType.id}`}
            key={entityType.id}
            href={entityType.path || '#'}
            passHref
          >
            <Button>{entityType.code}</Button>
          </Link>
        ))}
      </MuiToolbar>
    </>
  );
};
