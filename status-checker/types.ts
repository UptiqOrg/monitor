export type Website = {
  id: string;
  url: string;
};

export type WebsiteStatus = "up" | "down" | "degraded" | "warning";

export type WebsiteResponse = {
  statusCode: number;
  status: WebsiteStatus;
  responseTime: number;
} & Website;
