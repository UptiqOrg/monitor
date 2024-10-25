import { db } from "./db";
import { Website, WebsiteResponse } from "./types";
import { getStatus } from "./utils";
import { logger } from "@trigger.dev/sdk/v3";

const BATCH_SIZE = 20;
const TIMEOUT = 5000;

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
      logger.error(`Error fetching websites ${error.message}`);
      throw error;
    });
};

export const insertStatus = async (
  uptimeResponses: WebsiteResponse[],
): Promise<void> => {
  const values = uptimeResponses.map((response) => {
    return {
      website_id: response.id,
      status: response.status,
      response_time: response.responseTime,
      status_code: response.statusCode,
    };
  });

  await db`insert into uptime_checks ${db(values, "website_id", "status", "response_time", "status_code")}`.catch(
    (error) => {
      console.error(`Error inserting statuses ${error.message}`);
      logger.error(`Error inserting statuses ${error.message}`);
    },
  );
};

export const pingWebsites = async (interval: number): Promise<void> => {
  const websites = await fetchWebsites(interval);

  for (let i = 0; i < websites.length; i += BATCH_SIZE) {
    const batch = websites.slice(i, i + BATCH_SIZE);
    const batchPromises = batch.map(pingWebsite);
    const batchResults = await Promise.all(batchPromises);
    await insertStatus(batchResults);
  }

  console.log(`Pinged ${websites.length} websites with interval ${interval}`);
  logger.info(`Pinged ${websites.length} websites with interval ${interval}`);
};

export const pingWebsite = async (
  website: Website,
): Promise<WebsiteResponse> => {
  const startTime = Date.now();

  return await fetch(website.url, {
    signal: AbortSignal.timeout(TIMEOUT),
  })
    .then((response) => {
      const endTime = Date.now();
      return {
        ...website,
        statusCode: response.status,
        status: getStatus(response.status),
        responseTime: endTime - startTime,
      };
    })
    .catch((error) => {
      console.error(
        `Error fetching website (${website.id}, ${website.url}}): ${error.message}`,
      );
      logger.error(
        `Error fetching website (${website.id}, ${website.url}}): ${error.message}`,
      );
      throw error;
    });
};

export const checkStatus = async (interval: number): Promise<void> => {
  console.log(`Fetching websites for interval: ${interval}`);
  logger.info(`Fetching websites for interval: ${interval}`);

  await pingWebsites(interval).catch((error) => {
    logger.error(error);
    console.error(error);
  });

  console.log(`Finished fetching websites for interval: ${interval}`);
  logger.info(`Finished fetching websites for interval: ${interval}`);
};
