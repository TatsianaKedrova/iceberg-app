import React from "react";
import { Navigate } from "react-router-dom";

function NotFound() {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        marginTop: "15%",
      }}
    >
      <Navigate to="/404" />
      404 ERROR: PAGE NOT FOUND
    </div>
  );
}

export default NotFound;
