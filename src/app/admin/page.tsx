"use client";

import { useState, useEffect } from "react";
import {
  Calendar,
  Package,
  Bell,
  RefreshCw,
  ChevronDown,
} from "lucide-react";

type Booking = {
  productId: string;
  startDate: string;
  endDate: string;
  quantity: number;
};

type Interest = {
  productId: string;
  productName: string;
  email: string;
  startDate: string;
  endDate: string;
  createdAt: string;
};

export default function AdminPage() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [interests, setInterests] = useState<Interest[]>([]);
  const [loading, setLoading] = useState(true);
  const [tab, setTab] = useState<"bookings" | "interest">("bookings");

  const fetchData = async () => {
    setLoading(true);
    try {
      const [bRes, iRes] = await Promise.all([
        fetch("/api/bookings"),
        fetch("/api/interest"),
      ]);
      const bData = await bRes.json();
      const iData = await iRes.json();
      setBookings(bData.bookings || []);
      setInterests(iData.registrations || []);
    } catch {
      // silently fail
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <section className="py-8 bg-muted border-b border-border">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-foreground">
                Admin Dashboard
              </h1>
              <p className="text-sm text-foreground/50 mt-1">
                Manage bookings and availability
              </p>
            </div>
            <button
              onClick={fetchData}
              className="flex items-center gap-2 px-4 py-2 bg-white border border-border rounded-xl text-sm font-medium text-foreground hover:bg-muted transition-colors"
            >
              <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} />
              Refresh
            </button>
          </div>
        </div>
      </section>

      <section className="py-8">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
            <div className="bg-white rounded-xl border border-border p-5">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center text-primary">
                  <Package className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-foreground">
                    {bookings.length}
                  </p>
                  <p className="text-xs text-foreground/50">Active Bookings</p>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-xl border border-border p-5">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-accent/20 rounded-lg flex items-center justify-center text-accent">
                  <Bell className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-foreground">
                    {interests.length}
                  </p>
                  <p className="text-xs text-foreground/50">
                    Interest Registrations
                  </p>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-xl border border-border p-5">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center text-green-600">
                  <Calendar className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-foreground">
                    {bookings.reduce((sum, b) => sum + b.quantity, 0)}
                  </p>
                  <p className="text-xs text-foreground/50">Items Rented</p>
                </div>
              </div>
            </div>
          </div>

          {/* Tabs */}
          <div className="flex gap-1 mb-6 bg-muted p-1 rounded-xl w-fit">
            <button
              onClick={() => setTab("bookings")}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                tab === "bookings"
                  ? "bg-white text-foreground shadow-sm"
                  : "text-foreground/50 hover:text-foreground"
              }`}
            >
              Bookings ({bookings.length})
            </button>
            <button
              onClick={() => setTab("interest")}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                tab === "interest"
                  ? "bg-white text-foreground shadow-sm"
                  : "text-foreground/50 hover:text-foreground"
              }`}
            >
              Interest List ({interests.length})
            </button>
          </div>

          {/* Content */}
          {tab === "bookings" && (
            <div className="bg-white rounded-xl border border-border overflow-hidden">
              {bookings.length === 0 ? (
                <div className="text-center py-16">
                  <Package className="w-10 h-10 text-foreground/10 mx-auto mb-3" />
                  <p className="text-foreground/40 text-sm">
                    No bookings yet.
                  </p>
                </div>
              ) : (
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-border bg-muted/50">
                      <th className="text-left px-4 py-3 font-medium text-foreground/60">
                        Product
                      </th>
                      <th className="text-left px-4 py-3 font-medium text-foreground/60">
                        Start
                      </th>
                      <th className="text-left px-4 py-3 font-medium text-foreground/60">
                        End
                      </th>
                      <th className="text-left px-4 py-3 font-medium text-foreground/60">
                        Qty
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {bookings.map((b, i) => (
                      <tr
                        key={i}
                        className="border-b border-border last:border-0 hover:bg-muted/30"
                      >
                        <td className="px-4 py-3 font-medium text-foreground">
                          {b.productId}
                        </td>
                        <td className="px-4 py-3 text-foreground/60">
                          {new Date(b.startDate).toLocaleDateString("en-GB")}
                        </td>
                        <td className="px-4 py-3 text-foreground/60">
                          {new Date(b.endDate).toLocaleDateString("en-GB")}
                        </td>
                        <td className="px-4 py-3 text-foreground/60">
                          {b.quantity}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          )}

          {tab === "interest" && (
            <div className="bg-white rounded-xl border border-border overflow-hidden">
              {interests.length === 0 ? (
                <div className="text-center py-16">
                  <Bell className="w-10 h-10 text-foreground/10 mx-auto mb-3" />
                  <p className="text-foreground/40 text-sm">
                    No interest registrations yet.
                  </p>
                </div>
              ) : (
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-border bg-muted/50">
                      <th className="text-left px-4 py-3 font-medium text-foreground/60">
                        Product
                      </th>
                      <th className="text-left px-4 py-3 font-medium text-foreground/60">
                        Email
                      </th>
                      <th className="text-left px-4 py-3 font-medium text-foreground/60">
                        Dates
                      </th>
                      <th className="text-left px-4 py-3 font-medium text-foreground/60">
                        Registered
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {interests.map((r, i) => (
                      <tr
                        key={i}
                        className="border-b border-border last:border-0 hover:bg-muted/30"
                      >
                        <td className="px-4 py-3 font-medium text-foreground">
                          {r.productName}
                        </td>
                        <td className="px-4 py-3 text-foreground/60">
                          {r.email}
                        </td>
                        <td className="px-4 py-3 text-foreground/60">
                          {new Date(r.startDate).toLocaleDateString("en-GB")} –{" "}
                          {new Date(r.endDate).toLocaleDateString("en-GB")}
                        </td>
                        <td className="px-4 py-3 text-foreground/60">
                          {new Date(r.createdAt).toLocaleDateString("en-GB")}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
