import { observer } from "mobx-react-lite";
import React, { ReactElement } from "react";
import { Navigate } from "react-router-dom";
import authStore from "../../../mobX/auth.store";

const RequireAuth = observer(
  ({ children }: { children: JSX.Element }): ReactElement => {
    const { isAuth } = authStore;


    if (!isAuth) {
      return <Navigate to="/login" replace />;
    }

    return children;
  }
);

export default RequireAuth;
