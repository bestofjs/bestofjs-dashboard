import React from "react";
import { Block } from "baseui/block";

export const PageTitle = ({ children }) => (
  <Block
    font={"font800"}
    color={"#555555"}
    marginTop={"scale600"}
    marginBottom={"scale600"}
  >
    {children}
  </Block>
);
export const SectionTitle = ({ children }) => (
  <Block
    font={"font500"}
    color={"#555555"}
    marginTop={"scale500"}
    marginBottom={"scale500"}
  >
    {children}
  </Block>
);
