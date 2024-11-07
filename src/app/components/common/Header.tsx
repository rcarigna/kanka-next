import { StyledHeader, StyledLogo } from '../../styles';
export const Header = () => (
  <StyledHeader>
    <StyledLogo
      src='/kanka.svg'
      alt='Kanka logo'
      width={180}
      height={180}
      priority
    />
    <StyledLogo src='/next.svg' alt='Next.js logo' width={180} height={38} />
  </StyledHeader>
);
