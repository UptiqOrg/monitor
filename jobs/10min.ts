import { schedules } from "@trigger.dev/sdk/v3";
import { checkStatus } from "../status-checker/status-checker";

export const monitorJob = schedules.task({
  id: "10-min-check",
  cron: "*/10 * * * *",
  run: async () => {
    await checkStatus(10);
  },
});
