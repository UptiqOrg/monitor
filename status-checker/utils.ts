import { WebsiteStatus } from "./types";

export const getStatus = (statusCode: number): WebsiteStatus => {
  if (statusCode >= 200 && statusCode <= 299) return "up";
  if (statusCode >= 400 && statusCode <= 499) return "degraded";
  if (statusCode >= 500 && statusCode <= 599) return "down";
  return "warning";
};
