'use client';
import { ReactNode } from 'react';
import { Header } from '../Header/Header';
import { Footer } from '../Footer';
import { StyledPage, StyledMain } from '../styles';
import { ErrorBoundary } from 'react-error-boundary';
import { KankaDataProvider } from '../../../contexts';

export const PageWrapper = ({ children }: { children: ReactNode }) => {
  return (
    <KankaDataProvider>
      <StyledPage>
        <StyledMain>
          <Header />
          <ErrorBoundary fallback={<div>something went wrong</div>}>
            {children}
          </ErrorBoundary>
        </StyledMain>
        <Footer />
      </StyledPage>
    </KankaDataProvider>
  );
};
