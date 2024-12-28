import { NextResponse } from "next/server";
import { NotionService } from "@/services/notionService";

export async function GET() {
	try {
		const response = await NotionService.getTasks();
		if (response) {
			return NextResponse.json(response.results, { status: 200 });
		} else {
			return NextResponse.json(
				{ error: "No response from NotionService" },
				{ status: 500 }
			);
		}
	} catch (error) {
		if (error instanceof Error) {
			return NextResponse.json({ error: error.message }, { status: 500 });
		}
	}
}
