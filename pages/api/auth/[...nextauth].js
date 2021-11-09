import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import GitHubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials"
import connectToDatabase from "../../../helpers/db"

const options = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    GitHubProvider({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
    }),
    CredentialsProvider({
      // LOGIN PROCESS: Place your own verification logic inside
      async authorize(credentials) {
        // (Using credentials.email and credentials.password)
        // Connect to the database and grab hold of the db instance
        const client = await connectToDatabase();
        const db = client.db();
        // Search the users collection for a doc/account with the submitted email
        const user = await db.collection("users").findOne({
          email: credentials.email,
        });
        // If an account is not found, throw an error
        // Will redirect user to a new page by default, but we can override this later
        if (!user) {
          client.close();
          throw new Error("No user found for that email");
        }
        // If an account is found, check if the associated password's correct
        // Compare the login attempt password to the encrypted one in MongoDB
        const isValid = await verifyPassword(
          credentials.password, // from input field
          user.password // encrypted version stored in MongoDB
        );
        // If the passwords do not match, throw an error and close the db session
        if (!isValid) {
          client.close();
          throw new Error("Incorrect password");
        }
        // If password match, the operation's a success so return an object
        client.close();
        return { email: user.email };
        // Place the user email inside- not the entire user obj (insecure)
      },
    }),


    // Providers.Auth0({
    //   clientId: process.env.AUTH0_CLIENT_ID,
    //   clientSecret: process.env.AUTH0_CLIENT_SECRET,
    //   domain: process.env.AUTH0_DOMAIN,
    // }),
  ],
  // database: {
  //   type: "mongodb",
  //   useNewUrlParser: true,
  //   url: process.env.DATABASE_URL,
  // },
  //% The following should allow us to make custom pages
  pages: {
    signIn: "/signin",
  },
  // signOut: '/auth/signout',
  // error: '/auth/error', // Error code passed in query string as ?error=
  // verifyRequest: '/auth/verify-request', // (used for check email message)
  // newUser: '/auth/new-user'
  // New users will be directed here on first sign in (leave the property out if not of interest)
};

export default (req, res) => NextAuth(req, res, options);
