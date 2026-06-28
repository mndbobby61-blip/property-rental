"use client";
import React from 'react';

import { authClient } from "@/lib/auth-client"; 

export default function ProfilePage() {
  
  const { data: session, isPending, error } = authClient.useSession();

  
  if (isPending) {
    return <div className="p-6 text-center text-gray-600 font-medium">Loading profile details...</div>;
  }

  
  if (error || !session) {
    return (
      <div className="p-6 text-center text-red-500 font-medium">
        Failed to load session. Please check if you are logged in.
      </div>
    );
  }

  
  const user = session.user;

  
  const userRole = user.role || "Tenant";

  return (
    <div className="p-6 max-w-4xl mx-auto">
      
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-800">My Profile</h2>
        <p className="text-sm text-gray-500 mt-1">Manage your account details and view your platform role permissions.</p>
      </div>

      
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        
        <div className="h-32 bg-gradient-to-r from-blue-600 to-indigo-700"></div>

        
        <div className="p-6 relative pt-0">
          
          <div className="absolute -top-16 left-6">
            <img 
              src={user.image || "https://cdn-icons-png.flaticon.com/512/3135/3135715.png"} 
              alt={user.name} 
              className="w-28 h-28 rounded-full border-4 border-white object-cover shadow-md bg-white"
            />
          </div>

          
          <div className="pl-36 pt-4 flex flex-wrap items-center justify-between gap-4">
            <div>
              <h3 className="text-2xl font-bold text-gray-900">{user.name}</h3>
              <p className="text-sm text-gray-500 font-medium">{user.email}</p>
            </div>
            
            
            <div>
              <span className={`px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider border ${
                userRole.toLowerCase() === 'admin' ? 'bg-red-50 text-red-700 border-red-200' :
                userRole.toLowerCase() === 'owner' ? 'bg-indigo-50 text-indigo-700 border-indigo-200' :
                'bg-emerald-50 text-emerald-700 border-emerald-200'
              }`}>
                {userRole}
              </span>
            </div>
          </div>

          <hr className="my-8 border-gray-100" />

          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">Full Name</label>
              <div className="p-3 bg-gray-50 rounded-lg text-sm font-medium text-gray-800 border border-gray-100">
                {user.name}
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">Email Address</label>
              <div className="p-3 bg-gray-50 rounded-lg text-sm font-medium text-gray-800 border border-gray-100">
                {user.email}
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">Account Type</label>
              <div className="p-3 bg-gray-50 rounded-lg text-sm font-medium text-gray-800 border border-gray-100">
                {userRole}
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">Platform Status</label>
              <div className="p-3 bg-gray-50 rounded-lg text-sm font-medium text-green-700 border border-emerald-100 bg-emerald-50/30 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                Active Verified User
              </div>
            </div>
          </div>

          
          <div className="mt-8 p-4 bg-blue-50/50 border border-blue-100 rounded-xl">
            <h4 className="text-xs font-bold text-blue-800 uppercase tracking-wider mb-1">Your Dashboard Permissions:</h4>
            <p className="text-xs text-blue-700 leading-relaxed">
              {userRole.toLowerCase() === 'admin' && "You have full administrative access. You can manage all properties, tweak user roles, view all transaction logs, and monitor platform bookings."}
              {userRole.toLowerCase() === 'owner' && "You have Property Owner privileges. You can list new properties, track your monthly analytics chart, view tenant bookings, and handle rejection feedback."}
              {userRole.toLowerCase() === 'tenant' && "You are registered as a Tenant. You can browse all approved properties, add listings to your favorites, make secure Stripe payments, and view your booking status."}
            </p>
          </div>

        </div>
      </div>
    </div>
  );
}