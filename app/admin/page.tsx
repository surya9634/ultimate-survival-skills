'use client';

import { useState, useEffect } from 'react';
import { createClient } from '@/lib/supabase/client';

interface Registration {
  id: string;
  team_name: string;
  player_id_1: string;
  player_id_2: string;
  player_id_3: string;
  player_id_4: string;
  player_id_5: string | null;
  mobile_1: string;
  mobile_2: string | null;
  email_id: string;
  game_type: string;
  aadhar_id_1_url: string | null;
  aadhar_id_2_url: string | null;
  aadhar_id_3_url: string | null;
  aadhar_id_4_url: string | null;
  created_at: string;
}

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [registrations, setRegistrations] = useState<Registration[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedTeam, setSelectedTeam] = useState<Registration | null>(null);

  const supabase = createClient();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError('');

    const adminUsername = 'admin';
    const adminPassword = 'uss2026';

    if (username === adminUsername && password === adminPassword) {
      setIsAuthenticated(true);
      setUsername('');
      setPassword('');
      fetchRegistrations();
    } else {
      setLoginError('Invalid username or password');
    }
  };

  const fetchRegistrations = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('tournament_registrations')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;

      setRegistrations(data || []);
      console.log('[v0] Fetched registrations:', data?.length);
    } catch (error) {
      console.error('[v0] Fetch error:', error);
    } finally {
      setLoading(false);
    }
  };

  const downloadFile = async (url: string, filename: string) => {
    try {
      const response = await fetch(url);
      const blob = await response.blob();
      const blobUrl = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = blobUrl;
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(blobUrl);
    } catch (error) {
      console.error('[v0] Download error:', error);
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setRegistrations([]);
    setSelectedTeam(null);
  };

  // Login Screen
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center px-4 py-8">
        <div className="bg-black border-2 border-red-600 p-6 sm:p-8 max-w-sm w-full">
          <div className="flex items-center gap-2 mb-8">
            <div className="bg-red-600 text-black px-3 py-2 font-black text-lg">CG</div>
            <span className="text-white font-black text-xl">BUGS</span>
          </div>

          <h2 className="text-3xl font-black text-white mb-2">ADMIN LOGIN</h2>
          <p className="text-gray-500 text-xs mb-8 font-mono">// SECURE_CHANNEL</p>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="text-xs uppercase font-bold text-gray-400 mb-2 block">Username</label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter username"
                className="w-full bg-gray-900 border border-red-600 text-white px-4 py-3 focus:outline-none focus:ring-2 focus:ring-red-600"
              />
            </div>

            <div>
              <label className="text-xs uppercase font-bold text-gray-400 mb-2 block">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password"
                className="w-full bg-gray-900 border border-red-600 text-white px-4 py-3 focus:outline-none focus:ring-2 focus:ring-red-600"
              />
            </div>

            {loginError && (
              <div className="bg-red-600/20 border border-red-600 text-red-400 text-sm px-4 py-2">
                {loginError}
              </div>
            )}

            <button
              type="submit"
              className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-4 uppercase tracking-wide transition-all duration-300 transform hover:scale-105 mt-6"
            >
              AUTHENTICATE
            </button>
          </form>
        </div>
      </div>
    );
  }

  // Admin Dashboard
  return (
    <div className="min-h-screen bg-black">
      {/* Header */}
      <header className="sticky top-0 bg-black border-b border-red-600 z-40">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-red-600 text-black px-3 py-2 font-black text-lg">USS</div>
            <span className="text-white font-black text-xl">SURVIVAL SERIES</span>
            <span className="text-gray-600 text-xs font-mono ml-4">// ADMIN_CONSOLE</span>
          </div>
          <button
            onClick={handleLogout}
            className="border border-red-600 text-red-600 hover:bg-red-600 hover:text-white px-6 py-2 text-sm uppercase font-bold transition-all"
          >
            LOGOUT
          </button>
        </div>
      </header>

      <main className="container mx-auto px-4 py-6 sm:py-12">
        {/* Stats Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-6 mb-8 sm:mb-12">
          <div className="border border-red-600 p-4 sm:p-6 bg-black">
            <div className="text-gray-500 text-xs uppercase font-bold mb-2">Total Registrations</div>
            <p className="text-3xl sm:text-4xl md:text-5xl font-black text-white">{registrations.length}</p>
          </div>
          <div className="border border-red-600 p-4 sm:p-6 bg-black">
            <div className="text-gray-500 text-xs uppercase font-bold mb-2">BGMI Teams</div>
            <p className="text-3xl sm:text-4xl md:text-5xl font-black text-white">{registrations.filter(r => r.game_type === 'BGMI').length}</p>
          </div>
          <div className="border border-red-600 p-4 sm:p-6 bg-black col-span-1 sm:col-span-2 lg:col-span-1">
            <div className="text-gray-500 text-xs uppercase font-bold mb-2">Free Fire Teams</div>
            <p className="text-3xl sm:text-4xl md:text-5xl font-black text-white">{registrations.filter(r => r.game_type === 'FREE FIRE').length}</p>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-8">
          {/* Registrations List */}
          <div className="lg:col-span-2">
            <div className="space-y-3 sm:space-y-4 mb-6 sm:mb-8">
              <h2 className="text-2xl sm:text-3xl font-black text-white">REGISTRATIONS</h2>
              <p className="text-gray-500 text-xs sm:text-sm font-mono">// ALL_SUBMISSIONS</p>
            </div>

            {loading ? (
              <div className="text-center py-12">
                <p className="text-gray-400">Loading registrations...</p>
              </div>
            ) : registrations.length === 0 ? (
              <div className="border border-red-600 p-12 text-center">
                <p className="text-gray-400">No registrations yet</p>
              </div>
            ) : (
              <div className="space-y-3 sm:space-y-4">
                {registrations.map((reg) => (
                  <div
                    key={reg.id}
                    onClick={() => setSelectedTeam(reg)}
                    className="border border-red-600 p-3 sm:p-4 bg-black hover:bg-gray-900/50 cursor-pointer transition-all duration-300"
                  >
                    <div className="flex items-center justify-between mb-2 sm:mb-3 flex-col sm:flex-row gap-2">
                      <h3 className="text-white font-black text-base sm:text-lg truncate">{reg.team_name}</h3>
                      <span className={`text-xs uppercase font-bold px-2 sm:px-3 py-1 whitespace-nowrap ${reg.game_type === 'BGMI' ? 'bg-blue-600/20 text-blue-400' : 'bg-purple-600/20 text-purple-400'}`}>
                        {reg.game_type}
                      </span>
                    </div>
                    <p className="text-gray-400 text-xs sm:text-sm truncate">
                      {reg.player_id_1} • {reg.player_id_2} • {reg.player_id_3} • {reg.player_id_4}
                      {reg.player_id_5 && ` • ${reg.player_id_5}`}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Team Details */}
          {selectedTeam ? (
            <div className="border border-red-600 p-4 sm:p-6 bg-black sticky top-24 h-fit">
              <h3 className="text-xl sm:text-2xl font-black text-white mb-4 sm:mb-6 truncate">{selectedTeam.team_name}</h3>

              <div className="space-y-4 sm:space-y-6">
                {/* Team Info */}
                <div>
                  <p className="text-xs uppercase font-bold text-gray-500 mb-2 sm:mb-3">Team Details</p>
                  <div className="space-y-1 sm:space-y-2 text-xs sm:text-sm">
                    <p><span className="text-gray-500">Game:</span> <span className="text-white">{selectedTeam.game_type}</span></p>
                    <p><span className="text-gray-500">WhatsApp:</span> <span className="text-white">{selectedTeam.mobile_1}</span></p>
                    {selectedTeam.mobile_2 && <p><span className="text-gray-500">Alt Phone:</span> <span className="text-white">{selectedTeam.mobile_2}</span></p>}
                  </div>
                </div>

                {/* Players */}
                <div>
                  <p className="text-xs uppercase font-bold text-gray-500 mb-2 sm:mb-3">Teammates Details</p>
                  <div className="space-y-1 text-xs sm:text-sm">
                    <p><span className="text-gray-500">Leader:</span> <span className="text-white truncate">{selectedTeam.player_id_1}</span></p>
                    <p><span className="text-gray-500">Player 2:</span> <span className="text-white truncate">{selectedTeam.player_id_2}</span></p>
                    <p><span className="text-gray-500">Player 3:</span> <span className="text-white truncate">{selectedTeam.player_id_3}</span></p>
                    <p><span className="text-gray-500">Player 4:</span> <span className="text-white truncate">{selectedTeam.player_id_4}</span></p>
                    {selectedTeam.player_id_5 && <p><span className="text-gray-500">Player 5:</span> <span className="text-white truncate">{selectedTeam.player_id_5}</span></p>}
                  </div>
                </div>

                {/* Downloads */}
                <div>
                  <p className="text-xs uppercase font-bold text-gray-500 mb-2 sm:mb-3">Downloads</p>
                  <div className="space-y-2">
                    {selectedTeam.aadhar_id_1_url && (
                      <button
                        onClick={() => downloadFile(selectedTeam.aadhar_id_1_url!, `${selectedTeam.team_name}-payment.jpg`)}
                        className="w-full border border-red-600 text-red-600 hover:bg-red-600 hover:text-white px-4 py-2 text-xs uppercase font-bold transition-all"
                      >
                        📥 Payment Screenshot
                      </button>
                    )}
                  </div>
                </div>

                <button
                  onClick={() => setSelectedTeam(null)}
                  className="w-full bg-red-600 hover:bg-red-700 text-white px-4 py-2 text-xs uppercase font-bold transition-all"
                >
                  Close
                </button>
              </div>
            </div>
          ) : (
            <div className="border border-red-600 p-6 bg-black text-center">
              <p className="text-gray-400">Select a team to view details and download files</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
