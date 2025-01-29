'use client';
import { useParams } from 'next/navigation';
import { PageWrapper } from '../../components';
import { EntityPanel } from '../../components/entities';
import { useMemo } from 'react';
import { Typography } from '@mui/material';

const Entity: React.FC = () => {
  const params = useParams();

  const entityType = useMemo(() => {
    return params['entity-type'];
  }, [params]);

  console.log('entityType', entityType);
  return (
    <PageWrapper>
      {entityType ? (
        <EntityPanel entityType={entityType as string} />
      ) : (
        <Typography>No entity-type found</Typography>
      )}
    </PageWrapper>
  );
};
export default Entity;
