import { StyledFooter, StyledLogo } from './styles';

export const Footer = () => (
  <StyledFooter>
    <a href='https://kanka.io/' target='_blank' rel='noopener noreferrer'>
      <StyledLogo src='/kanka.svg' alt='Kanka icon' width={16} height={16} />
      Go to kanka.io →
    </a>
    <a
      href='https://nextjs.org?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app'
      target='_blank'
      rel='noopener noreferrer'
    >
      <StyledLogo
        aria-hidden
        src='/globe.svg'
        alt='Globe icon'
        width={16}
        height={16}
      />
      Go to nextjs.org →
    </a>
  </StyledFooter>
);
