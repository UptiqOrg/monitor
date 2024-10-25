import { schedules } from "@trigger.dev/sdk/v3";
import { checkStatus } from "../status-checker/status-checker";

export const monitorJob = schedules.task({
  id: "5-min-check",
  cron: "*/5 * * * *",
  run: async () => {
    await checkStatus(5);
  },
});
