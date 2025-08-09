import favicon from "../assets/favicon.png";

interface HeaderProps {
  nome?: string;
  onLogin?: () => void;
  onLogout?: () => void;
  onProfile?: () => void;
}

export default function Header({
  nome,
  onLogin,
  onLogout,
  onProfile,
}: HeaderProps) {
  return (
    <header className="flex justify-between items-center bg-white/80 backdrop-blur-md p-4 shadow-md fixed top-0 left-0 right-0 w-full border-b border-gray-200 z-50">
      <div className="flex items-center space-x-3">
        <img
          src={favicon}
          alt="LoanMate"
          className="h-10 w-10 rounded-lg shadow-sm"
        />
        <span className="text-lg font-semibold text-gray-800 tracking-tight">
          Loan Mate
        </span>
      </div>
      <div className="flex items-center space-x-3">
        {nome ? (
          <>
            <span className="text-gray-700 hidden sm:inline">
              Benvenuto, <strong>{nome}</strong>
            </span>
            <button
              onClick={onProfile}
              className="px-4 py-2 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium transition-colors duration-200 shadow-sm"
            >
              Profilo
            </button>
            <button
              onClick={onLogout}
              className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-medium transition-colors duration-200 shadow-sm"
            >
              Logout
            </button>
          </>
        ) : (
          <button
            onClick={onLogin}
            className="px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-medium transition-colors duration-200 shadow-sm"
          >
            Login
          </button>
        )}
      </div>
    </header>
  );
}
