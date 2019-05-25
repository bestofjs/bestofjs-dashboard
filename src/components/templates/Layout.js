import React from "react";
import { styled } from "baseui";
import Header from "../organisms/Header";

const Container = styled("div", {
  margin: "0 1.5rem"
  // maxWidth: "1200px",
  // padding: "0 1rem"
});

const Layout = ({ children }) => {
  return (
    <div>
      <Header />
      <Container>{children}</Container>
    </div>
  );
};

export default Layout;
