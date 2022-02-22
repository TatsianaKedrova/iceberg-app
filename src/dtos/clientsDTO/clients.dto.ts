import {
  Client,
  CreatedUpdated,
  UserModelExtended,
} from "../authDTO/authentication-result.dto";

export type GuidStringKeyValuePair = [
  {
    key: string;
    value: string;
  }
];

export type ListItems = {
  totalCount: number;
  currentPage: number;
  pageSize: number;
  skippedItems: number;
};

export type MinifiedListItemListWithTotals = ListItems & {
  list: MinifiedListItem[] | null;
};

export type ClientListWithTotals = ListItems & {
  list: Client[] | null;
};

export type PeriodCostSummary = {
  periodName: string;
  periodStart: Date;
  periodEnd: Date;
  amount: number;
  previousPeriodToCompareWith: {};
  previousPeriodChangePercent: number;
  potentialSavingsAmount: number;
};

export type DashboardCostSummaryAndForecast = {
  forecast: PeriodCostSummary;
  costToDate: PeriodCostSummary;
  lastMonth: PeriodCostSummary;
  currentMonthFact: PeriodCostSummary;
};

export type DashboardEstimatedCostSavings = {
  averageSpend: PeriodCostSummary;
  estimatedSavings: PeriodCostSummary;
  estimatedBill: PeriodCostSummary;
};

export type MinifiedListItem = {
  id: string;
  name: string | null;
};

export type RuleSetting = MinifiedListItem & {
  ruleId: string;
  valueTypeId: string;
  value: string | null;
  rule: {};
  valueType: MinifiedListItem;
};

export type ServiceToCategory = CreatedUpdated & {
  id: string;
  serviceId: string;
  categoryId: string;
  service: {};
  category: {};
};

export type CloudTag = UserModelExtended & {
  id: string;
  cloudResourceId: string;
  key: string | null;
  value: string | null;
  readonly keyValuePair: string | null;
  readonly keyLowerCase: string | null;
  readonly valueLowerCase: string | null;
  readonly keyValuePairLowerCase: string | null;
  cloudResource: CloudResource;
};

export type CostData = UserModelExtended & {
  id: string;
  periodFrom: Date;
  periodTo: Date;
  amount: number;
  usageQuantity: number;
  blendedRate: number;
  cloudAccountId: string;
  cloudServiceId: string;
  cloudResourceId: string | null;
  refreshable: boolean;
  isReservedInstance: boolean;
  cloudAccount: ConnectedCloudAccount;
  cloudService: CloudService;
  cloudResource: CloudResource;
};

export type AwsRegion = MinifiedListItem & {
  systemKey: string | null;
  accountsInRegion: ConnectedCloudAccount[] | null;
};

export type CloudResource = UserModelExtended &
  MinifiedListItem & {
    alias: string;
    cloudServiceId: string;
    cloudAccountId: string;
    regionId: string;
    cloudService: CloudService;
    cloudAccount: ConnectedCloudAccount;
    region: AwsRegion;
    cloudTags: CloudTag[];
    costData: CostData[];
  };

export type ServiceCategoryBudget = UserModelExtended & {
  id: string;
  activatedAt: Date;
  categoryId: string;
  monthBudget: number | null;
  category: ServiceCategory;
};

export type ClientProduct = UserModelExtended &
  MinifiedListItem & {
    clientId: string;
    client: Client;
    budgets: ServiceCategoryBudget[] | null;
    cloudAccounts: ConnectedCloudAccount[] | null;
    childCategories: ServiceCategory[] | null;
  };

export type ServiceCategory = UserModelExtended &
  MinifiedListItem & {
    productId: string | null;
    parentCategoryId: string | null;
    isUncategorizedDataContainer: boolean;
    isDefault: boolean;
    parentCategory: {};
    product: ClientProduct;
    budgets: ServiceCategoryBudget[] | null;
    servicesDefaultedToCategory: CloudService[] | null;
    services: ServiceToCategory[] | null;
    childCategories: [] | null;
  };

export type CloudService = UserModelExtended &
  MinifiedListItem & {
    alias: string | null;
    defaultCategoryId: string | null;
    defaultCategory: ServiceCategory;
    cloudResources: CloudResource[] | null;
    categories: ServiceToCategory[] | null;
  };

export type RuleDiscrepancyType = MinifiedListItem & {
  rules: Rule[] | null;
};

export type Rule = {
  id: string;
  defaultName: string | null;
  defaultDescription: string | null;
  defaultSeverity: number;
  // RuleSeverityinteger($int32)
  // Enum:
  // Array [ 3 ]
  defaultEnabled: boolean;
  cloudServiceId: string;
  lambdaName: string | null;
  discrepancyTypeId: string | null;
  singularResourceUnitName: string | null;
  cloudService: CloudService;
  discrepancyType: RuleDiscrepancyType;
  ruleSettings: RuleSetting[] | null;
};

export type CloudAccountClientRule = {
  id: string;
  cloudAccountId: string;
  clientRuleId: string;
  cloudAccount: ConnectedCloudAccount;
  clientRule: {};
};

export type ClientRuleSetting = {
  id: string;
  clientRuleId: string;
  ruleSettingId: string;
  value: string | null;
  clientRule: ClientRule;
  ruleSetting: RuleSetting;
};

export type ClientRule = UserModelExtended &
  MinifiedListItem & {
    clientId: string;
    ruleId: string;
    description: string | null;
    severity: number;
    // RuleSeverityinteger($int32)
    // Enum:
    // Array [ 3 ]
    enabled: boolean;
    client: Client;
    rule: Rule;
    cloudAccountClientRules: CloudAccountClientRule[] | null;
    clientRuleSettings: ClientRuleSetting[] | null;
  };

export type CloudAccounClientRule = {
  id: string;
  cloudAccountId: string;
  clientRuleId: string;
  cloudAccount: {};
  clientRule: ClientRule;
};

export type ConnectedCloudAccount = UserModelExtended &
  MinifiedListItem & {
    description: string | null;
    clientId: string;
    preferredRegionId: string | null;
    productId: string | null;
    accountId: string | null;
    billingAccountId: string | null;
    reportBucketName: string | null;
    reportBucketRegionEndpointSystemName: string | null;
    client: Client;
    preferredRegion: AwsRegion;
    product: ClientProduct;
    cloudAccountClientRules: CloudAccounClientRule[] | null;
  };

export type CostOpportunityTableRow = {
  clientRuleExecutionId: string | null;
  clientRuleId: string | null;
  clientRule: ClientRule;
  totalProblemsDetected: number;
  connectedCloudAccountId: string | null;
  connectedCloudAccount: ConnectedCloudAccount;
  monthlyCost: number;
  costSavingsPercentage: number | null;
  costSavingsAmount: number | null;
  prevPeriodCost: number;
  isTopLevel: boolean;
  executionGroupId: string;
  childRows: [] | null;
};

export type DashboardDailyRulesByResourcesSummary = {
  totalCount: number;
  compliantCount: number;
  compliantPercent: number;
  nonCompliantCount: number;
  nonCompliantPercent: number;
  highSeverityCount: number;
  highSeverityPercent: number;
  mediumSeverityCount: number;
  mediumSeverityPercent: number;
  lowSeverityCount: number;
  lowSeverityPercent: number;
};

export type DashboardDailyChecksAndResourcesCount = {
  resourcesCount: number;
  checksCount: number;
};

export type DashboardCostAndUsageTrendPeriodicRow = {
  periodFrom: Date;
  periodTo: Date;
  periodName: string | null;
  totalSpend: number;
  forecast: number;
  forecastWithSavings: number;
  usage: number | null;
};
