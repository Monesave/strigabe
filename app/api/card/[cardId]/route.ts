import { api, authorizationHeader, getConfig } from "@/app/utils/func";
import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: { cardId: string } }
) {
  try {
    const res = await axios.get(
      api(`/card/${params.cardId}`),
      getConfig(`/card/${params.cardId}`)
    );
    return NextResponse.json(res.data, { status: res.status });
  } catch (e: any) {
    return NextResponse.json(e, { status: e.response.status || 400 });
  }
}
