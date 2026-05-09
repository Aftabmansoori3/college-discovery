import { auth } from "@/auth";

export default auth((req) => {
  const isLoggedin = !!req.auth;
  const { nextUrl } = req;

  const isAuthRoute = ["/login", "/register"].includes(nextUrl.pathname);
  const isProtectedRoute = ["/saved"].includes(nextUrl.pathname);

  if (isAuthRoute && isLoggedin) {
    return Response.redirect(new URL("/", nextUrl));
  }

  if (isProtectedRoute && !isLoggedin) {
    return Response.redirect(new URL("/login", nextUrl));
  }
});

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
