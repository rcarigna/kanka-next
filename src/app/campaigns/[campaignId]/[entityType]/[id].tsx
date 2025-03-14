'use client';
import { useKankaContext } from '@/contexts';
import {
  PageWrapper,
  EntityInstance as EntityInstancePanel,
} from '../../../../components';
import { Box } from '@mui/material';

const EntityInstance: React.FC = () => {
  const { selectedEntityId: id, selectedEntityType: entityType } =
    useKankaContext();

  return (
    <PageWrapper>
      <Box data-testid='entity-instance'>
        <EntityInstancePanel
          entityType={entityType as string}
          id={Number(id as string)}
        />
      </Box>
    </PageWrapper>
  );
};
export default EntityInstance;
