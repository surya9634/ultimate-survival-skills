'use client';

export function EntryDetails() {
  return (
    <section id="tournament" className="py-16 bg-black border-b border-red-600">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-8 max-w-3xl mx-auto">
          {/* Entry Fee Card */}
          <div className="border border-red-600 px-6 sm:px-10 md:px-14 py-6 sm:py-8 bg-black hover:bg-gray-900/50 transition-all duration-300">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 flex items-center justify-center text-red-600 text-lg">📦</div>
              <h3 className="text-xs sm:text-sm font-bold text-gray-500 uppercase">Entry Fee</h3>
            </div>
            <p className="text-3xl sm:text-4xl md:text-5xl font-black text-white mb-2">₹500</p>
            <p className="text-xs text-gray-500">// PER TEAM • REGISTER NOW</p>
          </div>

          {/* Prize Pool Card */}
          <div className="border border-red-600 px-6 sm:px-10 md:px-14 py-6 sm:py-8 bg-black hover:bg-gray-900/50 transition-all duration-300">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 flex items-center justify-center text-red-600 text-lg">💰</div>
              <h3 className="text-xs sm:text-sm font-bold text-gray-500 uppercase">Prize Pool</h3>
            </div>
            <p className="text-3xl sm:text-4xl md:text-5xl font-black text-white mb-2">₹40,000</p>
            <p className="text-xs text-gray-500">// CASH • WINNER TAKES ALL</p>
          </div>
        </div>

        {/* Notes section */}
        <div className="mt-8 sm:mt-12 max-w-3xl mx-auto space-y-2 sm:space-y-3 border-l-2 border-red-600 pl-4 sm:pl-6">
          <p className="text-xs sm:text-sm text-red-600 font-bold">
            Note: Before registration, please carefully read all the tournament{' '}
            <a href="#rules" className="underline hover:text-red-500">
              guidelines
            </a>
            .
          </p>
          <p className="text-xs sm:text-sm text-red-600 font-bold">Note: Register for upcoming Tournament.</p>
        </div>
      </div>
    </section>
  );
}
