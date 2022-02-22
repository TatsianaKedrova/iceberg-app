import React from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import DashboardContainerPage from "./DashboardContainerPage";

const queryClient = new QueryClient();

const DashBoard = () => {
  return (
    <QueryClientProvider client={queryClient} contextSharing={true}>
      <DashboardContainerPage />
    </QueryClientProvider>
  );
};

export default DashBoard;
