import { clientService } from "./../data-services/index";
import { action, makeAutoObservable } from "mobx";
import ClientsService from "../data-services/ClientsService";
import { Client } from "../dtos/authDTO/authentication-result.dto";

class ClientsStore {
  registeredClients: Client[] | null = null;
  selectedClientName: string | null;
  clientId: string | null = null;

  constructor(private readonly clientsService: ClientsService) {
    makeAutoObservable(this);
    this.clientId = localStorage.getItem("clientId");
    this.selectedClientName = localStorage.getItem("selected_client_name");
  }

  @action
  public getAllRegisteredClients = async (name: string | null = null) => {
    try {
      const response = this.clientsService.getAllRegisteredClients(
        0,
        0,
        true,
        name
      );
      this.registeredClients = (await response).data.data.list;
      return response;
    } catch (error) {
      console.log("error: ", error);
    }
  };

  @action
  public getCurrentClientAccount = async () => {
    try {
      const response = this.clientsService.getCurrentClientAccountMinified();
      return response;
    } catch (error) {
      console.log("error: ", error);
    }
  };

  @action
  public setSelectedClientId = (id: string) => {
    if (id) {
      localStorage.setItem("clientId", id);
      this.clientId = id;
    }
  };

  
  @action
  public setSelectedClientName = (name: string | null) => {
    if (name) {
      localStorage.setItem("selected_client_name", name);
      this.selectedClientName = name;
    }
  };

  @action
  public removeSelectedClientId = (): void => {
    localStorage.removeItem("clientId");
    this.clientId = null;
  };

  @action
  public removeSelectedClientName = (): void => {
    localStorage.removeItem("selected_client_name");
    this.selectedClientName = null;
  };
}

const clientsStore = new ClientsStore(clientService);
export default clientsStore;
