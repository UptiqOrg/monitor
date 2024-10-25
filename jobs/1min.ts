import { schedules } from "@trigger.dev/sdk/v3";
import { checkStatus } from "../status-checker/status-checker";

export const monitorJob = schedules.task({
  id: "1-min-check",
  cron: "*/1 * * * *",
  run: async () => {
    await checkStatus(1);
  },
});
