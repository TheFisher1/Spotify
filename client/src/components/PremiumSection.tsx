interface PremiumSectionProps {
    readonly onLogin: () => void
}

export function PremiumSection({onLogin}: PremiumSectionProps) {
    return (
    <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Get Premium Free for 1 Month
              </h2>
              <p className="text-zinc-400 mb-8">
                Just ₹119/month after. Debit and credit cards accepted. Cancel
                anytime.
              </p>
              <div className="space-y-4">
                <button onClick={onLogin} className="w-full md:w-auto bg-green-500 hover:bg-green-400 font-semibold px-8 py-4 rounded-full transition-colors">
                  GET STARTED
                </button>
                <button onClick={onLogin} className="w-full md:w-auto border border-white hover:border-green-500 hover:text-green-500 font-semibold px-8 py-4 rounded-full transition-colors">
                  SEE OTHER PLANS
                </button>
              </div>
            </div>
            <div className="relative">
              <img src="https://images.unsplash.com/photo-1494232410401-ad00d5433cfa?ixlib=rb-4.0.3" alt="Premium Music" className="rounded-lg shadow-2xl" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent rounded-lg" />
            </div>
          </div>
        </div>
      </section>
      )

}