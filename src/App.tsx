import { useState } from "react";
import {
  BarChart, Bar, PieChart, Pie, Cell,
  XAxis, YAxis, Tooltip, ResponsiveContainer, AreaChart, Area
} from "recharts";

// ─── DATA ────────────────────────────────────────────────────────────────────
const connectionsData = [
  { d: "16 Апр", v: 42 }, { d: "17 Апр", v: 38 }, { d: "18 Апр", v: 55 },
  { d: "19 Апр", v: 48 }, { d: "20 Апр", v: 60 }, { d: "21 Апр", v: 45 },
  { d: "22 Апр", v: 52 }, { d: "23 Апр", v: 58 }, { d: "24 Апр", v: 63 },
  { d: "25 Апр", v: 50 }, { d: "26 Апр", v: 47 }, { d: "27 Апр", v: 65 },
  { d: "28 Апр", v: 70 }, { d: "29 Апр", v: 62 }, { d: "30 Апр", v: 55 },
  { d: "01 Май", v: 48 }, { d: "06 Май", v: 72 }, { d: "11 Май", v: 68 },
  { d: "16 Май", v: 75 },
];
const trafficData = [
  { d: "10 Май", inc: 380, out: 420 }, { d: "11 Май", inc: 400, out: 440 },
  { d: "12 Май", inc: 360, out: 400 }, { d: "13 Май", inc: 420, out: 460 },
  { d: "14 Май", inc: 390, out: 430 }, { d: "15 Май", inc: 410, out: 450 },
  { d: "16 Май", inc: 370, out: 410 },
];
const pieData = [
  { name: "Ultra 500", value: 352, color: "#3B82F6" },
  { name: "Turbo 200", value: 327, color: "#10B981" },
  { name: "Optima 100", value: 277, color: "#8B5CF6" },
  { name: "Start 50", value: 176, color: "#F59E0B" },
  { name: "Light 30", value: 124, color: "#EF4444" },
];
const criticalClients = [
  { id: "1001256", name: "Иванов Константин", issue: "Трафик исчерпан", traffic: 0, total: 500, balance: 0 },
  { id: "1001255", name: "Петров Сергей", issue: "Низкий баланс", traffic: 5, total: 200, balance: 350 },
  { id: "1001252", name: "Николаев Виктор", issue: "Просрочен платёж", traffic: 0, total: 100, balance: 0 },
  { id: "1001253", name: "Алексеев Кирилл", issue: "Низкий баланс", traffic: 32, total: 50, balance: 550 },
  { id: "1001251", name: "Васильев Андрей", issue: "Просрочен платёж", traffic: 8, total: 30, balance: 300 },
];
const events = [
  { icon: "⚠️", title: "Трафик исчерпан", desc: "У клиента Иванов Константин (ID: 1001256) закончился трафик.", time: "10:22", type: "error" },
  { icon: "⚠️", title: "Низкий баланс", desc: "У клиента Петров Сергей (ID: 1001255) баланс менее 50 ₽.", time: "09:14", type: "warn" },
  { icon: "✅", title: "Успешный платёж", desc: "Поступил платёж 850 ₽ от клиента Сидорова Мария (ID: 1001254).", time: "08:47", type: "ok" },
  { icon: "👤", title: "Новый клиент", desc: "Зарегистрирован новый клиент: Васильев Андрей (ID: 1001251).", time: "Вчера", type: "info" },
  { icon: "📊", title: "Пиковая нагрузка", desc: "Зафиксирована пиковая нагрузка на сеть: 92%.", time: "Вчера", type: "info" },
];
const clientsData = [
  { id: "1001256", name: "Иванов Константин", addr: "ул. Ленина, 15-32", phone: "+7 (999) 123-45-67", email: "ivanov.k@mail.ru", tariff: "Ultra 500", speed: "500 Мбит/с", contract: "Действует", contractEnd: "до 24.05.2025", balance: 0, debt: 850, traffic: 0, trafficTotal: 500, status: "Трафик исчерпан", statusColor: "#EF4444", initials: "ИК", color: "#EF4444" },
  { id: "1001255", name: "Петров Сергей", addr: "ул. Советская, 8-10", phone: "+7 (999) 987-65-43", email: "petrov.s@mail.ru", tariff: "Turbo 200", speed: "200 Мбит/с", contract: "Действует", contractEnd: "до 12.06.2025", balance: 350, debt: 0, traffic: 5, trafficTotal: 200, status: "Низкий баланс", statusColor: "#F59E0B", initials: "ПС", color: "#F59E0B" },
  { id: "1001254", name: "Сидорова Мария", addr: "ул. Пушкина, 23-45", phone: "+7 (999) 456-78-90", email: "sidorova.m@mail.ru", tariff: "Optima 100", speed: "100 Мбит/с", contract: "Действует", contractEnd: "до 01.07.2025", balance: 650, debt: 0, traffic: 15, trafficTotal: 100, status: "Активен", statusColor: "#10B981", initials: "СМ", color: "#3B82F6" },
  { id: "1001253", name: "Алексеев Кирилл", addr: "ул. Гагарина, 12-7", phone: "+7 (999) 321-09-87", email: "alekseev.k@mail.ru", tariff: "Start 50", speed: "50 Мбит/с", contract: "Действует", contractEnd: "до 15.08.2025", balance: 550, debt: 0, traffic: 32, trafficTotal: 50, status: "Активен", statusColor: "#10B981", initials: "АК", color: "#10B981" },
  { id: "1001252", name: "Николаев Виктор", addr: "ул. Мира, 9-11", phone: "+7 (999) 654-32-10", email: "nikolaev.v@mail.ru", tariff: "Optima 100", speed: "100 Мбит/с", contract: "Приостановлен", contractEnd: "с 28.04.2025", balance: 0, debt: 1200, traffic: 0, trafficTotal: 100, status: "Заблокирован", statusColor: "#EF4444", initials: "НВ", color: "#8B5CF6" },
  { id: "1001251", name: "Васильев Андрей", addr: "ул. Южная, 5-3", phone: "+7 (999) 555-11-22", email: "vasilev.a@mail.ru", tariff: "Light 30", speed: "30 Мбит/с", contract: "Действует", contractEnd: "до 22.07.2025", balance: 300, debt: 0, traffic: 8, trafficTotal: 30, status: "Активен", statusColor: "#10B981", initials: "БА", color: "#6366F1" },
];
const tariffsData = [
  { name: "Ultra 500", speed: "1000 Мбит/с", traffic: "Безлимит", price: "1 200 ₽/мес", clients: 352, pct: 28, avg: "742 ГБ", income: "422 400 ₽", status: "Активен" },
  { name: "Turbo 200", speed: "500 Мбит/с", traffic: "200 ГБ", price: "850 ₽/мес", clients: 327, pct: 26, avg: "146 ГБ", income: "262 950 ₽", status: "Активен" },
  { name: "Optima 100", speed: "100 Мбит/с", traffic: "100 ГБ", price: "450 ₽/мес", clients: 277, pct: 22, avg: "68 ГБ", income: "124 650 ₽", status: "Активен" },
  { name: "Start 50", speed: "50 Мбит/с", traffic: "50 ГБ", price: "300 ₽/мес", clients: 176, pct: 14, avg: "32 ГБ", income: "52 800 ₽", status: "Активен" },
  { name: "Light 30", speed: "30 Мбит/с", traffic: "30 ГБ", price: "200 ₽/мес", clients: 124, pct: 10, avg: "18 ГБ", income: "24 800 ₽", status: "Неактивен" },
  { name: "Night 100", speed: "100 Мбит/с", traffic: "Ночью безлимит", price: "500 ₽/мес", clients: 67, pct: 5, avg: "52 ГБ", income: "33 500 ₽", status: "Активен" },
];
const paymentsData = [
  { date: "15.05.2025 10:22", client: "Иванов Константин", clientId: "1001256", op: "Поступление", method: "Автоплатёж (карта **** 3421)", amount: 850, status: "Успешно" },
  { date: "15.05.2025 09:14", client: "Петров Сергей", clientId: "1001255", op: "Списание", method: "Баланс", amount: -650, status: "Успешно" },
  { date: "14.05.2025 12:01", client: "Сидорова Мария", clientId: "1001254", op: "Поступление", method: "СБП", amount: 450, status: "Успешно", operator: "Оператор" },
  { date: "14.05.2025 11:33", client: "Алексеев Кирилл", clientId: "1001253", op: "Списание", method: "Баланс", amount: -450, status: "Успешно" },
  { date: "13.05.2025 16:45", client: "Николаев Виктор", clientId: "1001252", op: "Поступление", method: "Автоплатёж (карта **** 7789)", amount: 450, status: "Успешно" },
  { date: "13.05.2025 10:09", client: "Васильев Андрей", clientId: "1001251", op: "Списание", method: "Баланс", amount: -300, status: "Успешно" },
];
const activityTrafficData = Array.from({ length: 30 }, (_, i) => ({
  d: `${i + 1} Май`,
  inc: Math.round(130 + Math.sin(i * 0.4) * 40 + (i * 3) % 30),
  out: Math.round(100 + Math.sin(i * 0.3) * 30 + (i * 2) % 20),
}));
const hourlyData = Array.from({ length: 24 }, (_, i) => ({
  h: `${String(i).padStart(2, "0")}:00`,
  v: i < 6 ? Math.round(20 + i * 5) : i < 12 ? Math.round(60 + (i - 6) * 15) : i < 20 ? Math.round(150 + (i - 12) * 10) : Math.round(240 - (i - 20) * 30),
}));
const trafficTypes = [
  { name: "HTTP/HTTPS", value: 58.3, color: "#10B981" },
  { name: "Streaming", value: 17.6, color: "#3B82F6" },
  { name: "Социальные сети", value: 9.8, color: "#8B5CF6" },
  { name: "Онлайн игры", value: 6.7, color: "#F59E0B" },
  { name: "Другое", value: 7.6, color: "#6B7280" },
];
const notificationsData = [
  { id: 1, icon: "⚠️", title: "Трафик исчерпан", desc: "У клиента Иванов Константин (ID: 1001256) закончился трафик.", time: "Сегодня, 10:22", type: "error", read: false },
  { id: 2, icon: "⚠️", title: "Низкий баланс", desc: "У клиента Петров Сергей (ID: 1001255) баланс менее 50 ₽.", time: "Сегодня, 09:14", type: "warn", read: false },
  { id: 3, icon: "⚠️", title: "Просрочен платёж", desc: "Клиент Николаев Виктор (ID: 1001252) не оплатил счёт уже 12 дней.", time: "Сегодня, 08:55", type: "error", read: false },
  { id: 4, icon: "✅", title: "Успешный платёж", desc: "Поступил платёж 850 ₽ от клиента Сидорова Мария (ID: 1001254).", time: "Сегодня, 08:47", type: "ok", read: false },
  { id: 5, icon: "👤", title: "Новый клиент", desc: "Зарегистрирован новый клиент: Васильев Андрей (ID: 1001251).", time: "Вчера, 17:30", type: "info", read: true },
  { id: 6, icon: "📊", title: "Пиковая нагрузка", desc: "Зафиксирована пиковая нагрузка на сеть: 92%.", time: "Вчера, 14:10", type: "warn", read: true },
  { id: 7, icon: "🔄", title: "Автоплатёж выполнен", desc: "Автоматическое списание 1 200 ₽ за тариф Ultra 500 (Иванов К.).", time: "Вчера, 10:00", type: "ok", read: true },
  { id: 8, icon: "📡", title: "Перегрузка узла", desc: "Сетевой узел №3 работает на 95% мощности.", time: "14.05, 22:40", type: "error", read: true },
  { id: 9, icon: "✅", title: "Тариф добавлен", desc: "Новый тариф «Night 100» успешно добавлен в систему.", time: "14.05, 11:15", type: "ok", read: true },
  { id: 10, icon: "👤", title: "Новый клиент", desc: "Зарегистрирован новый клиент: Кузнецов Дмитрий (ID: 1001250).", time: "13.05, 09:20", type: "info", read: true },
  { id: 11, icon: "⚠️", title: "Низкий баланс", desc: "У клиента Алексеев Кирилл (ID: 1001253) баланс менее 100 ₽.", time: "12.05, 16:33", type: "warn", read: true },
  { id: 12, icon: "🔒", title: "Клиент заблокирован", desc: "Клиент Николаев Виктор (ID: 1001252) заблокирован за неоплату.", time: "12.05, 09:00", type: "error", read: true },
];
const reportsData = [
  { name: "Отчёт по доходам — Май 2025", type: "Финансы", date: "01.06.2025", size: "245 КБ", format: "PDF" },
  { name: "Активность клиентов — Апрель 2025", type: "Клиенты", date: "01.05.2025", size: "180 КБ", format: "XLSX" },
  { name: "Потребление трафика — Q1 2025", type: "Трафик", date: "01.04.2025", size: "512 КБ", format: "PDF" },
  { name: "Отчёт по тарифам — Март 2025", type: "Тарифы", date: "01.04.2025", size: "98 КБ", format: "PDF" },
  { name: "Задолженности клиентов", type: "Финансы", date: "16.05.2025", size: "67 КБ", format: "XLSX" },
  { name: "Churn-анализ за полугодие", type: "Аналитика", date: "30.04.2025", size: "320 КБ", format: "PDF" },
];
const monthlyRevenueData = [
  { m: "Янв", v: 612000 }, { m: "Фев", v: 634000 }, { m: "Мар", v: 658000 },
  { m: "Апр", v: 690000 }, { m: "Май", v: 732541 },
];
const churnData = [
  { m: "Янв", v: 3.1 }, { m: "Фев", v: 2.9 }, { m: "Мар", v: 3.4 },
  { m: "Апр", v: 2.7 }, { m: "Май", v: 2.45 },
];

// ─── THEME ───────────────────────────────────────────────────────────────────
const T = {
  light: {
    bg: "#F3F4F6", card: "#fff", sidebar: "#fff", header: "#fff",
    text: "#111827", sub: "#6B7280", border: "#F3F4F6",
    navHover: "#EFF6FF", navActive: "#EFF6FF", navActiveText: "#3B82F6",
    input: "#fff", inputBorder: "#E5E7EB", tableHead: "#F9FAFB",
  },
  dark: {
    bg: "#0F172A", card: "#1E293B", sidebar: "#1E293B", header: "#1E293B",
    text: "#F1F5F9", sub: "#94A3B8", border: "#334155",
    navHover: "#334155", navActive: "#1D4ED8", navActiveText: "#93C5FD",
    input: "#0F172A", inputBorder: "#334155", tableHead: "#162032",
  },
};

// ─── COMPONENTS ──────────────────────────────────────────────────────────────
const KpiCard = ({ label, value, sub, subColor, icon, iconBg, t }) => (
  <div style={{ background: t.card, borderRadius: 12, padding: "16px 20px", display: "flex", alignItems: "center", justifyContent: "space-between", boxShadow: "0 1px 4px rgba(0,0,0,0.08)", flex: 1, minWidth: 0 }}>
    <div>
      <div style={{ fontSize: 12, color: t.sub, marginBottom: 4 }}>{label}</div>
      <div style={{ fontSize: 22, fontWeight: 700, color: t.text, lineHeight: 1.1 }}>{value}</div>
      {sub && <div style={{ fontSize: 11, color: subColor || "#10B981", marginTop: 3 }}>{sub}</div>}
    </div>
    {icon && <div style={{ width: 40, height: 40, borderRadius: 10, background: iconBg || "#EFF6FF", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18 }}>{icon}</div>}
  </div>
);

const Badge = ({ text, color, bg }) => (
  <span style={{ background: bg || "#DCFCE7", color: color || "#16A34A", borderRadius: 6, padding: "2px 10px", fontSize: 12, fontWeight: 600 }}>{text}</span>
);

// ─── MODAL ───────────────────────────────────────────────────────────────────
const Modal = ({ title, onClose, children, t }) => (
  <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.5)", zIndex: 1000, display: "flex", alignItems: "center", justifyContent: "center" }} onClick={onClose}>
    <div style={{ background: t.card, borderRadius: 16, padding: 28, width: 480, boxShadow: "0 20px 60px rgba(0,0,0,0.3)", maxHeight: "80vh", overflowY: "auto" }} onClick={e => e.stopPropagation()}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
        <span style={{ fontWeight: 700, fontSize: 17, color: t.text }}>{title}</span>
        <button onClick={onClose} style={{ background: "none", border: "none", fontSize: 20, cursor: "pointer", color: t.sub }}>✕</button>
      </div>
      {children}
    </div>
  </div>
);

const Field = ({ label, type = "text", placeholder, options, t }) => (
  <div style={{ marginBottom: 16 }}>
    <label style={{ fontSize: 13, fontWeight: 500, color: t.sub, display: "block", marginBottom: 6 }}>{label}</label>
    {options ? (
      <select style={{ width: "100%", padding: "9px 12px", borderRadius: 8, border: `1px solid ${t.inputBorder}`, fontSize: 13, background: t.input, color: t.text }}>
        {options.map(o => <option key={o}>{o}</option>)}
      </select>
    ) : (
      <input type={type} placeholder={placeholder} style={{ width: "100%", padding: "9px 12px", borderRadius: 8, border: `1px solid ${t.inputBorder}`, fontSize: 13, background: t.input, color: t.text, boxSizing: "border-box" }} />
    )}
  </div>
);

// ─── PAGES ───────────────────────────────────────────────────────────────────
function Dashboard({ setPage, t }) {
  return (
    <div style={{ padding: "24px 28px", display: "flex", flexDirection: "column", gap: 20 }}>
      <div style={{ display: "flex", gap: 12 }}>
        <KpiCard t={t} label="Всего клиентов" value="1 256" sub="+18 за месяц" icon="👥" iconBg="#EFF6FF" />
        <KpiCard t={t} label="Активных сейчас" value="823" sub="65.5% от всех" icon="🟢" iconBg="#F0FDF4" />
        <KpiCard t={t} label="ARPU (месяц)" value="582,45 ₽" sub="+4.3% к прошл. месяцу" icon="📊" iconBg="#F5F3FF" />
        <KpiCard t={t} label="Churn Rate" value="2.45%" sub="-0.8% к прошл. месяцу" subColor="#10B981" icon="📉" iconBg="#FFF7ED" />
        <KpiCard t={t} label="Доход за месяц" value="732 541 ₽" sub="+6.1% к прошл. месяцу" icon="💳" iconBg="#EFF6FF" />
        <div style={{ background: t.card, borderRadius: 12, padding: "16px 20px", boxShadow: "0 1px 4px rgba(0,0,0,0.08)", flex: 1, minWidth: 0 }}>
          <div style={{ fontSize: 12, color: "#EF4444", fontWeight: 600 }}>Критические клиенты</div>
          <div style={{ fontSize: 28, fontWeight: 700, color: "#EF4444" }}>24</div>
          <div style={{ fontSize: 11, color: t.sub }}>Требуют внимания</div>
        </div>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
        <div style={{ background: t.card, borderRadius: 12, padding: 20, boxShadow: "0 1px 4px rgba(0,0,0,0.08)" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
            <span style={{ fontWeight: 600, fontSize: 15, color: t.text }}>Подключения клиентов</span>
            <span style={{ fontSize: 12, color: t.sub }}>Всего новых: <b style={{ color: "#3B82F6" }}>78</b></span>
          </div>
          <ResponsiveContainer width="100%" height={180}>
            <AreaChart data={connectionsData}>
              <defs>
                <linearGradient id="cg" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.15} />
                  <stop offset="95%" stopColor="#3B82F6" stopOpacity={0} />
                </linearGradient>
              </defs>
              <XAxis dataKey="d" tick={{ fontSize: 10, fill: t.sub }} tickLine={false} axisLine={false} interval={3} />
              <YAxis tick={{ fontSize: 10, fill: t.sub }} tickLine={false} axisLine={false} />
              <Tooltip contentStyle={{ background: t.card, border: `1px solid ${t.border}`, color: t.text }} />
              <Area type="monotone" dataKey="v" stroke="#3B82F6" fill="url(#cg)" strokeWidth={2} dot={{ r: 3, fill: "#3B82F6" }} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
        <div style={{ background: t.card, borderRadius: 12, padding: 20, boxShadow: "0 1px 4px rgba(0,0,0,0.08)" }}>
          <div style={{ fontWeight: 600, fontSize: 15, marginBottom: 16, color: t.text }}>Потребление трафика</div>
          <ResponsiveContainer width="100%" height={180}>
            <BarChart data={trafficData}>
              <XAxis dataKey="d" tick={{ fontSize: 10, fill: t.sub }} tickLine={false} axisLine={false} />
              <YAxis tick={{ fontSize: 10, fill: t.sub }} tickLine={false} axisLine={false} />
              <Tooltip contentStyle={{ background: t.card, border: `1px solid ${t.border}`, color: t.text }} />
              <Bar dataKey="inc" fill="#10B981" stackId="a" name="Входящий (ГБ)" />
              <Bar dataKey="out" fill="#3B82F6" stackId="a" name="Исходящий (ГБ)" radius={[3, 3, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 16 }}>
        <div style={{ background: t.card, borderRadius: 12, padding: 20, boxShadow: "0 1px 4px rgba(0,0,0,0.08)" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
            <span style={{ fontWeight: 600, fontSize: 14, color: t.text }}>Топ-5 критических клиентов</span>
            <button onClick={() => setPage("clients")} style={{ fontSize: 12, color: "#3B82F6", background: "none", border: "1px solid #3B82F6", borderRadius: 6, padding: "3px 10px", cursor: "pointer" }}>Все критические</button>
          </div>
          <table style={{ width: "100%", fontSize: 12, borderCollapse: "collapse" }}>
            <thead><tr style={{ color: t.sub, textAlign: "left" }}>
              <th style={{ paddingBottom: 8, fontWeight: 500 }}>КЛИЕНТ</th>
              <th style={{ paddingBottom: 8, fontWeight: 500 }}>ПРОБЛЕМА</th>
              <th style={{ paddingBottom: 8, fontWeight: 500 }}>БАЛАНС</th>
            </tr></thead>
            <tbody>{criticalClients.map(c => (
              <tr key={c.id} style={{ borderTop: `1px solid ${t.border}` }}>
                <td style={{ padding: "8px 0" }}>
                  <div style={{ fontWeight: 600, color: t.text }}>{c.name}</div>
                  <div style={{ color: t.sub }}>ID: {c.id}</div>
                </td>
                <td style={{ color: "#EF4444", fontWeight: 500 }}>{c.issue}</td>
                <td style={{ fontWeight: 600, color: c.balance === 0 ? "#EF4444" : t.text }}>{c.balance} ₽</td>
              </tr>
            ))}</tbody>
          </table>
        </div>
        <div style={{ background: t.card, borderRadius: 12, padding: 20, boxShadow: "0 1px 4px rgba(0,0,0,0.08)" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
            <span style={{ fontWeight: 600, fontSize: 14, color: t.text }}>Последние события</span>
            <button onClick={() => setPage("notifications")} style={{ fontSize: 12, color: "#3B82F6", background: "none", border: "1px solid #3B82F6", borderRadius: 6, padding: "3px 10px", cursor: "pointer" }}>Все события</button>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {events.map((e, i) => (
              <div key={i} style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
                <span style={{ fontSize: 16 }}>{e.icon}</span>
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 600, fontSize: 12, color: t.text }}>{e.title}</div>
                  <div style={{ fontSize: 11, color: t.sub }}>{e.desc}</div>
                </div>
                <span style={{ fontSize: 11, color: t.sub, whiteSpace: "nowrap" }}>{e.time}</span>
              </div>
            ))}
          </div>
        </div>
        <div style={{ background: t.card, borderRadius: 12, padding: 20, boxShadow: "0 1px 4px rgba(0,0,0,0.08)" }}>
          <div style={{ fontWeight: 600, fontSize: 14, marginBottom: 10, color: t.text }}>Распределение по тарифам</div>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <div style={{ position: "relative", width: 120, height: 120 }}>
              <ResponsiveContainer width={120} height={120}>
                <PieChart>
                  <Pie data={pieData} cx={55} cy={55} innerRadius={35} outerRadius={55} dataKey="value" stroke="none">
                    {pieData.map((e, i) => <Cell key={i} fill={e.color} />)}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
              <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", textAlign: "center" }}>
                <div style={{ fontSize: 10, color: t.sub }}>Всего</div>
                <div style={{ fontSize: 15, fontWeight: 700, color: t.text }}>1 256</div>
              </div>
            </div>
            <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 5 }}>
              {pieData.map((e, i) => (
                <div key={i} style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 12 }}>
                  <div style={{ width: 8, height: 8, borderRadius: "50%", background: e.color }} />
                  <span style={{ flex: 1, color: t.text }}>{e.name}</span>
                  <span style={{ color: t.sub }}>{Math.round(e.value / 12.56)}%</span>
                </div>
              ))}
            </div>
          </div>
          <div style={{ marginTop: 10, fontSize: 12, color: t.sub }}>Самый популярный: <b style={{ color: "#3B82F6" }}>Ultra 500 (28%)</b></div>
        </div>
      </div>
    </div>
  );
}

function Clients({ t }) {
  const [search, setSearch] = useState("");
  const [tariffFilter, setTariffFilter] = useState("Все");
  const [statusFilter, setStatusFilter] = useState("Все");
  const [selected, setSelected] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [saved, setSaved] = useState(false);

  const filtered = clientsData.filter(c => {
    const matchSearch = c.name.toLowerCase().includes(search.toLowerCase()) || c.id.includes(search);
    const matchTariff = tariffFilter === "Все" || c.tariff === tariffFilter;
    const matchStatus = statusFilter === "Все" || c.status === statusFilter;
    return matchSearch && matchTariff && matchStatus;
  });

  const handleSave = () => { setSaved(true); setTimeout(() => { setSaved(false); setShowModal(false); }, 1200); };

  if (selected) {
    const c = selected;
    return (
      <div style={{ padding: "24px 28px" }}>
        <button onClick={() => setSelected(null)} style={{ marginBottom: 16, background: "none", border: "none", cursor: "pointer", color: "#3B82F6", fontSize: 14 }}>← Назад к списку</button>
        <div style={{ background: t.card, borderRadius: 12, padding: 24, boxShadow: "0 1px 4px rgba(0,0,0,0.08)" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 20 }}>
            <div style={{ width: 56, height: 56, borderRadius: "50%", background: c.color, display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontWeight: 700, fontSize: 18 }}>{c.initials}</div>
            <div>
              <div style={{ fontSize: 20, fontWeight: 700, color: t.text }}>{c.name}</div>
              <div style={{ color: t.sub }}>ID: {c.id}</div>
            </div>
            <div style={{ marginLeft: "auto" }}>
              <Badge text={c.status} color={c.statusColor === "#10B981" ? "#16A34A" : "#fff"} bg={c.statusColor === "#10B981" ? "#DCFCE7" : c.statusColor} />
            </div>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 16 }}>
            {[["Тариф", c.tariff], ["Скорость", c.speed], ["Адрес", c.addr], ["Телефон", c.phone], ["Email", c.email], ["Договор", c.contract]].map(([l, v]) => (
              <div key={l}><div style={{ fontSize: 12, color: t.sub }}>{l}</div><div style={{ fontWeight: 600, color: t.text }}>{v}</div></div>
            ))}
            <div>
              <div style={{ fontSize: 12, color: t.sub }}>Баланс</div>
              <div style={{ fontWeight: 700, fontSize: 18, color: c.balance === 0 ? "#EF4444" : t.text }}>{c.balance} ₽</div>
              {c.debt > 0 && <div style={{ fontSize: 11, color: "#EF4444" }}>Долг: {c.debt} ₽</div>}
            </div>
            <div>
              <div style={{ fontSize: 12, color: t.sub }}>Трафик</div>
              <div style={{ fontWeight: 600, color: t.text }}>{c.traffic} ГБ из {c.trafficTotal} ГБ</div>
              <div style={{ height: 6, background: t.border, borderRadius: 3, marginTop: 4 }}>
                <div style={{ height: 6, background: c.traffic / c.trafficTotal < 0.1 ? "#EF4444" : "#3B82F6", borderRadius: 3, width: `${Math.min(100, (c.traffic / c.trafficTotal) * 100)}%` }} />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={{ padding: "24px 28px" }}>
      {showModal && (
        <Modal title="Добавить клиента" onClose={() => setShowModal(false)} t={t}>
          <Field t={t} label="Фамилия Имя Отчество" placeholder="Иванов Иван Иванович" />
          <Field t={t} label="Телефон" type="tel" placeholder="+7 (999) 000-00-00" />
          <Field t={t} label="Email" type="email" placeholder="client@mail.ru" />
          <Field t={t} label="Адрес подключения" placeholder="ул. Пушкина, д. 1, кв. 10" />
          <Field t={t} label="Тариф" options={["Ultra 500", "Turbo 200", "Optima 100", "Start 50", "Light 30", "Night 100"]} />
          <Field t={t} label="Способ оплаты" options={["Автоплатёж", "СБП", "Баланс"]} />
          <div style={{ display: "flex", gap: 10, marginTop: 8 }}>
            <button onClick={handleSave} style={{ flex: 1, background: "#3B82F6", color: "#fff", border: "none", borderRadius: 8, padding: "10px 0", fontSize: 14, fontWeight: 600, cursor: "pointer" }}>
              {saved ? "✅ Сохранено!" : "Сохранить"}
            </button>
            <button onClick={() => setShowModal(false)} style={{ flex: 1, background: t.border, color: t.sub, border: "none", borderRadius: 8, padding: "10px 0", fontSize: 14, cursor: "pointer" }}>Отмена</button>
          </div>
        </Modal>
      )}
      <div style={{ display: "flex", gap: 12, marginBottom: 20, alignItems: "center" }}>
        <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Поиск по ФИО, ID, телефону..." style={{ padding: "8px 14px", borderRadius: 8, border: `1px solid ${t.inputBorder}`, fontSize: 13, flex: 1, background: t.input, color: t.text }} />
        <select value={tariffFilter} onChange={e => setTariffFilter(e.target.value)} style={{ padding: "8px 12px", borderRadius: 8, border: `1px solid ${t.inputBorder}`, fontSize: 13, background: t.input, color: t.text }}>
          {["Все", "Ultra 500", "Turbo 200", "Optima 100", "Start 50", "Light 30", "Night 100"].map(v => <option key={v}>{v}</option>)}
        </select>
        <select value={statusFilter} onChange={e => setStatusFilter(e.target.value)} style={{ padding: "8px 12px", borderRadius: 8, border: `1px solid ${t.inputBorder}`, fontSize: 13, background: t.input, color: t.text }}>
          {["Все", "Активен", "Заблокирован", "Трафик исчерпан", "Низкий баланс"].map(v => <option key={v}>{v}</option>)}
        </select>
        <button onClick={() => setShowModal(true)} style={{ background: "#3B82F6", color: "#fff", border: "none", borderRadius: 8, padding: "8px 16px", fontSize: 13, cursor: "pointer", fontWeight: 600, whiteSpace: "nowrap" }}>+ Добавить клиента</button>
      </div>
      <div style={{ display: "flex", gap: 12, marginBottom: 20 }}>
        <KpiCard t={t} label="Всего клиентов" value="1 256" sub="+18 за месяц" icon="👥" iconBg="#EFF6FF" />
        <KpiCard t={t} label="Активных" value="1 032" sub="82.2% от всех" icon="✅" iconBg="#F0FDF4" />
        <KpiCard t={t} label="Новых" value="24" sub="+4.1% к прошл. месяцу" icon="🧲" iconBg="#FFF7ED" />
        <KpiCard t={t} label="Отключённых" value="47" sub="-2.3%" subColor="#EF4444" icon="⏸️" iconBg="#FEF2F2" />
        <KpiCard t={t} label="Критических" value="24" sub="Требуют внимания" subColor="#EF4444" icon="⚠️" iconBg="#FEF2F2" />
      </div>
      <div style={{ background: t.card, borderRadius: 12, boxShadow: "0 1px 4px rgba(0,0,0,0.08)", overflow: "hidden" }}>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
          <thead style={{ background: t.tableHead }}>
            <tr>{["КЛИЕНТ / ID", "КОНТАКТЫ", "ТАРИФ", "ДОГОВОР", "ПЛАТЕЖИ", "ТРАФИК", "СТАТУС", ""].map(h => (
              <th key={h} style={{ padding: "10px 14px", textAlign: "left", fontSize: 11, color: t.sub, fontWeight: 600, borderBottom: `1px solid ${t.border}` }}>{h}</th>
            ))}</tr>
          </thead>
          <tbody>{filtered.map(c => (
            <tr key={c.id} style={{ borderBottom: `1px solid ${t.border}`, cursor: "pointer" }}
              onClick={() => setSelected(c)}
              onMouseEnter={e => e.currentTarget.style.background = t.tableHead}
              onMouseLeave={e => e.currentTarget.style.background = ""}>
              <td style={{ padding: "12px 14px" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <div style={{ width: 36, height: 36, borderRadius: "50%", background: c.color, display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontWeight: 700, fontSize: 13, flexShrink: 0 }}>{c.initials}</div>
                  <div>
                    <div style={{ fontWeight: 600, color: t.text }}>{c.name}</div>
                    <div style={{ fontSize: 11, color: t.sub }}>ID: {c.id} · {c.addr}</div>
                  </div>
                </div>
              </td>
              <td style={{ padding: "12px 14px" }}><div style={{ fontSize: 12, color: t.text }}>{c.phone}</div><div style={{ fontSize: 11, color: t.sub }}>{c.email}</div></td>
              <td style={{ padding: "12px 14px" }}><div style={{ fontWeight: 600, color: t.text }}>{c.tariff}</div><div style={{ fontSize: 11, color: t.sub }}>{c.speed}</div></td>
              <td style={{ padding: "12px 14px" }}><div style={{ color: c.contract === "Действует" ? "#10B981" : "#F59E0B", fontWeight: 600, fontSize: 12 }}>{c.contract}</div><div style={{ fontSize: 11, color: t.sub }}>{c.contractEnd}</div></td>
              <td style={{ padding: "12px 14px" }}><div style={{ fontWeight: 700, color: c.balance === 0 ? "#EF4444" : t.text }}>{c.balance} ₽</div>{c.debt > 0 && <div style={{ fontSize: 11, color: "#EF4444" }}>Долг: {c.debt} ₽</div>}</td>
              <td style={{ padding: "12px 14px" }}>
                <div style={{ fontSize: 12, color: t.text }}>{c.traffic} ГБ / {c.trafficTotal} ГБ</div>
                <div style={{ height: 5, background: t.border, borderRadius: 3, marginTop: 4, width: 80 }}>
                  <div style={{ height: 5, background: c.traffic / c.trafficTotal < 0.1 ? "#EF4444" : "#3B82F6", borderRadius: 3, width: `${Math.min(100, (c.traffic / c.trafficTotal) * 100)}%` }} />
                </div>
              </td>
              <td style={{ padding: "12px 14px" }}>
                <Badge text={c.status} color={c.statusColor === "#10B981" ? "#16A34A" : "#fff"} bg={c.statusColor === "#10B981" ? "#DCFCE7" : c.statusColor === "#EF4444" ? "#FEE2E2" : "#FEF3C7"} />
              </td>
              <td style={{ padding: "12px 14px", color: t.sub }}>⋯</td>
            </tr>
          ))}</tbody>
        </table>
        <div style={{ padding: "12px 14px", fontSize: 12, color: t.sub, borderTop: `1px solid ${t.border}` }}>Показано 1–{filtered.length} из 1 256 клиентов</div>
      </div>
    </div>
  );
}

function Tariffs({ t }) {
  const [showModal, setShowModal] = useState(false);
  const [saved, setSaved] = useState(false);
  const handleSave = () => { setSaved(true); setTimeout(() => { setSaved(false); setShowModal(false); }, 1200); };

  return (
    <div style={{ padding: "24px 28px" }}>
      {showModal && (
        <Modal title="Добавить тариф" onClose={() => setShowModal(false)} t={t}>
          <Field t={t} label="Название тарифа" placeholder="Например: Turbo Pro 300" />
          <Field t={t} label="Скорость (Мбит/с)" type="number" placeholder="500" />
          <Field t={t} label="Трафик в месяц" options={["50 ГБ", "100 ГБ", "200 ГБ", "500 ГБ", "Безлимит", "Ночной безлимит"]} />
          <Field t={t} label="Стоимость (₽/мес)" type="number" placeholder="990" />
          <Field t={t} label="Статус" options={["Активен", "Неактивен"]} />
          <Field t={t} label="Описание (необязательно)" placeholder="Краткое описание тарифа..." />
          <div style={{ display: "flex", gap: 10, marginTop: 8 }}>
            <button onClick={handleSave} style={{ flex: 1, background: "#3B82F6", color: "#fff", border: "none", borderRadius: 8, padding: "10px 0", fontSize: 14, fontWeight: 600, cursor: "pointer" }}>
              {saved ? "✅ Сохранено!" : "Сохранить"}
            </button>
            <button onClick={() => setShowModal(false)} style={{ flex: 1, background: t.border, color: t.sub, border: "none", borderRadius: 8, padding: "10px 0", fontSize: 14, cursor: "pointer" }}>Отмена</button>
          </div>
        </Modal>
      )}
      <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: 16 }}>
        <button onClick={() => setShowModal(true)} style={{ background: "#3B82F6", color: "#fff", border: "none", borderRadius: 8, padding: "8px 18px", fontSize: 13, cursor: "pointer", fontWeight: 600 }}>+ Добавить тариф</button>
      </div>
      <div style={{ display: "flex", gap: 12, marginBottom: 20 }}>
        <KpiCard t={t} label="Всего тарифов" value="6" sub="+1 в этом месяце" icon="📋" iconBg="#EFF6FF" />
        <KpiCard t={t} label="Средний ARPU" value="582,45 ₽" sub="+4.3% к прошл. месяцу" icon="📊" iconBg="#F0FDF4" />
        <KpiCard t={t} label="Самый популярный" value="Ultra 500" sub="28% всех подключений" icon="⭐" iconBg="#FFFBEB" />
        <KpiCard t={t} label="Новых подключений" value="78" sub="+12.5% к прошл. месяцу" icon="👤" iconBg="#F5F3FF" />
      </div>
      <div style={{ background: t.card, borderRadius: 12, boxShadow: "0 1px 4px rgba(0,0,0,0.08)", overflow: "hidden" }}>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
          <thead style={{ background: t.tableHead }}>
            <tr>{["НАЗВАНИЕ", "СКОРОСТЬ", "ТРАФИК", "СТОИМОСТЬ", "КЛИЕНТОВ", "СРЕДНЕЕ ПОТРЕБЛ.", "ДОХОД (МЕС.)", "СТАТУС", ""].map(h => (
              <th key={h} style={{ padding: "10px 16px", textAlign: "left", fontSize: 11, color: t.sub, fontWeight: 600, borderBottom: `1px solid ${t.border}` }}>{h}</th>
            ))}</tr>
          </thead>
          <tbody>{tariffsData.map(t2 => (
            <tr key={t2.name} style={{ borderBottom: `1px solid ${t.border}` }}>
              <td style={{ padding: "14px 16px", fontWeight: 700, color: t.text }}>{t2.name}</td>
              <td style={{ padding: "14px 16px", color: t.sub }}>{t2.speed}</td>
              <td style={{ padding: "14px 16px", color: t.sub }}>{t2.traffic}</td>
              <td style={{ padding: "14px 16px", fontWeight: 600, color: t.text }}>{t2.price}</td>
              <td style={{ padding: "14px 16px" }}><div style={{ fontWeight: 700, color: t.text }}>{t2.clients}</div><div style={{ fontSize: 11, color: t.sub }}>({t2.pct}%)</div></td>
              <td style={{ padding: "14px 16px", color: t.sub }}>{t2.avg}</td>
              <td style={{ padding: "14px 16px", fontWeight: 600, color: t.text }}>{t2.income}</td>
              <td style={{ padding: "14px 16px" }}><Badge text={t2.status} color={t2.status === "Активен" ? "#16A34A" : "#DC2626"} bg={t2.status === "Активен" ? "#DCFCE7" : "#FEE2E2"} /></td>
              <td style={{ padding: "14px 16px", color: t.sub }}>⋯</td>
            </tr>
          ))}</tbody>
        </table>
      </div>
    </div>
  );
}

function Payments({ t }) {
  const [opFilter, setOpFilter] = useState("Все");
  const filtered = opFilter === "Все" ? paymentsData : paymentsData.filter(p => p.op === opFilter);
  return (
    <div style={{ padding: "24px 28px" }}>
      <div style={{ display: "flex", gap: 16, marginBottom: 20, alignItems: "center", flexWrap: "wrap" }}>
        <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
          <span style={{ fontSize: 13, color: t.sub }}>Период:</span>
          <input type="date" defaultValue="2025-05-01" style={{ padding: "6px 10px", borderRadius: 8, border: `1px solid ${t.inputBorder}`, fontSize: 13, background: t.input, color: t.text }} />
          <span style={{ color: t.sub }}>—</span>
          <input type="date" defaultValue="2025-05-31" style={{ padding: "6px 10px", borderRadius: 8, border: `1px solid ${t.inputBorder}`, fontSize: 13, background: t.input, color: t.text }} />
        </div>
        <select value={opFilter} onChange={e => setOpFilter(e.target.value)} style={{ padding: "6px 12px", borderRadius: 8, border: `1px solid ${t.inputBorder}`, fontSize: 13, background: t.input, color: t.text }}>
          {["Все", "Поступление", "Списание"].map(o => <option key={o}>{o}</option>)}
        </select>
        <button style={{ marginLeft: "auto", background: "none", border: `1px solid ${t.inputBorder}`, borderRadius: 8, padding: "6px 16px", fontSize: 13, cursor: "pointer", color: t.text }}>⬇ Экспорт</button>
      </div>
      <div style={{ display: "flex", gap: 12, marginBottom: 20 }}>
        <KpiCard t={t} label="Всего поступлений" value="732 541 ₽" sub="+8.1%" icon="📈" iconBg="#F0FDF4" />
        <KpiCard t={t} label="Всего списаний" value="-705 260 ₽" sub="-6.6%" subColor="#EF4444" icon="📉" iconBg="#FEF2F2" />
        <KpiCard t={t} label="Чистый доход" value="27 281 ₽" sub="+132%" icon="💰" iconBg="#EFF6FF" />
        <KpiCard t={t} label="Средний чек" value="585 ₽" sub="+15%" icon="🧾" iconBg="#FFFBEB" />
        <KpiCard t={t} label="Автоплатежи" value="68%" sub="от всех платежей" icon="🔄" iconBg="#F5F3FF" />
        <div style={{ background: t.card, borderRadius: 12, padding: "16px 20px", boxShadow: "0 1px 4px rgba(0,0,0,0.08)", flex: 1 }}>
          <div style={{ fontSize: 12, color: t.sub }}>Просроченные</div>
          <div style={{ fontSize: 22, fontWeight: 700, color: "#EF4444" }}>12</div>
          <div style={{ fontSize: 11, color: t.sub }}>на сумму 18 450 ₽</div>
        </div>
      </div>
      <div style={{ background: t.card, borderRadius: 12, boxShadow: "0 1px 4px rgba(0,0,0,0.08)", overflow: "hidden" }}>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
          <thead style={{ background: t.tableHead }}>
            <tr>{["ДАТА И ВРЕМЯ", "КЛИЕНТ", "ОПЕРАЦИЯ", "СПОСОБ ОПЛАТЫ", "СУММА", "СТАТУС", "ОПЕРАТОР", ""].map(h => (
              <th key={h} style={{ padding: "10px 16px", textAlign: "left", fontSize: 11, color: t.sub, fontWeight: 600, borderBottom: `1px solid ${t.border}` }}>{h}</th>
            ))}</tr>
          </thead>
          <tbody>{filtered.map((p, i) => (
            <tr key={i} style={{ borderBottom: `1px solid ${t.border}` }}>
              <td style={{ padding: "14px 16px", color: t.sub, fontSize: 12 }}>{p.date}</td>
              <td style={{ padding: "14px 16px" }}><div style={{ fontWeight: 600, color: t.text }}>{p.client}</div><div style={{ fontSize: 11, color: t.sub }}>ID: {p.clientId}</div></td>
              <td style={{ padding: "14px 16px", color: p.op === "Поступление" ? "#10B981" : t.sub, fontWeight: 500 }}>{p.op}</td>
              <td style={{ padding: "14px 16px", color: t.sub }}>{p.method}</td>
              <td style={{ padding: "14px 16px", fontWeight: 700, color: p.amount > 0 ? t.text : "#EF4444" }}>{p.amount > 0 ? `+${p.amount} ₽` : `${p.amount} ₽`}</td>
              <td style={{ padding: "14px 16px" }}><Badge text={p.status} /></td>
              <td style={{ padding: "14px 16px", color: t.sub }}>{p.operator || "Система"}</td>
              <td style={{ padding: "14px 16px", color: t.sub }}>⋯</td>
            </tr>
          ))}</tbody>
        </table>
        <div style={{ padding: "12px 16px", fontSize: 12, color: t.sub, borderTop: `1px solid ${t.border}` }}>Показано 1–{filtered.length} из 2 656 операций</div>
      </div>
    </div>
  );
}

function Activity({ t }) {
  return (
    <div style={{ padding: "24px 28px", display: "flex", flexDirection: "column", gap: 20 }}>
      <div style={{ display: "flex", gap: 12 }}>
        <KpiCard t={t} label="Входящий трафик" value="2.45 ТБ" sub="+12.5%" icon="⬇️" iconBg="#F0FDF4" />
        <KpiCard t={t} label="Исходящий трафик" value="2.76 ТБ" sub="+8.3%" icon="⬆️" iconBg="#EFF6FF" />
        <KpiCard t={t} label="Средняя скорость" value="78.6 Мбит/с" sub="+6.7%" icon="🔄" iconBg="#F5F3FF" />
        <KpiCard t={t} label="Пиковая нагрузка" value="152.4 Мбит/с" sub="+14.2%" icon="⚡" iconBg="#FFFBEB" />
        <KpiCard t={t} label="Активные сессии" value="823" sub="+5.1%" icon="👥" iconBg="#EFF6FF" />
        <KpiCard t={t} label="Потери пакетов" value="0.12%" sub="-0.03%" subColor="#10B981" icon="📶" iconBg="#FEF2F2" />
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: 16 }}>
        <div style={{ background: t.card, borderRadius: 12, padding: 20, boxShadow: "0 1px 4px rgba(0,0,0,0.08)" }}>
          <div style={{ fontWeight: 600, fontSize: 15, marginBottom: 16, color: t.text }}>Динамика трафика — Последние 30 дней</div>
          <ResponsiveContainer width="100%" height={200}>
            <AreaChart data={activityTrafficData}>
              <defs>
                <linearGradient id="ig2" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#10B981" stopOpacity={0.15} /><stop offset="95%" stopColor="#10B981" stopOpacity={0} /></linearGradient>
                <linearGradient id="og2" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#3B82F6" stopOpacity={0.15} /><stop offset="95%" stopColor="#3B82F6" stopOpacity={0} /></linearGradient>
              </defs>
              <XAxis dataKey="d" tick={{ fontSize: 9, fill: t.sub }} tickLine={false} axisLine={false} interval={4} />
              <YAxis tick={{ fontSize: 9, fill: t.sub }} tickLine={false} axisLine={false} />
              <Tooltip contentStyle={{ background: t.card, border: `1px solid ${t.border}`, color: t.text }} />
              <Area type="monotone" dataKey="inc" stroke="#10B981" fill="url(#ig2)" strokeWidth={2} name="Входящий (ГБ)" dot={false} />
              <Area type="monotone" dataKey="out" stroke="#3B82F6" fill="url(#og2)" strokeWidth={2} name="Исходящий (ГБ)" dot={false} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
        <div style={{ background: t.card, borderRadius: 12, padding: 20, boxShadow: "0 1px 4px rgba(0,0,0,0.08)" }}>
          <div style={{ fontWeight: 600, fontSize: 14, marginBottom: 12, color: t.text }}>Топ клиентов по потреблению</div>
          <table style={{ width: "100%", fontSize: 12, borderCollapse: "collapse" }}>
            <thead><tr style={{ color: t.sub }}>{["#","КЛИЕНТ","ТАРИФ","ГБ"].map(h=><th key={h} style={{ textAlign:"left", paddingBottom:8, fontWeight:500 }}>{h}</th>)}</tr></thead>
            <tbody>{[
              { n:"ИК", name:"Иванов К.", tariff:"Ultra 500", gb:"346 ГБ", color:"#EF4444" },
              { n:"ПС", name:"Петров С.", tariff:"Turbo 200", gb:"289 ГБ", color:"#F59E0B" },
              { n:"СМ", name:"Сидорова М.", tariff:"Optima 100", gb:"214 ГБ", color:"#3B82F6" },
              { n:"АК", name:"Алексеев К.", tariff:"Start 50", gb:"183 ГБ", color:"#10B981" },
              { n:"БА", name:"Васильев А.", tariff:"Light 30", gb:"156 ГБ", color:"#6366F1" },
            ].map((r,i)=>(
              <tr key={i} style={{ borderTop:`1px solid ${t.border}` }}>
                <td style={{ padding:"8px 0", color:t.sub }}>{i+1}</td>
                <td style={{ padding:"8px 4px" }}>
                  <div style={{ display:"flex", alignItems:"center", gap:8 }}>
                    <div style={{ width:26, height:26, borderRadius:"50%", background:r.color, display:"flex", alignItems:"center", justifyContent:"center", color:"#fff", fontSize:10, fontWeight:700 }}>{r.n}</div>
                    <span style={{ fontWeight:500, color:t.text }}>{r.name}</span>
                  </div>
                </td>
                <td style={{ padding:"8px 4px", color:t.sub }}>{r.tariff}</td>
                <td style={{ padding:"8px 0", textAlign:"right", fontWeight:600, color:t.text }}>{r.gb}</td>
              </tr>
            ))}</tbody>
          </table>
        </div>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 16 }}>
        <div style={{ background: t.card, borderRadius: 12, padding: 20, boxShadow: "0 1px 4px rgba(0,0,0,0.08)" }}>
          <div style={{ fontWeight: 600, fontSize: 14, marginBottom: 12, color: t.text }}>Распределение трафика по типам</div>
          <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
            <div style={{ position: "relative", width: 120, height: 120 }}>
              <ResponsiveContainer width={120} height={120}>
                <PieChart><Pie data={trafficTypes} cx={55} cy={55} innerRadius={35} outerRadius={55} dataKey="value" stroke="none">{trafficTypes.map((e,i)=><Cell key={i} fill={e.color}/>)}</Pie></PieChart>
              </ResponsiveContainer>
              <div style={{ position:"absolute", top:"50%", left:"50%", transform:"translate(-50%,-50%)", textAlign:"center" }}>
                <div style={{ fontSize:9, color:t.sub }}>Всего</div>
                <div style={{ fontSize:13, fontWeight:700, color:t.text }}>5.21 ТБ</div>
              </div>
            </div>
            <div style={{ flex:1 }}>{trafficTypes.map((tt,i)=>(
              <div key={i} style={{ display:"flex", alignItems:"center", gap:6, fontSize:11, marginBottom:5 }}>
                <div style={{ width:8, height:8, borderRadius:"50%", background:tt.color }}/>
                <span style={{ flex:1, color:t.text }}>{tt.name}</span>
                <span style={{ fontWeight:600, color:t.text }}>{tt.value}%</span>
              </div>
            ))}</div>
          </div>
        </div>
        <div style={{ background: t.card, borderRadius: 12, padding: 20, boxShadow: "0 1px 4px rgba(0,0,0,0.08)" }}>
          <div style={{ fontWeight: 600, fontSize: 14, marginBottom: 12, color: t.text }}>Трафик по времени суток</div>
          <ResponsiveContainer width="100%" height={160}>
            <BarChart data={hourlyData}>
              <XAxis dataKey="h" tick={{ fontSize:8, fill:t.sub }} tickLine={false} axisLine={false} interval={3}/>
              <YAxis tick={{ fontSize:8, fill:t.sub }} tickLine={false} axisLine={false}/>
              <Tooltip contentStyle={{ background:t.card, border:`1px solid ${t.border}`, color:t.text }}/>
              <Bar dataKey="v" fill="#3B82F6" radius={[2,2,0,0]} name="ГБ"/>
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div style={{ background: t.card, borderRadius: 12, padding: 20, boxShadow: "0 1px 4px rgba(0,0,0,0.08)" }}>
          <div style={{ fontWeight: 600, fontSize: 14, marginBottom: 12, color: t.text }}>Использование лимитов тарифов</div>
          {[{name:"Ultra 500",pct:74,color:"#10B981",clients:352},{name:"Turbo 200",pct:61,color:"#10B981",clients:327},{name:"Optima 100",pct:43,color:"#F59E0B",clients:277},{name:"Start 50",pct:28,color:"#F59E0B",clients:176},{name:"Light 30",pct:15,color:"#EF4444",clients:124}].map((tt,i)=>(
            <div key={i} style={{ marginBottom:10 }}>
              <div style={{ display:"flex", justifyContent:"space-between", fontSize:12, marginBottom:4 }}>
                <span style={{ fontWeight:500, color:t.text }}>{tt.name}</span>
                <span style={{ color:t.sub }}>{tt.pct}% · {tt.clients} кл.</span>
              </div>
              <div style={{ height:6, background:t.border, borderRadius:3 }}>
                <div style={{ height:6, background:tt.color, borderRadius:3, width:`${tt.pct}%` }}/>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div style={{ fontSize:12, color:t.sub, display:"flex", justifyContent:"space-between" }}>
        <span>ℹ️ Данные обновлены сегодня в 10:30</span>
        <span>Следующее обновление через 5 минут 🔄</span>
      </div>
    </div>
  );
}

function Notifications({ t }) {
  const [notifs, setNotifs] = useState(notificationsData);
  const [filter, setFilter] = useState("Все");

  const markAllRead = () => setNotifs(n => n.map(x => ({ ...x, read: true })));
  const markRead = (id) => setNotifs(n => n.map(x => x.id === id ? { ...x, read: true } : x));
  const deleteNotif = (id) => setNotifs(n => n.filter(x => x.id !== id));

  const filtered = filter === "Все" ? notifs : filter === "Непрочитанные" ? notifs.filter(x => !x.read) : notifs.filter(x => x.type === filter);
  const unread = notifs.filter(x => !x.read).length;

  const typeBg = { error: "#FEE2E2", warn: "#FEF3C7", ok: "#DCFCE7", info: "#EFF6FF" };
  const typeColor = { error: "#DC2626", warn: "#D97706", ok: "#16A34A", info: "#2563EB" };

  return (
    <div style={{ padding: "24px 28px" }}>
      <div style={{ display: "flex", gap: 12, marginBottom: 20 }}>
        <KpiCard t={t} label="Всего уведомлений" value={notifs.length} sub="за последние 7 дней" icon="🔔" iconBg="#EFF6FF" />
        <KpiCard t={t} label="Непрочитанных" value={unread} sub="Требуют внимания" subColor="#EF4444" icon="⚠️" iconBg="#FEF2F2" />
        <KpiCard t={t} label="Критических" value={notifs.filter(x=>x.type==="error").length} sub="ошибки системы" subColor="#EF4444" icon="🚨" iconBg="#FEF2F2" />
        <KpiCard t={t} label="Успешных" value={notifs.filter(x=>x.type==="ok").length} sub="платежи и события" icon="✅" iconBg="#F0FDF4" />
      </div>

      <div style={{ background: t.card, borderRadius: 12, boxShadow: "0 1px 4px rgba(0,0,0,0.08)", overflow: "hidden" }}>
        <div style={{ padding: "16px 20px", borderBottom: `1px solid ${t.border}`, display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap" }}>
          {["Все", "Непрочитанные", "error", "warn", "ok", "info"].map(f => {
            const labels = { "Все":"Все", "Непрочитанные":"Непрочитанные", error:"Ошибки", warn:"Предупреждения", ok:"Успешные", info:"Информация" };
            return (
              <button key={f} onClick={() => setFilter(f)} style={{ padding: "5px 14px", borderRadius: 20, border: "none", cursor: "pointer", fontSize: 12, fontWeight: filter === f ? 600 : 400, background: filter === f ? "#3B82F6" : t.tableHead, color: filter === f ? "#fff" : t.sub }}>
                {labels[f]}
              </button>
            );
          })}
          <button onClick={markAllRead} style={{ marginLeft: "auto", fontSize: 12, color: "#3B82F6", background: "none", border: "1px solid #3B82F6", borderRadius: 8, padding: "5px 14px", cursor: "pointer" }}>
            Отметить все прочитанными
          </button>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          {filtered.length === 0 && (
            <div style={{ padding: 40, textAlign: "center", color: t.sub }}>Нет уведомлений</div>
          )}
          {filtered.map(n => (
            <div key={n.id} onClick={() => markRead(n.id)} style={{ display: "flex", alignItems: "flex-start", gap: 14, padding: "16px 20px", borderBottom: `1px solid ${t.border}`, background: !n.read ? (t.tableHead) : "transparent", cursor: "pointer", transition: "background 0.15s" }}
              onMouseEnter={e => e.currentTarget.style.background = t.tableHead}
              onMouseLeave={e => e.currentTarget.style.background = !n.read ? t.tableHead : "transparent"}>
              <div style={{ width: 36, height: 36, borderRadius: 10, background: typeBg[n.type], display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18, flexShrink: 0 }}>{n.icon}</div>
              <div style={{ flex: 1 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 3 }}>
                  <span style={{ fontWeight: 600, fontSize: 14, color: t.text }}>{n.title}</span>
                  <span style={{ fontSize: 11, background: typeBg[n.type], color: typeColor[n.type], borderRadius: 4, padding: "1px 7px", fontWeight: 600 }}>
                    {{ error:"Ошибка", warn:"Предупреждение", ok:"Успешно", info:"Информация" }[n.type]}
                  </span>
                  {!n.read && <span style={{ width: 8, height: 8, borderRadius: "50%", background: "#3B82F6", display: "inline-block" }} />}
                </div>
                <div style={{ fontSize: 13, color: t.sub }}>{n.desc}</div>
              </div>
              <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 8 }}>
                <span style={{ fontSize: 11, color: t.sub, whiteSpace: "nowrap" }}>{n.time}</span>
                <button onClick={e => { e.stopPropagation(); deleteNotif(n.id); }} style={{ fontSize: 11, color: "#EF4444", background: "none", border: "none", cursor: "pointer", padding: 0 }}>Удалить</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function Reports({ t }) {
  const [generating, setGenerating] = useState(null);
  const [done, setDone] = useState({});

  const generate = (name) => {
    setGenerating(name);
    setTimeout(() => {
      setGenerating(null);
      setDone(d => ({ ...d, [name]: true }));
      setTimeout(() => setDone(d => ({ ...d, [name]: false })), 2500);
    }, 1800);
  };

  const typeColor = { "Финансы": "#3B82F6", "Клиенты": "#10B981", "Трафик": "#8B5CF6", "Тарифы": "#F59E0B", "Аналитика": "#EF4444" };
  const formatBg = { PDF: "#FEE2E2", XLSX: "#DCFCE7" };
  const formatColor = { PDF: "#DC2626", XLSX: "#16A34A" };

  return (
    <div style={{ padding: "24px 28px" }}>
      <div style={{ display: "flex", gap: 12, marginBottom: 20 }}>
        <KpiCard t={t} label="Всего отчётов" value="6" sub="сформировано за квартал" icon="📊" iconBg="#EFF6FF" />
        <KpiCard t={t} label="Последний отчёт" value="01.06.2025" sub="Доходы за май" icon="📅" iconBg="#F0FDF4" />
        <KpiCard t={t} label="Суммарный доход" value="732 541 ₽" sub="Май 2025" icon="💰" iconBg="#FFFBEB" />
        <KpiCard t={t} label="ARPU" value="582,45 ₽" sub="+4.3% к апрелю" icon="📈" iconBg="#F5F3FF" />
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: 16, marginBottom: 20 }}>
        <div style={{ background: t.card, borderRadius: 12, padding: 20, boxShadow: "0 1px 4px rgba(0,0,0,0.08)" }}>
          <div style={{ fontWeight: 600, fontSize: 15, marginBottom: 16, color: t.text }}>Динамика доходов по месяцам</div>
          <ResponsiveContainer width="100%" height={180}>
            <BarChart data={monthlyRevenueData}>
              <XAxis dataKey="m" tick={{ fontSize: 12, fill: t.sub }} tickLine={false} axisLine={false} />
              <YAxis tick={{ fontSize: 10, fill: t.sub }} tickLine={false} axisLine={false} tickFormatter={v => `${Math.round(v/1000)}к`} />
              <Tooltip contentStyle={{ background: t.card, border: `1px solid ${t.border}`, color: t.text }} formatter={v => [`${v.toLocaleString()} ₽`, "Доход"]} />
              <Bar dataKey="v" fill="#3B82F6" radius={[6, 6, 0, 0]} name="Доход" />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div style={{ background: t.card, borderRadius: 12, padding: 20, boxShadow: "0 1px 4px rgba(0,0,0,0.08)" }}>
          <div style={{ fontWeight: 600, fontSize: 15, marginBottom: 16, color: t.text }}>Churn Rate по месяцам</div>
          <ResponsiveContainer width="100%" height={180}>
            <AreaChart data={churnData}>
              <defs>
                <linearGradient id="chg" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#EF4444" stopOpacity={0.2} />
                  <stop offset="95%" stopColor="#EF4444" stopOpacity={0} />
                </linearGradient>
              </defs>
              <XAxis dataKey="m" tick={{ fontSize: 12, fill: t.sub }} tickLine={false} axisLine={false} />
              <YAxis tick={{ fontSize: 10, fill: t.sub }} tickLine={false} axisLine={false} />
              <Tooltip contentStyle={{ background: t.card, border: `1px solid ${t.border}`, color: t.text }} formatter={v => [`${v}%`, "Churn Rate"]} />
              <Area type="monotone" dataKey="v" stroke="#EF4444" fill="url(#chg)" strokeWidth={2} dot={{ r: 4, fill: "#EF4444" }} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div style={{ background: t.card, borderRadius: 12, boxShadow: "0 1px 4px rgba(0,0,0,0.08)", overflow: "hidden" }}>
        <div style={{ padding: "16px 20px", borderBottom: `1px solid ${t.border}`, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <span style={{ fontWeight: 600, fontSize: 15, color: t.text }}>Сохранённые отчёты</span>
          <button onClick={() => generate("Новый отчёт")} style={{ background: "#3B82F6", color: "#fff", border: "none", borderRadius: 8, padding: "7px 16px", fontSize: 13, cursor: "pointer", fontWeight: 600 }}>
            {generating === "Новый отчёт" ? "⏳ Генерация..." : done["Новый отчёт"] ? "✅ Готово!" : "+ Сформировать отчёт"}
          </button>
        </div>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
          <thead style={{ background: t.tableHead }}>
            <tr>{["НАЗВАНИЕ", "ТИП", "ДАТА", "РАЗМЕР", "ФОРМАТ", "ДЕЙСТВИЯ"].map(h => (
              <th key={h} style={{ padding: "10px 16px", textAlign: "left", fontSize: 11, color: t.sub, fontWeight: 600, borderBottom: `1px solid ${t.border}` }}>{h}</th>
            ))}</tr>
          </thead>
          <tbody>{reportsData.map((r, i) => (
            <tr key={i} style={{ borderBottom: `1px solid ${t.border}` }}>
              <td style={{ padding: "14px 16px" }}>
                <div style={{ fontWeight: 600, color: t.text }}>📄 {r.name}</div>
              </td>
              <td style={{ padding: "14px 16px" }}>
                <span style={{ background: `${typeColor[r.type]}22`, color: typeColor[r.type], borderRadius: 6, padding: "2px 10px", fontSize: 12, fontWeight: 600 }}>{r.type}</span>
              </td>
              <td style={{ padding: "14px 16px", color: t.sub }}>{r.date}</td>
              <td style={{ padding: "14px 16px", color: t.sub }}>{r.size}</td>
              <td style={{ padding: "14px 16px" }}>
                <span style={{ background: formatBg[r.format], color: formatColor[r.format], borderRadius: 6, padding: "2px 10px", fontSize: 12, fontWeight: 600 }}>{r.format}</span>
              </td>
              <td style={{ padding: "14px 16px" }}>
                <div style={{ display: "flex", gap: 8 }}>
                  <button onClick={() => generate(r.name)} style={{ fontSize: 12, color: "#3B82F6", background: "none", border: "1px solid #3B82F6", borderRadius: 6, padding: "4px 12px", cursor: "pointer" }}>
                    {generating === r.name ? "⏳..." : done[r.name] ? "✅" : "⬇ Скачать"}
                  </button>
                  <button style={{ fontSize: 12, color: t.sub, background: "none", border: `1px solid ${t.inputBorder}`, borderRadius: 6, padding: "4px 12px", cursor: "pointer" }}>👁 Просмотр</button>
                </div>
              </td>
            </tr>
          ))}</tbody>
        </table>
      </div>
    </div>
  );
}

// ─── APP SHELL ────────────────────────────────────────────────────────────────
const NAV = [
  { key: "dashboard", label: "Главная", icon: "🏠" },
  { key: "clients", label: "Клиенты", icon: "👥" },
  { key: "tariffs", label: "Тарифы", icon: "📋" },
  { key: "payments", label: "Платежи", icon: "💳" },
  { key: "activity", label: "Активность", icon: "📡" },
  { key: "notifications", label: "Уведомления", icon: "🔔", badge: 4 },
  { key: "reports", label: "Отчёты", icon: "📊" },
  { key: "settings", label: "Настройки", icon: "⚙️" },
];

const PAGE_TITLES = {
  dashboard: "Главная панель", clients: "Клиенты", tariffs: "Тарифы",
  payments: "Платежи", activity: "Активность", notifications: "Уведомления",
  reports: "Отчёты", settings: "Настройки",
};

export default function App() {
  const [page, setPage] = useState("dashboard");
  const [dark, setDark] = useState(false);
  const t = dark ? T.dark : T.light;

  const renderPage = () => {
    if (page === "dashboard") return <Dashboard setPage={setPage} t={t} />;
    if (page === "clients") return <Clients t={t} />;
    if (page === "tariffs") return <Tariffs t={t} />;
    if (page === "payments") return <Payments t={t} />;
    if (page === "activity") return <Activity t={t} />;
    if (page === "notifications") return <Notifications t={t} />;
    if (page === "reports") return <Reports t={t} />;
    return (
      <div style={{ padding: 40, color: t.sub, fontSize: 15 }}>
        Страница «{PAGE_TITLES[page]}» в разработке.
      </div>
    );
  };

  return (
    <div style={{ display: "flex", height: "100vh", fontFamily: "'Inter', -apple-system, sans-serif", background: t.bg, fontSize: 14, transition: "background 0.2s" }}>
      {/* Sidebar */}
      <div style={{ width: 200, background: t.sidebar, borderRight: `1px solid ${t.border}`, display: "flex", flexDirection: "column", flexShrink: 0, transition: "background 0.2s" }}>
        <div style={{ padding: "18px 20px", display: "flex", alignItems: "center", gap: 10, borderBottom: `1px solid ${t.border}` }}>
          <div style={{ width: 32, height: 32, background: "#3B82F6", borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontWeight: 800, fontSize: 14 }}>K</div>
          <span style={{ fontWeight: 700, fontSize: 16, color: t.text }}>KRiLiCRM</span>
        </div>
        <div style={{ padding: "12px 10px", flex: 1 }}>
          <div style={{ fontSize: 10, color: t.sub, fontWeight: 600, padding: "0 10px", marginBottom: 8 }}>ГЛАВНОЕ МЕНЮ</div>
          {NAV.map(n => (
            <button key={n.key} onClick={() => setPage(n.key)} style={{
              width: "100%", display: "flex", alignItems: "center", gap: 10, padding: "9px 12px", borderRadius: 8, border: "none", cursor: "pointer",
              background: page === n.key ? t.navActive : "transparent",
              color: page === n.key ? t.navActiveText : t.text,
              fontWeight: page === n.key ? 600 : 400, fontSize: 13, marginBottom: 2,
            }}>
              <span>{n.icon}</span>
              <span style={{ flex: 1, textAlign: "left" }}>{n.label}</span>
              {n.badge && <span style={{ background: "#EF4444", color: "#fff", borderRadius: 10, fontSize: 10, padding: "1px 6px", fontWeight: 700 }}>{n.badge}</span>}
            </button>
          ))}
        </div>
        <div style={{ padding: "12px 20px", borderTop: `1px solid ${t.border}` }}>
          <button style={{ background: "none", border: "none", color: t.sub, cursor: "pointer", fontSize: 13, display: "flex", alignItems: "center", gap: 8 }}>↩ Выйти из системы</button>
        </div>
      </div>

      {/* Main */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column", minWidth: 0 }}>
        <div style={{ background: t.header, borderBottom: `1px solid ${t.border}`, padding: "0 28px", height: 56, display: "flex", alignItems: "center", justifyContent: "space-between", flexShrink: 0, transition: "background 0.2s" }}>
          <span style={{ fontWeight: 600, fontSize: 18, color: t.text }}>{PAGE_TITLES[page]}</span>
          <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
            <button onClick={() => setDark(!dark)} title={dark ? "Светлая тема" : "Тёмная тема"} style={{ background: dark ? "#334155" : "#F3F4F6", border: "none", cursor: "pointer", fontSize: 16, width: 36, height: 36, borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center" }}>
              {dark ? "☀️" : "🌙"}
            </button>
            <div style={{ position: "relative" }}>
              <button onClick={() => setPage("notifications")} style={{ background: "none", border: "none", cursor: "pointer", fontSize: 20 }}>🔔</button>
              <span style={{ position: "absolute", top: 0, right: -2, background: "#EF4444", color: "#fff", borderRadius: 8, fontSize: 9, padding: "1px 4px", fontWeight: 700 }}>4</span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <div style={{ width: 32, height: 32, borderRadius: "50%", background: "#3B82F6", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontWeight: 700, fontSize: 12 }}>AU</div>
              <div>
                <div style={{ fontSize: 13, fontWeight: 600, lineHeight: 1.2, color: t.text }}>Admin User</div>
                <div style={{ fontSize: 11, color: t.sub }}>администратор</div>
              </div>
            </div>
          </div>
        </div>
        <div style={{ flex: 1, overflowY: "auto" }}>
          {renderPage()}
        </div>
      </div>
    </div>
  );
}
