import { db } from "./db";
import { Website } from "./types";

const BATCH_SIZE = 5;

export const fetchWebsites = async (interval: number): Promise<Website[]> => {
  return await db`
      select id, url
        from websites
        where check_interval = ${interval}
    `
    .then((rows) => {
      return rows.map((row) => {
        return {
          id: row.id as string,
          url: row.url as string,
        };
      });
    })
    .catch((error) => {
      console.error(`Error fetching websites ${error.message}`);
      throw error;
    });
};

export const invokeWorker = async (interval: number): Promise<void> => {
  const websites = await fetchWebsites(interval);
  const apiKey = process.env.API_KEY!;
  for (let i = 0; i < websites.length; i += BATCH_SIZE) {
    const batch = websites.slice(i, i + BATCH_SIZE).map((website) => {
      return {
        websiteId: website.id,
        url: website.url,
      };
    });
    fetch("https://monitor-worker.vercel.app/api/index", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": apiKey,
      },
      body: JSON.stringify({ region: "hello world", urls: batch }),
    });
  }

  console.log(`Pinged ${websites.length} websites with interval ${interval}`);
};

export const checkStatus = async (interval: number): Promise<void> => {
  console.log(`Fetching websites for interval: ${interval}`);

  await invokeWorker(interval).catch((error) => {
    console.error(error);
  });

  console.log(`Finished fetching websites for interval: ${interval}`);
};
