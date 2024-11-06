'use client';
import { ReactNode } from 'react';
import { Header, Footer } from '../components';
import { StyledPage, StyledMain } from '../styles';
import { ErrorBoundary } from 'react-error-boundary';

export const PageWrapper = ({ children }: { children: ReactNode }) => {
  return (
    <StyledPage>
      <StyledMain>
        <Header />
        <ErrorBoundary fallback={<div>something went wrong</div>}>
          {children}
        </ErrorBoundary>
      </StyledMain>
      <Footer />
    </StyledPage>
  );
};
