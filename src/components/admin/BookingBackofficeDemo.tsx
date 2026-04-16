"use client";

import { useMemo, useState, useEffect, useCallback } from "react";
import Link from "next/link";
import {
  CalendarDays,
  Bell,
  RefreshCw,
  Package,
  Search,
  Settings,
  LayoutGrid,
  Megaphone,
  Puzzle,
  Store,
  ExternalLink,
  AlertTriangle,
  ChevronLeft,
  ChevronRight,
  Filter,
  Plus,
} from "lucide-react";
import { sampleProducts } from "@/lib/data";

type Booking = {
  id?: string;
  productId: string;
  startDate: string;
  endDate: string;
  quantity: number;
  createdAt?: string;
};

type Interest = {
  productId: string;
  productName: string;
  email: string;
  startDate: string;
  endDate: string;
  createdAt: string;
};

type NavId =
  | "bookings"
  | "calendar"
  | "announcements"
  | "widgets"
  | "services"
  | "settings"
  | "waitlist";

const productById = Object.fromEntries(
  sampleProducts.map((p) => [p.id, p])
);

function nightsBetween(start: string, end: string): number {
  const a = new Date(start + "T12:00:00Z").getTime();
  const b = new Date(end + "T12:00:00Z").getTime();
  return Math.max(1, Math.round((b - a) / 86_400_000));
}

function formatPtDateShort(iso: string): string {
  return new Date(
    iso + (iso.includes("T") ? "" : "T12:00:00Z")
  ).toLocaleDateString("pt-PT", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

function formatBtaStyleRange(start: string, end: string): string {
  const a = new Date(start + "T12:00:00Z");
  const b = new Date(end + "T12:00:00Z");
  const o = { month: "short" as const, day: "numeric" as const };
  const y = a.getFullYear() !== b.getFullYear();
  return `${a.toLocaleDateString("en-US", o)} – ${b.toLocaleDateString("en-US", y ? { ...o, year: "numeric" } : o)}`;
}

function bookingDisplayId(id: string | undefined, fallback: number): string {
  if (!id) return String(16_000_000 + fallback);
  let h = 0;
  for (let i = 0; i < id.length; i++) {
    h = (Math.imul(31, h) + id.charCodeAt(i)) | 0;
  }
  return String(Math.abs(h)).slice(0, 8);
}

function overlapsRange(
  b: Booking,
  from: string | null,
  to: string | null
): boolean {
  if (!from && !to) return true;
  const f = from || "1970-01-01";
  const t = to || "2099-12-31";
  return b.startDate <= t && b.endDate >= f;
}

function dayInBooking(dayIso: string, b: Booking): boolean {
  return b.startDate <= dayIso && b.endDate >= dayIso;
}

function getMonthGrid(year: number, month0: number): (string | null)[] {
  const first = new Date(Date.UTC(year, month0, 1));
  const lastDay = new Date(Date.UTC(year, month0 + 1, 0)).getUTCDate();
  const pad = first.getUTCDay();
  const cells: (string | null)[] = [];
  for (let i = 0; i < pad; i++) cells.push(null);
  for (let d = 1; d <= lastDay; d++) {
    const mm = String(month0 + 1).padStart(2, "0");
    const dd = String(d).padStart(2, "0");
    cells.push(`${year}-${mm}-${dd}`);
  }
  while (cells.length % 7 !== 0) cells.push(null);
  return cells;
}

const NAV: { id: NavId; label: string; icon: typeof CalendarDays }[] = [
  { id: "bookings", label: "Reservas", icon: Package },
  { id: "calendar", label: "Calendário", icon: CalendarDays },
  { id: "announcements", label: "Anúncios", icon: Megaphone },
  { id: "widgets", label: "Widgets", icon: Puzzle },
  { id: "services", label: "Serviços", icon: Store },
  { id: "settings", label: "Definições", icon: Settings },
  { id: "waitlist", label: "Lista de espera", icon: Bell },
];

export function BookingBackofficeDemo() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [interests, setInterests] = useState<Interest[]>([]);
  const [loading, setLoading] = useState(true);
  const [dbError, setDbError] = useState<string | null>(null);
  const [nav, setNav] = useState<NavId>("bookings");
  const [bookingQuery, setBookingQuery] = useState("");
  const [filterFrom, setFilterFrom] = useState("");
  const [filterTo, setFilterTo] = useState("");
  const [calYear, setCalYear] = useState(() => new Date().getUTCFullYear());
  const [calMonth, setCalMonth] = useState(() => new Date().getUTCMonth());

  const fetchData = useCallback(async () => {
    setLoading(true);
    setDbError(null);
    try {
      const [bRes, iRes] = await Promise.all([
        fetch("/api/bookings"),
        fetch("/api/interest"),
      ]);
      const bData = await bRes.json();
      const iData = await iRes.json();

      if (!bRes.ok && bRes.status === 503) {
        setDbError(
          bData.error ||
            "Base de dados não configurada. Define DATABASE_URL na Vercel para ver reservas reais."
        );
        setBookings([]);
      } else {
        setBookings(bData.bookings || []);
      }
      setInterests(iData.registrations || []);
    } catch {
      setDbError("Não foi possível carregar dados.");
      setBookings([]);
      setInterests([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const filteredBookings = useMemo(() => {
    const q = bookingQuery.trim().toLowerCase();
    let list = bookings.filter((b) =>
      overlapsRange(b, filterFrom || null, filterTo || null)
    );
    if (q) {
      list = list.filter((b) => {
        const p = productById[b.productId];
        const label = (p?.name || b.productId).toLowerCase();
        const idStr = (b.id || "").toLowerCase();
        return (
          label.includes(q) ||
          b.productId.toLowerCase().includes(q) ||
          idStr.includes(q) ||
          bookingDisplayId(b.id, 0).includes(q)
        );
      });
    }
    return list;
  }, [bookings, bookingQuery, filterFrom, filterTo]);

  const monthCells = useMemo(
    () => getMonthGrid(calYear, calMonth),
    [calYear, calMonth]
  );

  const calLabel = new Date(Date.UTC(calYear, calMonth, 1)).toLocaleDateString(
    "en-US",
    { month: "long", year: "numeric" }
  );

  const goMonth = (delta: number) => {
    const d = new Date(Date.UTC(calYear, calMonth + delta, 1));
    setCalYear(d.getUTCFullYear());
    setCalMonth(d.getUTCMonth());
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-[#f6f6f7] text-[#303030]">
      {/* App chrome — inspirado em app embutido tipo BTA / Polaris */}
      <div className="bg-white border-b border-[#e3e3e3]">
        <div className="max-w-[1600px] mx-auto px-4 sm:px-6 py-3 flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-wide text-[#616161]">
              Let&apos;s go baby · Booking
            </p>
            <h1 className="text-base font-semibold text-[#303030]">
              Reservas e disponibilidade
            </h1>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-semibold uppercase px-2 py-0.5 rounded border border-amber-300 bg-amber-50 text-amber-900">
              Demo (não é Shopify Admin)
            </span>
            <Link
              href="/"
              className="text-xs text-[#616161] hover:text-[#303030] inline-flex items-center gap-1"
            >
              Loja
              <ExternalLink className="w-3 h-3" />
            </Link>
            <button
              type="button"
              onClick={fetchData}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded border border-[#e3e3e3] bg-white hover:bg-[#f6f6f7]"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${loading ? "animate-spin" : ""}`} />
              Atualizar
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 py-6 flex flex-col lg:flex-row gap-6">
        <aside className="lg:w-52 shrink-0">
          <nav className="bg-white rounded-lg border border-[#e3e3e3] overflow-hidden">
            {NAV.map((item) => {
              const Icon = item.icon;
              const active = nav === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setNav(item.id)}
                  className={`w-full flex items-center gap-2 px-3 py-2.5 text-[13px] text-left border-b border-[#f1f1f1] last:border-0 transition-colors ${
                    active
                      ? "bg-[#f2f7f5] font-semibold text-[#1b4332]"
                      : "text-[#303030] hover:bg-[#fafafa]"
                  }`}
                >
                  <Icon className="w-4 h-4 shrink-0 opacity-80" />
                  {item.label}
                </button>
              );
            })}
          </nav>
          <p className="mt-3 px-1 text-[11px] text-[#8a8a8a] leading-relaxed">
            UI de demonstração alinhada ao fluxo BookThatApp: lista, calendário,
            serviços e definições. Faz deploy do último código para veres isto
            em produção.
          </p>
        </aside>

        <main className="flex-1 min-w-0 space-y-4">
          {dbError && (
            <div className="flex gap-3 p-3 rounded-lg border border-amber-200 bg-amber-50 text-amber-950 text-sm">
              <AlertTriangle className="w-5 h-5 shrink-0 text-amber-600" />
              <div>
                <p className="font-medium">Base de dados</p>
                <p className="text-xs mt-1 opacity-90">{dbError}</p>
              </div>
            </div>
          )}

          {nav === "bookings" && (
            <div className="bg-white rounded-lg border border-[#e3e3e3] shadow-sm overflow-hidden">
              <div className="px-4 py-3 border-b border-[#e3e3e3] flex flex-wrap items-center gap-2 justify-between">
                <div className="flex flex-wrap items-center gap-2">
                  <div className="flex items-center gap-1 text-xs text-[#616161]">
                    <input
                      type="date"
                      value={filterFrom}
                      onChange={(e) => setFilterFrom(e.target.value)}
                      className="border border-[#e3e3e3] rounded px-2 py-1.5 text-[13px]"
                    />
                    <span>—</span>
                    <input
                      type="date"
                      value={filterTo}
                      onChange={(e) => setFilterTo(e.target.value)}
                      className="border border-[#e3e3e3] rounded px-2 py-1.5 text-[13px]"
                    />
                  </div>
                  <button
                    type="button"
                    className="inline-flex items-center gap-1 px-2 py-1.5 text-xs font-medium rounded border border-[#e3e3e3] hover:bg-[#f6f6f7]"
                  >
                    <Filter className="w-3.5 h-3.5" />
                    Filtros
                  </button>
                  <div className="relative">
                    <Search className="absolute left-2 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-[#8a8a8a]" />
                    <input
                      type="search"
                      placeholder="ID, cliente ou produto…"
                      value={bookingQuery}
                      onChange={(e) => setBookingQuery(e.target.value)}
                      className="pl-8 pr-3 py-1.5 w-[220px] max-w-full border border-[#e3e3e3] rounded text-[13px] focus:outline-none focus:ring-1 focus:ring-[#2d6a4f]"
                    />
                  </div>
                </div>
                <button
                  type="button"
                  disabled
                  title="Demo — criação manual numa fase seguinte"
                  className="inline-flex items-center gap-1 px-3 py-1.5 text-xs font-semibold rounded text-white bg-[#303030] opacity-50 cursor-not-allowed"
                >
                  <Plus className="w-3.5 h-3.5" />
                  Criar reserva
                </button>
              </div>

              <div className="overflow-x-auto">
                {filteredBookings.length === 0 ? (
                  <div className="py-20 text-center px-4">
                    <Package className="w-12 h-12 text-[#e3e3e3] mx-auto mb-3" />
                    <p className="text-sm text-[#616161]">
                      {bookings.length === 0
                        ? "Nada encontrado. Ajusta o intervalo de datas ou cria uma reserva na loja."
                        : "Nenhum resultado com estes filtros."}
                    </p>
                  </div>
                ) : (
                  <table className="w-full text-[13px] min-w-[900px]">
                    <thead>
                      <tr className="bg-[#fafafa] border-b border-[#e3e3e3] text-left text-[11px] font-semibold uppercase tracking-wide text-[#616161]">
                        <th className="px-3 py-2.5 w-24">ID</th>
                        <th className="px-3 py-2.5">Data</th>
                        <th className="px-3 py-2.5">Cliente</th>
                        <th className="px-3 py-2.5 min-w-[200px]">Serviço</th>
                        <th className="px-3 py-2.5">Criado</th>
                        <th className="px-3 py-2.5">Encomenda</th>
                        <th className="px-3 py-2.5">Etiquetas</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredBookings.map((b, i) => {
                        const p = productById[b.productId];
                        const days = nightsBetween(b.startDate, b.endDate);
                        const svc = p
                          ? `${p.name} / ${days} ${days === 1 ? "dia" : "dias"} · ×${b.quantity}`
                          : b.productId;
                        return (
                          <tr
                            key={b.id || `${b.productId}-${b.startDate}-${i}`}
                            className="border-b border-[#f1f1f1] hover:bg-[#fafafa]"
                          >
                            <td className="px-3 py-2.5 font-mono text-[12px] text-[#303030]">
                              {bookingDisplayId(b.id, i)}
                            </td>
                            <td className="px-3 py-2.5 whitespace-nowrap text-[#303030]">
                              {formatBtaStyleRange(b.startDate, b.endDate)}
                            </td>
                            <td className="px-3 py-2.5 text-[#8a8a8a]">—</td>
                            <td className="px-3 py-2.5 text-[#303030]">{svc}</td>
                            <td className="px-3 py-2.5 whitespace-nowrap text-[#616161]">
                              {b.createdAt
                                ? new Date(b.createdAt).toLocaleString("pt-PT", {
                                    day: "2-digit",
                                    month: "short",
                                    year: "numeric",
                                    hour: "2-digit",
                                    minute: "2-digit",
                                  })
                                : "—"}
                            </td>
                            <td className="px-3 py-2.5">
                              <span className="text-[#8a8a8a]">—</span>
                            </td>
                            <td className="px-3 py-2.5 text-[#bdbdbd]">—</td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                )}
              </div>
              <div className="px-4 py-2 border-t border-[#e3e3e3] flex items-center justify-between text-[11px] text-[#616161]">
                <span>Fuso horário: Europe/Lisbon</span>
                <span>{filteredBookings.length} linhas</span>
              </div>
            </div>
          )}

          {nav === "calendar" && (
            <div className="bg-white rounded-lg border border-[#e3e3e3] shadow-sm overflow-hidden">
              <div className="px-4 py-3 border-b border-[#e3e3e3] flex flex-wrap items-center justify-between gap-3">
                <div className="flex flex-wrap gap-1 p-0.5 bg-[#f6f6f7] rounded-md text-[12px]">
                  <span className="px-2 py-1 rounded bg-white shadow-sm font-medium">
                    Reservas
                  </span>
                  <span className="px-2 py-1 text-[#616161]">Listas de espera</span>
                  <span className="px-2 py-1 text-[#616161]">Anúncios</span>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      const n = new Date();
                      setCalYear(n.getUTCFullYear());
                      setCalMonth(n.getUTCMonth());
                    }}
                    className="text-xs font-medium px-2 py-1 rounded border border-[#e3e3e3] hover:bg-[#fafafa]"
                  >
                    Hoje
                  </button>
                  <button
                    type="button"
                    onClick={() => goMonth(-1)}
                    className="p-1 rounded border border-[#e3e3e3] hover:bg-[#fafafa]"
                    aria-label="Mês anterior"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <span className="text-sm font-semibold min-w-[140px] text-center capitalize">
                    {calLabel}
                  </span>
                  <button
                    type="button"
                    onClick={() => goMonth(1)}
                    className="p-1 rounded border border-[#e3e3e3] hover:bg-[#fafafa]"
                    aria-label="Mês seguinte"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
                <div className="flex gap-1 text-[11px] text-[#616161]">
                  <span className="font-medium text-[#303030]">Mês</span>
                  <span>·</span>
                  <span>Semana</span>
                  <span>·</span>
                  <span>Produtos</span>
                </div>
              </div>

              <div className="p-2">
                <div className="grid grid-cols-7 gap-px bg-[#e3e3e3] rounded-lg overflow-hidden border border-[#e3e3e3]">
                  {["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"].map(
                    (d) => (
                      <div
                        key={d}
                        className="bg-[#fafafa] text-[11px] font-semibold text-[#616161] px-2 py-2 text-center"
                      >
                        {d}
                      </div>
                    )
                  )}
                  {monthCells.map((iso, idx) => {
                    if (!iso) {
                      return (
                        <div
                          key={`empty-${idx}`}
                          className="bg-[#fcfcfc] min-h-[100px] p-1"
                        />
                      );
                    }
                    const dayNum = Number(iso.slice(-2));
                    const dayBookings = bookings.filter((b) =>
                      dayInBooking(iso, b)
                    );
                    const visible = dayBookings.slice(0, 4);
                    const more = dayBookings.length - visible.length;
                    return (
                      <div
                        key={iso}
                        className="bg-white min-h-[100px] p-1 flex flex-col gap-0.5"
                      >
                        <span className="text-[11px] font-medium text-[#303030] px-0.5">
                          {dayNum}
                        </span>
                        {visible.map((b, j) => {
                          const p = productById[b.productId];
                          const label = (p?.name || b.productId).slice(0, 18);
                          return (
                            <div
                              key={`${iso}-${b.id || j}`}
                              className="text-[10px] leading-tight px-1 py-0.5 rounded bg-[#2c6ecb] text-white truncate"
                              title={p?.name || b.productId}
                            >
                              {label}
                              {b.quantity > 1 ? ` ×${b.quantity}` : ""}
                            </div>
                          );
                        })}
                        {more > 0 && (
                          <span className="text-[10px] text-[#2c6ecb] font-medium px-1">
                            +{more} mais
                          </span>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
              <div className="px-4 py-2 border-t border-[#e3e3e3] text-[11px] text-[#616161]">
                Fuso horário: Europe/Lisbon · {bookings.length} reservas no total
              </div>
            </div>
          )}

          {nav === "announcements" && (
            <div className="bg-white rounded-lg border border-[#e3e3e3] shadow-sm overflow-hidden">
              <div className="px-4 py-3 border-b border-[#e3e3e3] flex flex-wrap gap-2 justify-between items-center">
                <h2 className="text-sm font-semibold">Anúncios</h2>
                <button
                  type="button"
                  disabled
                  className="text-xs font-semibold px-3 py-1.5 rounded bg-[#303030] text-white opacity-50 cursor-not-allowed"
                >
                  Criar anúncio
                </button>
              </div>
              <div className="px-4 py-3 flex flex-wrap gap-2 border-b border-[#e3e3e3]">
                <input
                  type="date"
                  className="border border-[#e3e3e3] rounded px-2 py-1.5 text-xs"
                  disabled
                />
                <input
                  type="search"
                  placeholder="Pesquisar título…"
                  className="border border-[#e3e3e3] rounded px-2 py-1.5 text-xs flex-1 min-w-[160px]"
                  disabled
                />
                <button
                  type="button"
                  disabled
                  className="text-xs px-3 py-1.5 rounded border border-[#e3e3e3] opacity-50"
                >
                  Aplicar
                </button>
              </div>
              <div className="py-16 text-center px-4">
                <Megaphone className="w-10 h-10 text-[#e3e3e3] mx-auto mb-2" />
                <p className="text-sm text-[#616161]">
                  Nada encontrado. Ajusta o intervalo de datas no filtro (demo).
                </p>
              </div>
            </div>
          )}

          {nav === "widgets" && (
            <div className="space-y-4">
              <div className="bg-[#e8f4e8] border border-[#c5e3c5] rounded-lg p-4">
                <p className="text-sm font-semibold text-[#1b4332]">
                  Reservas no carrinho
                </p>
                <p className="text-xs text-[#2d6a4f] mt-1 max-w-2xl">
                  Bloqueia disponibilidade enquanto o cliente conclui o checkout
                  — equivalente ao widget &quot;Reservations&quot; do BTA. A
                  implementar com locks temporários na base de dados.
                </p>
              </div>
              <div className="grid sm:grid-cols-2 gap-3">
                <WidgetCard
                  title="Atividades & tours"
                  body="Bilhética para experiências com data e lotação."
                />
                <WidgetCard
                  title="Marcações"
                  body="Slots por colaborador ou recurso."
                />
                <WidgetCard
                  title="Aulas & cursos"
                  body="Sessão única ou série de aulas."
                />
                <WidgetCard
                  title="Alugueres"
                  body="Por hora, dia ou semana — como o vosso catálogo atual."
                />
                <WidgetCard
                  title="Alojamento"
                  body="Estadias com check-in / check-out."
                />
                <WidgetCard
                  title="Eventos"
                  body="Eventos pontuais no calendário."
                />
              </div>
              <div className="bg-white rounded-lg border border-[#e3e3e3] p-4">
                <h3 className="text-xs font-semibold uppercase text-[#616161] mb-2">
                  Loja completa
                </h3>
                <ul className="text-[13px] text-[#303030] space-y-1 list-disc list-inside">
                  <li>Pesquisa com intervalo de datas</li>
                  <li>Calendário de eventos</li>
                  <li>Formulário de marcações embutido</li>
                </ul>
              </div>
            </div>
          )}

          {nav === "services" && (
            <div className="bg-white rounded-lg border border-[#e3e3e3] shadow-sm overflow-hidden">
              <div className="px-4 py-3 border-b border-[#e3e3e3] flex flex-wrap gap-2 justify-between">
                <h2 className="text-sm font-semibold">Serviços</h2>
                <div className="flex gap-2">
                  <button
                    type="button"
                    disabled
                    className="text-xs px-2 py-1.5 rounded border border-[#e3e3e3] opacity-50"
                  >
                    Importar em massa
                  </button>
                  <button
                    type="button"
                    disabled
                    className="text-xs px-2 py-1.5 rounded border border-[#e3e3e3] opacity-50"
                  >
                    Importar da Shopify
                  </button>
                  <button
                    type="button"
                    disabled
                    className="text-xs font-semibold px-2 py-1.5 rounded bg-[#303030] text-white opacity-50"
                  >
                    Criar serviço
                  </button>
                </div>
              </div>
              <div className="px-4 py-2 border-b border-[#e3e3e3] flex gap-2">
                <input
                  type="search"
                  placeholder="Filtrar…"
                  className="border border-[#e3e3e3] rounded px-2 py-1.5 text-xs flex-1 max-w-xs"
                  disabled
                />
                <button
                  type="button"
                  disabled
                  className="text-xs px-3 py-1.5 rounded border border-[#e3e3e3] opacity-50"
                >
                  Aplicar
                </button>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-[13px] min-w-[720px]">
                  <thead>
                    <tr className="bg-[#fafafa] border-b border-[#e3e3e3] text-left text-[11px] font-semibold uppercase text-[#616161]">
                      <th className="px-3 py-2.5 w-8" />
                      <th className="px-3 py-2.5">Serviço</th>
                      <th className="px-3 py-2.5">Tipo</th>
                      <th className="px-3 py-2.5">Capacidade</th>
                      <th className="px-3 py-2.5">Variantes</th>
                      <th className="px-3 py-2.5">Criado</th>
                    </tr>
                  </thead>
                  <tbody>
                    {sampleProducts.map((p, i) => (
                      <tr
                        key={p.id}
                        className="border-b border-[#f1f1f1] hover:bg-[#fafafa]"
                      >
                        <td className="px-3 py-2">
                          <input type="checkbox" disabled className="rounded" />
                        </td>
                        <td className="px-3 py-2 font-medium text-[#2c6ecb]">
                          {p.name}
                        </td>
                        <td className="px-3 py-2">Produto · Aluguer</td>
                        <td className="px-3 py-2 tabular-nums">3</td>
                        <td className="px-3 py-2 tabular-nums">1</td>
                        <td className="px-3 py-2 text-[#616161]">
                          {i === 0 ? "11 abr 2019, 15:37" : "—"}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {nav === "settings" && (
            <div className="grid sm:grid-cols-2 gap-4">
              <SettingsBlock
                title="Staff e recursos"
                items={[
                  "Recursos: equipa, salas, unidades de stock",
                  "Contas de staff e permissões",
                ]}
              />
              <SettingsBlock
                title="Loja"
                items={[
                  "Horário de funcionamento",
                  "Locais e envio",
                  "Processamento de encomendas e consolidação de reservas",
                  "Depósitos e cauções",
                ]}
              />
              <SettingsBlock
                title="Cliente"
                items={[
                  "Branding dos widgets",
                  "Campos extra no formulário de reserva",
                  "Templates de email e iCal",
                  "Cancelamentos e notificações",
                ]}
              />
              <SettingsBlock
                title="Avançado"
                items={[
                  "API e integrações",
                  "SMTP personalizado",
                  "Reserve with Google (fase seguinte)",
                ]}
              />
            </div>
          )}

          {nav === "waitlist" && (
            <div className="bg-white rounded-lg border border-[#e3e3e3] shadow-sm overflow-hidden">
              <div className="px-4 py-3 border-b border-[#e3e3e3]">
                <h2 className="text-sm font-semibold">Lista de espera</h2>
                <p className="text-xs text-[#616161] mt-0.5">
                  Dados via <code className="text-[11px]">/api/interest</code>{" "}
                  (memória no servidor — demo).
                </p>
              </div>
              {interests.length === 0 ? (
                <div className="py-16 text-center">
                  <Bell className="w-10 h-10 text-[#e3e3e3] mx-auto mb-2" />
                  <p className="text-sm text-[#616161]">Sem registos.</p>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-[13px] min-w-[560px]">
                    <thead>
                      <tr className="bg-[#fafafa] border-b border-[#e3e3e3] text-left text-[11px] font-semibold uppercase text-[#616161]">
                        <th className="px-3 py-2.5">Produto</th>
                        <th className="px-3 py-2.5">Email</th>
                        <th className="px-3 py-2.5">Datas</th>
                        <th className="px-3 py-2.5">Registado</th>
                      </tr>
                    </thead>
                    <tbody>
                      {interests.map((r, i) => (
                        <tr
                          key={`${r.email}-${i}`}
                          className="border-b border-[#f1f1f1]"
                        >
                          <td className="px-3 py-2 font-medium">{r.productName}</td>
                          <td className="px-3 py-2 text-[#616161]">{r.email}</td>
                          <td className="px-3 py-2 whitespace-nowrap">
                            {formatPtDateShort(r.startDate)} —{" "}
                            {formatPtDateShort(r.endDate)}
                          </td>
                          <td className="px-3 py-2 text-[#616161] text-xs whitespace-nowrap">
                            {new Date(r.createdAt).toLocaleString("pt-PT")}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

function WidgetCard({ title, body }: { title: string; body: string }) {
  return (
    <div className="bg-white rounded-lg border border-[#e3e3e3] p-4 shadow-sm">
      <div className="flex items-start gap-2">
        <LayoutGrid className="w-4 h-4 text-[#616161] shrink-0 mt-0.5" />
        <div>
          <h3 className="text-[13px] font-semibold text-[#303030]">{title}</h3>
          <p className="text-[12px] text-[#616161] mt-1 leading-snug">{body}</p>
        </div>
      </div>
    </div>
  );
}

function SettingsBlock({
  title,
  items,
}: {
  title: string;
  items: string[];
}) {
  return (
    <div className="bg-white rounded-lg border border-[#e3e3e3] p-4 shadow-sm">
      <h3 className="text-[13px] font-semibold text-[#303030] mb-2">{title}</h3>
      <ul className="text-[12px] text-[#616161] space-y-1.5">
        {items.map((t) => (
          <li key={t} className="flex gap-2">
            <span className="text-[#2d6a4f]">·</span>
            <span>{t}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
