'use client';
import { PageWrapper } from '../../../../components';
import { EntityPanel } from '../../../../components/entities';
import { Typography } from '@mui/material';
import { useKankaContext } from '@/contexts';

const EntityContent: React.FC = () => {
  const { selectedEntityType: entityType } = useKankaContext();
  console.log('entityType', entityType);

  return entityType ? (
    <EntityPanel
      data-testID='entities-panel'
      entityType={entityType as string}
    />
  ) : (
    <Typography>No entity-type found</Typography>
  );
};

const Entity: React.FC = () => {
  return (
    <PageWrapper>
      <EntityContent />
    </PageWrapper>
  );
};

export default Entity;
