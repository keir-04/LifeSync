import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { User, Hospital, LogOut, MapPin, Phone, Shield, Menu, X, Navigation, Ambulance } from 'lucide-react';

export default function LifeSyncApp() {
  // 1. STATE MANAGEMENT (Persistence Simulation)
  const [userRole, setUserRole] = useState(localStorage.getItem('role') || null);
  const [currentPage, setCurrentPage] = useState('home');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSOSActive, setIsSOSActive] = useState(false);

  // 2. LOGIN HANDLER
  const handleLogin = (role) => {
    localStorage.setItem('role', role);
    setUserRole(role);
    setCurrentPage('home');
  };

  const handleLogout = () => {
    localStorage.clear();
    setUserRole(null);
    setCurrentPage('login');
  };

  // 3. UI COMPONENTS
  
  // --- LOGIN SCREEN ---
  if (!userRole) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-6">
        <div className="w-full max-w-md bg-white rounded-3xl shadow-xl p-8 border border-slate-100">
          <div className="flex justify-center mb-6">
            <div className="p-4 bg-red-100 rounded-full"><Shield className="text-red-600 w-10 h-10" /></div>
          </div>
          <h1 className="text-3xl font-black text-center text-slate-800 mb-2">LifeSync</h1>
          <p className="text-center text-slate-500 mb-8">Select your portal to continue</p>
          
          <div className="space-y-4">
            <button onClick={() => handleLogin('user')} className="w-full flex items-center justify-between p-5 bg-slate-50 hover:bg-red-50 border border-slate-200 rounded-2xl transition-all group">
              <div className="flex items-center gap-4">
                <User className="text-slate-400 group-hover:text-red-600" />
                <span className="font-bold text-slate-700">Citizen Portal</span>
              </div>
              <span className="text-xs font-bold text-slate-400">LOGIN</span>
            </button>

            <button onClick={() => handleLogin('hospital')} className="w-full flex items-center justify-between p-5 bg-slate-50 hover:bg-blue-50 border border-slate-200 rounded-2xl transition-all group">
              <div className="flex items-center gap-4">
                <Hospital className="text-slate-400 group-hover:text-blue-600" />
                <span className="font-bold text-slate-700">Hospital Staff</span>
              </div>
              <span className="text-xs font-bold text-slate-400">SECURE ACCESS</span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  // --- CITIZEN PORTAL ---
  if (userRole === 'user') {
    return (
      <div className="min-h-screen bg-white text-slate-900 relative overflow-hidden">
        {/* Sliding Menu Overlay */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div initial={{ x: '-100%' }} animate={{ x: 0 }} exit={{ x: '-100%' }} className="fixed inset-0 z-50 bg-white w-3/4 shadow-2xl p-6">
              <div className="flex justify-between mb-10">
                <span className="font-black text-red-600 text-xl">LifeSync</span>
                <X onClick={() => setIsMenuOpen(false)} />
              </div>
              <nav className="space-y-6">
                <div onClick={() => {setCurrentPage('profile'); setIsMenuOpen(false)}} className="flex items-center gap-4 text-lg font-bold"><User /> Profile</div>
                <div onClick={() => {setCurrentPage('nearest'); setIsMenuOpen(false)}} className="flex items-center gap-4 text-lg font-bold"><Hospital /> Nearest Hospitals</div>
                <div onClick={handleLogout} className="flex items-center gap-4 text-lg font-bold text-red-600"><LogOut /> Log Out</div>
              </nav>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Header */}
        <header className="p-6 flex justify-between items-center">
          <Menu onClick={() => setIsMenuOpen(true)} className="w-8 h-8 cursor-pointer" />
          <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse"></div>
        </header>

        {/* Dynamic Pages */}
        <main className="p-6">
          {currentPage === 'home' && (
            <div className="flex flex-col items-center justify-center py-20">
              <h2 className="text-2xl font-black mb-2">Ready for Assistance</h2>
              <p className="text-slate-400 mb-16">Press in case of emergency</p>
              
              <motion.button 
                whileTap={{ scale: 0.9 }}
                animate={isSOSActive ? { scale: [1, 1.2, 1] } : {}}
                transition={{ repeat: Infinity, duration: 1 }}
                onClick={() => setIsSOSActive(!isSOSActive)}
                className={`w-64 h-64 rounded-full flex items-center justify-center text-white text-5xl font-black shadow-2xl transition-colors ${isSOSActive ? 'bg-orange-500' : 'bg-red-600 shadow-red-200'}`}
              >
                {isSOSActive ? 'ACTIVE' : 'SOS'}
              </motion.button>
              
              {isSOSActive && <p className="mt-8 text-red-600 font-bold animate-bounce uppercase">GPS Tracking & Family Notified</p>}
            </div>
          )}

          {currentPage === 'profile' && (
            <div className="animate-in slide-in-from-bottom duration-300">
              <button onClick={() => setCurrentPage('home')} className="mb-6 text-slate-400 font-bold">← Back</button>
              <h2 className="text-3xl font-black mb-6">Your Profile</h2>
              <div className="bg-slate-50 p-6 rounded-3xl space-y-4">
                <div><label className="text-xs font-bold text-slate-400 uppercase">Name</label><p className="font-bold">John Doe</p></div>
                <div><label className="text-xs font-bold text-slate-400 uppercase">Blood Group</label><p className="font-bold text-red-600">O+ Positive</p></div>
                <div className="pt-4 border-t">
                  <label className="text-xs font-bold text-slate-400 uppercase">Emergency Contacts (5)</label>
                  <div className="space-y-2 mt-2">
                    {['Mom: +91 98765 43210', 'Dad: +91 98765 43211', 'Wife: +91 98765 43212', 'Brother: +91 98765 43213', 'Friend: +91 98765 43214'].map(c => (
                      <p key={c} className="text-sm font-medium bg-white p-2 rounded-lg border">{c}</p>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {currentPage === 'nearest' && (
            <div>
              <button onClick={() => setCurrentPage('home')} className="mb-6 text-slate-400 font-bold">← Back</button>
              <h2 className="text-3xl font-black mb-6">Top 3 Facilities</h2>
              <div className="space-y-4">
                {[
                  { name: 'City General', dist: '1.2km', beds: '4', time: '5 mins' },
                  { name: 'St. Mary ICU', dist: '2.5km', beds: '2', time: '9 mins' },
                  { name: 'Metro Health', dist: '3.8km', beds: '12', time: '12 mins' }
                ].map((h, i) => (
                  <div key={i} className="p-5 bg-white border border-slate-100 rounded-3xl shadow-sm flex justify-between items-center">
                    <div>
                      <h4 className="font-bold">{h.name}</h4>
                      <p className="text-xs text-slate-500">{h.dist} • {h.beds} ICU Beds Avail.</p>
                    </div>
                    <div className="text-right">
                      <p className="text-blue-600 font-black">{h.time}</p>
                      <Navigation className="w-4 h-4 ml-auto text-slate-300" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </main>
      </div>
    );
  }

  // --- HOSPITAL STAFF VIEW ---
  if (userRole === 'hospital') {
    return (
      <div className="min-h-screen bg-slate-900 text-white p-6">
        <header className="flex justify-between items-center mb-10">
          <div><h2 className="text-xl font-black">Staff Control</h2><p className="text-xs text-slate-400 underline decoration-green-500">Live Station Active</p></div>
          <LogOut onClick={handleLogout} className="text-slate-500" />
        </header>

        <div className="space-y-6">
          <div className="bg-slate-800 p-6 rounded-3xl border border-red-500/30 animate-pulse">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-3 h-3 bg-red-600 rounded-full"></div>
              <h3 className="font-bold text-red-500">ACTIVE INBOUND SOS</h3>
            </div>
            <p className="text-sm text-slate-300 mb-4 font-mono uppercase tracking-tighter">Patient: John Doe (Male, 28) <br/>Loc: 17.3850° N, 78.4867° E</p>
            <button className="w-full bg-red-600 py-4 rounded-xl font-bold flex items-center justify-center gap-2">
              <MapPin /> TRACK ON MAP
            </button>
          </div>

          <div className="bg-slate-800 p-6 rounded-3xl">
            <h3 className="font-bold mb-4 flex items-center gap-2"><Ambulance className="w-5 h-5" /> Dispatch Unit</h3>
            <label className="text-[10px] text-slate-400 uppercase font-bold">Assign Driver Number</label>
            <div className="flex gap-2 mt-1">
              <input type="tel" placeholder="+91 00000 00000" className="flex-1 bg-slate-700 border-none rounded-xl p-3 text-sm" />
              <button className="bg-blue-600 px-4 rounded-xl font-bold font-sm">SEND</button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}