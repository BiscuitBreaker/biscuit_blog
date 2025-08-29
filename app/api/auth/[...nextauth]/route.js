import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import Google from 'next-auth/providers/google';

const allowlist = (process.env.ALLOWLIST || '').split(',').map(s=>s.trim().toLowerCase()).filter(Boolean);
const PASSCODE = (process.env.LOGIN_PASSCODE || '');
const SECRET = process.env.NEXTAUTH_SECRET || (process.env.AUTH_DISABLED === 'true' ? 'dev-secret' : undefined);

const handler = NextAuth({
  secret: SECRET,
  session: { strategy: 'jwt' },
  providers: [
    Credentials({
      name: 'Email Passcode',
      credentials: {
        email: { label: 'Email', type: 'email' },
        passcode: { label: 'Passcode', type: 'password' },
      },
      async authorize(creds) {
        const email = (creds?.email || '').toLowerCase().trim();
        const code = (creds?.passcode || '').trim();
        if (!allowlist.length) return null;
        if (!email || !allowlist.includes(email)) return null;
        if (!PASSCODE || code !== PASSCODE) return null;
        return { id: email, email };
      },
    }),
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID || '',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
      allowDangerousEmailAccountLinking: false,
      profile(profile) {
        // Normalize Google profile to ensure lowercase email
        const email = (profile?.email || '').toLowerCase();
        return { id: profile.sub || email, email };
      },
    })
  ],
  callbacks: {
    async signIn({ user }) {
      // Enforce allowlist for all providers (credentials + oauth)
      const email = user?.email?.toLowerCase();
      if (!allowlist.length) return false;
      return !!email && allowlist.includes(email);
    },
    async jwt({ token, user }) {
      if (user?.email) token.email = user.email.toLowerCase();
      return token;
    },
    async session({ session, token }) {
      if (token?.email) session.user = { email: token.email };
      return session;
    },
  },
  pages: {
  signIn: '/login',
  error: '/login/error',
  },
});

export { handler as GET, handler as POST };
