import { Client } from "@notionhq/client";
import { CreatePageResponse, QueryDatabaseResponse, UpdatePageParameters } from "@notionhq/client/build/src/api-endpoints";

const notion = new Client({ auth: process.env.NOTION_KEY });
const databaseId = process.env.NOTION_PAGE_ID as string;

export class NotionService {
  static async createTask(
    title: string,
    dueDate: string,
    priority: string,
    status: string
  ): Promise<CreatePageResponse | undefined> {
    try {
      return await notion.pages.create({
        parent: { database_id: databaseId },
        properties: {
          Name: {
            title: [{ text: { content: title } }],
          },
          "Due Date": { date: { start: dueDate } },
          Priority: { select: { name: priority } },
          Status: { status: { name: status } },
        },
      });
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`Error creating task: ${error.message}`);
      }
      return undefined;
    }
  }

  static async getTasks(): Promise<QueryDatabaseResponse | undefined> {
    try {
      return await notion.databases.query({ database_id: databaseId });
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`Error fetching tasks: ${error.message}`);
      }
      return undefined;
    }
  }

  static async updateTask(
    pageId: string,
    updates: UpdatePageParameters["properties"]
  ): Promise<CreatePageResponse | undefined> {
    try {
      return await notion.pages.update({
        page_id: pageId,
        properties: updates,
      });
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`Error updating task: ${error.message}`);
      }
      return undefined;
    }
  }

  static async deleteTask(pageId: string): Promise<CreatePageResponse | undefined> {
    try {
      return await notion.pages.update({
        page_id: pageId,
        archived: true,
      });
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`Error deleting task: ${error.message}`);
      }
      return undefined;
    }
  }
}