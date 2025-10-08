import {  NavLink } from "react-router";
import { routingList } from "../utils/routingList";
import { cn } from "../../utils/utilties";

function NavItem({ to, children }: { to: string; children: React.ReactNode }) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        cn("flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-primary-50 transition-all duration-200",
          isActive ? "bg-primary-100 text-primary-700" : "text-gray-700",
        )
      }
    >
      <span className="h-8 w-8 rounded-lg bg-primary-100 flex items-center justify-center text-primary-700 font-medium text-sm">
        {children?.toString()?.[0] ?? '•'}
      </span>
      <span className="text-gray-700 font-medium">{children}</span>
    </NavLink>
  );
}

export default function Sidebar() {
  return (
    <nav className="w-64 bg-white shadow-sm border-r border-slate-100 p-4 min-h-[calc(100vh-64px)] flex flex-col ">
      <div className="mb-6 rounded-xl bg-gradient-to-br from-primary-50 to-secondary-50 p-4">
        <div className="text-xs text-gray-500">Welcome back</div>
        <div className="mt-1 text-lg font-bold text-gray-800">Simple Project</div>
      </div>
      <div className="mb-2 text-xs font-medium uppercase tracking-wide text-slate-500">Navigation</div>
      <div className="space-y-1.5 flex-1">
        {routingList.map((item) => (
          <NavItem key={item.path} to={item.path}>
            {item.label}
          </NavItem>
        ))}
      </div>
      <div className="mt-6 border-t pt-4">
        <div className="text-sm text-gray-500 font-medium">Settings</div>
      </div>
    </nav>
  );
}
