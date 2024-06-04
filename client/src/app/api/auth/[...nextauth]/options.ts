import { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { z } from 'zod';

interface Credentials {
  email: string;
  password: string;
}

// Define the Zod schema for validating the credentials
const credentialsSchema = z.object({
  email: z.string().email({ message: 'Invalid email format' }),
  password: z.string().min(6, { message: 'Password must be at least 6 characters long' }),
});

export const options: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      credentials: {
        email: { label: 'Email', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials: Credentials) {
        try {
          // Validate credentials using the Zod schema
          const parsedCredentials = credentialsSchema.parse(credentials);

          const { email, password } = parsedCredentials;
          const url = `${process.env.NEXT_PUBLIC_API_URL}/user/login`;

          // Make the API call to login
          const response = await fetch(url, {
            method: 'POST',
            body: JSON.stringify({ email, password }),
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
            },
          });

          if (!response.ok) {
            if (response.status === 401) {
              throw new Error('Unauthorized');
            } else {
              throw new Error(`Failed to authenticate: ${response.statusText}`);
            }
          }

          const data = await response.json();
          return {
            ...data,
            id: data.id
          };
        } catch (error) {
          console.error('Error during API call:', error);
          throw new Error('Failed to authenticate');
        }
      },
    }),
  ],
  callbacks: {
    // async signIn({ user, account, profile, email, credentials }) {
    //   // Example logic: Allow sign-in based on a condition
    //   const isAllowedToSignIn = true; // Add your own logic here
    //   if (isAllowedToSignIn) {
    //     return true;
    //   }
    //   return false;
    // },
    async session({ session, token }) {
      if (session?.user) {
        const { roleName, accessToken ,user } = token;
        session.user.roleName = roleName as string;
        session.user.accessToken = accessToken as string;
        session.user.id = token.id
      }
      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        const {roleID,accessToken,id} = user.user
        // const roleID = user.user.roleID;
        // const accessToken = user.user.accessToken;
        // const id = user.user.id ;
        const url = `${process.env.NEXT_PUBLIC_API_URL}/role/${roleID}`;

        try {
          const roleResponse = await fetch(url, {
            method: 'GET',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
            },
          });

          if (!roleResponse.ok) {
            throw new Error(`Failed to fetch user role: ${roleResponse.statusText}`);
          }

          const roleName = await roleResponse.json();
          token.roleName = roleName;
          token.accessToken = accessToken;
          token.id = id
          
        } catch (error) {
          console.error('Error fetching user role:', error);
          throw new Error('Failed to fetch user role');
        }
      }

      return token;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: '/login',
  },
};
// secretpassword

// "email":"johndoe2024@gmail.com",
// "password":"secretpassword"