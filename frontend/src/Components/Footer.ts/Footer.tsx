import React from "react";
import styled from "styled-components";
import Wrapper from "../Wrapper";

const footerLinks = [
  "About Us",
  "Support",
  "Press",
  "API",
  "Jobs",
  "Privacy",
  "Terms",
  "Directory",
  "Profiles",
  "Hashtags",
  "Language"
];

const Container = styled.footer`
  margin-bottom: 50px;
  font-weight: 600;
  font-size: 12px;
  text-transform: uppercase;
`;

const SWrapper = styled(Wrapper)`
  display: flex;
  justify-content: space-between;
`;

const List = styled.ul`
  display: flex;
`;

const ListItem = styled.li`
  color: ${props => props.theme.darkBlueColor};
  &:not(:last-child) {
    margin-right: 15px;
  }
`;

const Copyright = styled.span`
  color: ${props => props.theme.greyColor};
`;

const Footer: React.SFC<any> = () => (
  <Container>
    <SWrapper>
      <List>
        {footerLinks.map(link => (
          <ListItem>{link}</ListItem>
        ))}
      </List>
      <Copyright>&copy; {new Date().getFullYear()} Pinner</Copyright>
    </SWrapper>
  </Container>
);

export default Footer;
