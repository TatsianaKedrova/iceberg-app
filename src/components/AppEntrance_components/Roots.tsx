import React, { FC, Suspense } from "react";
import { Route, Routes, Navigate, Outlet } from "react-router-dom";
import RegistrationPage from "../RegistrationForm/RegistrationPage";
import NotFound from "./NotFound";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import PasswordRestorationWithEmail from "../LoginForm/PasswordRestoration/PasswordRestorationWithEmail";
import ClientsInitialPage from "../ClientsContainer/ClientsInitialPage/container/ClientsInitialPage";
import ProfilePage from "../Profile/ProfilePage";
import NewPassword from "../LoginForm/PasswordRestoration/NewPassword";
import AuthorizedArea from "./AuthCheck/AuthorizedArea";
import RequireAuth from "./AuthCheck/RequireAuth";
import RequireClientId from "./AuthCheck/RequireClientId";
import ClientPageLayout from "./ClientPageLayout";
import DashBoard from "../Dashboard/DashBoard";

const LoginPage = React.lazy(() => import("../LoginForm/LoginPage"));

export const Roots: FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" replace />} />
      <Route
        path="/login"
        element={
          <Suspense
            fallback={
              <Box sx={{ display: "flex" }}>
                <CircularProgress />
              </Box>
            }
          >
            <LoginPage />
          </Suspense>
        }
      />
      <Route path="/register" element={<RegistrationPage />} />
      <Route
        path="/restore-password"
        element={<PasswordRestorationWithEmail />}
      />

      <Route
        element={
          <RequireAuth>
            <AuthorizedArea />
          </RequireAuth>
        }
      >
        <Route element={<ClientPageLayout />}>
          <Route path="/clients" element={<ClientsInitialPage />} />
          <Route
            element={
              <RequireClientId>
                <Outlet />
              </RequireClientId>
            }
          >
            <Route path="/dashboard" element={<DashBoard />} />
          </Route>
          <Route path="/profile" element={<ProfilePage />} />
        </Route>
        {/* <Route element={<NoClientId><Outlet /></NoClientId>}> */}

        {/* </Route> */}
      </Route>
      <Route path="/password-restoration" element={<NewPassword />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default Roots;
