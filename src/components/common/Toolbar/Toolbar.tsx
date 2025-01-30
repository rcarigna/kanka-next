import { Toolbar as MuiToolbar, Button } from '@mui/material';
import Link from 'next/link';
import { useKankaContext } from '@/contexts';

export const Toolbar = () => {
  const { entityTypes, selectedCampaign } = useKankaContext();
  if (!entityTypes || !selectedCampaign) {
    return null;
  }
  return (
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
  );
};
