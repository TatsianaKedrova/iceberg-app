import {
  CostOpportunityTableRow,
  DashboardCostAndUsageTrendPeriodicRow,
  DashboardCostSummaryAndForecast,
  DashboardDailyChecksAndResourcesCount,
  DashboardDailyRulesByResourcesSummary,
  DashboardEstimatedCostSavings,
} from "./../dtos/clientsDTO/clients.dto";
import { APIResponse } from "./../dtos/authDTO/authentication-result.dto";
import { AxiosInstance, AxiosResponse } from "axios";

class CloudAccountsService {
  constructor(private readonly httpClient: AxiosInstance) {}

  public async getLastRulesExecutionDate(): Promise<
    AxiosResponse<APIResponse<Date>>
  > {
    return this.httpClient.get<APIResponse<Date>>(
      "dashboard/last-rules-execution-date"
    );
  }

  public async getCostSummary(): Promise<
    AxiosResponse<APIResponse<DashboardCostSummaryAndForecast>>
  > {
    return this.httpClient.get<APIResponse<DashboardCostSummaryAndForecast>>(
      "dashboard/cost-summary"
    );
  }

  public async getCostSavings(): Promise<
    AxiosResponse<APIResponse<DashboardEstimatedCostSavings>>
  > {
    return this.httpClient.get<APIResponse<DashboardEstimatedCostSavings>>(
      "dashboard/cost-savings"
    );
  }

  public async getIsForcastingAvailable(
    periodFrom: Date,
    periodTo: Date
  ): Promise<AxiosResponse<APIResponse<boolean>>> {
    return this.httpClient.get<APIResponse<boolean>>(
      `dashboard/is-forecasting-available?periodFrom=${periodFrom}&periodTo=${periodTo}`
    );
  }

  public async getCostOpportunities(): Promise<
    AxiosResponse<APIResponse<CostOpportunityTableRow[] | null>>
  > {
    return this.httpClient.get<APIResponse<CostOpportunityTableRow[] | null>>(
      "dashboard/cost-opportunities"
    );
  }
  public async getDailyRulesSummaryByResources(): Promise<
    AxiosResponse<APIResponse<DashboardDailyRulesByResourcesSummary>>
  > {
    return this.httpClient.get<
      APIResponse<DashboardDailyRulesByResourcesSummary>
    >("dashboard/daily-rules-summary-by-resources");
  }

  public async getDailyChecksAndResourcesCount(): Promise<
    AxiosResponse<APIResponse<DashboardDailyChecksAndResourcesCount>>
  > {
    return this.httpClient.get<
      APIResponse<DashboardDailyChecksAndResourcesCount>
    >("dashboard/daily-checks-and-resources-count");
  }

  public async getCostAndUsageTrends(
    periodFrom: Date,
    peroidTo: Date,
    withUsage: boolean,
    withForecast: boolean
  ): Promise<
    AxiosResponse<APIResponse<DashboardCostAndUsageTrendPeriodicRow[]>>
  > {
    return this.httpClient.get<
      APIResponse<DashboardCostAndUsageTrendPeriodicRow[]>
    >(`dashboard/cost-and-usage-trends`
    , {
      params: {
        periodFrom: '2022-01-01T00:00:00.000Z',
        periodTo: '2022-01-21T00:00:00.000Z',
        withUsage: true,
        withForecast: true
      }
    });
  }
}

export default CloudAccountsService;
