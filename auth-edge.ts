import NextAuth from "next-auth";
import { NextResponse } from "next/server";
import type { NextAuthConfig } from "next-auth";

const edgeConfig: NextAuthConfig = {
  providers: [],                  // <-- satisfy the type system
  session: { strategy: "jwt" },
  callbacks: {
    authorized({ request, auth }: any) {
      // Check for session cart cookie
      if (!request.cookies.get("sessionCartId")) {
        //Generate new session cart id cookie
        const sessionCartId = crypto.randomUUID();

        // Clone the req headers
        const newRequestHeaders = new Headers(request.headers);

        // Create new response and add the new headers
        const response = NextResponse.next({
          request: {
            headers: newRequestHeaders,
          },
        });
        //Set newly generated sessionCartId in the response cookies
        response.cookies.set("sessionCartId", sessionCartId);
        return response;
      } else {
        return true;
      }
    },
  },
};

export const { auth } = NextAuth(edgeConfig);