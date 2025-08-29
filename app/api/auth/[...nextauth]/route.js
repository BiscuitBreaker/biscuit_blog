import NextAuth from 'next-auth';
import EmailProvider from 'next-auth/providers/email';

const allowlist = (process.env.ALLOWLIST || '').split(',').map(s=>s.trim().toLowerCase()).filter(Boolean);

const handler = NextAuth({
  session: { strategy: 'jwt' },
  providers: [
    EmailProvider({
      server: {
        host: process.env.EMAIL_SERVER_HOST,
        port: Number(process.env.EMAIL_SERVER_PORT || 587),
        auth: {
          user: process.env.EMAIL_SERVER_USER,
          pass: process.env.EMAIL_SERVER_PASSWORD,
        },
      },
      from: process.env.EMAIL_FROM,
      async generateVerificationToken() {
        // default is fine; keep for compatibility
        return undefined;
      },
      async sendVerificationRequest({ identifier, url, provider }) {
        // Use provider's built-in if configured; otherwise console log
        const { server, from } = provider;
        if (!server || !from) {
          console.log('Login link for', identifier, url);
          return;
        }
        const nodemailer = (await import('nodemailer')).default;
        const transport = nodemailer.createTransport(server);
        await transport.sendMail({
          to: identifier,
          from,
          subject: 'Your BiscuitBlog sign-in link',
          text: `Sign in to BiscuitBlog\n${url}`,
          html: `<p>Sign in to <b>BiscuitBlog</b></p><p><a href="${url}">Click here to sign in</a></p>`
        });
      },
      normalizeIdentifier(identifier) {
        return identifier.toLowerCase();
      }
    })
  ],
  callbacks: {
    async signIn({ user }) {
      if (!allowlist.length) return false; // deny all if not configured
      const email = user?.email?.toLowerCase();
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
    verifyRequest: '/login/verify',
    error: '/login/error',
  },
});

export { handler as GET, handler as POST };
