import { action, makeAutoObservable } from "mobx";
import { cloudAccountsService } from "../services";
import CloudAccountsService from "../services/CloudAccountsService";
import {
  DashboardCostSummaryAndForecast,
  DashboardEstimatedCostSavings,
} from "../dtos/clientsDTO/clients.dto";

class DashboardStore {
  lastRulesExecutionDate: Date;
  costSummaryAndForecast: DashboardCostSummaryAndForecast;
  costSavings: DashboardEstimatedCostSavings;

  constructor(private readonly cloudAccountService: CloudAccountsService) {
    makeAutoObservable(this);
  }

  @action
  public getLastRulesExecutionDate = async () => {
    try {
      const response = this.cloudAccountService.getLastRulesExecutionDate();
      this.lastRulesExecutionDate = (await response).data.data;
      return (await response).data.data;
    } catch (error) {
      console.log("Error: ", error);
    }
  };

  @action
  public getCostSummaryAndForecast = async () => {
    try {
      const response = this.cloudAccountService.getCostSummary();
      this.costSummaryAndForecast = (await response).data.data;
      return response;
    } catch (error) {
      console.log("Error: ", error);
    }
  };

  @action
  public getCostSavings = async () => {
    try {
      const response = this.cloudAccountService.getCostSavings();
      this.costSavings = (await response).data.data;
      return response;
    } catch (error) {
      console.log("Error: ", error);
    }
  };
}

const dashboardStore = new DashboardStore(cloudAccountsService);
export default dashboardStore;
