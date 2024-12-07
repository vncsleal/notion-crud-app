import { NextRequest, NextResponse } from "next/server";
import { NotionService } from "@/services/notionService";

export async function DELETE(req: NextRequest) {
  try {
    const { pageId } = await req.json();
    const response = await NotionService.deleteTask(pageId);
    return NextResponse.json(response, { status: 200 });
  } catch (error) {
    if(error instanceof Error){
    return NextResponse.json({ error: error.message }, { status: 500 });
    }
  }
}