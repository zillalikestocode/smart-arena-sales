import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    CredentialsProvider({
      credentials: {
        username: { label: "Username", type: "text", placeholder: "username" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, request) {
        const username = credentials?.username;
        const password = credentials?.password;
        const { success, message } = await fetch(
          `${process.env.URL}api/authorize`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ username, password }),
          }
        ).then((res) => res.json());

        if (success) {
          return { name: "Smart Arena Sales Admin" };
        }

        return null;
      },
    }),
  ],
  jwt: {
    maxAge: 30 * 24 * 60 * 60,
  },
  pages: {
    signIn: "/login",
  },
});
