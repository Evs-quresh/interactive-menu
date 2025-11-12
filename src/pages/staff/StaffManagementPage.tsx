import DataPlaceholder from "../../components/common/DataPlaceholder";
import PageSection from "../../components/common/PageSection";

const roles = [
  { name: "Admin", permissions: "Full access" },
  { name: "Kitchen", permissions: "Order updates" },
  { name: "Waiter", permissions: "Table assignments" },
  { name: "Manager", permissions: "Reports & approvals" },
];

export default function StaffManagementPage() {
  return (
    <div className="space-y-6">
      <PageSection
        title="Staff & Roles"
        description="Invite staff, assign roles, and manage access levels."
        action={
          <button className="rounded-md bg-primary-500 px-3 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-primary-600">
            Add Staff
          </button>
        }
      >
        <div className="overflow-hidden rounded-xl border border-slate-200">
          <table className="min-w-full divide-y divide-slate-200">
            <thead className="bg-slate-50 text-left text-sm font-medium text-slate-500">
              <tr>
                <th className="px-4 py-3">Role</th>
                <th className="px-4 py-3">Permissions</th>
                <th className="px-4 py-3">Members</th>
                <th className="px-4 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 bg-white text-sm text-slate-600">
              {roles.map((role) => (
                <tr key={role.name}>
                  <td className="px-4 py-3 font-medium text-slate-900">{role.name}</td>
                  <td className="px-4 py-3">{role.permissions}</td>
                  <td className="px-4 py-3">0</td>
                  <td className="px-4 py-3 text-right">
                    <button className="text-sm font-medium text-primary-600">Manage</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </PageSection>

      <PageSection
        title="Activity Logs"
        description="Track logins and sensitive configuration changes."
      >
        <DataPlaceholder
          title="Audit log"
          description="Display chronological actions with actor, role, and metadata."
          hint="Log placeholder"
        />
      </PageSection>
    </div>
  );
}

