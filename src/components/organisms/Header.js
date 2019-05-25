import React from "react";
import { Link as BaseLink } from "react-router-dom";
import { styled } from "baseui";
import {
  HeaderNavigation,
  ALIGN,
  StyledNavigationItem as NavigationItem,
  StyledNavigationList as NavigationList
} from "baseui/header-navigation";
import { StyledAppLogo } from "../atoms/AppLogo";

const Link = styled(BaseLink, ({ $theme }) => {
  return {
    color: $theme.colors.primary,
    textDecoration: "none",
    ":hover": {
      color: $theme.colors.primary600
    }
  };
});

const Header = props => {
  return (
    <HeaderNavigation style={{ backgroundColor: "white" }}>
      <NavigationList align={ALIGN.left}>
        <NavigationItem>
          <Link to={"/"} className="logo">
            <StyledAppLogo
              width={160}
              style={{ transform: `translateY(5px)` }}
            />
          </Link>
        </NavigationItem>
      </NavigationList>

      <NavigationList align={ALIGN.left} style={{ marginRight: "1.5rem" }}>
        <NavigationItem>
          <Link to={"/"}>Home</Link>
        </NavigationItem>
        <NavigationItem>
          <Link to={"projects"} className="button">
            Projects
          </Link>
        </NavigationItem>
        <NavigationItem>
          <Link to={"status"} className="button">
            Status
          </Link>
        </NavigationItem>
      </NavigationList>
    </HeaderNavigation>
  );
};

// Header.propTypes = {}

export default Header;
