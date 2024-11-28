import { schedules } from "@trigger.dev/sdk/v3";
import { checkStatus } from "../status-checker/status-checker";

export const monitorJob1 = schedules.task({
  id: "1-min-check",
  maxDuration: 5,
  cron: "*/1 * * * *",
  run: async () => {
    await checkStatus(1);
  },
});

export const monitorJob2 = schedules.task({
  id: "2-min-check",
  maxDuration: 5,
  cron: "*/2 * * * *",
  run: async () => {
    await checkStatus(2);
  },
});

export const monitorJob5 = schedules.task({
  id: "5-min-check",
  maxDuration: 5,
  cron: "*/5 * * * *",
  run: async () => {
    await checkStatus(5);
  },
});

export const monitorJob10 = schedules.task({
  id: "10-min-check",
  maxDuration: 5,
  cron: "*/10 * * * *",
  run: async () => {
    await checkStatus(10);
  },
});
