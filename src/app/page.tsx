/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import Image from 'next/image';
import styles from './styles/page.module.css';
import { useKankaContext } from './contexts/KankaContext';
import { ErrorBoundary } from 'react-error-boundary';
import { Content } from './components/Content';

const Home: React.FC = () => {
  const { status, error } = useKankaContext();

  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <div className={styles.header}>
          <Image
            className={styles.logo}
            src='/kanka.svg'
            alt='Kanka logo'
            width={180}
            height={180}
            priority
          />
          <Image
            className={styles.logo}
            src='/next.svg'
            alt='Next.js logo'
            width={180}
            height={38}
          />
        </div>

        <div className={styles.ctas}>
          <ErrorBoundary fallback={<div>something went wrong</div>}>
            <Content status={status} error={error} />
          </ErrorBoundary>
        </div>
      </main>

      <footer className={styles.footer}>
        <a href='https://kanka.io/' target='_blank' rel='noopener noreferrer'>
          <Image
            aria-hidden
            src='/kanka.svg'
            alt='Kanka icon'
            width={16}
            height={16}
          />
          Go to kanka.io →
        </a>
        <a
          href='https://nextjs.org?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app'
          target='_blank'
          rel='noopener noreferrer'
        >
          <Image
            aria-hidden
            src='/globe.svg'
            alt='Globe icon'
            width={16}
            height={16}
          />
          Go to nextjs.org →
        </a>
      </footer>
    </div>
  );
};

export default Home;
