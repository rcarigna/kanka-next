'use client';
import { useRouter } from 'next/router';
import {
  PageWrapper,
  EntityInstance as EntityInstancePanel,
} from '../../../../components';
import { Box } from '@mui/material';

const EntityInstance: React.FC = () => {
  const router = useRouter();
  const { entityType, id } = router.query;

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
