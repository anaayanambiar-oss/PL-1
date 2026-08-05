// app/admin/layout.tsx
import { requireAdmin } from "@/lib/admin-auth";
import AdminSidebar from "@/components/admin/AdminSidebar";

export const metadata = { title: "Admin Panel | PoliticaLearn" };

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Guard — redirects to /dashboard if not admin
  await requireAdmin();

  return (
    <div className="min-h-screen bg-gray-950 flex">
      <AdminSidebar />
      <main className="flex-1 overflow-auto">
        {children}
      </main>
    </div>
  );
}
