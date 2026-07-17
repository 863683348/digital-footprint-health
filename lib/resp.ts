import { NextResponse } from 'next/server';
import type { ApiResponse } from './types';

export function ok<T>(data: T, status = 200): NextResponse {
  return NextResponse.json({ ok: true, data } as ApiResponse<T>, { status });
}

export function fail(code: string, message: string, status = 400): NextResponse {
  return NextResponse.json({ ok: false, error: { code, message } } as ApiResponse<never>, { status });
}
