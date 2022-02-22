import React from "react";
import { observer } from "mobx-react-lite";
import { QueryClient, QueryClientProvider, useQuery } from "react-query";
import AllRegisteredClientsContainer from "./ClientsInitialPage/AllRegisteredClientsTable/AllRegisteredClientsContainer";

const queryClient = new QueryClient();

const ClientsInitialPage = observer(() => {
  return (
    <QueryClientProvider client={queryClient} contextSharing={true}>
      <AllRegisteredClientsContainer />
    </QueryClientProvider>
  );
});

export default ClientsInitialPage;
