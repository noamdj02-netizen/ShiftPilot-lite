import Link from "next/link";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background dark:bg-dark-background px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <Link href="/" className="inline-flex items-center">
            <span className="font-heading font-bold text-2xl text-foreground dark:text-dark-foreground">
              ShiftPilot
            </span>
            <span className="ml-2 text-sm text-muted dark:text-dark-foreground-muted">
              Lite
            </span>
          </Link>
        </div>
        {children}
      </div>
    </div>
  );
}

