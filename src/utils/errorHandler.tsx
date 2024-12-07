import { NextResponse } from "next/server";

export function handleError(error: unknown) {
  if (error instanceof Error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
  return NextResponse.json({ error: "Unknown error occurred" }, { status: 500 });
}