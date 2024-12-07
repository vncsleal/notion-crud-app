import { Client } from "@notionhq/client";

// Initialize the Notion client with the API key
const notion = new Client({ auth: process.env.NOTION_KEY });

// Export the database ID
export const databaseId = process.env.NOTION_PAGE_ID as string;

// Export the client
export default notion;