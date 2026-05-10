'use client';

export function TournamentInfo() {
  const requirements = [
    'Min 4 Team Players',
    'Min. 40 Level Required',
    'Mostly Responsive Time',
  ];

  const benefits = [
    'Winner Trophy',
    'Exclusive Certificate',
    'Endorsement Products',
  ];

  const winners = ['Top #1 Winner', 'Man Of The Match'];

  return (
    <>
      {/* Requirements Section */}
      <section className="py-16 bg-[#1a1f3a]">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8 text-white">Requirements</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {requirements.map((req, idx) => (
              <div
                key={idx}
                className="flex items-start gap-4 p-6 border-l-4 border-pink-400 bg-[#0a0e27] rounded-r-lg hover:bg-[#1a1f3a] transition-all duration-300"
              >
                <div className="w-6 h-6 rounded-full bg-red-500/30 flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="w-3 h-3 rounded-full bg-red-500"></span>
                </div>
                <p className="text-gray-200 font-medium">{req}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 bg-[#0a0e27]">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8 text-white">Benefits</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {benefits.map((benefit, idx) => (
              <div
                key={idx}
                className="flex items-start gap-4 p-6 border-l-4 border-cyan-400 bg-[#1a1f3a] rounded-r-lg hover:bg-[#2a2f4a] transition-all duration-300"
              >
                <div className="w-6 h-6 rounded-full bg-green-500/30 flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="w-3 h-3 rounded-full bg-green-500"></span>
                </div>
                <p className="text-gray-200 font-medium">{benefit}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Winner Section */}
      <section className="py-16 bg-[#1a1f3a]">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8 text-white">Winner</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {winners.map((winner, idx) => (
              <div
                key={idx}
                className="flex items-start gap-4 p-6 border-l-4 border-purple-400 bg-[#0a0e27] rounded-r-lg hover:bg-[#1a1f3a] transition-all duration-300"
              >
                <div className="w-6 h-6 rounded-full bg-yellow-500/30 flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="w-3 h-3 rounded-full bg-yellow-500"></span>
                </div>
                <p className="text-gray-200 font-medium">{winner}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
