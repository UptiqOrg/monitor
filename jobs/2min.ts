import { schedules } from "@trigger.dev/sdk/v3";
import { checkStatus } from "../status-checker/status-checker";

export const monitorJob = schedules.task({
  id: "2-min-check",
  cron: "*/2 * * * *",
  run: async () => {
    await checkStatus(2);
  },
});
