'use client';

import { useState } from 'react';
import { createClient } from '@/lib/supabase/client';

export function RegistrationForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');
  const [uploadProgress, setUploadProgress] = useState<Record<string, number>>({});
  const supabase = createClient();

  const [formData, setFormData] = useState({
    teamName: '',
    playerId1: '',
    playerId2: '',
    playerId3: '',
    playerId4: '',
    playerId5: '',
    mobile1: '',
    mobile2: '',
    gameType: 'SELECT GAME',
    teamLogoUrl: '',
    teamAdminId: '',
  });

  const [teamLogoFile, setTeamLogoFile] = useState<File | null>(null);
  const [paymentScreenshot, setPaymentScreenshot] = useState<File | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (type: 'logo' | 'payment') => (e: React.ChangeEvent<HTMLInputElement>) => {
    if (type === 'logo') {
      const file = e.target.files?.[0];
      setTeamLogoFile(file || null);
    } else if (type === 'payment') {
      const file = e.target.files?.[0];
      setPaymentScreenshot(file || null);
    }
  };

  const uploadFile = async (file: File, fileType: string): Promise<string> => {
    try {
      const progressKey = fileType === 'logo' ? 'logo' : 'payment';
      setUploadProgress((prev) => ({ ...prev, [progressKey]: 10 }));

      const fileExt = file.name.split('.').pop();
      const fileName = `${Date.now()}-${Math.random().toString(36).substring(2, 15)}.${fileExt}`;
      const filePath = `${fileType}s/${fileName}`;

      const { data, error: uploadError } = await supabase.storage
        .from('registrations')
        .upload(filePath, file, {
          upsert: true,
        });

      if (uploadError) {
        throw uploadError;
      }

      setUploadProgress((prev) => ({ ...prev, [progressKey]: 90 }));

      const { data: { publicUrl } } = supabase.storage
        .from('registrations')
        .getPublicUrl(filePath);

      setUploadProgress((prev) => ({ ...prev, [progressKey]: 100 }));
      
      return publicUrl;
    } catch (error) {
      console.error('[v0] Upload error:', error);
      throw error;
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitMessage('');

    try {
      if (!formData.teamName || !formData.playerId1 || !formData.mobile1) {
        setSubmitMessage('Please fill in all required fields');
        setIsSubmitting(false);
        return;
      }

      if (formData.gameType === 'SELECT GAME') {
        setSubmitMessage('Please select a game');
        setIsSubmitting(false);
        return;
      }

      let teamLogoUrl = '';
      let paymentScreenshotUrl = '';

      // Upload team logo
      if (teamLogoFile) {
        console.log('[v0] Uploading team logo...');
        teamLogoUrl = await uploadFile(teamLogoFile, 'logo');
      }

      // Upload payment screenshot
      if (paymentScreenshot) {
        console.log('[v0] Uploading payment screenshot...');
        paymentScreenshotUrl = await uploadFile(paymentScreenshot, 'payment');
      }

      // Save registration to database
      const { error: insertError } = await supabase
        .from('tournament_registrations')
        .insert([
          {
            team_name: formData.teamName,
            player_id_1: formData.playerId1,
            player_id_2: formData.playerId2,
            player_id_3: formData.playerId3,
            player_id_4: formData.playerId4,
            player_id_5: formData.playerId5 || null,
            mobile_1: formData.mobile1,
            mobile_2: formData.mobile2 || null,
            game_type: formData.gameType,
            team_logo_url: teamLogoUrl || null,
            team_admin_id: formData.teamAdminId || null,
            aadhar_id_1_url: paymentScreenshotUrl || null,
            aadhar_id_2_url: null,
            aadhar_id_3_url: null,
            aadhar_id_4_url: null,
          },
        ]);

      if (insertError) {
        console.log('[v0] Insert error:', insertError);
        setSubmitMessage('Failed to submit registration. Please try again.');
        setIsSubmitting(false);
        return;
      }

      setSubmitMessage('✓ Registration submitted successfully!');
      setFormData({
        teamName: '',
        playerId1: '',
        playerId2: '',
        playerId3: '',
        playerId4: '',
        playerId5: '',
        mobile1: '',
        mobile2: '',
        gameType: 'SELECT GAME',
        teamLogoUrl: '',
        teamAdminId: '',
      });
      setTeamLogoFile(null);
      setAadharFiles([]);
      setUploadProgress({});

      setTimeout(() => setSubmitMessage(''), 5000);
    } catch (err) {
      console.log('[v0] Submission error:', err);
      setSubmitMessage('An unexpected error occurred');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="registration" className="py-20 bg-black border-b border-red-600">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Left: Form */}
          <div className="lg:col-span-2">
            <div className="space-y-4 mb-8">
              <div className="flex items-center gap-3">
                <span className="bg-red-600 text-white px-3 py-1 font-bold text-xs">// 02</span>
                <span className="text-gray-600 font-mono text-sm">RECRUITMENT</span>
              </div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white">
                REGISTRATION <span className="text-red-600">FORM</span>
              </h2>
              <p className="text-gray-500 font-mono text-sm">[SECURE_CHANNEL]</p>
            </div>

            {submitMessage && (
              <div className={`mb-6 p-4 font-bold ${submitMessage.includes('✓') ? 'bg-green-500/10 border border-green-600 text-green-400' : 'bg-red-500/10 border border-red-600 text-red-400'}`}>
                {submitMessage}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Team Name */}
              <div>
                <label className="block text-xs font-bold text-white uppercase tracking-widest mb-2">
                  Team Name <span className="text-red-600">*</span>
                </label>
                <input
                  type="text"
                  name="teamName"
                  value={formData.teamName}
                  onChange={handleChange}
                  placeholder="Your Team Name"
                  className="w-full px-4 py-3 bg-black border border-gray-700 text-white placeholder-gray-600 focus:border-red-600 focus:outline-none transition-colors"
                />
              </div>

              {/* Player Name / Game Name */}
              <div>
                <label className="block text-xs font-bold text-white uppercase tracking-widest mb-2">
                  Name or Game Name <span className="text-red-600">*</span>
                </label>
                <input
                  type="text"
                  name="playerId1"
                  value={formData.playerId1}
                  onChange={handleChange}
                  placeholder="Your Name or Game Name"
                  className="w-full px-4 py-3 bg-black border border-gray-700 text-white placeholder-gray-600 focus:border-red-600 focus:outline-none transition-colors"
                />
              </div>

              {/* Teammates Details */}
              <div className="space-y-4">
                <label className="block text-xs font-bold text-white uppercase tracking-widest mb-2">
                  Teammates Details <span className="text-red-600">*</span>
                </label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input
                    type="text"
                    name="playerId2"
                    value={formData.playerId2}
                    onChange={handleChange}
                    placeholder="Teammate 2 Name/ID"
                    className="w-full px-4 py-3 bg-black border border-gray-700 text-white placeholder-gray-600 focus:border-red-600 focus:outline-none transition-colors"
                  />
                  <input
                    type="text"
                    name="playerId3"
                    value={formData.playerId3}
                    onChange={handleChange}
                    placeholder="Teammate 3 Name/ID"
                    className="w-full px-4 py-3 bg-black border border-gray-700 text-white placeholder-gray-600 focus:border-red-600 focus:outline-none transition-colors"
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input
                    type="text"
                    name="playerId4"
                    value={formData.playerId4}
                    onChange={handleChange}
                    placeholder="Teammate 4 Name/ID"
                    className="w-full px-4 py-3 bg-black border border-gray-700 text-white placeholder-gray-600 focus:border-red-600 focus:outline-none transition-colors"
                  />
                  <input
                    type="text"
                    name="playerId5"
                    value={formData.playerId5}
                    onChange={handleChange}
                    placeholder="Teammate 5 Name/ID (Optional)"
                    className="w-full px-4 py-3 bg-black border border-gray-700 text-white placeholder-gray-600 focus:border-red-600 focus:outline-none transition-colors"
                  />
                </div>
              </div>

              {/* Contact Info */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-white uppercase tracking-widest mb-2">
                    WhatsApp Number <span className="text-red-600">*</span>
                  </label>
                  <input
                    type="tel"
                    name="mobile1"
                    value={formData.mobile1}
                    onChange={handleChange}
                    placeholder="WhatsApp Number"
                    className="w-full px-4 py-3 bg-black border border-gray-700 text-white placeholder-gray-600 focus:border-red-600 focus:outline-none transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-white uppercase tracking-widest mb-2">
                    Alternative Mobile No.
                  </label>
                  <input
                    type="tel"
                    name="mobile2"
                    value={formData.mobile2}
                    onChange={handleChange}
                    placeholder="Mobile Number"
                    className="w-full px-4 py-3 bg-black border border-gray-700 text-white placeholder-gray-600 focus:border-red-600 focus:outline-none transition-colors"
                  />
                </div>
              </div>

              {/* Game Selection */}
              <div>
                <label className="block text-xs font-bold text-white uppercase tracking-widest mb-2">
                  Register For Which Game <span className="text-red-600">*</span>
                </label>
                <select
                  name="gameType"
                  value={formData.gameType}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-black border border-gray-700 text-white focus:border-red-600 focus:outline-none transition-colors uppercase font-bold"
                >
                  <option>SELECT GAME</option>
                  <option>BGMI</option>
                  <option>FREE FIRE</option>
                </select>
              </div>

              {/* Team Logo Upload */}
              <div>
                <label className="block text-xs font-bold text-white uppercase tracking-widest mb-2">
                  Team Logo
                </label>
                <div className="border-2 border-dashed border-gray-700 p-6 rounded hover:border-red-600 transition-colors cursor-pointer">
                  <input
                    type="file"
                    onChange={handleFileChange('logo')}
                    accept="image/*"
                    className="hidden"
                    id="team-logo-input"
                  />
                  <label htmlFor="team-logo-input" className="cursor-pointer flex flex-col items-center gap-2">
                    <span className="text-red-600 text-2xl">📁</span>
                    <span className="text-white font-bold">{teamLogoFile?.name || 'Choose File'}</span>
                    {uploadProgress.logo && <span className="text-xs text-gray-500">{uploadProgress.logo}%</span>}
                  </label>
                </div>
              </div>

              {/* Payment Section */}
              <div className="space-y-6 p-6 border border-red-600 bg-gray-900/30 rounded">
                <div className="flex flex-col items-center gap-4">
                  <h3 className="text-xl font-black text-white">SCAN TO PAY ₹500</h3>
                  <div className="w-48 h-48 bg-white p-2 flex items-center justify-center relative group">
                    <img 
                      src="/qr.jpeg" 
                      alt="Payment QR Code" 
                      className="w-full h-full object-contain"
                    />
                    <div className="absolute inset-0 border-2 border-red-600 animate-pulse pointer-events-none"></div>
                  </div>
                  <p className="text-xs text-gray-400 text-center max-w-xs">
                    Scan the QR code above using any UPI app (GPay, PhonePe, Paytm) to pay the entry fee of ₹500.
                  </p>
                </div>

                <div>
                  <label className="block text-xs font-bold text-white uppercase tracking-widest mb-2">
                    Upload Payment Screenshot <span className="text-red-600">*</span>
                  </label>
                  <div className="border-2 border-dashed border-gray-700 p-6 rounded hover:border-red-600 transition-colors cursor-pointer">
                    <input
                      type="file"
                      onChange={handleFileChange('payment')}
                      accept="image/*"
                      className="hidden"
                      id="payment-screenshot-input"
                    />
                    <label htmlFor="payment-screenshot-input" className="cursor-pointer flex flex-col items-center gap-2">
                      <span className="text-red-600 text-2xl">📸</span>
                      <span className="text-white font-bold">{paymentScreenshot?.name || 'Choose Screenshot'}</span>
                      {uploadProgress.payment && <span className="text-xs text-gray-500">{uploadProgress.payment}%</span>}
                    </label>
                  </div>
                </div>
              </div>

              {/* Agreement */}
              <div className="flex items-start gap-3 pt-4">
                <input type="checkbox" id="agree" className="mt-1 w-4 h-4 accent-red-600" />
                <label htmlFor="agree" className="text-xs text-gray-400">
                  I agree & accept down Tournament Guidelines.
                </label>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-red-600 hover:bg-red-700 disabled:bg-gray-700 text-white font-black px-8 py-4 uppercase tracking-widest transition-colors duration-200 mt-8"
              >
                {isSubmitting ? 'SUBMITTING...' : 'JOIN NOW'}
              </button>
            </form>
          </div>

          {/* Right: Requirements Sidebar */}
          <div className="space-y-6">
            <div className="border-l-4 border-red-600 pl-4">
              <div className="flex items-center gap-2 mb-4">
                <span className="text-red-600 font-mono text-sm">// 01</span>
              </div>
              <h3 className="text-xl font-black text-white mb-4">REQUIREMENTS</h3>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <span className="text-red-600 text-lg flex-shrink-0">●</span>
                  <span className="text-gray-300 text-sm">Valid Name or Game Name</span>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-red-600 text-lg flex-shrink-0">●</span>
                  <span className="text-gray-300 text-sm">Active WhatsApp Number</span>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-red-600 text-lg flex-shrink-0">●</span>
                  <span className="text-gray-300 text-sm">Entry Fee: ₹500 (Payment SS Required)</span>
                </div>
              </div>
            </div>

            <div className="border-l-4 border-red-600 pl-4">
              <div className="flex items-center gap-2 mb-4">
                <span className="text-red-600 font-mono text-sm">// 02</span>
              </div>
              <h3 className="text-xl font-black text-white mb-4">BENEFITS</h3>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <span className="text-red-600 text-lg flex-shrink-0">●</span>
                  <span className="text-gray-300 text-sm">Winner Trophy</span>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-red-600 text-lg flex-shrink-0">●</span>
                  <span className="text-gray-300 text-sm">Exclusive Certificate</span>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-red-600 text-lg flex-shrink-0">●</span>
                  <span className="text-gray-300 text-sm">Endorsement Products</span>
                </div>
              </div>
            </div>

            <div className="border-l-4 border-red-600 pl-4">
              <div className="flex items-center gap-2 mb-4">
                <span className="text-red-600 font-mono text-sm">// 03</span>
              </div>
              <h3 className="text-xl font-black text-white mb-4">WINNER</h3>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <span className="text-red-600 text-lg flex-shrink-0">●</span>
                  <span className="text-gray-300 text-sm">Top #1 Winner</span>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-red-600 text-lg flex-shrink-0">●</span>
                  <span className="text-gray-300 text-sm">Man of The Match</span>
                </div>
              </div>
            </div>

            <div className="border-l-4 border-red-600 pl-4">
              <div className="flex items-center gap-2 mb-4">
                <span className="text-red-600 font-mono text-sm">// 04</span>
              </div>
              <h3 className="text-xl font-black text-white mb-4">EVENTS LOCATION</h3>
              <p className="text-gray-400 text-sm font-bold mb-2">
                Ultimate Survival Series Arena
              </p>
              <p className="text-gray-500 text-xs">CG BUGS, 2nd Floor, Dhole Empire, Pune – Nashik Hwy, Govind Nagar, Sangamner, Maharashtra 422605</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
