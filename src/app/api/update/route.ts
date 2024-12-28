import { NextRequest, NextResponse } from "next/server";
import { NotionService } from "@/services/notionService";

export async function PATCH(req: NextRequest) {
  try {
    const { pageId, updates } = await req.json();
    const response = await NotionService.updateTask(pageId, updates);
    return NextResponse.json(response, { status: 200 });
  } catch (error) {
    if(error instanceof Error){
    return NextResponse.json({ error: error.message }, { status: 500 });
    }
  }
}