"use client";

import React, { useEffect, useState } from "react";
import { LogOut, User } from "lucide-react";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { getUser, signOutUser } from "./account";
import { redirect } from "next/navigation";

export default function AccountPage() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      const userData = await getUser();
      if (!userData) {
        redirect("/sign-in"); // redirect if no user
      } else {
        setUser(userData);
      }
      setLoading(false);
    };

    fetchUser();
  }, []);

  const handleSignOut = async () => {
    await signOutUser();
    redirect("/sign-in");
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#1a1f3a] via-[#2d2550] to-[#3d2d5f] flex items-center justify-center text-white">
        Loading account...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1a1f3a] via-[#2d2550] to-[#3d2d5f] text-white">
      <div className="fixed w-full z-50">
        <Header />
      </div>

      <main className="flex items-center justify-center min-h-screen pt-24 pb-12 px-4">
        <div className="w-full max-w-lg">
          <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-8 shadow-2xl">
            <div className="flex flex-col items-center text-center mb-8">
              <div className="bg-purple-500/20 p-4 rounded-full mb-4">
                <User className="w-12 h-12 text-cyan-300" />
              </div>
              <h1 className="text-3xl font-bold text-white">My Account</h1>
              <p className="text-purple-200 mt-1">Manage your account details.</p>
            </div>

            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="bg-white/5 p-4 rounded-xl">
                  <p className="text-sm text-purple-200">First Name</p>
                  <p className="text-lg font-medium text-white">{user.firstName || "Not set"}</p>
                </div>
                <div className="bg-white/5 p-4 rounded-xl">
                  <p className="text-sm text-purple-200">Last Name</p>
                  <p className="text-lg font-medium text-white">{user.lastName || "Not set"}</p>
                </div>
              </div>

              <div className="bg-white/5 p-4 rounded-xl">
                <p className="text-sm text-purple-200">Email Address</p>
                <p className="text-lg font-medium text-white break-words">{user.email}</p>
              </div>
            </div>

            <div className="mt-8 border-t border-white/10 pt-6">
              <button
                onClick={handleSignOut}
                className="w-full h-12 bg-red-600/20 border border-red-500/30 text-red-300 hover:bg-red-600/40 hover:text-white font-semibold rounded-xl transition-colors flex items-center justify-center"
              >
                <LogOut className="mr-2 w-5 h-5" />
                Sign Out
              </button>
            </div>
          </div>
        </div>
      </main>

      <div className="pb-4">
        <Footer />
      </div>
    </div>
  );
}
