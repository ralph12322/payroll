'use client';
import React, { useEffect, useState } from 'react';
import { User, Mail, Phone, MapPin, Bell, Lock, Shield, LogOut, ChevronRight, Camera, Save, X, Settings } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

export default function ProfilePage() {
  const [isEditing, setIsEditing] = useState(false);
  const router = useRouter();
  
  const [profileData, setProfileData] = useState({
    name: 'Maria Santos',
    email: 'maria.santos@company.com',
    phone: '+63 917 123 4567',
    position: 'HR Manager',
    location: 'Manila, Philippines'
  });

  const handleSave = () => {
    setIsEditing(false);
   
  };

  const handleCancel = () => {
    setIsEditing(false);
  
  };

  const handleLogout = () => {
    toast.success("Logged out")
    localStorage.clear();
    router.push('/');
    
  };

  useEffect(() => {
    const role = localStorage.getItem("role");
    if(!role){
        router.push('/')
    }
  })

  return (
    <div className="min-h-screen bg-neutral-50">
      {/* Header */}
      <header className="bg-white border-b border-neutral-200">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div onClick={handleLogout} className="text-2xl font-bold text-neutral-900">PayFlow</div>
            <button 
              onClick={() => router.push('/dashboard')}
              className="px-4 py-2 text-neutral-600 hover:text-neutral-900 transition-colors"
            >
              Back to Dashboard
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-5xl mx-auto px-6 py-12">
        <div className="space-y-6">
          {/* Profile Header Card */}
          <div className="bg-white border-2 border-neutral-200 rounded-2xl p-8">
            <div className="flex items-start justify-between mb-8">
              <div>
                <h1 className="text-3xl font-bold text-neutral-900 mb-2">Account Settings</h1>
                <p className="text-neutral-600">Manage your profile and account preferences</p>
              </div>
              {!isEditing ? (
                <button
                  onClick={() => setIsEditing(true)}
                  className="px-6 py-2 bg-neutral-900 text-white rounded-lg font-medium hover:bg-neutral-800 transition-colors"
                >
                  Edit Profile
                </button>
              ) : (
                <div className="flex gap-3">
                  <button
                    onClick={handleCancel}
                    className="px-6 py-2 bg-white border-2 border-neutral-200 text-neutral-900 rounded-lg font-medium hover:border-neutral-300 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSave}
                    className="px-6 py-2 bg-neutral-900 text-white rounded-lg font-medium hover:bg-neutral-800 transition-colors flex items-center gap-2"
                  >
                    <Save size={18} />
                    Save Changes
                  </button>
                </div>
              )}
            </div>

            {/* Profile Photo */}
            <div className="flex items-center gap-6 mb-8 pb-8 border-b border-neutral-200">
              <div className="relative">
                <div className="w-24 h-24 bg-neutral-900 rounded-full flex items-center justify-center text-white text-3xl font-bold">
                  MS
                </div>
                {isEditing && (
                  <button className="absolute bottom-0 right-0 w-8 h-8 bg-neutral-900 rounded-full flex items-center justify-center text-white hover:bg-neutral-800 transition-colors">
                    <Camera size={16} />
                  </button>
                )}
              </div>
              <div>
                <h2 className="text-xl font-bold text-neutral-900 mb-1">{profileData.name}</h2>
                <p className="text-neutral-600">{profileData.position}</p>
              </div>
            </div>

            {/* Profile Form */}
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-neutral-900 mb-2">
                  Full Name
                </label>
                <div className="relative">
                  <User size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400" />
                  <input
                    type="text"
                    value={profileData.name}
                    onChange={(e) => setProfileData({ ...profileData, name: e.target.value })}
                    disabled={!isEditing}
                    className="w-full pl-12 pr-4 py-3 bg-neutral-50 border-2 border-neutral-200 rounded-lg text-neutral-900 disabled:opacity-50 focus:outline-none focus:border-neutral-900 transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-neutral-900 mb-2">
                  Email Address
                </label>
                <div className="relative">
                  <Mail size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400" />
                  <input
                    type="email"
                    value={profileData.email}
                    onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
                    disabled={!isEditing}
                    className="w-full pl-12 pr-4 py-3 bg-neutral-50 border-2 border-neutral-200 rounded-lg text-neutral-900 disabled:opacity-50 focus:outline-none focus:border-neutral-900 transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-neutral-900 mb-2">
                  Phone Number
                </label>
                <div className="relative">
                  <Phone size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400" />
                  <input
                    type="tel"
                    value={profileData.phone}
                    onChange={(e) => setProfileData({ ...profileData, phone: e.target.value })}
                    disabled={!isEditing}
                    className="w-full pl-12 pr-4 py-3 bg-neutral-50 border-2 border-neutral-200 rounded-lg text-neutral-900 disabled:opacity-50 focus:outline-none focus:border-neutral-900 transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-neutral-900 mb-2">
                  Position
                </label>
                <input
                  type="text"
                  value={profileData.position}
                  onChange={(e) => setProfileData({ ...profileData, position: e.target.value })}
                  disabled={!isEditing}
                  className="w-full px-4 py-3 bg-neutral-50 border-2 border-neutral-200 rounded-lg text-neutral-900 disabled:opacity-50 focus:outline-none focus:border-neutral-900 transition-colors"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-neutral-900 mb-2">
                  Location
                </label>
                <div className="relative">
                  <MapPin size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400" />
                  <input
                    type="text"
                    value={profileData.location}
                    onChange={(e) => setProfileData({ ...profileData, location: e.target.value })}
                    disabled={!isEditing}
                    className="w-full pl-12 pr-4 py-3 bg-neutral-50 border-2 border-neutral-200 rounded-lg text-neutral-900 disabled:opacity-50 focus:outline-none focus:border-neutral-900 transition-colors"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Notifications */}
          <div className="bg-white border-2 border-neutral-200 rounded-2xl p-8">
            <h2 className="text-2xl font-bold text-neutral-900 mb-6">Notifications</h2>
            <div className="space-y-6">
              {[
                { title: 'Email Notifications', description: 'Receive email updates about payroll activities' },
                { title: 'Payroll Reminders', description: 'Get notified when payroll processing is due' },
                { title: 'System Updates', description: 'Stay informed about new features and updates' }
              ].map((item, idx) => (
                <div key={idx} className="flex items-center justify-between py-4 border-b border-neutral-200 last:border-0">
                  <div>
                    <div className="font-medium text-neutral-900 mb-1">{item.title}</div>
                    <div className="text-sm text-neutral-600">{item.description}</div>
                  </div>
                  <label className="relative inline-block w-12 h-6">
                    <input type="checkbox" className="sr-only peer" defaultChecked={idx < 2} />
                    <div className="w-12 h-6 bg-neutral-200 rounded-full peer peer-checked:bg-neutral-900 transition-colors"></div>
                    <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition-transform peer-checked:translate-x-6"></div>
                  </label>
                </div>
              ))}
            </div>
          </div>

          {/* Security */}
          <div className="bg-white border-2 border-neutral-200 rounded-2xl p-8">
            <h2 className="text-2xl font-bold text-neutral-900 mb-6">Security</h2>
            <div className="space-y-4">
              <button className="w-full flex items-center justify-between p-4 bg-neutral-50 rounded-lg border border-neutral-200 hover:border-neutral-900 transition-all group">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-neutral-900 rounded-xl flex items-center justify-center text-white">
                    <Lock size={24} />
                  </div>
                  <div className="text-left">
                    <div className="font-medium text-neutral-900 mb-1">Change Password</div>
                    <div className="text-sm text-neutral-600">Last changed 30 days ago</div>
                  </div>
                </div>
                <ChevronRight size={20} className="text-neutral-400 group-hover:text-neutral-900 group-hover:translate-x-1 transition-all" />
              </button>

              <button className="w-full flex items-center justify-between p-4 bg-neutral-50 rounded-lg border border-neutral-200 hover:border-neutral-900 transition-all group">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-neutral-900 rounded-xl flex items-center justify-center text-white">
                    <Shield size={24} />
                  </div>
                  <div className="text-left">
                    <div className="font-medium text-neutral-900 mb-1">Two-Factor Authentication</div>
                    <div className="text-sm text-neutral-600">Add an extra layer of security</div>
                  </div>
                </div>
                <ChevronRight size={20} className="text-neutral-400 group-hover:text-neutral-900 group-hover:translate-x-1 transition-all" />
              </button>
            </div>
          </div>

          {/* Account Actions */}
          <div className="bg-white border-2 border-neutral-200 rounded-2xl p-8">
            <h2 className="text-2xl font-bold text-neutral-900 mb-6">Account</h2>
            <div className="space-y-4">
              <button 
                onClick={handleLogout}
                className="w-full flex items-center justify-between p-4 bg-neutral-50 rounded-lg border border-neutral-200 hover:border-neutral-900 transition-all group"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-neutral-900 rounded-xl flex items-center justify-center text-white">
                    <LogOut size={24} />
                  </div>
                  <div className="text-left">
                    <div className="font-medium text-neutral-900">Logout</div>
                    <div className="text-sm text-neutral-600">Sign out of your account</div>
                  </div>
                </div>
                <ChevronRight size={20} className="text-neutral-400 group-hover:text-neutral-900 group-hover:translate-x-1 transition-all" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}