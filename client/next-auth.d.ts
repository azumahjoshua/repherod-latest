import { DefaultSession, DefaultUser } from "next-auth";
import { DefaultJWT } from "next-auth/jwt";

declare module "next-auth" {
  interface User extends DefaultUser {
    user: {
      id: string;
      roleID: string;
      roleName: string;
      accessToken: string;
    }
  }
  interface Session extends DefaultSession {
    user: {
      id: string;
      roleID: string;
      roleName: string;
      accessToken: string;
    } & DefaultSession;
  }

}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    roleID: string;
    roleName: string;
    accessToken: string;
  }
  // interface JWT extends DefaultJWT {
  //   token:{
  //     roleName: string;
  //     accessToken: string;
  //     id:string
  //   }
    
  // }
}
