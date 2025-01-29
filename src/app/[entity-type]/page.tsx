'use client';
import { useParams } from 'next/navigation';
import { PageWrapper } from '../../components';
import { EntityPanel } from '../../components/entities';
import { useMemo } from 'react';

const Entity: React.FC = () => {
  const params = useParams();

  const entityType = useMemo(() => {
    return params['entity-type'];
  }, [params]);

  if (!entityType) {
    return <div>Loading...</div>;
  }

  return (
    <PageWrapper>
      <EntityPanel entityType={entityType as string} />
    </PageWrapper>
  );
};
export default Entity;
