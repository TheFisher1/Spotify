import { HeadphonesIcon, PlayCircleIcon, RadioIcon, UsersIcon } from "lucide-react";

export function Features() {
  return (
    <section className="py-20 bg-zinc-900/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center p-6">
              <PlayCircleIcon className="w-12 h-12 text-green-500 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Play Your Music</h3>
              <p className="text-zinc-400">
                Listen to your favorite songs anytime, anywhere.
              </p>
            </div>
            <div className="text-center p-6">
              <HeadphonesIcon className="w-12 h-12 text-green-500 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">High Quality</h3>
              <p className="text-zinc-400">
                Enjoy crystal clear sound quality.
              </p>
            </div>
            <div className="text-center p-6">
              <RadioIcon className="w-12 h-12 text-green-500 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Offline Mode</h3>
              <p className="text-zinc-400">Download and listen offline.</p>
            </div>
            <div className="text-center p-6">
              <UsersIcon className="w-12 h-12 text-green-500 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Share Music</h3>
              <p className="text-zinc-400">
                Share your favorite tracks with friends.
              </p>
            </div>
          </div>
        </div>
      </section>
      )
    }