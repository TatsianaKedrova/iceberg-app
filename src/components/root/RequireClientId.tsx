import { observer } from "mobx-react-lite";
import React, { ReactElement } from "react";
import { Navigate } from "react-router-dom";
import clientsStore from "../../bll/clients.store";

const RequireClientId = observer(
  ({ children }: { children: JSX.Element }): ReactElement => {
    const { clientId } = clientsStore;

    
    if (!clientId) {
      return <Navigate to="/clients" replace />;
    }

    return children;
  }
);

export default RequireClientId;
