import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';

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
    })
  ],
  callbacks: {
    async signIn({ user }) {
      // authorize already enforced in credentials authorize
      return !!user?.email;
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
