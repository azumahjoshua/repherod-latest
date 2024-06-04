import NextAuth from "next-auth/next";
import { options } from "./options";
const handlder = NextAuth(options)

export {handlder as GET, handlder as POST}