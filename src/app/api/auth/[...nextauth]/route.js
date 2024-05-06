import NextAuth from "next-auth/next";
import GithubProviders from "next-auth/providers/github";
import CredentialsProviders from "next-auth/providers/credentials";
import connectMongoDB from "@/libs/mongodb";
import Users from "@/models/users";
import bcrypt from "bcryptjs";

export const authOptions = {
    providers: [
        CredentialsProviders({
            id: "email-login",
            name: "credentials",
            credentials: {},

            async authorize(credentials) {
                const { email, password } = credentials;
                try {
                    await connectMongoDB();
                    const user = await Users.findOne({ email });
                    if(!user){
                        return null;
                    }
                    const passwordMatch = await bcrypt.compare(password, user.password);
                    if (!passwordMatch) {
                        return null;
                    }
                    return user;
                } catch (error) {
                    return null;
                }
            }
        }),
        GithubProviders({
            id: "github-login",
            name: "github",
            clientId: process.env.GITHUB_CLIENT_ID,
            clientSecret: process.env.GITHUB_CLIENT_SECRET
        })
    ],
    callbacks: {
        async jwt({ token, user }) {
          if (user) token.role = user.role;
          if (user) token._id = user._id;
          return token;
        },
        async session({ session, token }) {
          if (session?.user) session.user.role = token.role;
          if (session?.user) session.user._id = token._id;
          return session;
        },
      },
    session: {
        strategy: "jwt"
    },
    secret: process.env.NEXTAUTH_SECRET,
    pages: {
        signIn: "/login"
    }
}

const handler = NextAuth(authOptions);

export { handler as POST, handler as GET };