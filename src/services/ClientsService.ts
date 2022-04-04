import {
  ClientListWithTotals,
  GuidStringKeyValuePair,
  MinifiedListItemListWithTotals,
} from "../dtos/clientsDTO/clients.dto";
import { AxiosInstance, AxiosResponse } from "axios";
import { APIResponse } from "../dtos/authDTO/authentication-result.dto";

class ClientsService {
  constructor(private readonly httpClient: AxiosInstance) {}

  public async clientsToJoin(): Promise<
    AxiosResponse<APIResponse<GuidStringKeyValuePair>>
  > {
    return this.httpClient.get<APIResponse<GuidStringKeyValuePair>>(
      "clients/clients-to-join"
    );
  }

  public async getAllRegisteredClients(
    pageSize: number,
    page: number,
    withTrashed: boolean,
    name: string | null = null
  ): Promise<AxiosResponse<APIResponse<ClientListWithTotals>>> {
    return this.httpClient.get<APIResponse<ClientListWithTotals>>(`clients`, {
      params: {
        pageSize,
        page,
        withTrashed,
        name,
      },
    });
  }

  public async getCurrentClientAccountMinified(): Promise<
    AxiosResponse<APIResponse<MinifiedListItemListWithTotals>>
  > {
    return this.httpClient.get<APIResponse<MinifiedListItemListWithTotals>>(
      "cloud-accounts/current-client-accounts-minified"
    );
  }
}

export default ClientsService;
