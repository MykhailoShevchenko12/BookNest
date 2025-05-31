import React from "react";

import { Navbar } from "./Navbar/Navbar";

export const Layout = ({ children }) => {
  return (
    <React.Fragment>
      <Navbar />
      {children}
    </React.Fragment>
  );
};
