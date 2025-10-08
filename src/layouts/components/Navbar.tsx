import { useAuth } from '../../context/useAuth';

function Avatar({ email }: { email?: string | null }) {
  const initial = email ? email[0].toUpperCase() : '?';
  return (
    <div className="h-10 w-10 rounded-full bg-gradient-to-br from-primary-500 to-primary-600 text-white flex items-center justify-center font-semibold text-lg shadow-sm ring-1 ring-primary-200">
      {initial}
    </div>
  );
}

export default function Navbar() {
  const { logout, user } = useAuth();
  return (
    <header className="w-full bg-white px-6 py-3 flex items-center justify-between shadow-sm transition-all duration-200">
      <div className="flex items-center gap-4">
        <div className="h-10 w-10 bg-primary-600 rounded-lg flex items-center justify-center text-white font-bold shadow-sm">
          UI
        </div>
        <div>
          <div className="text-lg font-semibold text-gray-800">Project Admin</div>
          <div className="text-xs text-gray-500">Dashboard</div>
        </div>
      </div>
      <div className="flex-1 px-6">
        <div className="max-w-xl mx-auto">
          <input
            placeholder="Search for anything..."
            className="w-full px-4 py-2 rounded-lg border border-gray-200 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary-400 transition-all duration-200"
          />
        </div>
      </div>
      <div className="flex items-center gap-3">
        <div className="text-sm font-medium text-gray-700">{user?.email ?? 'Guest'}</div>
        <Avatar email={user?.email ?? undefined} />
        <button
          onClick={() => logout()}
          className="ml-2 px-4 py-1.5 rounded-lg border border-gray-200 text-sm font-medium text-gray-700 hover:bg-gray-50 hover:border-gray-300 transition-all duration-200"
        >
          Logout
        </button>
      </div>
    </header>
  );
}
