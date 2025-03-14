'use client';
import { useKankaContext } from '@/contexts';
import {
  PageWrapper,
  EntityInstance as EntityInstancePanel,
} from '../../../../../components';
import { Box } from '@mui/material';

const Content: React.FC = () => {
  const { selectedEntityId: id, selectedEntityType: entityType } =
    useKankaContext();

  return (
    <Box data-testid='entity-instance'>
      <EntityInstancePanel
        entityType={entityType as string}
        id={Number(id as string)}
      />
    </Box>
  );
};

const EntityInstance: React.FC = () => (
  <PageWrapper>
    <Content />
  </PageWrapper>
);

export default EntityInstance;
