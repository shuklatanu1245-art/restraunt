"use client";

import React, { useState, useEffect } from 'react';
import { Shield, Plus, Edit2, Trash2, Check, X, Palette, LogOut, Loader2, UploadCloud } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function AdminPage() {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [activeTab, setActiveTab] = useState('menu');
  const [isLoading, setIsLoading] = useState(false);

  // Login State
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');

  // Menu State
  const [menuItems, setMenuItems] = useState([]);
  const [isEditingItem, setIsEditingItem] = useState(false);
  const [currentItem, setCurrentItem] = useState(null);
  const [isUploadingImage, setIsUploadingImage] = useState(false);

  // Theme State
  const [theme, setTheme] = useState({
    primary: "#E76F51",
    primaryDark: "#C94C2E",
    primaryLight: "#F4A261",
    accent: "#E07A5F",
    accentDark: "#C55D43",
    cream: "#FFF8F5",
    creamDark: "#F7EAE3",
    dark: "#3A221C",
    darkMuted: "#574039"
  });

  useEffect(() => {
    // Check if already authenticated
    const token = sessionStorage.getItem('adminToken');
    if (token) {
      setIsAuthenticated(true);
      fetchMenu();
      fetchTheme();
    }
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setLoginError('');

    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();

      if (data.success) {
        sessionStorage.setItem('adminToken', data.token);
        setIsAuthenticated(true);
        fetchMenu();
        fetchTheme();
      } else {
        setLoginError(data.error || 'Login failed');
      }
    } catch (err) {
      setLoginError('Server error. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem('adminToken');
    setIsAuthenticated(false);
  };

  const fetchMenu = async () => {
    try {
      const res = await fetch('/api/admin/menu');
      const data = await res.json();
      if (data.success) setMenuItems(data.items);
    } catch (err) {
      console.error('Failed to fetch menu:', err);
    }
  };

  const fetchTheme = async () => {
    try {
      const res = await fetch('/api/admin/theme');
      const data = await res.json();
      if (data.success && data.theme) setTheme(data.theme);
    } catch (err) {
      console.error('Failed to fetch theme:', err);
    }
  };

  const handleThemeChange = (key, value) => {
    setTheme(prev => ({ ...prev, [key]: value }));
  };

  const saveTheme = async () => {
    setIsLoading(true);
    try {
      await fetch('/api/admin/theme', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(theme)
      });
      alert('Theme saved successfully! Refresh the page to see changes across the site.');
    } catch (err) {
      console.error('Failed to save theme:', err);
      alert('Failed to save theme');
    } finally {
      setIsLoading(false);
    }
  };

  const handleEditItem = (item) => {
    setCurrentItem({ ...item });
    setIsEditingItem(true);
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploadingImage(true);
    try {
      const formData = new FormData();
      formData.append('file', file);

      const res = await fetch('/api/admin/upload', {
        method: 'POST',
        body: formData,
      });

      const data = await res.json();
      if (data.success) {
        setCurrentItem((prev) => ({ ...prev, image: data.url }));
      } else {
        alert(data.error || 'Upload failed');
      }
    } catch (err) {
      console.error('Error uploading:', err);
      alert('Error uploading image');
    } finally {
      setIsUploadingImage(false);
    }
  };

  const handleAddNewItem = () => {
    setCurrentItem({
      key_id: `item-${Date.now()}`,
      name: '',
      price: 0,
      category: 'Starters',
      description: '',
      image: '',
      popular: false
    });
    setIsEditingItem(true);
  };

  const saveMenuItem = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const isNew = !currentItem.id;
      const url = '/api/admin/menu';
      const method = isNew ? 'POST' : 'PUT';

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(currentItem)
      });
      const data = await res.json();

      if (data.success) {
        setIsEditingItem(false);
        fetchMenu();
      } else {
        alert(data.error || 'Failed to save item');
      }
    } catch (err) {
      console.error('Error saving item:', err);
      alert('Error saving item');
    } finally {
      setIsLoading(false);
    }
  };

  const deleteMenuItem = async (id) => {
    if (!confirm('Are you sure you want to delete this item?')) return;
    try {
      const res = await fetch(`/api/admin/menu?id=${id}`, { method: 'DELETE' });
      const data = await res.json();
      if (data.success) {
        fetchMenu();
      } else {
        alert('Failed to delete item');
      }
    } catch (err) {
      console.error('Error deleting item:', err);
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-cream flex items-center justify-center p-4">
        <div className="bg-white rounded-3xl p-8 max-w-md w-full shadow-2xl border border-accent/10">
          <div className="flex justify-center mb-6">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center text-primary">
              <Shield size={32} />
            </div>
          </div>
          <h2 className="text-2xl font-serif font-bold text-center text-dark mb-2">Admin Portal</h2>
          <p className="text-center text-dark-muted mb-8 text-sm">Sign in to manage Taste Bite settings.</p>
          
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-dark-muted mb-1">Email</label>
              <input
                type="email"
                required
                className="w-full px-4 py-3 rounded-xl border border-accent/20 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-dark-muted mb-1">Password</label>
              <input
                type="password"
                required
                className="w-full px-4 py-3 rounded-xl border border-accent/20 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            {loginError && <p className="text-red-500 text-sm text-center">{loginError}</p>}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 bg-primary text-white rounded-xl font-medium hover:bg-primary-dark transition-colors flex items-center justify-center"
            >
              {isLoading ? <Loader2 className="animate-spin w-5 h-5" /> : 'Login to Dashboard'}
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-cream pb-20">
      {/* Admin Header */}
      <div className="bg-dark text-white p-6 sticky top-0 z-10 shadow-md">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-3">
            <Shield className="text-primary w-8 h-8" />
            <h1 className="text-2xl font-serif font-bold tracking-wider">Taste Bite <span className="text-primary">Admin</span></h1>
          </div>
          <button 
            onClick={handleLogout}
            className="flex items-center gap-2 text-sm bg-white/10 hover:bg-white/20 px-4 py-2 rounded-full transition-colors"
          >
            <LogOut className="w-4 h-4" /> Logout
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        {/* Tabs */}
        <div className="flex gap-4 mb-8 overflow-x-auto pb-2">
          <button
            onClick={() => setActiveTab('menu')}
            className={`flex items-center gap-2 px-6 py-3 rounded-full font-medium transition-colors whitespace-nowrap ${
              activeTab === 'menu' ? 'bg-primary text-white shadow-md' : 'bg-white text-dark-muted border border-accent/20 hover:border-primary/50'
            }`}
          >
            Menu Management
          </button>
          <button
            onClick={() => setActiveTab('theme')}
            className={`flex items-center gap-2 px-6 py-3 rounded-full font-medium transition-colors whitespace-nowrap ${
              activeTab === 'theme' ? 'bg-primary text-white shadow-md' : 'bg-white text-dark-muted border border-accent/20 hover:border-primary/50'
            }`}
          >
            <Palette className="w-4 h-4" /> Theme Settings
          </button>
        </div>

        {/* Menu Tab */}
        {activeTab === 'menu' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-bold text-dark font-serif">Menu Items</h2>
              <button
                onClick={handleAddNewItem}
                className="flex items-center gap-2 bg-dark text-white px-4 py-2 rounded-lg hover:bg-dark-muted transition-colors text-sm"
              >
                <Plus className="w-4 h-4" /> Add New Item
              </button>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-accent/15 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm text-dark-muted">
                  <thead className="bg-cream-dark text-dark font-medium border-b border-accent/10">
                    <tr>
                      <th className="px-6 py-4">Image</th>
                      <th className="px-6 py-4">Name</th>
                      <th className="px-6 py-4">Category</th>
                      <th className="px-6 py-4">Price (₹)</th>
                      <th className="px-6 py-4">Popular</th>
                      <th className="px-6 py-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {menuItems.map((item) => (
                      <tr key={item.id} className="border-b border-accent/5 hover:bg-cream/50 transition-colors">
                        <td className="px-6 py-3">
                          <div className="w-12 h-12 rounded-lg overflow-hidden bg-cream-dark">
                            <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                          </div>
                        </td>
                        <td className="px-6 py-4 font-medium text-dark">{item.name}</td>
                        <td className="px-6 py-4">{item.category}</td>
                        <td className="px-6 py-4">₹{item.price}</td>
                        <td className="px-6 py-4">
                          {item.popular ? <Check className="text-green-500 w-5 h-5" /> : <X className="text-gray-300 w-5 h-5" />}
                        </td>
                        <td className="px-6 py-4 text-right">
                          <button onClick={() => handleEditItem(item)} className="text-blue-500 hover:text-blue-700 mr-3">
                            <Edit2 className="w-4 h-4" />
                          </button>
                          <button onClick={() => deleteMenuItem(item.id)} className="text-red-500 hover:text-red-700">
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </td>
                      </tr>
                    ))}
                    {menuItems.length === 0 && (
                      <tr>
                        <td colSpan="6" className="px-6 py-8 text-center text-dark-muted">
                          No menu items found.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* Theme Tab */}
        {activeTab === 'theme' && (
          <div className="max-w-2xl bg-white rounded-3xl p-8 shadow-sm border border-accent/15">
            <h2 className="text-xl font-bold text-dark font-serif mb-6 flex items-center gap-2">
              <Palette className="text-primary w-5 h-5" /> Theme Colors
            </h2>
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {Object.entries(theme).map(([key, value]) => (
                  <div key={key}>
                    <label className="block text-sm font-medium text-dark-muted mb-2 capitalize">
                      {key.replace(/([A-Z])/g, ' $1').trim()}
                    </label>
                    <div className="flex items-center gap-3">
                      <input
                        type="color"
                        value={value}
                        onChange={(e) => handleThemeChange(key, e.target.value)}
                        className="w-10 h-10 rounded border-0 cursor-pointer"
                      />
                      <input
                        type="text"
                        value={value}
                        onChange={(e) => handleThemeChange(key, e.target.value)}
                        className="flex-1 px-3 py-2 rounded-lg border border-accent/20 text-sm focus:border-primary outline-none"
                      />
                    </div>
                  </div>
                ))}
              </div>
              <div className="pt-6 border-t border-accent/10">
                <button
                  onClick={saveTheme}
                  disabled={isLoading}
                  className="bg-primary text-white px-6 py-3 rounded-xl font-medium hover:bg-primary-dark transition-colors flex items-center gap-2"
                >
                  {isLoading ? <Loader2 className="animate-spin w-4 h-4" /> : <Check className="w-4 h-4" />}
                  Save Theme
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Edit/Add Item Modal */}
      {isEditingItem && currentItem && (
        <div className="fixed inset-0 bg-dark/50 flex items-center justify-center p-4 z-50 overflow-y-auto backdrop-blur-sm">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-lg w-full shadow-2xl relative my-8">
            <button 
              onClick={() => setIsEditingItem(false)}
              className="absolute top-4 right-4 text-dark-muted hover:text-dark p-2 bg-cream rounded-full"
            >
              <X className="w-5 h-5" />
            </button>
            <h3 className="text-xl font-bold text-dark font-serif mb-6">
              {currentItem.id ? 'Edit Item' : 'Add New Item'}
            </h3>
            
            <form onSubmit={saveMenuItem} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="col-span-2">
                  <label className="block text-xs font-medium text-dark-muted mb-1">Key ID (Unique Code)</label>
                  <input
                    type="text"
                    required
                    value={currentItem.key_id}
                    onChange={(e) => setCurrentItem({...currentItem, key_id: e.target.value})}
                    className="w-full px-3 py-2 rounded-lg border border-accent/20 text-sm"
                  />
                </div>
                <div className="col-span-2">
                  <label className="block text-xs font-medium text-dark-muted mb-1">Name</label>
                  <input
                    type="text"
                    required
                    value={currentItem.name}
                    onChange={(e) => setCurrentItem({...currentItem, name: e.target.value})}
                    className="w-full px-3 py-2 rounded-lg border border-accent/20 text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-dark-muted mb-1">Price (₹)</label>
                  <input
                    type="number"
                    required
                    value={currentItem.price}
                    onChange={(e) => setCurrentItem({...currentItem, price: parseFloat(e.target.value)})}
                    className="w-full px-3 py-2 rounded-lg border border-accent/20 text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-dark-muted mb-1">Category</label>
                  <input
                    type="text"
                    required
                    value={currentItem.category}
                    onChange={(e) => setCurrentItem({...currentItem, category: e.target.value})}
                    className="w-full px-3 py-2 rounded-lg border border-accent/20 text-sm"
                  />
                </div>
                <div className="col-span-2">
                  <label className="block text-xs font-medium text-dark-muted mb-1">Description</label>
                  <textarea
                    rows="2"
                    value={currentItem.description}
                    onChange={(e) => setCurrentItem({...currentItem, description: e.target.value})}
                    className="w-full px-3 py-2 rounded-lg border border-accent/20 text-sm resize-none"
                  ></textarea>
                </div>
                <div className="col-span-2">
                  <label className="block text-xs font-medium text-dark-muted mb-1">Image URL or Upload</label>
                  <div className="flex gap-2">
                    <input
                      type="url"
                      value={currentItem.image}
                      onChange={(e) => setCurrentItem({...currentItem, image: e.target.value})}
                      placeholder="https://..."
                      className="flex-1 px-3 py-2 rounded-lg border border-accent/20 text-sm focus:border-primary outline-none"
                    />
                    <div className="relative">
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                        disabled={isUploadingImage}
                      />
                      <button
                        type="button"
                        className="h-full px-4 bg-accent/10 text-accent rounded-lg flex items-center justify-center hover:bg-accent/20 transition-colors"
                        disabled={isUploadingImage}
                      >
                        {isUploadingImage ? <Loader2 className="w-4 h-4 animate-spin" /> : <UploadCloud className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>
                </div>
                <div className="col-span-2 flex items-center gap-2 mt-2">
                  <input
                    type="checkbox"
                    id="popular-check"
                    checked={currentItem.popular}
                    onChange={(e) => setCurrentItem({...currentItem, popular: e.target.checked})}
                    className="w-4 h-4 text-primary rounded border-accent/30 focus:ring-primary"
                  />
                  <label htmlFor="popular-check" className="text-sm font-medium text-dark-muted">
                    Mark as Popular Item
                  </label>
                </div>
              </div>

              <div className="pt-6 flex gap-3">
                <button
                  type="button"
                  onClick={() => setIsEditingItem(false)}
                  className="flex-1 px-4 py-3 rounded-xl border border-accent/20 text-dark font-medium hover:bg-cream transition-colors text-sm"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isLoading}
                  className="flex-1 px-4 py-3 rounded-xl bg-primary text-white font-medium hover:bg-primary-dark transition-colors flex items-center justify-center text-sm"
                >
                  {isLoading ? <Loader2 className="animate-spin w-4 h-4" /> : 'Save Item'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
