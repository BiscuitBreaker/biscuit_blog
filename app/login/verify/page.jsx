import { redirect } from 'next/navigation';

// Deprecated: legacy magic-link flow. Redirect to /login.
export default function VerifyPage() {
  redirect('/login');
}
