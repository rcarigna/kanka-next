'use client';
import { ReactNode } from 'react';
import { Header } from '../Header/Header';
import { Footer } from '../Footer';
import { StyledPage, StyledMain } from '../styles';
import { ErrorBoundary } from 'react-error-boundary';
import { KankaDataProvider, RouterProvider } from '../../../contexts';
import { ConnectionWrapper } from '@/components';
import { StyledCTAs } from '@/app/styles/styles';

export const PageWrapper = ({ children }: { children: ReactNode }) => {
  return (
    <RouterProvider>
      <KankaDataProvider>
        <StyledPage>
          <StyledMain>
            <Header />
            <ErrorBoundary fallback={<div>something went wrong</div>}>
              <StyledCTAs>
                <ConnectionWrapper>{children}</ConnectionWrapper>
              </StyledCTAs>
            </ErrorBoundary>
          </StyledMain>
          <Footer />
        </StyledPage>
      </KankaDataProvider>
    </RouterProvider>
  );
};
