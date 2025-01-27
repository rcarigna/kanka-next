'use client';
import { useRouter } from 'next/router';
import {
  PageWrapper,
  EntityInstance as EntityInstancePanel,
} from '../../components';

const EntityInstance: React.FC = () => {
  const router = useRouter();
  const { entityType, id } = router.query;

  return (
    <PageWrapper>
      <EntityInstancePanel
        entityType={entityType as string}
        id={Number(id as string)}
      />
    </PageWrapper>
  );
};
export default EntityInstance;
