import { checkStatus } from "./status-checker/status-checker";

async function main() {
  console.log("Start checking websites");
  await checkStatus(5);
}

main();
