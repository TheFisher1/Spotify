
interface NavigationProps {
    readonly onLogin: () => void;
    readonly onSignUp: () => void;
}

export function Navigation({onLogin, onSignUp}: NavigationProps) {
    return (
        <nav className="border-b border-zinc-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <h1 className="text-2xl font-bold">Spotify</h1>
            <div className="space-x-4">
              <button className="px-4 py-2 rounded-full hover:text-green-500 transition-colors" onClick={onLogin}>
                Log in
              </button>
              <button className="px-4 py-2 rounded-full bg-green-500 hover:bg-green-400 transition-colors" onClick={onSignUp}>
                Sign up
              </button>
            </div>
          </div>
        </div>
      </nav>
    )
}