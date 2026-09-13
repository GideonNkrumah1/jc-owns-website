"use client";

import { useState, Suspense } from "react";
import { signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/admin";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    setLoading(false);

    if (result?.error) {
      setError("Incorrect email or password.");
      return;
    }
    router.push(callbackUrl);
    router.refresh();
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-ivory-100 px-6">
      <div className="w-full max-w-sm">
        <div className="mb-8 flex flex-col items-center text-center">
          <Image
            src="/brand/jc-owns-logo.jpg"
            alt="JC-OWNS Enterprises Limited"
            width={64}
            height={64}
            className="h-16 w-16 rounded-full"
          />
          <h1 className="mt-4 font-serif text-2xl text-charcoal">Admin Sign In</h1>
          <p className="mt-1 text-sm text-charcoal/65">JC-OWNS Enterprises Limited</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 rounded-sm border border-charcoal/10 bg-ivory-50 p-6 shadow-soft">
          <div>
            <label htmlFor="email" className="mb-1.5 block text-sm font-medium text-charcoal">
              Email
            </label>
            <input
              id="email"
              type="email"
              required
              autoComplete="username"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-sm border border-charcoal/25 bg-white px-4 py-3 text-sm focus:border-forest-700"
            />
          </div>
          <div>
            <label htmlFor="password" className="mb-1.5 block text-sm font-medium text-charcoal">
              Password
            </label>
            <input
              id="password"
              type="password"
              required
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-sm border border-charcoal/25 bg-white px-4 py-3 text-sm focus:border-forest-700"
            />
          </div>

          {error && (
            <p role="alert" className="rounded-sm bg-burgundy-50 px-3 py-2 text-sm text-burgundy-600">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-sm bg-forest-700 px-4 py-3 text-sm font-medium text-ivory-50 transition-colors hover:bg-forest-800 disabled:opacity-60"
          >
            {loading ? "Signing in..." : "Sign In"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default function AdminLoginPage() {
  return (
    <Suspense fallback={null}>
      <LoginForm />
    </Suspense>
  );
}
