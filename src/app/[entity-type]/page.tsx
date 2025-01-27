'use client';
import { useRouter } from 'next/router';
import { PageWrapper } from '../../components';
import { EntityPanel } from '../../components/entities';

const Entity: React.FC = () => {
  const router = useRouter();
  const { entityType } = router.query;
  return (
    <PageWrapper>
      <EntityPanel entityType={entityType as string} />
    </PageWrapper>
  );
};
export default Entity;
