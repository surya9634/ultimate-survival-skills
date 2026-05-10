import { Header } from '@/components/header';
import { Hero } from '@/components/hero';
import { EntryDetails } from '@/components/entry-details';
import { RegistrationForm } from '@/components/registration-form';
import { RulesLocation } from '@/components/rules-location';

export default function Home() {
  return (
    <>
      <Header />
      <main className="scroll-smooth">
        <Hero />
        <EntryDetails />
        <RegistrationForm />
        <RulesLocation />

        {/* Footer */}
        <footer className="bg-black border-t border-red-600 py-12">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
              {/* Brand */}
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <div className="bg-red-600 text-black px-3 py-2 font-black text-lg">USS</div>
                  <span className="text-white font-black text-xl">SURVIVAL SERIES</span>
                </div>
                <p className="text-gray-600 text-sm">
                  The ultimate mobile e-sports championship. Drop in, survive, dominate.
                </p>
              </div>

              {/* Tournament Links */}
              <div>
                <h4 className="text-white font-bold uppercase text-sm mb-4">TOURNAMENT</h4>
                <ul className="space-y-2 text-gray-500 text-sm">
                  <li>
                    <a href="#tournament" className="hover:text-white transition-colors">
                      Register
                    </a>
                  </li>
                  <li>
                    <a href="#rules" className="hover:text-white transition-colors">
                      Rules
                    </a>
                  </li>
                  <li>
                    <a href="/admin" className="hover:text-white transition-colors">
                      Admin Console
                    </a>
                  </li>
                </ul>
              </div>

              {/* Contact */}
              <div>
                <h4 className="text-white font-bold uppercase text-sm mb-4">CONTACT</h4>
                <ul className="space-y-2 text-gray-500 text-sm">
                  <li>
                    <a href="mailto:harshtuf0@gmail.com" className="hover:text-white transition-colors">
                      harshtuf0@gmail.com
                    </a>
                  </li>
                  <li>
                    <a href="https://instagram.com/yours.harxhhh" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
                      Instagram: yours.harxhhh
                    </a>
                  </li>
                  <li className="text-gray-600">
                    Sangamner, MH 422605
                  </li>
                </ul>
              </div>
            </div>

            <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
              <p className="text-gray-600 text-xs">© 2026 Ultimate Survival Series. All rights reserved.</p>
              <p className="text-gray-600 text-xs">Made with Emergent</p>
            </div>
          </div>
        </footer>
      </main>
    </>
  );
}
