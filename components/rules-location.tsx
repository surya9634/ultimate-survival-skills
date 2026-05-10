'use client';

export function RulesLocation() {
  const rules = [
    'Only Mobile Players Allowed.',
    'There will be 3 maps — Erangel, Sanhok, Miramar for BGMI and Bermuda, Purgatory, Kalahari for Frefire',
    'If any third-party apps, zip files, or hacks are found on a team&apos;s device, the team will be disqualified from esports.',
    'A minimum level of 40 is required to enter the Match Lobby.',
    'There will be 15-18 teams per Match Lobby.',
    'In case of a low team count, the management will decide to postpone the event until further notice.',
  ];

  return (
    <>
      {/* Rules Section */}
      <section id="rules" className="py-20 bg-black border-b border-red-600">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="space-y-4 mb-12">
              <div className="flex items-center gap-3">
                <span className="bg-red-600 text-white px-3 py-1 font-bold text-xs">// 03</span>
                <span className="text-gray-600 font-mono text-sm">CODEX</span>
              </div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white">
                RULES & <span className="text-red-600">REGULATION</span>
              </h2>
              <p className="text-gray-500 text-xs sm:text-sm max-w-2xl">
                Read carefully. Anything outside this codex is treated as a breach. Submitted complaints are reviewed by the Ultimate Survival Series arbitration desk.
              </p>
              <p className="text-gray-600 text-xs font-mono">VERSION 04.12.25</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 sm:gap-6">
              {rules.map((rule, idx) => (
                <div key={idx} className="flex gap-3 sm:gap-6 p-4 sm:p-6 border-l-2 border-red-600 bg-black hover:bg-gray-900/50 transition-colors">
                  <div className="flex-shrink-0">
                    <div className="text-2xl sm:text-4xl font-black text-red-600 w-8 sm:w-12 text-right">
                      {String(idx + 1).padStart(2, '0')}
                    </div>
                  </div>
                  <p className="text-gray-300 text-xs sm:text-sm leading-relaxed">{rule}</p>
                  <div className="flex-shrink-0 pt-1">
                    <div className="w-3 h-3 sm:w-4 sm:h-4 rounded-full border-2 border-gray-700"></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Events Location Section */}
      <section className="py-20 bg-black">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Location Info */}
            <div className="space-y-8">
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <span className="bg-red-600 text-white px-3 py-1 font-bold text-xs">// 04</span>
                  <span className="text-gray-600 font-mono text-sm">LOCATION</span>
                </div>
                <h2 className="text-5xl font-black text-white">EVENTS <span className="text-gray-600">LOCATION</span></h2>
              </div>

              <div className="border-l-4 border-red-600 pl-6 space-y-4">
                <div>
                  <p className="text-xs font-bold text-gray-600 uppercase tracking-widest mb-2">Venue</p>
                  <p className="text-white font-bold text-lg">
                    Ultimate Survival Series Arena (CG Bugs)
                  </p>
                </div>

                <div>
                  <p className="text-xs font-bold text-gray-600 uppercase tracking-widest mb-2">Address</p>
                  <p className="text-gray-400 text-sm leading-relaxed">
                    CG BUGS, 2nd Floor, Dhole Empire, Pune – Nashik Hwy, Govind Nagar, Sangamner, Maharashtra 422605
                  </p>
                </div>

                <div className="flex items-start gap-3 pt-4">
                  <span className="text-red-600 text-xl flex-shrink-0 mt-1">📍</span>
                  <div>
                    <p className="text-gray-300 text-sm">Located in the heart of Sangamner, Maharashtra</p>
                    <p className="text-gray-600 text-xs mt-1">Perfect venue for offline finals and champion celebrations</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Map */}
            <div className="h-96 lg:h-full min-h-96">
              <iframe
                title="Tournament Location Map"
                width="100%"
                height="100%"
                frameBorder="0"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3723.8373485844373!2d81.6355197!3d21.2432889!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a28ddaf49daaaaa%3A0x1234567890abcdef!2sCG%20BUGS%20School%20of%203D%20Animation!5e0!3m2!1sen!2sin!4v1234567890"
                allowFullScreen={true}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="border border-red-600"
              ></iframe>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
