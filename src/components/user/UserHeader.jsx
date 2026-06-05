export default function UserHeader() {
  return (
    <header className="h-20 bg-white border-b border-slate-200 flex items-center justify-between px-8">
      <div>
        <h2 className="text-2xl font-bold text-slate-800">Dashboard</h2>
      </div>

      <div className="flex items-center gap-4">
        <div className="w-10 h-10 rounded-full bg-[#10BB89]" />

        <div>
          <p className="font-semibold text-sm">User PROBIT</p>

          <p className="text-xs text-slate-500">Member</p>
        </div>
      </div>
    </header>
  );
}
