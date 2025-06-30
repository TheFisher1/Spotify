
export function Footer() {
  return (
    <footer className="border-t border-zinc-800 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div>
            <h4 className="font-semibold mb-4">Company</h4>
            <ul className="space-y-2 text-zinc-400">
              <li>
                <button className="hover:text-white">About</button>
              </li>
              <li>
                <button className="hover:text-white">Jobs</button>
              </li>
              <li>
                <button className="hover:text-white">For the Record</button>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Communities</h4>
            <ul className="space-y-2 text-zinc-400">
              <li>
                <button className="hover:text-white">For Artists</button>
              </li>
              <li>
                <button className="hover:text-white">Developers</button>
              </li>
              <li>
                <button className="hover:text-white">Advertising</button>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Useful Links</h4>
            <ul className="space-y-2 text-zinc-400">
              <li>
                <button className="hover:text-white">Support</button>
              </li>
              <li>
                <button className="hover:text-white">Web Player</button>
              </li>
              <li>
                <button className="hover:text-white">Mobile App</button>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Social</h4>
            <ul className="space-y-2 text-zinc-400">
              <li>
                <button className="hover:text-white">Instagram</button>
              </li>
              <li>
                <button className="hover:text-white">Twitter</button>
              </li>
              <li>
                <button className="hover:text-white">Facebook</button>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-12 pt-8 border-t border-zinc-800 text-zinc-400 text-sm">
          <p>&copy;Kaloyan & Kaloyan Inc.</p>
        </div>
      </div>
    </footer>
  )
}