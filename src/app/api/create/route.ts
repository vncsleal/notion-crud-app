import { NextRequest, NextResponse } from "next/server";
import { NotionService } from "@/services/notionService";

export async function POST(req: NextRequest) {
  try {
    const { title, dueDate, priority, status } = await req.json();
    const response = await NotionService.createTask(title, dueDate, priority, status);
    return NextResponse.json(response, { status: 201 });
  } catch (error) {
    if(error instanceof Error){
    return NextResponse.json({ error: error.message }, { status: 500 });
    }
  }
}