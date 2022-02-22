import React from "react";
import { formStyles } from "./formStyles.styles";
import { NavLink } from "react-router-dom";

type RedirectComponentPropsType = {
  actionTitle: string;
  linkTo: string;
};

const RedirectComponent: React.FC<RedirectComponentPropsType> = ({
  actionTitle, linkTo
}) => {
  return (
    <NavLink to={linkTo} style={formStyles.createAccountStyle}>
      {actionTitle}
    </NavLink>
  );
};

export default RedirectComponent;
