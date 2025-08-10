import { NextResponse, type NextRequest } from 'next/server';

export function middleware(req: NextRequest) {
  // Cookie simples do MVP: 'ml-session=1'
  const hasSession = req.cookies.get('ml-session')?.value === '1';

  if (!hasSession) {
    const url = req.nextUrl.clone();
    url.pathname = '/';
    // opcional: passa a URL original para redirecionar depois do login
    url.searchParams.set('redirectTo', req.nextUrl.pathname + req.nextUrl.search);
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/app/:path*'],
};
