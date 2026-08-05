// app/admin/settings/page.tsx
import { requireAdmin } from "@/lib/admin-auth";
import sql from "@/lib/db";
import AdminSettingsForm from "@/components/admin/AdminSettingsForm";

export default async function AdminSettingsPage() {
  await requireAdmin();

  const rows = await sql`SELECT key, value, description FROM site_settings ORDER BY key`;
  const settings = Object.fromEntries(rows.map((r) => [r.key, r.value]));
  const descriptions = Object.fromEntries(rows.map((r) => [r.key, r.description]));

  return (
    <div className="p-8 max-w-2xl">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-white mb-1">Site Settings</h1>
        <p className="text-gray-400 text-sm">
          Platform-wide configuration. Changes take effect immediately.
        </p>
      </div>

      <AdminSettingsForm settings={settings} descriptions={descriptions} />
    </div>
  );
}
