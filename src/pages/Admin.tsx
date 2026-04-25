import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Users, FileText, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { getAdminUsers } from '@/lib/api';

export default function Admin() {
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getAdminUsers()
      .then(data => {
        setUsers(data || []);
        setLoading(false);
      })
      .catch(console.error);
  }, []);

  return (
    <div className="min-h-screen bg-slate-50">
      <header className="px-6 h-16 flex items-center border-b border-slate-200 bg-white">
        <div className="flex items-center gap-4">
          <Link to="/">
            <Button variant="ghost" size="sm" className="p-2"><ArrowLeft size={16} /></Button>
          </Link>
          <div className="font-semibold text-slate-900">OptiCore Admin Dashboard</div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto p-6 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white border border-slate-200 p-6 rounded-xl shadow-sm flex items-center gap-4">
            <div className="p-3 bg-primary-50 text-primary-600 rounded-lg"><Users size={24} /></div>
            <div>
              <div className="text-2xl font-bold">{users.length}</div>
              <div className="text-sm text-slate-500 text-medium">Total Demo Users</div>
            </div>
          </div>
          <div className="bg-white border border-slate-200 p-6 rounded-xl shadow-sm flex items-center gap-4">
            <div className="p-3 bg-indigo-50 text-indigo-600 rounded-lg"><FileText size={24} /></div>
            <div>
              <div className="text-2xl font-bold">{users.filter(u => u.reportId).length}</div>
              <div className="text-sm text-slate-500 text-medium">Reports Generated</div>
            </div>
          </div>
          <div className="bg-white border border-slate-200 p-6 rounded-xl shadow-sm flex items-center gap-4">
            <div className="p-3 bg-emerald-50 text-emerald-600 rounded-lg"><CheckCircle size={24} /></div>
            <div>
              <div className="text-2xl font-bold">{users.filter(u => u.status === 'demo_completed').length}</div>
              <div className="text-sm text-slate-500 text-medium">High Intent Leads</div>
            </div>
          </div>
        </div>

        <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden mt-8">
          <div className="px-6 py-4 border-b border-slate-200 bg-slate-50/50">
            <h3 className="font-semibold text-slate-900">Recent Conversions</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-slate-50 text-slate-500 border-b border-slate-200">
                <tr>
                  <th className="px-6 py-3 font-medium">User ID</th>
                  <th className="px-6 py-3 font-medium">Company Profile</th>
                  <th className="px-6 py-3 font-medium">Joined At</th>
                  <th className="px-6 py-3 font-medium">Status</th>
                  <th className="px-6 py-3 font-medium">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {loading ? (
                  <tr><td colSpan={5} className="px-6 py-8 text-center text-slate-500">Loading data...</td></tr>
                ) : users.length === 0 ? (
                  <tr><td colSpan={5} className="px-6 py-8 text-center text-slate-500">No users found. Share the demo link to get started.</td></tr>
                ) : (
                  users.map((user, i) => (
                    <tr key={user.id || i} className="hover:bg-slate-50/50 transition-colors">
                      <td className="px-6 py-4 font-medium text-slate-900">{user.id}</td>
                      <td className="px-6 py-4 font-medium text-slate-900">{user.profile || 'Unknown'}</td>
                      <td className="px-6 py-4 text-slate-500">{new Date(user.joinedAt).toLocaleString()}</td>
                      <td className="px-6 py-4">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-100 text-emerald-800">
                          {user.status === 'demo_completed' ? 'Demo Completed' : user.status}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <Button variant="outline" size="sm">View Report</Button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
}
