"use client";

import { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";

type Tab = "orders" | "contacts" | "subscribers";

type Summary = {
  orders: { count: number; revenue: number };
  contacts: number;
  subscribers: number;
};

type Order = {
  id: number;
  stripe_session_id: string;
  plan: string;
  amount: number;
  customer_email: string;
  customer_name: string;
  status: string;
  created_at: string;
};

type Contact = {
  id: number;
  name: string;
  email: string;
  industry: string | null;
  website: string | null;
  message: string | null;
  created_at: string;
};

type Subscriber = {
  id: number;
  email: string;
  subscribed_at: string;
};

export default function AdminDashboard() {
  const [tab, setTab] = useState<Tab>("orders");
  const [summary, setSummary] = useState<Summary | null>(null);
  const [data, setData] = useState<(Order | Contact | Subscriber)[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const fetchData = useCallback(async (currentTab: Tab) => {
    setLoading(true);
    try {
      const res = await fetch(`/api/admin/stats?tab=${currentTab}`);
      if (res.status === 401) {
        router.push("/admin/login");
        return;
      }
      const json = await res.json();
      setData(json.data || []);
    } catch {
      console.error("Failed to fetch data");
    } finally {
      setLoading(false);
    }
  }, [router]);

  useEffect(() => {
    fetch("/api/admin/stats?tab=summary")
      .then((r) => {
        if (r.status === 401) {
          router.push("/admin/login");
          return null;
        }
        return r.json();
      })
      .then((d) => { if (d) setSummary(d); });
  }, [router]);

  useEffect(() => {
    fetchData(tab);
  }, [tab, fetchData]);

  const formatCurrency = (cents: number) =>
    new Intl.NumberFormat("de-DE", { style: "currency", currency: "EUR" }).format(cents / 100);

  const formatDate = (iso: string) =>
    new Date(iso).toLocaleDateString("de-DE", { day: "2-digit", month: "2-digit", year: "numeric", hour: "2-digit", minute: "2-digit" });

  const tabs: { key: Tab; label: string }[] = [
    { key: "orders", label: "Bestellungen" },
    { key: "contacts", label: "Kontaktanfragen" },
    { key: "subscribers", label: "Newsletter" },
  ];

  return (
    <div className="mx-auto max-w-6xl px-6 py-12">
      <div className="mb-8 flex items-center justify-between">
        <h1 className="text-2xl font-bold">Admin Dashboard</h1>
        <button
          onClick={() => {
            document.cookie = "admin_token=; path=/; max-age=0";
            router.push("/admin/login");
          }}
          className="rounded-lg border border-white/10 px-4 py-2 text-sm text-white/60 hover:text-white"
        >
          Abmelden
        </button>
      </div>

      {summary && (
        <div className="mb-8 grid gap-4 sm:grid-cols-3">
          <div className="rounded-xl border border-white/10 bg-white/5 p-6">
            <div className="text-sm text-white/40">Bestellungen</div>
            <div className="mt-1 text-2xl font-bold">{summary.orders.count}</div>
            <div className="mt-1 text-sm text-indigo-400">{formatCurrency(summary.orders.revenue)} Umsatz</div>
          </div>
          <div className="rounded-xl border border-white/10 bg-white/5 p-6">
            <div className="text-sm text-white/40">Kontaktanfragen</div>
            <div className="mt-1 text-2xl font-bold">{summary.contacts}</div>
          </div>
          <div className="rounded-xl border border-white/10 bg-white/5 p-6">
            <div className="text-sm text-white/40">Newsletter Abonnenten</div>
            <div className="mt-1 text-2xl font-bold">{summary.subscribers}</div>
          </div>
        </div>
      )}

      <div className="mb-6 flex gap-2">
        {tabs.map((t) => (
          <button
            key={t.key}
            onClick={() => setTab(t.key)}
            className={`rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
              tab === t.key
                ? "bg-indigo-600 text-white"
                : "border border-white/10 text-white/60 hover:text-white"
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {loading ? (
        <div className="py-12 text-center text-white/40">Laden...</div>
      ) : data.length === 0 ? (
        <div className="py-12 text-center text-white/40">Keine Einträge vorhanden</div>
      ) : (
        <div className="overflow-x-auto rounded-xl border border-white/10">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-white/10 bg-white/5 text-left text-white/60">
                {tab === "orders" && (
                  <>
                    <th className="px-4 py-3">Plan</th>
                    <th className="px-4 py-3">Betrag</th>
                    <th className="px-4 py-3">Kunde</th>
                    <th className="px-4 py-3">Email</th>
                    <th className="px-4 py-3">Status</th>
                    <th className="px-4 py-3">Datum</th>
                  </>
                )}
                {tab === "contacts" && (
                  <>
                    <th className="px-4 py-3">Name</th>
                    <th className="px-4 py-3">Email</th>
                    <th className="px-4 py-3">Branche</th>
                    <th className="px-4 py-3">Nachricht</th>
                    <th className="px-4 py-3">Datum</th>
                  </>
                )}
                {tab === "subscribers" && (
                  <>
                    <th className="px-4 py-3">Email</th>
                    <th className="px-4 py-3">Angemeldet am</th>
                  </>
                )}
              </tr>
            </thead>
            <tbody>
              {tab === "orders" &&
                (data as Order[]).map((o) => (
                  <tr key={o.id} className="border-b border-white/5 hover:bg-white/[0.02]">
                    <td className="px-4 py-3 font-medium capitalize">{o.plan}</td>
                    <td className="px-4 py-3">{formatCurrency(o.amount)}</td>
                    <td className="px-4 py-3">{o.customer_name || "–"}</td>
                    <td className="px-4 py-3 text-white/60">{o.customer_email || "–"}</td>
                    <td className="px-4 py-3">
                      <span className="rounded-full bg-green-500/10 px-2 py-1 text-xs text-green-400">
                        {o.status}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-white/40">{formatDate(o.created_at)}</td>
                  </tr>
                ))}
              {tab === "contacts" &&
                (data as Contact[]).map((c) => (
                  <tr key={c.id} className="border-b border-white/5 hover:bg-white/[0.02]">
                    <td className="px-4 py-3 font-medium">{c.name}</td>
                    <td className="px-4 py-3 text-white/60">{c.email}</td>
                    <td className="px-4 py-3">{c.industry || "–"}</td>
                    <td className="px-4 py-3 max-w-xs truncate text-white/40">{c.message || "–"}</td>
                    <td className="px-4 py-3 text-white/40">{formatDate(c.created_at)}</td>
                  </tr>
                ))}
              {tab === "subscribers" &&
                (data as Subscriber[]).map((s) => (
                  <tr key={s.id} className="border-b border-white/5 hover:bg-white/[0.02]">
                    <td className="px-4 py-3">{s.email}</td>
                    <td className="px-4 py-3 text-white/40">{formatDate(s.subscribed_at)}</td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
