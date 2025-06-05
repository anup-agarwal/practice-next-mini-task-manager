import { jwtVerify } from "jose"
import { NextRequest, NextResponse } from "next/server"

const loggedInRoutes = ["/"]
const loggedOutRoutes = ["/login"]

export const config = {
  matcher: [loggedInRoutes, loggedOutRoutes],
}

const middleware = async (request: NextRequest) => {
  const token = request.cookies.get("token")

  if (token) {
    try {
      await jwtVerify(token.value, new TextEncoder().encode("secret"))
      if (loggedInRoutes.indexOf(request.nextUrl.pathname) >= 0) {
        return NextResponse.next()
      } else NextResponse.redirect(new URL("/", "http://localhost:3000"))
    } catch (error) {
      console.log(error)
      return NextResponse.redirect(new URL("/", "http://localhost:3000"))
    }
  }

  if (!token) {
    if (loggedOutRoutes.indexOf(request.nextUrl.pathname) >= 0) {
      return NextResponse.next()
    }
  }
}

export default middleware
