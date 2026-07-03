"use client";

import React, { useState, useEffect } from 'react';
import { User, Mail, Phone, Lock, CheckCircle2, AlertCircle, ShoppingBag, Users, Star, LogOut, Check } from 'lucide-react';
import Link from 'next/link';

export default function StaffPage() {
  const [activeTab, setActiveTab] = useState('login'); // 'login' | 'register' | 'owner'
  const [email, setEmail] = useState('');
  const [mobile, setMobile] = useState('');
  const [name, setName] = useState('');
  const [ownerPasscode, setOwnerPasscode] = useState('');
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState(null); // 'staff' | 'owner'
  const [currentUser, setCurrentUser] = useState(null);
  
  // Dashboard Data State
  const [orders, setOrders] = useState([]);
  const [feedbacks, setFeedbacks] = useState([]);
  const [staffList, setStaffList] = useState([]);
  const [refreshInterval, setRefreshInterval] = useState(null);

  // Load active session from sessionStorage to persist login state across page refreshes
  useEffect(() => {
    const session = sessionStorage.getItem('tb_session');
    if (session) {
      try {
        const parsed = JSON.parse(session);
        setIsLoggedIn(true);
        setUserRole(parsed.role);
        setCurrentUser(parsed.user);
        loadDashboardData(parsed.role);
      } catch (e) {
        console.error("Failed to restore session", e);
      }
    }
  }, []);

  // Set up polling for new orders when logged in
  useEffect(() => {
    if (isLoggedIn) {
      const interval = setInterval(() => {
        loadDashboardData(userRole);
      }, 5000); // Poll every 5 seconds for real-time kitchen order updates
      return () => clearInterval(interval);
    }
  }, [isLoggedIn, userRole]);

  const loadDashboardData = async (role) => {
    try {
      if (role === 'staff' || role === 'owner') {
        const ordersRes = await fetch('/api/orders');
        const ordersData = await ordersRes.json();
        if (ordersData.success) setOrders(ordersData.data);
      }

      if (role === 'owner') {
        const staffRes = await fetch('/api/staff?action=list');
        const staffData = await staffRes.json();
        if (staffData.success) setStaffList(staffData.data);

        const feedbackRes = await fetch('/api/feedback');
        const feedbackData = await feedbackRes.json();
        if (feedbackData.success) setFeedbacks(feedbackData.data);
      }
    } catch (err) {
      console.error("Failed to fetch dashboard statistics", err);
    }
  };

  // Staff Login
  const handleLogin = async (e) => {
    e.preventDefault();
    if (!email || !mobile) {
      setError('Please fill in both email and mobile fields.');
      return;
    }

    setLoading(true);
    setError('');
    
    try {
      const res = await fetch('/api/staff?action=login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, mobile })
      });

      const data = await res.json();
      
      if (!res.ok) {
        throw new Error(data.error || 'Authentication failed');
      }

      const sessionObj = { role: 'staff', user: data.staff };
      sessionStorage.setItem('tb_session', JSON.stringify(sessionObj));
      setCurrentUser(data.staff);
      setUserRole('staff');
      setIsLoggedIn(true);
      loadDashboardData('staff');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Staff Registration
  const handleRegister = async (e) => {
    e.preventDefault();
    if (!name || !email || !mobile) {
      setError('Please fill in all registration fields.');
      return;
    }

    setLoading(true);
    setError('');
    setSuccess('');

    try {
      const res = await fetch('/api/staff?action=register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, mobile })
      });

      const data = await res.json();
      
      if (!res.ok) {
        throw new Error(data.error || 'Registration failed');
      }

      setSuccess(data.message);
      setName('');
      setEmail('');
      setMobile('');
      setActiveTab('login');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Owner Access (using owner code 877023)
  const handleOwnerAccess = (e) => {
    e.preventDefault();
    if (ownerPasscode === '877023') {
      const sessionObj = { role: 'owner', user: { name: 'Owner' } };
      sessionStorage.setItem('tb_session', JSON.stringify(sessionObj));
      setUserRole('owner');
      setCurrentUser({ name: 'Owner' });
      setIsLoggedIn(true);
      setError('');
      setOwnerPasscode('');
      loadDashboardData('owner');
    } else {
      setError('Invalid owner passcode. Please check and try again.');
    }
  };

  // Log Out
  const handleLogout = () => {
    sessionStorage.removeItem('tb_session');
    setIsLoggedIn(false);
    setUserRole(null);
    setCurrentUser(null);
    setError('');
    setSuccess('');
  };

  // Owner Approves Staff
  const handleApproveStaff = async (staffId, status) => {
    try {
      const res = await fetch('/api/staff?action=update-status', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ staffId, status })
      });
      const data = await res.json();
      if (data.success) {
        setStaffList(prev => prev.map(s => s.id === staffId ? { ...s, status } : s));
      }
    } catch (err) {
      console.error("Failed to update staff credentials status", err);
    }
  };

  if (isLoggedIn) {
    return (
      <div className="min-h-screen bg-cream py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto space-y-8">
          
          {/* Header Panel */}
          <div className="bg-white border border-accent/15 rounded-3xl p-6 shadow-sm flex flex-col md:flex-row justify-between items-center gap-4">
            <div>
              <span className="text-[10px] text-primary font-extrabold uppercase tracking-widest block bg-primary/5 px-2.5 py-1 rounded-full w-fit">
                {userRole === 'owner' ? 'Owner Portal' : 'Kitchen Staff Portal'}
              </span>
              <h1 className="font-serif text-2xl font-black text-primary mt-1">
                Taste Bite Control Panel
              </h1>
            </div>
            <div className="flex items-center space-x-4 font-sans text-sm">
              <span className="text-dark-muted font-medium">Logged in: <strong>{currentUser?.name}</strong></span>
              <button
                onClick={handleLogout}
                className="flex items-center space-x-1.5 px-4 py-2 bg-primary/5 text-primary hover:bg-primary hover:text-white rounded-xl transition-all duration-200 font-bold text-xs uppercase"
              >
                <LogOut className="w-4 h-4" />
                <span>Log Out</span>
              </button>
            </div>
          </div>

          {/* Owner-Only Staff Approvals Section */}
          {userRole === 'owner' && (
            <div className="bg-white border border-accent/15 rounded-3xl p-6 shadow-sm space-y-6">
              <h2 className="font-serif text-xl font-bold text-primary border-b border-accent/10 pb-4 flex items-center space-x-2">
                <Users className="w-5 h-5 text-primary-light" />
                <span>Pending Staff Approvals</span>
              </h2>

              <div className="overflow-x-auto">
                {staffList.filter(s => s.status === 'pending').length > 0 ? (
                  <table className="w-full text-left font-sans text-xs sm:text-sm">
                    <thead>
                      <tr className="text-dark-muted border-b border-accent/10 pb-2 font-bold">
                        <th className="py-2">Name</th>
                        <th>Email</th>
                        <th>Mobile</th>
                        <th>Status</th>
                        <th className="text-right">Action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-accent/5">
                      {staffList.filter(s => s.status === 'pending').map((staff) => (
                        <tr key={staff.id} className="text-primary font-medium hover:bg-cream/40 transition-colors">
                          <td className="py-3 font-bold">{staff.name}</td>
                          <td>{staff.email}</td>
                          <td>{staff.mobile}</td>
                          <td>
                            <span className="px-2 py-0.5 rounded-full bg-amber-50 text-amber-600 font-bold uppercase text-[9px] border border-amber-200">
                              {staff.status}
                            </span>
                          </td>
                          <td className="text-right py-3 space-x-2">
                            <button
                              onClick={() => handleApproveStaff(staff.id, 'approved')}
                              className="px-3 py-1.5 bg-[#25D366] text-white hover:bg-[#20ba5a] text-[10px] font-bold uppercase rounded-lg shadow-sm transition-all"
                            >
                              Approve
                            </button>
                            <button
                              onClick={() => handleApproveStaff(staff.id, 'rejected')}
                              className="px-3 py-1.5 bg-red-600 text-white hover:bg-red-500 text-[10px] font-bold uppercase rounded-lg shadow-sm transition-all"
                            >
                              Reject
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                ) : (
                  <p className="text-xs text-dark-muted text-center py-4 font-medium">No pending staff approvals at the moment.</p>
                )}
              </div>
            </div>
          )}

          {/* Kitchen Orders Section */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Orders Feed */}
            <div className="lg:col-span-2 bg-white border border-accent/15 rounded-3xl p-6 shadow-sm space-y-6">
              <h2 className="font-serif text-xl font-bold text-primary border-b border-accent/10 pb-4 flex items-center space-x-2">
                <ShoppingBag className="w-5 h-5 text-primary-light" />
                <span>Active Table Orders</span>
                <span className="bg-primary/5 text-primary text-xs font-bold px-2 py-0.5 rounded-full ml-auto animate-pulse">
                  Live Feed
                </span>
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {orders.length > 0 ? (
                  orders.map((order) => (
                    <div key={order.id} className="border border-accent/15 rounded-2xl p-5 space-y-4 shadow-sm hover:shadow-md transition-shadow relative">
                      <div className="flex justify-between items-start">
                        <div>
                          <span className="text-[10px] text-accent font-extrabold uppercase tracking-wider block">Table {order.table_number}</span>
                          <span className="text-sm font-bold text-primary font-sans">{order.order_id}</span>
                        </div>
                        <span className="bg-primary/10 text-primary text-xs font-bold px-2.5 py-0.5 rounded-full uppercase">
                          {order.status}
                        </span>
                      </div>

                      {/* Items */}
                      <div className="space-y-1.5 border-y border-dashed border-accent/10 py-3 text-xs font-sans text-dark-muted">
                        {Array.isArray(order.items) && order.items.map((item, idx) => (
                          <div key={idx} className="flex justify-between">
                            <span>{item.name} <strong className="text-primary font-bold">x{item.quantity}</strong></span>
                            <span className="font-bold text-primary">₹{item.price * item.quantity}</span>
                          </div>
                        ))}
                      </div>

                      <div className="flex justify-between items-center">
                        <span className="text-xs text-dark-muted">Total: <strong className="text-primary text-sm font-bold">₹{order.total_amount}</strong></span>
                        <span className="text-[10px] text-dark-muted">{new Date(order.created_at).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</span>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="col-span-full text-center py-12 space-y-2">
                    <span className="text-3xl block">🍲</span>
                    <p className="text-sm text-dark-muted font-bold font-serif">No incoming orders yet</p>
                    <p className="text-xs text-dark-muted font-sans">Fresh orders will pop up here dynamically when scanned from tables.</p>
                  </div>
                )}
              </div>
            </div>

            {/* Reviews (Owner Only) / Kitchen Checklist (Staff Only) */}
            <div className="bg-white border border-accent/15 rounded-3xl p-6 shadow-sm space-y-6">
              {userRole === 'owner' ? (
                <>
                  <h2 className="font-serif text-xl font-bold text-primary border-b border-accent/10 pb-4 flex items-center space-x-2">
                    <Star className="w-5 h-5 text-accent fill-accent" />
                    <span>Recent Customer Reviews</span>
                  </h2>

                  <div className="space-y-4 max-h-[500px] overflow-y-auto pr-1">
                    {feedbacks.length > 0 ? (
                      feedbacks.map((fb) => (
                        <div key={fb.id} className="border-b border-accent/10 pb-4 space-y-2 text-xs font-sans">
                          <div className="flex justify-between items-center">
                            <span className="font-bold text-primary">{fb.customer_name}</span>
                            <span className="text-dark-muted text-[10px]">{new Date(fb.created_at).toLocaleDateString()}</span>
                          </div>
                          
                          <div className="grid grid-cols-2 gap-2 bg-cream/40 p-2 rounded-xl text-primary font-bold text-[10px] border border-accent/5">
                            <div>Food: {fb.food_quality}/5 ⭐</div>
                            <div>Service: {fb.service_quality}/5 ⭐</div>
                            <div>Vibe: {fb.ambience}/5 ⭐</div>
                            <div>Overall: {fb.overall_experience}/5 ⭐</div>
                          </div>

                          {fb.comments && (
                            <p className="text-dark-muted italic bg-cream/20 p-2 rounded border border-accent/5">
                              "{fb.comments}"
                            </p>
                          )}
                        </div>
                      ))
                    ) : (
                      <p className="text-xs text-dark-muted text-center py-8">No customer reviews submitted yet.</p>
                    )}
                  </div>
                </>
              ) : (
                <>
                  <h2 className="font-serif text-xl font-bold text-primary border-b border-accent/10 pb-4 flex items-center space-x-2">
                    <CheckCircle2 className="w-5 h-5 text-primary-light" />
                    <span>Kitchen Tasks</span>
                  </h2>
                  
                  <div className="space-y-3 font-sans text-xs">
                    <div className="p-3 bg-cream/40 rounded-xl border border-accent/10 space-y-1">
                      <span className="font-bold text-primary block text-sm">💡 Quick Guide</span>
                      <p className="text-dark-muted leading-relaxed">Ensure dynamic polling keeps orders updated. Coordinate preparation steps directly with server staff using order Reference ID details.</p>
                    </div>
                    <div className="p-3 border border-accent/10 rounded-xl flex items-start space-x-3">
                      <input type="checkbox" defaultChecked className="mt-1 accent-primary" />
                      <div>
                        <span className="font-bold text-primary block leading-none">Hygiene Check</span>
                        <span className="text-[10px] text-dark-muted mt-0.5 block">Review sanitize check before starting prep.</span>
                      </div>
                    </div>
                    <div className="p-3 border border-accent/10 rounded-xl flex items-start space-x-3">
                      <input type="checkbox" className="mt-1 accent-primary" />
                      <div>
                        <span className="font-bold text-primary block leading-none">Catalog Prep</span>
                        <span className="text-[10px] text-dark-muted mt-0.5 block">Verify stock limits for new dosa, vada, and sandwich lines.</span>
                      </div>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>

        </div>
      </div>
    );
  }

  return (
    <div className="min-h-[85vh] bg-cream py-12 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
      <div className="max-w-md w-full bg-white border border-accent/15 rounded-3xl overflow-hidden shadow-2xl animate-fadeInUp">
        
        {/* Toggle headers */}
        <div className="flex border-b border-accent/20 bg-primary/5 text-xs uppercase font-extrabold font-sans text-center">
          <button
            onClick={() => { setActiveTab('login'); setError(''); setSuccess(''); }}
            className={`flex-1 py-4 hover:bg-primary/5 transition-colors ${
              activeTab === 'login' ? 'bg-primary text-cream' : 'text-primary'
            }`}
          >
            Staff Login
          </button>
          <button
            onClick={() => { setActiveTab('register'); setError(''); setSuccess(''); }}
            className={`flex-1 py-4 hover:bg-primary/5 transition-colors ${
              activeTab === 'register' ? 'bg-primary text-cream' : 'text-primary'
            }`}
          >
            Register Staff
          </button>
          <button
            onClick={() => { setActiveTab('owner'); setError(''); setSuccess(''); }}
            className={`flex-1 py-4 hover:bg-primary/5 transition-colors ${
              activeTab === 'owner' ? 'bg-primary text-cream' : 'text-primary'
            }`}
          >
            Owner Panel
          </button>
        </div>

        {/* Tab content wrapper */}
        <div className="p-6 sm:p-10 space-y-6">
          
          {/* Notification Banners */}
          {error && (
            <div className="p-3 bg-red-50 text-red-600 rounded-xl border border-red-200 text-xs font-sans font-bold flex items-center space-x-1.5">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {success && (
            <div className="p-3 bg-green-50 text-[#25D366] rounded-xl border border-green-200 text-xs font-sans font-bold flex items-center space-x-1.5">
              <CheckCircle2 className="w-4 h-4 shrink-0" />
              <span>{success}</span>
            </div>
          )}

          {/* STAFF LOGIN FORM */}
          {activeTab === 'login' && (
            <form onSubmit={handleLogin} className="space-y-5 font-sans">
              <div className="text-center space-y-1 mb-2">
                <h2 className="font-serif text-xl font-bold text-primary">Welcome Back</h2>
                <p className="text-xs text-dark-muted">Enter credentials approved by the owner to manage table orders.</p>
              </div>

              <div className="space-y-1.5">
                <label className="block text-[10px] font-bold text-primary uppercase tracking-wide">
                  Staff Email:
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-dark-muted" />
                  <input
                    type="email"
                    required
                    placeholder="E.g., tanu@tastebite.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-cream border border-accent/15 rounded-xl pl-10 pr-4 py-2.5 text-sm text-primary focus:outline-none focus:border-primary"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="block text-[10px] font-bold text-primary uppercase tracking-wide">
                  Registered Mobile Number:
                </label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-dark-muted" />
                  <input
                    type="tel"
                    required
                    placeholder="E.g., 8770232663"
                    value={mobile}
                    onChange={(e) => setMobile(e.target.value)}
                    className="w-full bg-cream border border-accent/15 rounded-xl pl-10 pr-4 py-2.5 text-sm text-primary focus:outline-none focus:border-primary"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3.5 bg-primary hover:bg-primary-dark text-cream hover:text-accent font-bold uppercase rounded-xl transition-all duration-200 flex items-center justify-center text-xs tracking-wider"
              >
                {loading ? 'Logging In...' : 'Verify & Log In'}
              </button>
            </form>
          )}

          {/* STAFF REGISTER FORM */}
          {activeTab === 'register' && (
            <form onSubmit={handleRegister} className="space-y-5 font-sans">
              <div className="text-center space-y-1 mb-2">
                <h2 className="font-serif text-xl font-bold text-primary">Join Kitchen Staff</h2>
                <p className="text-xs text-dark-muted">Submit your application to the owner for account validation.</p>
              </div>

              <div className="space-y-1.5">
                <label className="block text-[10px] font-bold text-primary uppercase tracking-wide">
                  Full Name:
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-dark-muted" />
                  <input
                    type="text"
                    required
                    placeholder="E.g., Tanu Shukla"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full bg-cream border border-accent/15 rounded-xl pl-10 pr-4 py-2.5 text-sm text-primary focus:outline-none focus:border-primary"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="block text-[10px] font-bold text-primary uppercase tracking-wide">
                  Email Address:
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-dark-muted" />
                  <input
                    type="email"
                    required
                    placeholder="E.g., tanu@gmail.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-cream border border-accent/15 rounded-xl pl-10 pr-4 py-2.5 text-sm text-primary focus:outline-none focus:border-primary"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="block text-[10px] font-bold text-primary uppercase tracking-wide">
                  Mobile Number:
                </label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-dark-muted" />
                  <input
                    type="tel"
                    required
                    placeholder="E.g., 8770232663"
                    value={mobile}
                    onChange={(e) => setMobile(e.target.value)}
                    className="w-full bg-cream border border-accent/15 rounded-xl pl-10 pr-4 py-2.5 text-sm text-primary focus:outline-none focus:border-primary"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3.5 bg-primary hover:bg-primary-dark text-cream hover:text-accent font-bold uppercase rounded-xl transition-all duration-200 flex items-center justify-center text-xs tracking-wider"
              >
                {loading ? 'Submitting...' : 'Register Account'}
              </button>
            </form>
          )}

          {/* OWNER PANEL LOGIN */}
          {activeTab === 'owner' && (
            <form onSubmit={handleOwnerAccess} className="space-y-5 font-sans">
              <div className="text-center space-y-1 mb-2">
                <h2 className="font-serif text-xl font-bold text-primary">Owner Portal</h2>
                <p className="text-xs text-dark-muted">Verify staff profiles, manage dashboard lists and view statistics.</p>
              </div>

              <div className="space-y-1.5">
                <label className="block text-[10px] font-bold text-primary uppercase tracking-wide">
                  Owner Secret Passcode:
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-dark-muted" />
                  <input
                    type="password"
                    required
                    placeholder="Enter owner passcode"
                    value={ownerPasscode}
                    onChange={(e) => setOwnerPasscode(e.target.value)}
                    className="w-full bg-cream border border-accent/15 rounded-xl pl-10 pr-4 py-2.5 text-sm text-primary focus:outline-none focus:border-primary font-mono text-center tracking-widest text-lg"
                  />
                </div>
                <span className="text-[9px] text-dark-muted block">
                  💡 Default owner validation passcode is <strong><code>877023</code></strong> (the first 6 digits of your contact number).
                </span>
              </div>

              <button
                type="submit"
                className="w-full py-3.5 bg-primary hover:bg-primary-dark text-cream hover:text-accent font-bold uppercase rounded-xl transition-all duration-200 flex items-center justify-center text-xs tracking-wider"
              >
                Enter Portal
              </button>
            </form>
          )}

        </div>

      </div>
    </div>
  );
}
