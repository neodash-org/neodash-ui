import React from 'react';

const SettingsPage = () => (
  <div className="max-w-4xl mx-auto px-4 py-5 flex flex-col gap-8">
    {/* Settings Header */}
    <section className="flex flex-col gap-4">
      <h2 className="text-neon-cyan text-2xl font-[var(--font-cyberpunk)] tracking-wider">
        Settings
      </h2>
      <p className="text-white/70">Customize your Neodash experience</p>
    </section>

    {/* Profile Settings */}
    <section className="neodash-card bg-bg-card/70 border border-white/10 rounded-2xl shadow-[0_4px_32px_var(--color-neon-cyan-88)] backdrop-blur-lg p-6">
      <h3 className="text-neon-cyan text-xl font-[var(--font-cyberpunk)] mb-6 tracking-wide">
        Profile Settings
      </h3>
      <div className="space-y-6">
        <div className="flex items-center gap-6">
          <div className="w-20 h-20 rounded-full bg-gradient-to-br from-neon-pink to-neon-cyan shadow-[0_0_12px_var(--color-neon-cyan),0_0_24px_var(--color-neon-pink)] flex items-center justify-center font-bold text-white text-2xl tracking-wider font-[var(--font-cyberpunk)]">
            N
          </div>
          <div className="flex-1">
            <button className="bg-neon-cyan/20 text-neon-cyan border border-neon-cyan/30 rounded-lg px-4 py-2 font-medium hover:bg-neon-cyan/30 transition-colors">
              Change Avatar
            </button>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-white/70 text-sm mb-2">Display Name</label>
            <input
              type="text"
              defaultValue="Neodash User"
              className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder:text-white/50 focus:border-neon-cyan focus:outline-none transition-colors"
            />
          </div>
          <div>
            <label className="block text-white/70 text-sm mb-2">Email</label>
            <input
              type="email"
              defaultValue="user@neodash.com"
              className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder:text-white/50 focus:border-neon-cyan focus:outline-none transition-colors"
            />
          </div>
        </div>
      </div>
    </section>

    {/* Preferences */}
    <section className="neodash-card bg-bg-card/70 border border-white/10 rounded-2xl shadow-[0_4px_32px_var(--color-neon-cyan-88)] backdrop-blur-lg p-6">
      <h3 className="text-neon-cyan text-xl font-[var(--font-cyberpunk)] mb-6 tracking-wide">
        Preferences
      </h3>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <div className="text-white font-medium">Dark Mode</div>
            <div className="text-white/60 text-sm">Use dark theme by default</div>
          </div>
          <div className="w-12 h-7 bg-neon-cyan/20 border border-neon-cyan rounded-full flex items-center justify-end cursor-pointer">
            <span className="block w-6 h-6 bg-neon-cyan rounded-full shadow-[0_0_8px_var(--color-neon-cyan)] transition-transform translate-x-0"></span>
          </div>
        </div>
        <div className="flex items-center justify-between">
          <div>
            <div className="text-white font-medium">Notifications</div>
            <div className="text-white/60 text-sm">Receive push notifications</div>
          </div>
          <div className="w-12 h-7 bg-white/10 border border-white/20 rounded-full flex items-center cursor-pointer">
            <span className="block w-6 h-6 bg-white/30 rounded-full transition-transform translate-x-5"></span>
          </div>
        </div>
        <div className="flex items-center justify-between">
          <div>
            <div className="text-white font-medium">Auto-refresh</div>
            <div className="text-white/60 text-sm">Automatically refresh data every 30s</div>
          </div>
          <div className="w-12 h-7 bg-neon-cyan/20 border border-neon-cyan rounded-full flex items-center justify-end cursor-pointer">
            <span className="block w-6 h-6 bg-neon-cyan rounded-full shadow-[0_0_8px_var(--color-neon-cyan)] transition-transform translate-x-0"></span>
          </div>
        </div>
      </div>
    </section>

    {/* Security */}
    <section className="neodash-card bg-bg-card/70 border border-white/10 rounded-2xl shadow-[0_4px_32px_var(--color-neon-cyan-88)] backdrop-blur-lg p-6">
      <h3 className="text-neon-cyan text-xl font-[var(--font-cyberpunk)] mb-6 tracking-wide">
        Security
      </h3>
      <div className="space-y-4">
        <button className="w-full bg-neon-pink/20 text-neon-pink border border-neon-pink/30 rounded-lg px-4 py-3 font-medium hover:bg-neon-pink/30 transition-colors text-left">
          Change Password
        </button>
        <button className="w-full bg-neon-cyan/20 text-neon-cyan border border-neon-cyan/30 rounded-lg px-4 py-3 font-medium hover:bg-neon-cyan/30 transition-colors text-left">
          Enable 2FA
        </button>
        <button className="w-full bg-white/5 text-white border border-white/10 rounded-lg px-4 py-3 font-medium hover:bg-white/10 transition-colors text-left">
          Connected Wallets
        </button>
      </div>
    </section>

    {/* Data & Privacy */}
    <section className="neodash-card bg-bg-card/70 border border-white/10 rounded-2xl shadow-[0_4px_32px_var(--color-neon-cyan-88)] backdrop-blur-lg p-6">
      <h3 className="text-neon-cyan text-xl font-[var(--font-cyberpunk)] mb-6 tracking-wide">
        Data & Privacy
      </h3>
      <div className="space-y-4">
        <button className="w-full bg-white/5 text-white border border-white/10 rounded-lg px-4 py-3 font-medium hover:bg-white/10 transition-colors text-left">
          Export My Data
        </button>
        <button className="w-full bg-white/5 text-white border border-white/10 rounded-lg px-4 py-3 font-medium hover:bg-white/10 transition-colors text-left">
          Privacy Policy
        </button>
        <button className="w-full bg-white/5 text-white border border-white/10 rounded-lg px-4 py-3 font-medium hover:bg-white/10 transition-colors text-left">
          Terms of Service
        </button>
      </div>
    </section>

    {/* Danger Zone */}
    <section className="neodash-card bg-red-500/10 border border-red-500/20 rounded-2xl shadow-[0_4px_32px_var(--color-red-500-88)] backdrop-blur-lg p-6">
      <h3 className="text-red-400 text-xl font-[var(--font-cyberpunk)] mb-6 tracking-wide">
        Danger Zone
      </h3>
      <div className="space-y-4">
        <button className="w-full bg-red-500/20 text-red-400 border border-red-500/30 rounded-lg px-4 py-3 font-medium hover:bg-red-500/30 transition-colors">
          Delete Account
        </button>
        <p className="text-red-400/70 text-sm">
          This action cannot be undone. All your data will be permanently deleted.
        </p>
      </div>
    </section>
  </div>
);

export default SettingsPage;
