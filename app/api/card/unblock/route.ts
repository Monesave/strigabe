import { api, postConfig } from "@/app/utils/func";
import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const res = await axios.post(
      api("/card/unblock"),
      body,
      postConfig(body, "/card/unblock")
    );
    return NextResponse.json(res.data, { status: res.status });
  } catch (e: any) {
    return NextResponse.json(e, { status: e.response.status || 400 });
  }
}
