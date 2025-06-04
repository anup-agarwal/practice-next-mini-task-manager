import { jwtVerify } from "jose"
import { NextRequest, NextResponse } from "next/server"

const loggedInRoutes = ["/"]
const loggedOutRoutes = ["/login"]

export const config = {
  matcher: [loggedInRoutes, loggedOutRoutes],
}

const AllowRoutes = (
  routes: string[],
  request: NextRequest,
  redirectURL: string
) => {
  if (routes.indexOf(request.nextUrl.pathname) >= 0) {
    return NextResponse.next()
  } else
    return NextResponse.redirect(new URL(redirectURL, "http://localhost:3000"))
}

const middleware = async (request: NextRequest) => {
  const token = request.cookies.get("token")

  if (!token) {
    return AllowRoutes(loggedOutRoutes, request, "/login")
  }

  try {
    await jwtVerify(token.value, new TextEncoder().encode("secret"))
    return AllowRoutes(loggedInRoutes, request, "/")
  } catch (error) {
    console.log(error)
    return NextResponse.redirect(new URL("/login", "http://localhost:3000"))
  }
}

export default middleware
