import { api, patchConfig } from "@/app/utils/func";
import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(req: NextRequest) {
  try {
    const body = await req.json();
    const res = await axios.patch(
      api("/card/3ds"),
      body,
      patchConfig(body, "/card/3ds")
    );
    return NextResponse.json(res.data, { status: res.status });
  } catch (e: any) {
    return NextResponse.json(e, { status: e.response.status || 400 });
  }
}
