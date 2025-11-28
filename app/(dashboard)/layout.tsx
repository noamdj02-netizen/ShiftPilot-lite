import { Sidebar } from "@/components/layout/Sidebar";
import { Header } from "@/components/layout/Header";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  return (
    <div className="min-h-screen bg-background dark:bg-dark-background">
      <Header />
      <Sidebar />
      <main className="lg:pl-64 pt-16">
        <div className="px-4 sm:px-6 lg:px-8 py-8">{children}</div>
      </main>
    </div>
  );
}

