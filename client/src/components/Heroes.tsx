import Button from './Button';

interface HeroesProps {
  readonly onLogin: () => void
}


export function Heroes({ onLogin }: HeroesProps) {
  return (
    <section className="relative py-20 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-4xl md:text-6xl font-bold mb-6">
            Music for everyone.
          </h2>
          <p className="text-xl md:text-2xl text-zinc-400 mb-8">
            Millions of songs. No credit card needed.
          </p>
          <Button onClick={onLogin} variant="primary" size="xl">
            Get Started
          </Button>
        </div>
      </div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-green-500 rounded-full opacity-10 blur-3xl -z-10" />
    </section>
  )
}