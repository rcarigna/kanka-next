import { CampaignHeader } from '../../campaigns/CampaignHeader';
import { StyledHeader, StyledLogo, StyledLogoContainer } from '../styles';
import { Toolbar } from '../Toolbar';
export const Header = () => (
  <StyledHeader>
    <StyledLogoContainer>
      <StyledLogo
        src='/kanka.svg'
        alt='Kanka logo'
        width={180}
        height={180}
        priority
      />
      <StyledLogo src='/next.svg' alt='Next.js logo' width={180} height={38} />
    </StyledLogoContainer>
    <CampaignHeader />
    <Toolbar />
  </StyledHeader>
);
