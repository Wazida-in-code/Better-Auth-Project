import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { Resend } from "resend";

const client = new MongoClient(process.env.BETTER_AUTH_DB_URL);
const db = client.db("better-auth-project");
const resend = new Resend(process.env.RESEND_API_KEY);

export const auth = betterAuth({
  emailAndPassword: {
    enabled: true,
    requireEmailVerification: true,
    sendResetPassword: async ({user, url, token}, request) => {
      void resend.emails.send({
      from: 'Acme <onboarding@resend.dev>',
      to: user.email,
      subject: "Reset Your Password",
      html: `Click the link to reset your password: ${url}`,
    });
    }, 
  },
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    },
  },
  emailVerification: {
    sendVerificationEmail: async ({ user, url, token }, request) => {
      void resend.emails.send({
      from: 'Acme <onboarding@resend.dev>',
      to: user.email,
      subject: "Verify Your Email",
      text: `Click the link to verify your email: ${url}`,
    });
    },
    sendOnSignUp: true,
	autoSignInAfterVerification: true,
    expiresIn: 7*24*3600 
  },
  database: mongodbAdapter(db, {
    // Optional: if you don't provide a client, database transactions won't be enabled.
    client,
  }),
});
