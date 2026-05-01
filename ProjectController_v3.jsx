import React, { useState, useMemo, useEffect } from "react";
import {
  LayoutDashboard, FolderKanban, ListChecks, Users, Bell, Search, Plus,
  LogOut, ChevronRight, ChevronLeft, Calendar, Clock, AlertCircle,
  CheckCircle2, Circle, Loader2, XCircle, ExternalLink, Mail, Lock,
  Sparkles, Zap, Flame, AlertOctagon, Award, Activity, Edit3, RotateCcw,
  Send, MessageSquare, Shield, Eye, Paperclip, GitBranch, Milestone,
  TrendingUp, ArrowRight, Inbox, X, AlertTriangle, ThumbsUp, Target,
  CheckCheck, FileText, Briefcase, Link2, Upload, Trash2, Edit2
} from "lucide-react";

// ═══════════════════════════════════════════════════════════════════════
// MAA LOGO (inline SVG, recreated from your screenshot)
// ═══════════════════════════════════════════════════════════════════════
const MaaLogo = ({ size = 40 }) => (
  <svg width={size} height={size * 0.85} viewBox="0 0 100 85" fill="none">
    <path d="M50 78 C 25 60, 8 45, 8 28 C 8 15, 18 8, 28 8 C 38 8, 45 14, 50 22 C 55 14, 62 8, 72 8 C 82 8, 92 15, 92 28 C 92 45, 75 60, 50 78 Z"
      fill="#7A9E63" stroke="#5a7849" strokeWidth="1.5"/>
    <circle cx="50" cy="20" r="6" fill="#DD6B7E"/>
    <path d="M40 32 C 40 28, 44 26, 50 26 C 56 26, 60 28, 60 32 L 60 50 C 60 53, 57 56, 50 56 C 43 56, 40 53, 40 50 Z" fill="#DD6B7E"/>
    <circle cx="50" cy="42" r="3.5" fill="#fff"/>
  </svg>
);

// ═══════════════════════════════════════════════════════════════════════
// DATA — Real team & demo project
// ═══════════════════════════════════════════════════════════════════════
const TODAY = new Date("2026-04-30");
const todayISO = () => TODAY.toISOString();
const todayDate = () => TODAY.toISOString().split("T")[0];

const TEAM = [
  { id: "sagor",   nameBn: "সাগর",   nameEn: "Sagor",   role: "Graphics Designer",       dept: "Maa Apps",       email: "sagorstatus@gmail.com",          password: "demo123", isQC: false, isAdmin: false },
  { id: "amit",    nameBn: "অমিত",    nameEn: "Amit",    role: "Video Editor",            dept: "Maa Apps",       email: "amitmaaapp@gmail.com",           password: "demo123", isQC: false, isAdmin: false },
  { id: "naim",    nameBn: "নাইম",    nameEn: "Naim",    role: "Additional PM · QC Lead", dept: "Management",     email: "rebook0092@gmail.com",           password: "demo123", isQC: true,  isAdmin: false },
  { id: "mithun",  nameBn: "মিঠুন",   nameEn: "Mithun",  role: "Scriptwriter",            dept: "Maa Apps",       email: "andolonmithun@gmail.com",        password: "demo123", isQC: false, isAdmin: false },
  { id: "rakib",   nameBn: "রাকিব",   nameEn: "Rakib",   role: "Product Executive",       dept: "Maa Apps",       email: "rakibulislam.maaapp@gmail.com",  password: "demo123", isQC: false, isAdmin: false },
  { id: "kawser",  nameBn: "কাউছার",  nameEn: "Kawser",  role: "Video Editor",            dept: "Maa Apps",       email: "md.kawser.drive2@gmail.com",     password: "demo123", isQC: false, isAdmin: false },
  { id: "karim",   nameBn: "করিম",    nameEn: "Karim",   role: "Communication Expert",    dept: "Maa Apps",       email: "mdkarimuzzamankhan1@gmail.com",  password: "demo123", isQC: false, isAdmin: false },
  { id: "ayat",    nameBn: "আয়াত",   nameEn: "Ayat",    role: "Genesis Client Support",  dept: "Genesis Studio", email: "ayatsheikhusha@gmail.com",       password: "demo123", isQC: false, isAdmin: false },
  { id: "arafat",  nameBn: "আরাফাত",  nameEn: "Arafat",  role: "Genesis Studio Support",  dept: "Genesis Studio", email: "eyasinmahmud43@gmail.com",       password: "demo123", isQC: false, isAdmin: false },
  { id: "parvez",  nameBn: "পারভেজ",  nameEn: "Parvez",  role: "CEO · Project Manager",   dept: "Management",     email: "zahidulparvez.office@gmail.com", password: "demo123", isQC: true,  isAdmin: true  },
  { id: "alamin",  nameBn: "আলামিন", nameEn: "Alamin",  role: "Genesis Support Exec",    dept: "Genesis Studio", email: "alamin.shaikh.738@gmail.com",    password: "demo123", isQC: false, isAdmin: false },
];

const PROJECTS = [
  {
    id: "prj-1", projectId: "PRJ-1",
    name: "Mothers Day 2026 Special Episode",
    icon: "🎬",
    goal: "মাদার্স ডে এর জন্য একটা Special Episode publish করা ৫ মে এর মধ্যে",
    status: "In Progress", priority: "High", dept: "Maa Apps",
    leadId: "parvez",
    createdAt: "2026-04-29T09:00:00",
    startDate: "2026-04-29", deadline: "2026-05-05",
    milestones: [
      { id: "ms-1", name: "Pre-production", date: "2026-04-30", status: "completed" },
      { id: "ms-2", name: "Shoot & Edit", date: "2026-05-03", status: "in_progress" },
      { id: "ms-3", name: "Final & Publish", date: "2026-05-05", status: "upcoming" },
    ],
  },
];

const TASKS = [
  {
    id: "tsk-1", taskId: "TSK-1", name: "Script Writing - Mothers Day Special",
    icon: "✍️", status: "Completed", priority: "High", dept: "Maa Apps",
    projectId: "prj-1", currentAssigneeId: "mithun",
    createdAt: "2026-04-25T10:30:00", assignedAt: "2026-04-25T10:30:00",
    startDate: "2026-04-25", deadline: "2026-04-28",
    docLink: "https://docs.google.com/document/sample", docStatus: "Final",
    instructions: "Mothers Day theme এর একটা heartfelt 5-minute script লিখুন।",
    qcRounds: 1,
    journey: [
      { stage: "Assigned", actorId: "parvez", at: "2026-04-25T10:30:00", note: "Created and assigned" },
      { stage: "Started", actorId: "mithun", at: "2026-04-25T11:00:00", note: "" },
      { stage: "Submitted for QC", actorId: "mithun", at: "2026-04-27T14:00:00", note: "First draft" },
      { stage: "QC Returned", actorId: "naim", at: "2026-04-27T17:00:00", note: "Hook line আরো emotional লাগবে" },
      { stage: "Resubmitted", actorId: "mithun", at: "2026-04-28T10:00:00", note: "Hook updated" },
      { stage: "QC Approved", actorId: "naim", at: "2026-04-28T15:00:00", note: "Final version approved" },
      { stage: "Completed", actorId: "mithun", at: "2026-04-28T16:00:00", note: "" },
    ],
    updates: [],
  },
  {
    id: "tsk-2", taskId: "TSK-2", name: "Thumbnail Design - Mothers Day",
    icon: "🎨", status: "In Progress", priority: "Medium", dept: "Maa Apps",
    projectId: "prj-1", currentAssigneeId: "sagor",
    createdAt: "2026-04-28T09:00:00", assignedAt: "2026-04-28T09:00:00",
    startDate: "2026-04-28", deadline: "2026-04-30",
    docLink: "", docStatus: "Draft",
    instructions: "Emotional mom-baby visual, Bengali text overlay",
    qcRounds: 0,
    journey: [
      { stage: "Assigned", actorId: "parvez", at: "2026-04-28T09:00:00", note: "Assigned to Sagor" },
      { stage: "Started", actorId: "sagor", at: "2026-04-29T10:00:00", note: "Concept design চলছে" },
    ],
    updates: [{ date: "2026-04-29", text: "First draft তৈরি, mom-baby concept চলছে", author: "sagor" }],
  },
  {
    id: "tsk-3", taskId: "TSK-3", name: "Video Recording & Editing",
    icon: "🎥", status: "Not Started", priority: "Critical", dept: "Maa Apps",
    projectId: "prj-1", currentAssigneeId: "amit",
    createdAt: "2026-04-29T11:00:00", assignedAt: "2026-04-29T11:00:00",
    startDate: "2026-05-01", deadline: "2026-05-03",
    docLink: "", docStatus: "No Doc",
    instructions: "Script অনুসারে record + edit + caption",
    qcRounds: 0,
    journey: [{ stage: "Assigned", actorId: "parvez", at: "2026-04-29T11:00:00", note: "Studio booking pending" }],
    updates: [],
  },
  {
    id: "tsk-4", taskId: "TSK-4", name: "Daily Tips Article Review (10 articles)",
    icon: "📝", status: "In Progress", priority: "Medium", dept: "Maa Apps",
    projectId: "prj-1", currentAssigneeId: "rakib",
    createdAt: "2026-04-22T09:00:00", assignedAt: "2026-04-22T09:00:00",
    startDate: "2026-04-22", deadline: "2026-04-28",
    docLink: "https://docs.google.com/document/sample2", docStatus: "In Review",
    instructions: "Mothers Day theme এর ১০টা daily tip article check করে যোগ করা",
    qcRounds: 0,
    journey: [
      { stage: "Assigned", actorId: "parvez", at: "2026-04-22T09:00:00", note: "Assigned" },
      { stage: "Started", actorId: "rakib", at: "2026-04-23T10:00:00", note: "" },
      { stage: "Update", actorId: "rakib", at: "2026-04-28T18:00:00", note: "৬টা done, ৪টা বাকি" },
    ],
    updates: [{ date: "2026-04-28", text: "৬টা done, ৪টা বাকি - ২ দিন late", author: "rakib" }],
  },
];

// ═══════════════════════════════════════════════════════════════════════
// HELPERS
// ═══════════════════════════════════════════════════════════════════════
const memberById = id => TEAM.find(m => m.id === id);

const daysBetween = dateStr => {
  if (!dateStr) return null;
  const d = new Date(dateStr); d.setHours(0,0,0,0);
  const t = new Date(TODAY); t.setHours(0,0,0,0);
  return Math.ceil((d - t) / 86400000);
};

const formatDate = d => !d ? "—" : new Date(d).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
const formatDateShort = d => !d ? "—" : new Date(d).toLocaleDateString("en-US", { month: "short", day: "numeric" });
const formatDateTime = d => !d ? "—" : new Date(d).toLocaleString("en-US", { month: "short", day: "numeric", hour: "numeric", minute: "2-digit" });

const timeAgo = dateStr => {
  if (!dateStr) return "—";
  const diff = TODAY - new Date(dateStr);
  const mins = Math.floor(diff / 60000);
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  return `${Math.floor(hrs / 24)}d ago`;
};

// ═══════════════════════════════════════════════════════════════════════
// UI PRIMITIVES
// ═══════════════════════════════════════════════════════════════════════
const Avatar = ({ member, size = "md" }) => {
  if (!member) return null;
  const sizes = { xs: "w-6 h-6 text-[10px]", sm: "w-8 h-8 text-xs", md: "w-10 h-10 text-sm", lg: "w-14 h-14 text-base" };
  const palette = ["from-[#7A9E63] to-[#5a7849]", "from-[#DD6B7E] to-[#a84e5e]", "from-amber-400 to-orange-500", "from-sky-400 to-indigo-500", "from-emerald-400 to-teal-500"];
  const c = palette[member.id.charCodeAt(0) % palette.length];
  return (
    <div className={`${sizes[size]} rounded-full bg-gradient-to-br ${c} text-white font-semibold flex items-center justify-center shrink-0 shadow-sm ring-2 ring-white`}>
      {member.nameEn[0]}
    </div>
  );
};

const StatusChip = ({ status }) => {
  const map = {
    "Not Started": { i: Circle, c: "bg-stone-100 text-stone-700 border-stone-200" },
    "In Progress": { i: Loader2, c: "bg-sky-50 text-sky-700 border-sky-200" },
    "Blocked":     { i: AlertCircle, c: "bg-red-50 text-red-700 border-red-200" },
    "In Review":   { i: Clock, c: "bg-amber-50 text-amber-800 border-amber-200" },
    "Returned":    { i: RotateCcw, c: "bg-orange-50 text-orange-700 border-orange-200" },
    "Completed":   { i: CheckCircle2, c: "bg-emerald-50 text-emerald-700 border-emerald-200" },
  };
  const m = map[status]; if (!m) return null;
  const Icon = m.i;
  return (
    <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[11px] font-medium border ${m.c}`}>
      <Icon className={`w-3 h-3 ${status === "In Progress" ? "animate-spin" : ""}`} />{status}
    </span>
  );
};

const PriorityChip = ({ priority }) => {
  const map = {
    "Critical": "bg-red-600 text-white",
    "High":     "bg-rose-500 text-white",
    "Medium":   "bg-amber-100 text-amber-800 border border-amber-300",
    "Low":      "bg-stone-100 text-stone-600 border border-stone-300",
  };
  return priority ? <span className={`px-2 py-0.5 rounded-md text-[11px] font-semibold ${map[priority]}`}>{priority}</span> : null;
};

const DeptChip = ({ dept }) => {
  const map = {
    "Maa Apps":         { dot: "bg-[#7A9E63]",   text: "text-[#5a7849]",   bg: "bg-[#7A9E63]/10" },
    "Genesis Studio":   { dot: "bg-orange-500",  text: "text-orange-700",  bg: "bg-orange-50" },
    "Management":       { dot: "bg-[#DD6B7E]",   text: "text-[#a84e5e]",   bg: "bg-[#DD6B7E]/10" },
  };
  const m = map[dept] || map["Management"];
  return (
    <span className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded text-xs font-medium ${m.bg} ${m.text}`}>
      <span className={`w-1.5 h-1.5 rounded-full ${m.dot}`} />{dept}
    </span>
  );
};

const DaysLeftBadge = ({ deadline, status }) => {
  if (status === "Completed") return <span className="inline-flex items-center gap-1 text-xs text-emerald-700 font-semibold"><CheckCircle2 className="w-3 h-3" />Done</span>;
  const d = daysBetween(deadline);
  if (d === null) return <span className="text-xs text-stone-400">—</span>;
  if (d < 0)  return <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-red-100 text-red-700 text-xs font-bold"><AlertOctagon className="w-3 h-3" />{Math.abs(d)}d overdue</span>;
  if (d === 0) return <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-amber-100 text-amber-800 text-xs font-bold"><Flame className="w-3 h-3" />Due today</span>;
  if (d === 1) return <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-amber-50 text-amber-700 text-xs font-medium"><Clock className="w-3 h-3" />Tomorrow</span>;
  if (d <= 3) return <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-yellow-50 text-yellow-700 text-xs font-medium"><Clock className="w-3 h-3" />{d}d left</span>;
  return <span className="text-xs text-stone-500">{d}d left</span>;
};

const Btn = ({ children, onClick, variant = "primary", size = "md", className = "", disabled, type = "button" }) => {
  const v = {
    primary:   "bg-[#7A9E63] hover:bg-[#5a7849] text-white shadow-sm",
    secondary: "bg-[#DD6B7E] hover:bg-[#a84e5e] text-white shadow-sm",
    outline:   "border border-stone-300 hover:bg-stone-50 text-stone-700 bg-white",
    ghost:     "hover:bg-stone-100 text-stone-700",
  };
  const s = { sm: "px-2.5 py-1.5 text-xs", md: "px-3.5 py-2 text-sm", lg: "px-5 py-2.5 text-base" };
  return (
    <button type={type} onClick={onClick} disabled={disabled}
      className={`${v[variant]} ${s[size]} rounded-lg font-medium transition-all disabled:opacity-50 inline-flex items-center justify-center gap-1.5 ${className}`}>
      {children}
    </button>
  );
};

// ═══════════════════════════════════════════════════════════════════════
// LOGIN PAGE
// ═══════════════════════════════════════════════════════════════════════
const LoginPage = ({ onLogin }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showDemo, setShowDemo] = useState(false);

  const submit = e => {
    if (e && e.preventDefault) e.preventDefault();
    const cleanEmail = (email || "").toLowerCase().trim();
    const cleanPassword = (password || "").trim();
    console.log("Login attempt:", { email: cleanEmail, password: cleanPassword });
    if (!cleanEmail || !cleanPassword) {
      setError("Email এবং password দুটোই দিতে হবে।");
      return;
    }
    const u = TEAM.find(x => x.email.toLowerCase().trim() === cleanEmail && x.password === cleanPassword);
    if (!u) {
      console.log("No match. Available emails:", TEAM.map(t => t.email));
      setError(`Email বা password ভুল। আপনি দিয়েছেন: "${cleanEmail}" / password length: ${cleanPassword.length}`);
      return;
    }
    console.log("Login success:", u.nameEn);
    onLogin(u.id);
  };

  const fill = id => {
    const u = memberById(id);
    setEmail(u.email); setPassword(u.password); setError("");
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6 relative overflow-hidden bg-stone-50">
      <div className="absolute -top-32 -left-32 w-[500px] h-[500px] rounded-full opacity-20 blur-3xl"
        style={{ background: "radial-gradient(circle, #7A9E63, transparent)" }} />
      <div className="absolute -bottom-32 -right-32 w-[500px] h-[500px] rounded-full opacity-20 blur-3xl"
        style={{ background: "radial-gradient(circle, #DD6B7E, transparent)" }} />

      <div className="relative grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-5xl w-full items-center">
        {/* Left brand panel */}
        <div className="hidden lg:flex flex-col items-center text-center space-y-6">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-br from-[#7A9E63]/20 to-[#DD6B7E]/20 rounded-full blur-2xl" />
            <div className="relative bg-white rounded-3xl p-8 shadow-xl">
              <MaaLogo size={140} />
            </div>
          </div>
          <div>
            <h1 className="text-4xl font-bold text-stone-900 tracking-tight">Project Controller</h1>
            <div className="text-sm text-[#7A9E63] font-semibold tracking-widest uppercase mt-2">Maa Company</div>
            <p className="text-stone-600 text-sm mt-4 max-w-sm mx-auto">
              এক জায়গা থেকে আপনার পুরো team-এর project, task, এবং performance manage করুন।
            </p>
            <div className="text-[10px] text-[#7A9E63] font-bold tracking-widest uppercase mt-3">Helping Maa for a Better World</div>
          </div>
          <div className="flex gap-2 text-[10px] font-semibold tracking-widest uppercase text-stone-500">
            <span className="px-2 py-1 bg-white rounded-md border border-stone-200">Maa Apps</span>
            <span className="px-2 py-1 bg-white rounded-md border border-stone-200">Genesis Studio</span>
          </div>
        </div>

        {/* Right form */}
        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-stone-200">
          <div className="lg:hidden p-6 text-center border-b border-stone-100">
            <div className="inline-block"><MaaLogo size={64} /></div>
            <h1 className="text-xl font-bold text-stone-900 mt-3">Project Controller</h1>
            <div className="text-[10px] text-[#7A9E63] font-bold tracking-widest uppercase mt-1">Maa Company</div>
          </div>

          <form onSubmit={submit} className="p-7 space-y-4">
            <div>
              <h2 className="text-lg font-bold text-stone-900">Sign in to your account</h2>
              <p className="text-xs text-stone-500 mt-0.5">আপনার Maa Company account দিয়ে login করুন</p>
            </div>

            <div>
              <label className="text-[12px] font-semibold text-stone-700 block mb-1.5">Email Address</label>
              <div className="relative">
                <Mail className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" />
                <input type="email" value={email} onChange={e => setEmail(e.target.value)}
                  placeholder="your@email.com" required autoFocus
                  className="w-full pl-9 pr-3 py-2 border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#7A9E63]/30 focus:border-[#7A9E63] text-sm" />
              </div>
            </div>

            <div>
              <label className="text-[12px] font-semibold text-stone-700 block mb-1.5">Password</label>
              <div className="relative">
                <Lock className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" />
                <input type="password" value={password} onChange={e => setPassword(e.target.value)}
                  placeholder="••••••••" required
                  className="w-full pl-9 pr-3 py-2 border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#7A9E63]/30 focus:border-[#7A9E63] text-sm" />
              </div>
            </div>

            {error && (
              <div style={{ backgroundColor: "#fee2e2", color: "#991b1b", border: "2px solid #fca5a5" }}
                className="text-sm px-3 py-2.5 rounded-lg flex items-start gap-2 font-medium">
                <AlertCircle className="w-4 h-4 mt-0.5 shrink-0" />
                <span style={{ color: "#991b1b" }}>{error}</span>
              </div>
            )}

            <button type="submit"
              onClick={submit}
              style={{ backgroundColor: "#7A9E63", color: "#ffffff" }}
              className="w-full px-5 py-2.5 rounded-lg font-semibold text-base hover:opacity-90 transition-all shadow-sm flex items-center justify-center gap-2">
              Sign in to Project Controller →
            </button>

            <div className="text-center">
              <button type="button" onClick={() => setShowDemo(!showDemo)}
                className="text-[11px] text-stone-500 hover:text-[#5a7849]">
                {showDemo ? "▲" : "▼"} Demo accounts (testing এর জন্য)
              </button>
            </div>

            {showDemo && (
              <div className="bg-stone-50 border border-stone-200 rounded-lg p-3 space-y-1.5">
                <div className="text-[11px] font-semibold text-stone-700 mb-1">Quick login (password: <code className="bg-white px-1 rounded">demo123</code>)</div>
                <div className="grid grid-cols-2 gap-1.5">
                  {[
                    { id: "parvez", label: "Admin", color: "[#7A9E63]" },
                    { id: "rakib", label: "Member", color: "[#DD6B7E]" },
                    { id: "naim", label: "QC Lead", color: "amber-400" },
                    { id: "mithun", label: "Member", color: "stone-400" },
                  ].map(d => {
                    const m = memberById(d.id);
                    return (
                      <button key={d.id} type="button" onClick={() => fill(d.id)}
                        className="text-left px-2 py-1.5 bg-white border border-stone-200 hover:border-stone-400 rounded text-xs flex items-center gap-2">
                        <Avatar member={m} size="xs" />
                        <div className="flex-1 min-w-0">
                          <div className="font-semibold text-stone-800 truncate">{m.nameBn}</div>
                          <div className="text-[9px] text-stone-500 font-bold uppercase tracking-wider">{d.label}</div>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}
          </form>

          <div className="px-7 py-3 bg-stone-50 border-t border-stone-100 text-center">
            <div className="text-[10px] text-stone-400">© 2026 Maa Company · Helping Maa for a Better World</div>
          </div>
        </div>
      </div>
    </div>
  );
};

// ═══════════════════════════════════════════════════════════════════════
// SIDEBAR
// ═══════════════════════════════════════════════════════════════════════
const Sidebar = ({ current, onNav, currentUser, onLogout, isAdmin, badges }) => {
  const adminNav = [
    { key: "dashboard",  label: "Dashboard",  icon: LayoutDashboard },
    { key: "projects",   label: "Projects",   icon: FolderKanban, badge: badges.activeProjects },
    { key: "tasks",      label: "All Tasks",  icon: ListChecks, badge: badges.activeTasks },
    { key: "milestones", label: "Milestones", icon: Milestone },
    { key: "qc-reports", label: "QC Reports", icon: Award },
    { key: "team",       label: "Team",       icon: Users, badge: TEAM.length },
  ];
  const memberNav = [
    { key: "my-dashboard", label: "My Dashboard", icon: LayoutDashboard },
    { key: "my-tasks",     label: "My Tasks",     icon: ListChecks, badge: badges.myActiveTasks },
  ];
  if (currentUser.isQC && !isAdmin) memberNav.push({ key: "qc-queue", label: "QC Queue", icon: Award, badge: badges.qcPending });
  const NAV = isAdmin ? adminNav : memberNav;

  return (
    <aside className="w-60 shrink-0 flex flex-col h-screen sticky top-0"
      style={{ background: "linear-gradient(180deg, #5a7849 0%, #3d5630 100%)" }}>
      <div className="px-4 py-5 border-b border-white/10 flex items-center gap-2.5">
        <div className="w-9 h-9 rounded-lg bg-white flex items-center justify-center shadow-lg">
          <MaaLogo size={26} />
        </div>
        <div className="flex-1 min-w-0">
          <div className="font-bold text-white tracking-tight text-[14px] leading-none">Project Controller</div>
          <div className="text-[10px] text-white/50 mt-1 leading-none">Maa Company</div>
        </div>
      </div>

      <div className="px-3 pt-3">
        <div className={`px-2.5 py-1.5 rounded-md text-[10px] font-bold uppercase tracking-wider flex items-center gap-1.5 ${
          isAdmin ? "bg-[#7A9E63]/20 text-[#a8c98e]" :
          currentUser.isQC ? "bg-amber-500/20 text-amber-300" :
          "bg-[#DD6B7E]/20 text-[#f0a8b3]"
        }`}>
          <Shield className="w-3 h-3" />
          {isAdmin ? "Admin Panel" : currentUser.isQC ? "QC + Member" : "Member Panel"}
        </div>
      </div>

      <nav className="flex-1 px-3 py-3 space-y-0.5 overflow-y-auto">
        {NAV.map(item => {
          const Icon = item.icon;
          const isActive = current === item.key;
          return (
            <button key={item.key} onClick={() => onNav(item.key)}
              className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-all ${
                isActive ? "bg-white/10 text-white" : "text-white/60 hover:bg-white/5 hover:text-white"
              }`}>
              <Icon className="w-4 h-4 shrink-0" />
              <span className="flex-1 text-left">{item.label}</span>
              {item.badge > 0 && (
                <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${isActive ? "bg-[#7A9E63] text-white" : "bg-white/10 text-white/60"}`}>{item.badge}</span>
              )}
            </button>
          );
        })}
      </nav>

      <div className="px-3 py-3 border-t border-white/10">
        <div className="flex items-center gap-2.5 px-2 py-2 rounded-lg hover:bg-white/5">
          <Avatar member={currentUser} size="sm" />
          <div className="flex-1 min-w-0">
            <div className="text-[13px] font-medium text-white truncate leading-tight">{currentUser.nameBn}</div>
            <div className="text-[10px] text-white/40 truncate">{currentUser.role}</div>
          </div>
          <button onClick={onLogout} className="text-white/40 hover:text-white" title="Logout">
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </div>
    </aside>
  );
};

// ═══════════════════════════════════════════════════════════════════════
// TOPBAR with notifications
// ═══════════════════════════════════════════════════════════════════════
const Topbar = ({ title, subtitle, onNewProject, isAdmin, notifications, onMarkRead }) => {
  const [open, setOpen] = useState(false);
  const unread = notifications.filter(n => !n.read).length;

  return (
    <header className="sticky top-0 z-20 bg-white/95 backdrop-blur-md border-b border-stone-200 px-7 py-3.5 flex items-center justify-between">
      <div>
        <h1 className="text-xl font-bold text-stone-900 tracking-tight">{title}</h1>
        {subtitle && <p className="text-[12px] text-stone-500 mt-0.5">{subtitle}</p>}
      </div>
      <div className="flex items-center gap-2">
        <div className="relative">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" />
          <input placeholder="Search…"
            className="pl-9 pr-4 py-2 w-56 rounded-lg bg-stone-100 border border-transparent focus:border-[#7A9E63] focus:bg-white focus:outline-none text-sm" />
        </div>

        <div className="relative">
          <button onClick={() => setOpen(!open)} className="relative p-2 rounded-lg hover:bg-stone-100">
            <Bell className="w-5 h-5 text-stone-600" />
            {unread > 0 && (
              <span className="absolute -top-0.5 -right-0.5 min-w-[18px] h-[18px] px-1 bg-[#DD6B7E] rounded-full text-white text-[10px] font-bold flex items-center justify-center ring-2 ring-white">
                {unread}
              </span>
            )}
          </button>
          {open && (
            <>
              <div className="fixed inset-0 z-30" onClick={() => setOpen(false)} />
              <div className="absolute right-0 top-full mt-2 w-80 bg-white border border-stone-200 rounded-xl shadow-2xl overflow-hidden z-40">
                <div className="px-4 py-3 border-b border-stone-100 flex items-center justify-between bg-stone-50">
                  <div className="font-bold text-stone-900 text-sm">Notifications · {unread} unread</div>
                  {unread > 0 && <button onClick={onMarkRead} className="text-[11px] font-medium text-[#5a7849]">Mark all read</button>}
                </div>
                <div className="max-h-96 overflow-y-auto">
                  {notifications.length > 0 ? notifications.slice(0, 10).map(n => (
                    <div key={n.id} className={`px-4 py-3 hover:bg-stone-50 border-b border-stone-50 last:border-0 ${!n.read ? "bg-[#7A9E63]/5" : ""}`}>
                      <div className="flex items-start gap-2">
                        <div className="text-sm font-semibold text-stone-900 flex-1">{n.title}</div>
                        {!n.read && <div className="w-2 h-2 rounded-full bg-[#DD6B7E] mt-1.5" />}
                      </div>
                      <div className="text-xs text-stone-600 mt-0.5">{n.body}</div>
                      <div className="text-[10px] text-stone-400 mt-1">{timeAgo(n.at)}</div>
                    </div>
                  )) : (
                    <div className="text-center py-8 text-sm text-stone-400">
                      <Inbox className="w-8 h-8 mx-auto mb-2 text-stone-300" />No notifications
                    </div>
                  )}
                </div>
              </div>
            </>
          )}
        </div>

        {isAdmin && onNewProject && (
          <button onClick={onNewProject}
            style={{ backgroundColor: "#7A9E63", color: "#ffffff" }}
            className="px-3.5 py-2 rounded-lg font-semibold text-sm hover:opacity-90 transition-all shadow-sm flex items-center gap-1.5">
            <Plus className="w-4 h-4" strokeWidth={2.5} />
            New Project
          </button>
        )}
      </div>
    </header>
  );
};

// ═══════════════════════════════════════════════════════════════════════
// MILESTONE TIMELINE (visual)
// ═══════════════════════════════════════════════════════════════════════
const MilestoneTimeline = ({ milestones }) => (
  <div className="py-2">
    <div className="flex items-center gap-0">
      {milestones.map((ms, i) => {
        const done = ms.status === "completed";
        const cur = ms.status === "in_progress";
        const overdue = !done && daysBetween(ms.date) < 0;
        return (
          <React.Fragment key={ms.id}>
            <div className="flex flex-col items-center gap-1">
              <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold ${
                done ? "bg-[#7A9E63] text-white" :
                cur ? "bg-[#DD6B7E] text-white ring-4 ring-[#DD6B7E]/20" :
                overdue ? "bg-red-500 text-white" :
                "bg-stone-200 text-stone-500"
              }`}>
                {done ? <CheckCheck className="w-3.5 h-3.5" /> : i + 1}
              </div>
              <div className="text-center min-w-0 max-w-[100px]">
                <div className={`text-[10px] font-semibold truncate ${cur ? "text-[#a84e5e]" : "text-stone-700"}`}>{ms.name}</div>
                <div className="text-[9px] text-stone-500">{formatDateShort(ms.date)}</div>
              </div>
            </div>
            {i < milestones.length - 1 && (
              <div className={`flex-1 h-0.5 -mt-7 ${milestones[i].status === "completed" ? "bg-[#7A9E63]" : "bg-stone-200"}`} style={{ marginBottom: 28 }} />
            )}
          </React.Fragment>
        );
      })}
    </div>
  </div>
);

// ═══════════════════════════════════════════════════════════════════════
// JOURNEY TIMELINE (bottleneck tracking)
// ═══════════════════════════════════════════════════════════════════════
const JourneyTimeline = ({ task }) => {
  const journey = task.journey || [];
  if (journey.length === 0) return <div className="text-xs text-stone-400 text-center py-4">No journey yet</div>;

  // Find longest hand-off
  const handoffs = [];
  for (let i = 1; i < journey.length; i++) {
    const hrs = Math.round((new Date(journey[i].at) - new Date(journey[i-1].at)) / 3600000);
    handoffs.push({ idx: i, hours: hrs, days: Math.round(hrs / 24 * 10) / 10 });
  }
  const longest = handoffs.length > 0 ? handoffs.reduce((m, h) => h.hours > m.hours ? h : m) : null;
  const totalDays = journey.length > 1 ? Math.round((new Date(journey[journey.length-1].at) - new Date(journey[0].at)) / 3600000 / 24 * 10) / 10 : 0;

  const stageMeta = stage => {
    if (stage.includes("Assigned")) return { color: "bg-stone-500" };
    if (stage.includes("Started")) return { color: "bg-sky-500" };
    if (stage.includes("Submitted") || stage.includes("Resubmitted")) return { color: "bg-purple-500" };
    if (stage.includes("Returned")) return { color: "bg-orange-500" };
    if (stage.includes("Approved")) return { color: "bg-emerald-500" };
    if (stage.includes("Completed")) return { color: "bg-emerald-600" };
    if (stage.includes("Update")) return { color: "bg-blue-500" };
    return { color: "bg-stone-400" };
  };

  return (
    <div className="space-y-3">
      {longest && (
        <div className="bg-stone-900 text-white rounded-lg p-3 grid grid-cols-3 gap-3 text-center">
          <div>
            <div className="text-[9px] uppercase tracking-wider text-white/60 font-semibold">Total Time</div>
            <div className="text-lg font-bold mt-0.5">{totalDays}d</div>
          </div>
          <div className="border-x border-white/10">
            <div className="text-[9px] uppercase tracking-wider text-white/60 font-semibold">Slowest Hand-off</div>
            <div className="text-xs font-bold mt-1 text-amber-300">
              {memberById(journey[longest.idx].actorId)?.nameBn || "—"} <span className="text-white/60">+{longest.days}d</span>
            </div>
          </div>
          <div>
            <div className="text-[9px] uppercase tracking-wider text-white/60 font-semibold">QC Rounds</div>
            <div className="text-lg font-bold mt-0.5">{task.qcRounds || 0}</div>
          </div>
        </div>
      )}

      <div className="relative">
        {journey.map((j, i) => {
          const actor = memberById(j.actorId);
          const meta = stageMeta(j.stage);
          const next = journey[i+1];
          const handoffHrs = next ? Math.round((new Date(next.at) - new Date(j.at)) / 3600000) : 0;
          const slow = handoffHrs > 36;
          return (
            <div key={i} className="flex gap-3 relative">
              {i < journey.length - 1 && (
                <div className={`absolute left-[14px] top-8 bottom-0 w-0.5 ${slow ? "bg-red-300" : "bg-stone-200"}`} />
              )}
              <div className={`w-7 h-7 rounded-full ${meta.color} text-white flex items-center justify-center shrink-0 z-10 text-xs font-bold`}>
                {i + 1}
              </div>
              <div className="flex-1 pb-4 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-sm font-bold text-stone-900">{j.stage}</span>
                  {actor && (
                    <span className="inline-flex items-center gap-1 text-xs">
                      <Avatar member={actor} size="xs" />
                      <span className="font-medium text-stone-700">{actor.nameBn}</span>
                    </span>
                  )}
                </div>
                <div className="text-[11px] text-stone-500 mt-0.5">{formatDateTime(j.at)}</div>
                {j.note && <div className="text-xs text-stone-700 mt-1.5 px-2.5 py-1.5 bg-stone-50 rounded border-l-2 border-stone-300">{j.note}</div>}
                {next && (
                  <div className={`text-[10px] mt-2 inline-flex items-center gap-1 ${slow ? "text-red-600 font-semibold" : "text-stone-400"}`}>
                    {slow && <AlertTriangle className="w-3 h-3" />}
                    Hand-off: {handoffHrs >= 24 ? `${(handoffHrs/24).toFixed(1)} days` : `${handoffHrs} hours`}
                    {slow && " — bottleneck!"}
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

// ═══════════════════════════════════════════════════════════════════════
// ADMIN DASHBOARD
// ═══════════════════════════════════════════════════════════════════════
const AdminDashboard = ({ projects, tasks, currentUser, onOpenTask, onOpenProject, onNewProject, onDeleteProject, onDeleteTask, onEditProject, onEditTask }) => {
  const [expandedProjectId, setExpandedProjectId] = useState(null);
  const stats = useMemo(() => {
    const active = tasks.filter(t => !["Completed","Cancelled"].includes(t.status));
    const overdue = active.filter(t => daysBetween(t.deadline) < 0);
    const dueToday = active.filter(t => daysBetween(t.deadline) === 0);
    const inReview = active.filter(t => t.status === "In Review");
    const blocked = active.filter(t => t.status === "Blocked" || t.status === "Returned");
    const completed = tasks.filter(t => t.status === "Completed");
    return { active: active.length, overdue, dueToday, inReview: inReview.length, blocked: blocked.length, completed: completed.length };
  }, [tasks]);

  const recent = useMemo(() => {
    const events = [];
    tasks.forEach(t => (t.journey || []).forEach(j => events.push({ ...j, task: t, member: memberById(j.actorId) })));
    return events.sort((a,b) => new Date(b.at) - new Date(a.at)).slice(0, 8);
  }, [tasks]);

  const workload = useMemo(() => {
    return TEAM.filter(m => m.id !== "parvez").map(m => {
      const my = tasks.filter(t => t.currentAssigneeId === m.id && !["Completed","Cancelled"].includes(t.status));
      return { ...m, activeTasks: my.length, overdueCount: my.filter(t => daysBetween(t.deadline) < 0).length };
    }).sort((a,b) => b.activeTasks - a.activeTasks);
  }, [tasks]);

  return (
    <div className="px-7 py-5 space-y-5 bg-stone-50 min-h-screen">
      {/* Hero with integrated stats */}
      <div className="relative overflow-hidden rounded-2xl p-6 text-white"
        style={{ background: "linear-gradient(135deg, #5a7849 0%, #7A9E63 60%, #DD6B7E 100%)" }}>
        <div className="absolute -right-20 -top-20 w-72 h-72 rounded-full bg-[#DD6B7E]/30 blur-3xl" />
        <div className="absolute -left-10 -bottom-10 w-48 h-48 rounded-full bg-white/10 blur-2xl" />
        <div className="relative grid grid-cols-1 lg:grid-cols-[1fr,auto] gap-6 items-center">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-white/15 border border-white/20">
                {TODAY.toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric", year: "numeric" })}
              </span>
            </div>
            <h2 className="text-2xl font-bold mb-1">শুভ সকাল, পারভেজ ভাই 👋</h2>
            <p className="text-white/80 text-sm">
              আজ <span className="text-white font-semibold">{stats.active}</span>টা active task
              {stats.overdue.length > 0 && <span className="text-[#f0a8b3] font-semibold"> · {stats.overdue.length}টা overdue</span>}
              {stats.dueToday.length > 0 && <span className="text-amber-200 font-semibold"> · {stats.dueToday.length}টা today due</span>}
            </p>
            <div className="flex gap-2 mt-4">
              <button onClick={onNewProject}
                style={{ backgroundColor: "#DD6B7E", color: "#ffffff" }}
                className="px-3.5 py-2 rounded-lg font-semibold text-sm hover:opacity-90 transition-all shadow-sm flex items-center gap-1.5">
                <Plus className="w-3.5 h-3.5" strokeWidth={2.5} />
                Assign New Project
              </button>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-2 lg:min-w-[400px]">
            {[
              { l: "Active",   v: stats.active,         c: "bg-white/10" },
              { l: "Overdue",  v: stats.overdue.length, c: "bg-red-500/30" },
              { l: "Today",    v: stats.dueToday.length,c: "bg-amber-500/30" },
              { l: "Blocked",  v: stats.blocked,        c: "bg-orange-500/30" },
              { l: "Review",   v: stats.inReview,       c: "bg-purple-500/30" },
              { l: "Done",     v: stats.completed,      c: "bg-emerald-500/30" },
            ].map(s => (
              <div key={s.l} className={`${s.c} rounded-lg p-3 backdrop-blur-sm`}>
                <div className="text-2xl font-bold leading-none">{s.v}</div>
                <div className="text-[10px] uppercase tracking-wider text-white/70 mt-1.5 font-semibold">{s.l}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Overdue Alert with bottleneck info */}
      {stats.overdue.length > 0 && (
        <div className="bg-gradient-to-br from-red-50 via-white to-rose-50 border border-red-200 rounded-xl p-4">
          <div className="flex items-start gap-3 mb-3">
            <div className="w-9 h-9 rounded-lg bg-red-500 text-white flex items-center justify-center shrink-0">
              <AlertOctagon className="w-5 h-5" />
            </div>
            <div className="flex-1">
              <h3 className="font-bold text-red-900 text-[15px]">{stats.overdue.length}টা task overdue — এক্ষুনি নজর দরকার</h3>
              <p className="text-xs text-red-700/80 mt-0.5">কোথায় আটকে আছে দেখুন</p>
            </div>
          </div>
          <div className="space-y-2">
            {stats.overdue.map(t => {
              const a = memberById(t.currentAssigneeId);
              return (
                <div key={t.id} onClick={() => onOpenTask(t.id)}
                  className="grid grid-cols-[auto,1fr,auto,auto,auto] gap-3 items-center px-3 py-2.5 rounded-lg bg-white border border-red-100 hover:border-red-300 cursor-pointer transition-all">
                  <span className="text-lg">{t.icon}</span>
                  <div className="min-w-0">
                    <div className="text-sm font-semibold text-stone-900 truncate">{t.name}</div>
                    <div className="text-[11px] text-stone-500 mt-0.5 flex items-center gap-2 flex-wrap">
                      <span className="font-mono text-stone-400">{t.taskId}</span>
                      <span>·</span>
                      <span>Assigned {timeAgo(t.assignedAt)}</span>
                      {t.qcRounds > 0 && <span className="text-orange-600 font-semibold flex items-center gap-0.5"><RotateCcw className="w-3 h-3" />{t.qcRounds}x QC</span>}
                    </div>
                  </div>
                  <Avatar member={a} size="sm" />
                  <PriorityChip priority={t.priority} />
                  <DaysLeftBadge deadline={t.deadline} status={t.status} />
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Main: Projects + Activity */}
      <div className="grid grid-cols-3 gap-4">
        <div className="col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-bold text-stone-900 text-base">🎯 Active Projects ({projects.filter(p => p.status === "In Progress").length})</h3>
              <p className="text-xs text-stone-500 mt-0.5">Full project + task details + journey</p>
            </div>
          </div>

          {projects.filter(p => p.status === "In Progress").map(p => {
            const ptasks = tasks.filter(t => t.projectId === p.id);
            const done = ptasks.filter(t => t.status === "Completed").length;
            const progress = ptasks.length ? (done / ptasks.length) * 100 : 0;
            const lead = memberById(p.leadId);
            const isExpanded = expandedProjectId === p.id;
            const overdueCount = ptasks.filter(t => daysBetween(t.deadline) < 0 && t.status !== "Completed").length;

            return (
              <div key={p.id} className="bg-white border border-stone-200 rounded-xl overflow-hidden">
                <div onClick={() => setExpandedProjectId(isExpanded ? null : p.id)}
                  className="p-4 cursor-pointer hover:bg-stone-50/50 transition-colors">
                  <div className="flex items-start gap-3">
                    <div className="w-12 h-12 rounded-xl bg-stone-100 flex items-center justify-center text-2xl shrink-0">{p.icon}</div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1 flex-wrap">
                        <span className="text-[10px] font-mono text-stone-400">{p.projectId}</span>
                        <DeptChip dept={p.dept} />
                        <PriorityChip priority={p.priority} />
                        <StatusChip status={p.status} />
                        {!isExpanded && overdueCount > 0 && (
                          <span className="inline-flex items-center gap-0.5 px-1.5 py-0.5 bg-red-100 text-red-700 rounded text-[10px] font-bold">
                            <AlertOctagon className="w-2.5 h-2.5" />{overdueCount} overdue
                          </span>
                        )}
                      </div>
                      <div className="flex items-center justify-between gap-2">
                        <div className="font-bold text-stone-900 text-[15px] flex-1 min-w-0 truncate">{p.name}</div>
                        <div className="flex items-center gap-2 shrink-0">
                          {!isExpanded && (
                            <>
                              <span className="text-xs text-stone-500">{done}/{ptasks.length} tasks · {Math.round(progress)}%</span>
                              <DaysLeftBadge deadline={p.deadline} status={p.status} />
                            </>
                          )}
                          {onEditProject && (
                            <button onClick={(e) => { e.stopPropagation(); const newName = prompt("Project name:", p.name); if (newName && newName.trim()) onEditProject(p.id, { name: newName.trim() }); }}
                              className="p-1.5 rounded-lg hover:bg-stone-100 text-stone-500 hover:text-[#5a7849]" title="Edit project">
                              <Edit2 className="w-4 h-4" />
                            </button>
                          )}
                          {onDeleteProject && (
                            <button onClick={(e) => { e.stopPropagation(); onDeleteProject(p.id); }}
                              className="p-1.5 rounded-lg hover:bg-red-50 text-stone-500 hover:text-red-600" title="Delete project">
                              <Trash2 className="w-4 h-4" />
                            </button>
                          )}
                          <ChevronRight className={`w-5 h-5 text-stone-400 transition-transform ${isExpanded ? "rotate-90" : ""}`} />
                        </div>
                      </div>

                      {isExpanded && (
                        <>
                          <div className="text-xs text-stone-500 mt-0.5">{p.goal}</div>

                          <div className="mt-3 grid grid-cols-[1fr,auto] gap-3 items-center">
                            <div>
                              <div className="flex items-center justify-between mb-1">
                                <span className="text-[11px] font-semibold text-stone-700">{done}/{ptasks.length} tasks complete</span>
                                <span className="text-[11px] font-bold text-[#5a7849]">{Math.round(progress)}%</span>
                              </div>
                              <div className="h-2 bg-stone-100 rounded-full overflow-hidden">
                                <div className="h-full rounded-full" style={{ width: `${progress}%`, background: "linear-gradient(90deg, #7A9E63, #5a7849)" }} />
                              </div>
                              <div className="flex items-center justify-between mt-1.5 text-[10px] text-stone-500">
                                <span>📅 Project: {formatDateShort(p.startDate)} → {formatDateShort(p.deadline)}</span>
                              </div>
                            </div>
                            <div className="flex items-center gap-2 pl-3 border-l border-stone-200">
                              <Avatar member={lead} size="sm" />
                              <DaysLeftBadge deadline={p.deadline} status={p.status} />
                            </div>
                          </div>

                          {p.milestones && p.milestones.length > 0 && (
                            <div className="mt-3 pt-3 border-t border-stone-100">
                              <div className="text-[10px] font-bold uppercase tracking-wider text-stone-500 mb-1.5 flex items-center gap-1">
                                <Milestone className="w-3 h-3" />Milestones
                              </div>
                              <MilestoneTimeline milestones={p.milestones} />
                            </div>
                          )}
                        </>
                      )}
                    </div>
                  </div>
                </div>

                {/* Tasks - only when expanded */}
                {isExpanded && (
                  <div className="bg-stone-50/70 border-t border-stone-100 px-4 py-3">
                    <div className="text-[10px] font-bold uppercase tracking-wider text-stone-500 mb-2">Tasks ({ptasks.length})</div>
                    <div className="space-y-1.5">
                      {ptasks.map(t => {
                        const a = memberById(t.currentAssigneeId);
                        const od = daysBetween(t.deadline) < 0 && t.status !== "Completed";
                        return (
                          <div key={t.id} onClick={(e) => { e.stopPropagation(); onOpenTask(t.id); }}
                            className={`grid grid-cols-[auto,1fr,auto,auto,auto,auto] gap-2 items-center px-2.5 py-2 rounded-lg cursor-pointer ${
                              od ? "bg-red-50 hover:bg-red-100 border border-red-100" : "bg-white hover:bg-stone-50 border border-stone-100"
                            }`}>
                            <span className="text-sm">{t.icon}</span>
                            <div className="min-w-0">
                              <div className="text-[12px] font-semibold text-stone-800 truncate">{t.name}</div>
                              <div className="text-[10px] text-stone-500 flex items-center gap-1.5 mt-0.5">
                                <span className="font-mono">{t.taskId}</span>
                                <span>·</span>
                                <span>Assigned {timeAgo(t.assignedAt)}</span>
                                <span>·</span>
                                <span>📅 {formatDateShort(t.deadline)}</span>
                                {t.qcRounds > 0 && <><span>·</span><span className="text-orange-600 font-semibold flex items-center gap-0.5"><RotateCcw className="w-2.5 h-2.5" />{t.qcRounds} QC</span></>}
                              </div>
                            </div>
                            <Avatar member={a} size="xs" />
                            <StatusChip status={t.status} />
                            <DaysLeftBadge deadline={t.deadline} status={t.status} />
                            <div className="flex items-center gap-0.5">
                              {onEditTask && (
                                <button onClick={(e) => { e.stopPropagation(); const newName = prompt("Task name:", t.name); if (newName && newName.trim()) onEditTask(t.id, { name: newName.trim() }); }}
                                  className="p-1 rounded hover:bg-stone-200 text-stone-500 hover:text-[#5a7849]" title="Edit">
                                  <Edit2 className="w-3.5 h-3.5" />
                                </button>
                              )}
                              {onDeleteTask && (
                                <button onClick={(e) => { e.stopPropagation(); onDeleteTask(t.id); }}
                                  className="p-1 rounded hover:bg-red-100 text-stone-500 hover:text-red-600" title="Delete">
                                  <Trash2 className="w-3.5 h-3.5" />
                                </button>
                              )}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Right rail */}
        <div className="space-y-4">
          <div className="bg-white rounded-xl border border-stone-200 overflow-hidden">
            <div className="px-4 py-3 border-b border-stone-100 bg-stone-50">
              <h3 className="font-bold text-stone-900 text-sm flex items-center gap-1.5">
                <Activity className="w-4 h-4 text-[#5a7849]" />Live Activity
              </h3>
            </div>
            <div className="max-h-[420px] overflow-y-auto divide-y divide-stone-50">
              {recent.map((e, i) => (
                <div key={i} onClick={() => onOpenTask(e.task.id)} className="px-4 py-3 hover:bg-stone-50 cursor-pointer">
                  <div className="flex items-start gap-2.5">
                    <Avatar member={e.member} size="xs" />
                    <div className="flex-1 min-w-0">
                      <div className="text-xs">
                        <span className="font-semibold text-stone-900">{e.member?.nameBn}</span>
                        <span className={`ml-1 ${e.stage.includes("Returned") ? "text-orange-600 font-semibold" : e.stage.includes("Approved") ? "text-emerald-600 font-semibold" : "text-stone-600"}`}>
                          {e.stage.toLowerCase()}
                        </span>
                      </div>
                      <div className="text-[11px] text-stone-500 mt-0.5 truncate">{e.task.icon} {e.task.name}</div>
                      {e.note && <div className="text-[11px] text-stone-700 mt-1 italic line-clamp-2">"{e.note}"</div>}
                      <div className="text-[10px] text-stone-400 mt-1">{timeAgo(e.at)}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-xl border border-stone-200 p-4">
            <h3 className="font-bold text-stone-900 text-sm mb-3 flex items-center gap-1.5">
              <Users className="w-4 h-4 text-[#5a7849]" />Team Workload
            </h3>
            <div className="space-y-2">
              {workload.slice(0, 6).map(m => {
                const max = Math.max(...workload.map(x => x.activeTasks), 1);
                const pct = (m.activeTasks / max) * 100;
                return (
                  <div key={m.id} className="flex items-center gap-2">
                    <Avatar member={m} size="xs" />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between text-[11px]">
                        <span className="font-medium text-stone-700 truncate">{m.nameBn}</span>
                        <span className="text-stone-500 ml-2 shrink-0 font-mono">
                          {m.activeTasks}{m.overdueCount > 0 && <span className="text-red-600 font-bold">·{m.overdueCount}!</span>}
                        </span>
                      </div>
                      <div className="h-1 bg-stone-100 rounded-full mt-0.5 overflow-hidden">
                        <div className={`h-full rounded-full ${m.overdueCount > 0 ? "bg-red-400" : "bg-[#7A9E63]"}`} style={{ width: `${Math.max(pct, m.activeTasks ? 12 : 0)}%` }} />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// ═══════════════════════════════════════════════════════════════════════
// MEMBER DASHBOARD (compact)
// ═══════════════════════════════════════════════════════════════════════
const MemberDashboard = ({ tasks, currentUser, onOpenTask }) => {
  const myTasks = tasks.filter(t => t.currentAssigneeId === currentUser.id);
  const active = myTasks.filter(t => !["Completed","Cancelled"].includes(t.status));
  const overdue = active.filter(t => daysBetween(t.deadline) < 0);
  const returned = active.filter(t => t.status === "Returned");

  return (
    <div className="px-7 py-5 space-y-5 bg-stone-50 min-h-screen">
      <div className="relative overflow-hidden rounded-2xl p-6 text-white"
        style={{ background: "linear-gradient(135deg, #DD6B7E 0%, #a84e5e 60%, #7A9E63 130%)" }}>
        <div className="absolute -right-16 -top-16 w-64 h-64 rounded-full bg-white/10 blur-3xl" />
        <div className="relative">
          <h2 className="text-2xl font-bold mb-1">স্বাগতম, {currentUser.nameBn} ভাই 👋</h2>
          <p className="text-white/85 text-sm">
            আপনার <span className="text-white font-semibold">{active.length}</span>টা active task
            {overdue.length > 0 && <span className="text-amber-200"> · {overdue.length}টা overdue</span>}
            {returned.length > 0 && <span className="text-amber-200"> · {returned.length}টা returned</span>}
          </p>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-stone-200 overflow-hidden">
        <div className="px-5 py-4 border-b border-stone-100">
          <h3 className="font-bold text-stone-900 text-base">📋 আমার Active Tasks</h3>
        </div>
        <div className="divide-y divide-stone-100">
          {active.length > 0 ? active.map(t => (
            <div key={t.id} onClick={() => onOpenTask(t.id)}
              className={`px-5 py-4 hover:bg-stone-50/70 cursor-pointer ${daysBetween(t.deadline) < 0 ? "border-l-4 border-l-red-500" : ""}`}>
              <div className="flex items-start gap-3">
                <div className="w-11 h-11 rounded-lg bg-stone-100 flex items-center justify-center text-xl">{t.icon}</div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap mb-1">
                    <span className="text-[10px] font-mono text-stone-400">{t.taskId}</span>
                    <DeptChip dept={t.dept} />
                    <StatusChip status={t.status} />
                  </div>
                  <div className="text-sm font-bold text-stone-900">{t.name}</div>
                  <div className="text-xs text-stone-600 mt-1 line-clamp-2">{t.instructions}</div>
                  <div className="grid grid-cols-3 gap-3 mt-3 pt-3 border-t border-stone-100 text-[11px]">
                    <div>
                      <div className="text-[10px] uppercase tracking-wider text-stone-400 font-semibold">Assigned</div>
                      <div className="font-medium text-stone-700 mt-0.5">{timeAgo(t.assignedAt)}</div>
                    </div>
                    <div>
                      <div className="text-[10px] uppercase tracking-wider text-stone-400 font-semibold">Deadline</div>
                      <div className="font-medium text-stone-700 mt-0.5">{formatDate(t.deadline)}</div>
                    </div>
                    <div className="text-right space-y-1">
                      <PriorityChip priority={t.priority} />
                      <DaysLeftBadge deadline={t.deadline} status={t.status} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )) : (
            <div className="text-center py-12 text-sm">
              <CheckCircle2 className="w-12 h-12 mx-auto mb-3 text-[#7A9E63]/30" />
              <div className="font-medium text-stone-600">All caught up! 🎉</div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// ═══════════════════════════════════════════════════════════════════════
// PROJECTS PAGE — list of all projects with full details
// ═══════════════════════════════════════════════════════════════════════
const ProjectsPage = ({ projects, tasks, onOpenTask, onOpenProject, onDeleteProject, onDeleteTask, onEditProject, onEditTask }) => {
  const [filter, setFilter] = useState("all");
  const [expandedId, setExpandedId] = useState(null);
  const filtered = filter === "all" ? projects : projects.filter(p => p.dept === filter);

  return (
    <div className="px-7 py-5 space-y-4 bg-stone-50 min-h-screen">
      {/* Filter bar */}
      <div className="flex items-center gap-2 text-xs">
        <span className="text-stone-500 font-medium mr-1">Filter:</span>
        {["all", "Maa Apps", "Genesis Studio", "Management"].map(f => (
          <button key={f} onClick={() => setFilter(f)}
            style={filter === f ? { backgroundColor: "#7A9E63", color: "#ffffff" } : {}}
            className={`px-3 py-1.5 rounded-md font-medium transition-all ${
              filter === f ? "" : "bg-white border border-stone-200 text-stone-600 hover:bg-stone-100"
            }`}>
            {f === "all" ? "All Projects" : f}
          </button>
        ))}
        <span className="ml-auto text-stone-500">{filtered.length} project{filtered.length !== 1 ? "s" : ""}</span>
      </div>

      {filtered.map(p => {
        const ptasks = tasks.filter(t => t.projectId === p.id);
        const done = ptasks.filter(t => t.status === "Completed").length;
        const progress = ptasks.length ? (done / ptasks.length) * 100 : 0;
        const overdueCount = ptasks.filter(t => daysBetween(t.deadline) < 0 && t.status !== "Completed").length;
        const lead = memberById(p.leadId);
        const isExpanded = expandedId === p.id;

        return (
          <div key={p.id} className="bg-white border border-stone-200 rounded-xl overflow-hidden hover:shadow-md transition-all">
            {/* Project header - always visible, click to toggle */}
            <div onClick={() => setExpandedId(isExpanded ? null : p.id)}
              className="p-5 cursor-pointer hover:bg-stone-50/50 transition-colors">
              <div className="flex items-start gap-4">
                <div className="w-14 h-14 rounded-xl flex items-center justify-center text-3xl shrink-0"
                  style={{ backgroundColor: "#f5f1e8" }}>
                  {p.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1 flex-wrap">
                    <span className="text-[11px] font-mono text-stone-400">{p.projectId}</span>
                    <DeptChip dept={p.dept} />
                    <PriorityChip priority={p.priority} />
                    <StatusChip status={p.status} />
                    {overdueCount > 0 && (
                      <span className="inline-flex items-center gap-0.5 px-1.5 py-0.5 bg-red-100 text-red-700 rounded text-[10px] font-bold">
                        <AlertOctagon className="w-2.5 h-2.5" />{overdueCount} overdue
                      </span>
                    )}
                  </div>
                  <div className="flex items-center justify-between gap-2">
                    <h3 className="text-[17px] font-bold text-stone-900 tracking-tight flex-1 min-w-0 truncate">{p.name}</h3>
                    <div className="flex items-center gap-2 shrink-0">
                      {!isExpanded && (
                        <>
                          <span className="text-xs text-stone-500 font-medium">{done}/{ptasks.length} · {Math.round(progress)}%</span>
                          <DaysLeftBadge deadline={p.deadline} status={p.status} />
                        </>
                      )}
                      {onEditProject && (
                        <button onClick={(e) => { e.stopPropagation(); const newName = prompt("Project name:", p.name); if (newName && newName.trim()) onEditProject(p.id, { name: newName.trim() }); }}
                          className="p-1.5 rounded-lg hover:bg-stone-100 text-stone-500 hover:text-[#5a7849]" title="Edit">
                          <Edit2 className="w-4 h-4" />
                        </button>
                      )}
                      {onDeleteProject && (
                        <button onClick={(e) => { e.stopPropagation(); onDeleteProject(p.id); }}
                          className="p-1.5 rounded-lg hover:bg-red-50 text-stone-500 hover:text-red-600" title="Delete">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      )}
                      <ChevronRight className={`w-5 h-5 text-stone-400 transition-transform ${isExpanded ? "rotate-90" : ""}`} />
                    </div>
                  </div>

                  {isExpanded && (
                    <>
                      <p className="text-sm text-stone-600 mt-1">{p.goal}</p>

                      <div className="grid grid-cols-4 gap-4 mt-3 pt-3 border-t border-stone-100">
                        <div>
                          <div className="text-[10px] uppercase tracking-wider text-stone-400 font-semibold">Lead</div>
                          <div className="flex items-center gap-1.5 mt-1">
                            <Avatar member={lead} size="xs" />
                            <span className="text-xs font-medium text-stone-700">{lead?.nameBn}</span>
                          </div>
                        </div>
                        <div>
                          <div className="text-[10px] uppercase tracking-wider text-stone-400 font-semibold">Timeline</div>
                          <div className="text-xs font-medium text-stone-700 mt-1">{formatDateShort(p.startDate)} → {formatDateShort(p.deadline)}</div>
                        </div>
                        <div>
                          <div className="text-[10px] uppercase tracking-wider text-stone-400 font-semibold">Days Left</div>
                          <div className="mt-1"><DaysLeftBadge deadline={p.deadline} status={p.status} /></div>
                        </div>
                        <div>
                          <div className="text-[10px] uppercase tracking-wider text-stone-400 font-semibold">Progress</div>
                          <div className="flex items-center gap-2 mt-1">
                            <div className="flex-1 h-1.5 bg-stone-100 rounded-full overflow-hidden">
                              <div className="h-full rounded-full" style={{ width: `${progress}%`, backgroundColor: "#7A9E63" }} />
                            </div>
                            <span className="text-xs font-bold text-stone-700">{Math.round(progress)}%</span>
                          </div>
                        </div>
                      </div>

                      {p.milestones && p.milestones.length > 0 && (
                        <div className="mt-3 pt-3 border-t border-stone-100">
                          <div className="text-[10px] font-bold uppercase tracking-wider text-stone-500 mb-1.5 flex items-center gap-1">
                            <Milestone className="w-3 h-3" />Milestones ({p.milestones.length})
                          </div>
                          <MilestoneTimeline milestones={p.milestones} />
                        </div>
                      )}
                    </>
                  )}
                </div>
              </div>
            </div>

            {/* Task list - only when expanded */}
            {isExpanded && (
              <div className="bg-stone-50/70 p-3 space-y-1.5 border-t border-stone-100">
                <div className="text-[10px] font-bold uppercase tracking-wider text-stone-500 px-2 mb-1">Tasks ({ptasks.length})</div>
                {ptasks.map(t => {
                  const a = memberById(t.currentAssigneeId);
                  const od = daysBetween(t.deadline) < 0 && t.status !== "Completed";
                return (
                  <div key={t.id} onClick={() => onOpenTask(t.id)}
                    className={`grid grid-cols-[auto,1fr,auto,auto,auto,auto] gap-2 items-center px-3 py-2 rounded-lg cursor-pointer ${
                      od ? "bg-red-50 hover:bg-red-100 border border-red-100" : "bg-white hover:bg-stone-50 border border-stone-100"
                    }`}>
                    <span className="text-sm">{t.icon}</span>
                    <div className="min-w-0">
                      <div className="text-[12px] font-semibold text-stone-800 truncate">{t.name}</div>
                      <div className="text-[10px] text-stone-500 flex items-center gap-1.5 mt-0.5 flex-wrap">
                        <span className="font-mono">{t.taskId}</span>
                        <span>·</span>
                        <span>Assigned {timeAgo(t.assignedAt)}</span>
                        <span>·</span>
                        <span>📅 Due {formatDateShort(t.deadline)}</span>
                        {t.qcRounds > 0 && (
                          <><span>·</span><span className="text-orange-600 font-semibold flex items-center gap-0.5"><RotateCcw className="w-2.5 h-2.5" />{t.qcRounds}x QC</span></>
                        )}
                      </div>
                    </div>
                    <Avatar member={a} size="xs" />
                    <StatusChip status={t.status} />
                    <DaysLeftBadge deadline={t.deadline} status={t.status} />
                    <div className="flex items-center gap-0.5">
                      {onEditTask && (
                        <button onClick={(e) => { e.stopPropagation(); const newName = prompt("Task name:", t.name); if (newName && newName.trim()) onEditTask(t.id, { name: newName.trim() }); }}
                          className="p-1 rounded hover:bg-stone-200 text-stone-500 hover:text-[#5a7849]" title="Edit">
                          <Edit2 className="w-3.5 h-3.5" />
                        </button>
                      )}
                      {onDeleteTask && (
                        <button onClick={(e) => { e.stopPropagation(); onDeleteTask(t.id); }}
                          className="p-1 rounded hover:bg-red-100 text-stone-500 hover:text-red-600" title="Delete">
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
            )}
          </div>
        );
      })}

      {filtered.length === 0 && (
        <div className="bg-white border border-dashed border-stone-300 rounded-xl p-12 text-center">
          <FolderKanban className="w-12 h-12 mx-auto mb-3 text-stone-300" />
          <div className="font-medium text-stone-600">No projects in this filter</div>
        </div>
      )}
    </div>
  );
};

// ═══════════════════════════════════════════════════════════════════════
// TASKS PAGE — Kanban board view
// ═══════════════════════════════════════════════════════════════════════
const TasksPage = ({ tasks, onOpenTask, currentUser, isAdmin }) => {
  const [filter, setFilter] = useState(isAdmin ? "all" : "mine");
  const visibleTasks = filter === "mine" ? tasks.filter(t => t.currentAssigneeId === currentUser.id) : tasks;
  const cols = ["Not Started", "In Progress", "In Review", "Returned", "Blocked", "Completed"];

  return (
    <div className="px-7 py-5 bg-stone-50 min-h-screen">
      {/* Filter bar */}
      <div className="flex items-center gap-2 text-xs mb-4">
        {isAdmin && (
          <>
            <span className="text-stone-500 font-medium mr-1">View:</span>
            <button onClick={() => setFilter("all")}
              style={filter === "all" ? { backgroundColor: "#7A9E63", color: "#ffffff" } : {}}
              className={`px-3 py-1.5 rounded-md font-medium ${filter === "all" ? "" : "bg-white border border-stone-200 text-stone-600 hover:bg-stone-100"}`}>
              All Tasks
            </button>
            <button onClick={() => setFilter("mine")}
              style={filter === "mine" ? { backgroundColor: "#DD6B7E", color: "#ffffff" } : {}}
              className={`px-3 py-1.5 rounded-md font-medium ${filter === "mine" ? "" : "bg-white border border-stone-200 text-stone-600 hover:bg-stone-100"}`}>
              My Tasks
            </button>
          </>
        )}
        <span className="ml-auto text-stone-500">{visibleTasks.length} task{visibleTasks.length !== 1 ? "s" : ""} shown</span>
      </div>

      {/* Kanban board */}
      <div className="grid grid-cols-6 gap-3">
        {cols.map(status => {
          const items = visibleTasks.filter(t => t.status === status);
          const colorMap = {
            "Not Started": { bg: "#f5f5f4", text: "#57534e" },
            "In Progress": { bg: "#dbeafe", text: "#1e40af" },
            "In Review":   { bg: "#fef3c7", text: "#92400e" },
            "Returned":    { bg: "#ffedd5", text: "#9a3412" },
            "Blocked":     { bg: "#fee2e2", text: "#991b1b" },
            "Completed":   { bg: "#d1fae5", text: "#065f46" },
          };
          const c = colorMap[status];
          return (
            <div key={status} className="bg-white border border-stone-200 rounded-xl overflow-hidden">
              <div className="px-3 py-2.5 border-b border-stone-100"
                style={{ backgroundColor: c.bg, color: c.text }}>
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold uppercase tracking-wider">{status}</span>
                  <span className="text-xs font-bold opacity-70">{items.length}</span>
                </div>
              </div>
              <div className="p-2 space-y-2 min-h-[200px]">
                {items.map(t => {
                  const a = memberById(t.currentAssigneeId);
                  const od = daysBetween(t.deadline) < 0 && t.status !== "Completed";
                  return (
                    <div key={t.id} onClick={() => onOpenTask(t.id)}
                      className={`bg-white border ${od ? "border-red-200" : "border-stone-200"} hover:border-[#7A9E63] rounded-lg p-2.5 cursor-pointer hover:shadow-sm transition-all`}>
                      <div className="flex items-start gap-1.5 mb-2">
                        <span className="text-sm shrink-0">{t.icon}</span>
                        <div className="text-[11px] font-semibold text-stone-800 leading-snug">{t.name}</div>
                      </div>
                      <div className="flex items-center justify-between mb-1.5">
                        <Avatar member={a} size="xs" />
                        <PriorityChip priority={t.priority} />
                      </div>
                      <div className="flex items-center justify-between pt-1.5 border-t border-stone-100">
                        <span className="text-[10px] font-mono text-stone-400">{t.taskId}</span>
                        <DaysLeftBadge deadline={t.deadline} status={t.status} />
                      </div>
                      {t.qcRounds > 0 && (
                        <div className="mt-1.5 text-[9px] text-orange-600 font-bold flex items-center gap-0.5">
                          <RotateCcw className="w-2.5 h-2.5" />{t.qcRounds}x QC
                        </div>
                      )}
                      <div className="mt-1.5 text-[9px] text-stone-400">
                        Assigned {timeAgo(t.assignedAt)}
                      </div>
                    </div>
                  );
                })}
                {items.length === 0 && <div className="text-center text-[11px] text-stone-400 italic py-6">empty</div>}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

// ═══════════════════════════════════════════════════════════════════════
// NEW PROJECT FORM — modal with all needed fields
// ═══════════════════════════════════════════════════════════════════════
const NewProjectForm = ({ onClose, onCreate }) => {
  const [step, setStep] = useState(1);
  const [project, setProject] = useState({
    name: "", icon: "📋", goal: "",
    dept: "Maa Apps", priority: "Medium",
    leadId: "parvez",
    startDate: todayDate(),
    deadline: "",
    attachments: [],
    referenceLink: "",
  });
  const [tasksList, setTasksList] = useState([{
    tempId: "t-" + Date.now(),
    name: "", icon: "📝", instructions: "",
    assigneeId: "", priority: "Medium",
    startDate: "", deadline: "",
    attachments: [],
    referenceLink: "",
  }]);

  const updateTask = (idx, field, value) => {
    setTasksList(tasksList.map((t, i) => i === idx ? { ...t, [field]: value } : t));
  };
  const addTask = () => {
    setTasksList([...tasksList, {
      tempId: "t-" + Date.now() + Math.random(),
      name: "", icon: "📝", instructions: "",
      assigneeId: "", priority: project.priority,
      startDate: project.startDate, deadline: project.deadline,
      attachments: [], referenceLink: "",
    }]);
  };
  const removeTask = idx => setTasksList(tasksList.filter((_, i) => i !== idx));

  const canStep1 = project.name && project.goal && project.deadline;
  const canStep2 = tasksList.every(t => t.name && t.assigneeId && t.deadline);

  return (
    <div className="fixed inset-0 bg-stone-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-6" onClick={onClose}>
      <div style={{ height: "92vh" }}
        className="bg-white rounded-2xl shadow-2xl max-w-3xl w-full overflow-hidden flex flex-col" onClick={e => e.stopPropagation()}>
        {/* Header with steps */}
        <div className="px-6 py-5 border-b border-stone-200 shrink-0">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold text-stone-900">নতুন Project তৈরি করুন</h2>
            <button onClick={onClose} className="p-1.5 rounded-lg hover:bg-stone-100"><X className="w-4 h-4" /></button>
          </div>
          <div className="flex items-center gap-2">
            {[
              { n: 1, label: "Project Info" },
              { n: 2, label: "Tasks Assign" },
              { n: 3, label: "Review & Send" },
            ].map((s, i) => (
              <React.Fragment key={s.n}>
                <div className="flex items-center gap-2">
                  <div style={step >= s.n ? { backgroundColor: "#7A9E63", color: "#ffffff" } : {}}
                    className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold ${
                      step === s.n ? "ring-4 ring-[#7A9E63]/20" : ""
                    } ${step < s.n ? "bg-stone-200 text-stone-500" : ""}`}>
                    {step > s.n ? <CheckCheck className="w-3.5 h-3.5" /> : s.n}
                  </div>
                  <span className={`text-xs font-medium hidden sm:inline ${step >= s.n ? "text-[#5a7849]" : "text-stone-400"}`}>{s.label}</span>
                </div>
                {i < 2 && <div className="flex-1 h-0.5" style={{ backgroundColor: step > s.n ? "#7A9E63" : "#e7e5e4" }} />}
              </React.Fragment>
            ))}
          </div>
        </div>

        {/* Body */}
        <div style={{ minHeight: 0 }} className="flex-1 overflow-y-auto px-6 py-5">
          {step === 1 && (
            <div className="space-y-4">
              <div className="grid grid-cols-[80px,1fr] gap-3">
                <div>
                  <label className="text-[12px] font-semibold text-stone-700 block mb-1.5">Icon</label>
                  <input value={project.icon} onChange={e => setProject({...project, icon: e.target.value})} maxLength={2}
                    className="w-full px-3 py-2 border border-stone-300 rounded-lg text-center text-2xl focus:outline-none focus:ring-2 focus:ring-[#7A9E63]/30 focus:border-[#7A9E63]" />
                </div>
                <div>
                  <label className="text-[12px] font-semibold text-stone-700 block mb-1.5">Project Name <span style={{ color: "#DD6B7E" }}>*</span></label>
                  <input value={project.name} onChange={e => setProject({...project, name: e.target.value})} placeholder="e.g. PDF Translate Project"
                    className="w-full px-3 py-2 border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#7A9E63]/30 focus:border-[#7A9E63] text-sm" />
                </div>
              </div>

              <div>
                <label className="text-[12px] font-semibold text-stone-700 block mb-1.5">Goal / Objective <span style={{ color: "#DD6B7E" }}>*</span></label>
                <textarea value={project.goal} onChange={e => setProject({...project, goal: e.target.value})}
                  placeholder="e.g. ২৫টা parenting PDF বাংলায় translate করে Maa Apps এ যোগ করা" rows={3}
                  className="w-full px-3 py-2 border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#7A9E63]/30 focus:border-[#7A9E63] text-sm resize-none" />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-[12px] font-semibold text-stone-700 block mb-1.5">Department</label>
                  <select value={project.dept} onChange={e => setProject({...project, dept: e.target.value})}
                    className="w-full px-3 py-2 border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#7A9E63]/30 focus:border-[#7A9E63] text-sm bg-white">
                    <option>Maa Apps</option><option>Genesis Studio</option><option>Cross-Functional</option>
                  </select>
                </div>
                <div>
                  <label className="text-[12px] font-semibold text-stone-700 block mb-1.5">Priority</label>
                  <select value={project.priority} onChange={e => setProject({...project, priority: e.target.value})}
                    className="w-full px-3 py-2 border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#7A9E63]/30 focus:border-[#7A9E63] text-sm bg-white">
                    <option>Critical</option><option>High</option><option>Medium</option><option>Low</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="text-[12px] font-semibold text-stone-700 block mb-1.5">Project Lead</label>
                  <select value={project.leadId} onChange={e => setProject({...project, leadId: e.target.value})}
                    className="w-full px-3 py-2 border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#7A9E63]/30 focus:border-[#7A9E63] text-sm bg-white">
                    {TEAM.map(m => <option key={m.id} value={m.id}>{m.nameBn}</option>)}
                  </select>
                </div>
                <div>
                  <label className="text-[12px] font-semibold text-stone-700 block mb-1.5">Start Date</label>
                  <input type="date" value={project.startDate} onChange={e => setProject({...project, startDate: e.target.value})}
                    className="w-full px-3 py-2 border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#7A9E63]/30 focus:border-[#7A9E63] text-sm" />
                </div>
                <div>
                  <label className="text-[12px] font-semibold text-stone-700 block mb-1.5">Deadline <span style={{ color: "#DD6B7E" }}>*</span></label>
                  <input type="date" value={project.deadline} onChange={e => setProject({...project, deadline: e.target.value})}
                    className="w-full px-3 py-2 border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#7A9E63]/30 focus:border-[#7A9E63] text-sm" />
                </div>
              </div>

              {/* Project files + reference link */}
              <div className="border-t border-stone-200 pt-4 space-y-3">
                <div className="text-[12px] font-bold text-stone-700 uppercase tracking-wider flex items-center gap-1.5">
                  <Paperclip className="w-3.5 h-3.5" style={{ color: "#7A9E63" }} />
                  Project Files & References
                </div>

                <div>
                  <label className="text-[12px] font-semibold text-stone-700 block mb-1.5">Reference Link (Google Drive, Doc, etc.)</label>
                  <div className="relative">
                    <Link2 className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" />
                    <input type="url" value={project.referenceLink} onChange={e => setProject({...project, referenceLink: e.target.value})}
                      placeholder="https://drive.google.com/..."
                      className="w-full pl-9 pr-3 py-2 border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#7A9E63]/30 focus:border-[#7A9E63] text-sm" />
                  </div>
                </div>

                <div>
                  <label className="text-[12px] font-semibold text-stone-700 block mb-1.5">Upload Files (PDF, Doc, Image)</label>
                  <label className="block cursor-pointer">
                    <div className="border-2 border-dashed border-stone-300 hover:border-[#7A9E63] rounded-lg p-4 text-center transition-colors bg-stone-50 hover:bg-[#7A9E63]/5">
                      <Upload className="w-5 h-5 mx-auto text-stone-400 mb-1" />
                      <div className="text-xs font-medium text-stone-700">Click to upload files</div>
                      <div className="text-[10px] text-stone-500 mt-0.5">PDF, DOC, images, anything</div>
                    </div>
                    <input type="file" multiple className="hidden"
                      onChange={e => {
                        const newFiles = Array.from(e.target.files).map(f => ({
                          id: "f-" + Date.now() + Math.random(),
                          name: f.name, size: f.size, type: f.type,
                        }));
                        setProject({...project, attachments: [...project.attachments, ...newFiles]});
                      }} />
                  </label>
                  {project.attachments.length > 0 && (
                    <div className="space-y-1.5 mt-2">
                      {project.attachments.map(f => (
                        <div key={f.id} className="flex items-center gap-2 px-2.5 py-1.5 bg-white border border-stone-200 rounded-lg text-xs">
                          <Paperclip className="w-3.5 h-3.5 shrink-0" style={{ color: "#7A9E63" }} />
                          <span className="flex-1 truncate font-medium text-stone-700">{f.name}</span>
                          <span className="text-stone-400 text-[10px]">{(f.size / 1024).toFixed(1)} KB</span>
                          <button type="button" onClick={() => setProject({...project, attachments: project.attachments.filter(x => x.id !== f.id)})}
                            className="text-stone-400 hover:text-red-600">
                            <X className="w-3 h-3" />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-3">
              <div style={{ backgroundColor: "rgba(122,158,99,0.05)", borderColor: "rgba(122,158,99,0.2)" }}
                className="border rounded-lg p-3 flex items-start gap-2">
                <Sparkles className="w-4 h-4 mt-0.5 shrink-0" style={{ color: "#5a7849" }} />
                <div className="text-xs" style={{ color: "#3d5630" }}>
                  <strong>Project:</strong> {project.icon} {project.name} · প্রতিটা task-এর নিজস্ব assignee + deadline দিন
                </div>
              </div>

              {tasksList.map((t, idx) => {
                const a = memberById(t.assigneeId);
                return (
                  <div key={t.tempId} className="border border-stone-200 rounded-xl p-4 bg-stone-50/50">
                    <div className="flex items-center justify-between mb-3">
                      <div className="text-xs font-bold text-stone-700">Task #{idx + 1}</div>
                      {tasksList.length > 1 && (
                        <button onClick={() => removeTask(idx)} className="text-stone-400 hover:text-red-600 text-xs flex items-center gap-1">
                          <X className="w-3 h-3" /> Remove
                        </button>
                      )}
                    </div>
                    <div className="grid grid-cols-[60px,1fr] gap-2 mb-3">
                      <input value={t.icon} onChange={e => updateTask(idx, "icon", e.target.value)} maxLength={2}
                        className="w-full px-3 py-2 border border-stone-300 rounded-lg text-center text-lg" />
                      <input value={t.name} onChange={e => updateTask(idx, "name", e.target.value)} placeholder="Task name"
                        className="w-full px-3 py-2 border border-stone-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#7A9E63]/30 focus:border-[#7A9E63]" />
                    </div>
                    <div className="mb-3">
                      <label className="text-[12px] font-semibold text-stone-700 block mb-1.5">Instructions</label>
                      <textarea value={t.instructions} onChange={e => updateTask(idx, "instructions", e.target.value)}
                        placeholder="কী করতে হবে — clear instructions" rows={2}
                        className="w-full px-3 py-2 border border-stone-300 rounded-lg text-sm resize-none focus:outline-none focus:ring-2 focus:ring-[#7A9E63]/30 focus:border-[#7A9E63]" />
                    </div>
                    <div className="grid grid-cols-3 gap-2">
                      <div>
                        <label className="text-[11px] font-semibold text-stone-700 block mb-1">Assign to <span style={{ color: "#DD6B7E" }}>*</span></label>
                        <select value={t.assigneeId} onChange={e => updateTask(idx, "assigneeId", e.target.value)}
                          className="w-full px-2 py-1.5 border border-stone-300 rounded-lg text-xs bg-white focus:outline-none focus:ring-2 focus:ring-[#7A9E63]/30 focus:border-[#7A9E63]">
                          <option value="">Select member</option>
                          {TEAM.map(m => <option key={m.id} value={m.id}>{m.nameBn}</option>)}
                        </select>
                      </div>
                      <div>
                        <label className="text-[11px] font-semibold text-stone-700 block mb-1">Priority</label>
                        <select value={t.priority} onChange={e => updateTask(idx, "priority", e.target.value)}
                          className="w-full px-2 py-1.5 border border-stone-300 rounded-lg text-xs bg-white focus:outline-none focus:ring-2 focus:ring-[#7A9E63]/30 focus:border-[#7A9E63]">
                          <option>Critical</option><option>High</option><option>Medium</option><option>Low</option>
                        </select>
                      </div>
                      <div>
                        <label className="text-[11px] font-semibold text-stone-700 block mb-1">Deadline <span style={{ color: "#DD6B7E" }}>*</span></label>
                        <input type="date" value={t.deadline} onChange={e => updateTask(idx, "deadline", e.target.value)}
                          className="w-full px-2 py-1.5 border border-stone-300 rounded-lg text-xs focus:outline-none focus:ring-2 focus:ring-[#7A9E63]/30 focus:border-[#7A9E63]" />
                      </div>
                    </div>

                    {/* Task files + reference link */}
                    <div className="mt-3 pt-3 border-t border-stone-200 space-y-2">
                      <div className="text-[11px] font-bold text-stone-600 uppercase tracking-wider flex items-center gap-1.5">
                        <Paperclip className="w-3 h-3" style={{ color: "#7A9E63" }} />
                        Task Files & Reference (Optional)
                      </div>

                      <div className="relative">
                        <Link2 className="w-3.5 h-3.5 absolute left-2.5 top-1/2 -translate-y-1/2 text-stone-400" />
                        <input type="url" value={t.referenceLink} onChange={e => updateTask(idx, "referenceLink", e.target.value)}
                          placeholder="Reference link (Google Drive, Doc, etc.)"
                          className="w-full pl-8 pr-3 py-1.5 border border-stone-300 rounded-lg text-xs focus:outline-none focus:ring-2 focus:ring-[#7A9E63]/30 focus:border-[#7A9E63]" />
                      </div>

                      <label className="block cursor-pointer">
                        <div className="border border-dashed border-stone-300 hover:border-[#7A9E63] rounded-lg p-2 text-center transition-colors bg-white hover:bg-[#7A9E63]/5">
                          <div className="text-xs font-medium text-stone-600 flex items-center justify-center gap-1">
                            <Upload className="w-3 h-3" />Upload task files
                          </div>
                        </div>
                        <input type="file" multiple className="hidden"
                          onChange={e => {
                            const newFiles = Array.from(e.target.files).map(f => ({
                              id: "f-" + Date.now() + Math.random(),
                              name: f.name, size: f.size, type: f.type,
                            }));
                            updateTask(idx, "attachments", [...(t.attachments || []), ...newFiles]);
                          }} />
                      </label>

                      {t.attachments && t.attachments.length > 0 && (
                        <div className="space-y-1">
                          {t.attachments.map(f => (
                            <div key={f.id} className="flex items-center gap-2 px-2 py-1 bg-white border border-stone-200 rounded text-[11px]">
                              <Paperclip className="w-3 h-3 shrink-0" style={{ color: "#7A9E63" }} />
                              <span className="flex-1 truncate font-medium text-stone-700">{f.name}</span>
                              <span className="text-stone-400 text-[9px]">{(f.size / 1024).toFixed(1)} KB</span>
                              <button type="button" onClick={() => updateTask(idx, "attachments", t.attachments.filter(x => x.id !== f.id))}
                                className="text-stone-400 hover:text-red-600">
                                <X className="w-3 h-3" />
                              </button>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>

                    {a && (
                      <div className="mt-3 pt-3 border-t border-stone-200 flex items-center gap-2 text-xs text-stone-600">
                        <Avatar member={a} size="xs" />
                        <span>Will assign to <strong>{a.nameBn}</strong> ({a.email})</span>
                      </div>
                    )}
                  </div>
                );
              })}

              <button onClick={addTask}
                className="w-full py-3 rounded-xl border-2 border-dashed border-stone-300 hover:border-[#7A9E63] hover:bg-[#7A9E63]/5 text-stone-600 hover:text-[#5a7849] text-sm font-medium flex items-center justify-center gap-2">
                <Plus className="w-4 h-4" /> Add another task
              </button>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-4">
              <div style={{ backgroundColor: "rgba(122,158,99,0.05)", borderColor: "rgba(122,158,99,0.2)" }}
                className="border rounded-xl p-4">
                <div className="flex items-start gap-3">
                  <div className="text-3xl">{project.icon}</div>
                  <div className="flex-1">
                    <div className="font-bold text-stone-900">{project.name}</div>
                    <div className="text-xs text-stone-600 mt-1">{project.goal}</div>
                    <div className="flex flex-wrap gap-2 mt-2">
                      <DeptChip dept={project.dept} />
                      <PriorityChip priority={project.priority} />
                      <span className="text-xs text-stone-600">📅 {formatDateShort(project.startDate)} → {formatDateShort(project.deadline)}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <div className="text-xs font-bold text-stone-700 uppercase tracking-wider mb-2">{tasksList.length}টা Task তৈরি হবে:</div>
                <div className="space-y-2">
                  {tasksList.map((t, i) => {
                    const a = memberById(t.assigneeId);
                    return (
                      <div key={t.tempId} className="border border-stone-200 rounded-lg p-3 bg-white">
                        <div className="flex items-start gap-3">
                          <div className="text-lg">{t.icon}</div>
                          <div className="flex-1 min-w-0">
                            <div className="text-sm font-semibold text-stone-900">{t.name}</div>
                            {t.instructions && <div className="text-xs text-stone-500 mt-0.5">{t.instructions}</div>}
                            <div className="flex items-center gap-2 mt-2 flex-wrap">
                              {a && (
                                <div className="flex items-center gap-1.5">
                                  <Avatar member={a} size="xs" />
                                  <span className="text-xs font-medium text-stone-700">{a.nameBn}</span>
                                </div>
                              )}
                              <PriorityChip priority={t.priority} />
                              <span className="text-xs text-stone-500">📅 {formatDateShort(t.deadline)}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="bg-white border border-stone-200 rounded-xl p-4">
                <div className="text-xs font-bold text-stone-700 uppercase tracking-wider mb-2">📡 যা যা automatically হবে:</div>
                <div className="space-y-2 text-xs text-stone-600">
                  <div className="flex items-start gap-2"><CheckCheck className="w-4 h-4 shrink-0 mt-0.5" style={{ color: "#5a7849" }} /><span>Notion-এ project + {tasksList.length}টা task save হবে</span></div>
                  <div className="flex items-start gap-2"><Send className="w-4 h-4 shrink-0 mt-0.5" style={{ color: "#a84e5e" }} /><span>Slack #tasks channel-এ alert যাবে assignee mention সহ</span></div>
                  <div className="flex items-start gap-2"><Mail className="w-4 h-4 shrink-0 mt-0.5" style={{ color: "#a84e5e" }} /><span>প্রতি assignee-র Gmail-এ notification পাঠানো হবে</span></div>
                  <div className="flex items-start gap-2"><Bell className="w-4 h-4 shrink-0 mt-0.5" style={{ color: "#5a7849" }} /><span>Dashboard notification icon-এ red dot দেখাবে</span></div>
                </div>
                <div className="mt-3 text-[10px] text-stone-400 italic">⚠️ Real Slack/Gmail integration পরের session-এ — এখন শুধু dashboard-এ data add হবে</div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-stone-200 bg-stone-50 flex items-center justify-between shrink-0">
          <div className="text-xs text-stone-500">Step {step} of 3</div>
          <div className="flex gap-2">
            {step > 1 && (
              <button onClick={() => setStep(step - 1)}
                className="px-3.5 py-2 rounded-lg font-medium text-sm bg-white border border-stone-300 hover:bg-stone-50 text-stone-700">
                ← Back
              </button>
            )}
            {step < 3 && (
              <button onClick={() => setStep(step + 1)}
                disabled={(step === 1 && !canStep1) || (step === 2 && !canStep2)}
                style={{ backgroundColor: ((step === 1 && !canStep1) || (step === 2 && !canStep2)) ? "#a8a29e" : "#7A9E63", color: "#ffffff" }}
                className="px-3.5 py-2 rounded-lg font-semibold text-sm shadow-sm disabled:cursor-not-allowed">
                Next →
              </button>
            )}
            {step === 3 && (
              <button onClick={() => onCreate(project, tasksList)}
                style={{ backgroundColor: "#DD6B7E", color: "#ffffff" }}
                className="px-3.5 py-2 rounded-lg font-semibold text-sm shadow-sm flex items-center gap-1.5">
                <Send className="w-4 h-4" /> Create & Notify
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

// ═══════════════════════════════════════════════════════════════════════
// TASK MODAL with tabs
// ═══════════════════════════════════════════════════════════════════════
const TaskModal = ({ task, projects, onClose }) => {
  const [tab, setTab] = useState("details");
  if (!task) return null;
  const a = memberById(task.currentAssigneeId);
  const p = projects.find(x => x.id === task.projectId);

  return (
    <div className="fixed inset-0 bg-stone-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-6" onClick={onClose}>
      <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[92vh] overflow-hidden flex flex-col" onClick={e => e.stopPropagation()}>
        <div className="px-6 py-5 border-b border-stone-200 flex items-start gap-4">
          <div className="w-12 h-12 rounded-xl bg-stone-100 flex items-center justify-center text-2xl">{task.icon}</div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1 flex-wrap">
              <span className="text-[11px] font-mono text-stone-400">{task.taskId}</span>
              <DeptChip dept={task.dept} />
              <StatusChip status={task.status} />
              {task.qcRounds > 0 && (
                <span className="inline-flex items-center gap-0.5 px-1.5 py-0.5 bg-orange-100 text-orange-700 rounded text-[10px] font-bold">
                  <RotateCcw className="w-2.5 h-2.5" />{task.qcRounds}x QC
                </span>
              )}
            </div>
            <h2 className="text-lg font-bold text-stone-900">{task.name}</h2>
            {p && <div className="text-xs text-stone-500 mt-1 flex items-center gap-1"><FolderKanban className="w-3 h-3" />{p.name}</div>}
          </div>
          <button onClick={onClose} className="p-1.5 rounded-lg hover:bg-stone-100"><X className="w-4 h-4" /></button>
        </div>

        <div className="px-6 border-b border-stone-200 flex gap-1">
          {[
            { k: "details", l: "Details", i: FileText },
            { k: "journey", l: "Journey & Bottleneck", i: GitBranch },
          ].map(t => {
            const Icon = t.i;
            return (
              <button key={t.k} onClick={() => setTab(t.k)}
                className={`px-3 py-2.5 text-xs font-semibold inline-flex items-center gap-1.5 border-b-2 ${
                  tab === t.k ? "text-[#5a7849] border-[#7A9E63]" : "text-stone-500 border-transparent hover:text-stone-700"
                }`}>
                <Icon className="w-3.5 h-3.5" />{t.l}
              </button>
            );
          })}
        </div>

        <div className="px-6 py-5 overflow-y-auto flex-1">
          {tab === "details" && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-stone-50 rounded-lg p-3">
                  <div className="text-[10px] uppercase tracking-wider text-stone-400 font-semibold mb-1.5">Priority</div>
                  <PriorityChip priority={task.priority} />
                </div>
                <div className="bg-stone-50 rounded-lg p-3">
                  <div className="text-[10px] uppercase tracking-wider text-stone-400 font-semibold mb-1.5">Current Assignee</div>
                  {a && <div className="flex items-center gap-2"><Avatar member={a} size="sm" /><span className="text-sm font-medium">{a.nameBn}</span></div>}
                </div>
                <div className="bg-stone-50 rounded-lg p-3">
                  <div className="text-[10px] uppercase tracking-wider text-stone-400 font-semibold mb-1.5">Created</div>
                  <div className="text-sm font-medium">{formatDateTime(task.createdAt)}</div>
                </div>
                <div className="bg-stone-50 rounded-lg p-3">
                  <div className="text-[10px] uppercase tracking-wider text-stone-400 font-semibold mb-1.5">Assigned at</div>
                  <div className="text-sm font-medium">{formatDateTime(task.assignedAt)}</div>
                </div>
                <div className="bg-stone-50 rounded-lg p-3">
                  <div className="text-[10px] uppercase tracking-wider text-stone-400 font-semibold mb-1.5">Start</div>
                  <div className="text-sm font-medium">{formatDate(task.startDate)}</div>
                </div>
                <div className="bg-stone-50 rounded-lg p-3">
                  <div className="text-[10px] uppercase tracking-wider text-stone-400 font-semibold mb-1.5">Deadline</div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium">{formatDate(task.deadline)}</span>
                    <DaysLeftBadge deadline={task.deadline} status={task.status} />
                  </div>
                </div>
              </div>

              <div>
                <div className="text-[10px] uppercase tracking-wider text-stone-400 font-semibold mb-1.5">Instructions</div>
                <div className="text-sm text-stone-800 bg-amber-50 border border-amber-100 rounded-lg p-3">{task.instructions}</div>
              </div>

              {task.docLink && (
                <a href={task.docLink} target="_blank" rel="noreferrer"
                  className="inline-flex items-center gap-1 text-sm text-[#5a7849] hover:underline">
                  Open document <ExternalLink className="w-3 h-3" />
                </a>
              )}
            </div>
          )}
          {tab === "journey" && <JourneyTimeline task={task} />}
        </div>
      </div>
    </div>
  );
};

// ═══════════════════════════════════════════════════════════════════════
// MAIN APP
// ═══════════════════════════════════════════════════════════════════════
export default function ProjectController() {
  const [currentUserId, setCurrentUserId] = useState(null);
  const [page, setPage] = useState("dashboard");
  const [openTaskId, setOpenTaskId] = useState(null);
  const [showNewProject, setShowNewProject] = useState(false);
  const [projectsList, setProjectsList] = useState(PROJECTS);
  const [tasksListState, setTasksListState] = useState(TASKS);
  const [toast, setToast] = useState(null);
  const [notifications, setNotifications] = useState([
    { id: "n1", userId: "parvez", title: "TSK-4 is overdue", body: "রাকিব's task is 2 days overdue", at: "2026-04-30T08:00:00", read: false },
    { id: "n2", userId: "parvez", title: "মিঠুন submitted final script", body: "Approved by নাইম", at: "2026-04-28T15:30:00", read: false },
    { id: "n3", userId: "rakib", title: "নতুন task assigned", body: "Daily Tips Article Review", at: "2026-04-22T09:00:00", read: false },
  ]);

  const currentUser = memberById(currentUserId);
  const isAdmin = currentUser?.isAdmin || false;
  const myNotifs = notifications.filter(n => n.userId === currentUserId);

  const deleteProject = (projectId) => {
    const proj = projectsList.find(p => p.id === projectId);
    if (!proj) return;
    if (!window.confirm(`"${proj.name}" project এবং এর সব task delete করবেন?`)) return;
    setProjectsList(projectsList.filter(p => p.id !== projectId));
    setTasksListState(tasksListState.filter(t => t.projectId !== projectId));
    setToast({ title: "🗑️ Project deleted", body: `"${proj.name}" এবং এর সব task মুছে ফেলা হয়েছে।` });
  };

  const deleteTask = (taskId) => {
    const task = tasksListState.find(t => t.id === taskId);
    if (!task) return;
    if (!window.confirm(`"${task.name}" task delete করবেন?`)) return;
    setTasksListState(tasksListState.filter(t => t.id !== taskId));
    setToast({ title: "🗑️ Task deleted", body: `"${task.name}" মুছে ফেলা হয়েছে।` });
  };

  const editProject = (projectId, updates) => {
    setProjectsList(projectsList.map(p => p.id === projectId ? { ...p, ...updates } : p));
  };

  const editTask = (taskId, updates) => {
    setTasksListState(tasksListState.map(t => t.id === taskId ? { ...t, ...updates } : t));
  };

  useEffect(() => {
    if (toast) {
      const t = setTimeout(() => setToast(null), 5000);
      return () => clearTimeout(t);
    }
  }, [toast]);

  if (!currentUser) {
    return <LoginPage onLogin={(id) => {
      setCurrentUserId(id);
      const u = memberById(id);
      setPage(u.isAdmin ? "dashboard" : "my-dashboard");
    }} />;
  }

  const badges = {
    activeProjects: projectsList.filter(p => p.status === "In Progress").length,
    activeTasks: tasksListState.filter(t => !["Completed","Cancelled"].includes(t.status)).length,
    myActiveTasks: tasksListState.filter(t => t.currentAssigneeId === currentUserId && !["Completed","Cancelled"].includes(t.status)).length,
    qcPending: tasksListState.filter(t => t.status === "In Review").length,
  };

  let pageContent;
  let pageTitle = { title: "Dashboard", subtitle: "" };

  if (isAdmin) {
    if (page === "dashboard") {
      pageTitle = { title: "Admin Dashboard", subtitle: "Full team & project overview" };
      pageContent = <AdminDashboard projects={projectsList} tasks={tasksListState} currentUser={currentUser}
        onOpenTask={setOpenTaskId} onOpenProject={() => {}} onNewProject={() => setShowNewProject(true)}
        onDeleteProject={deleteProject} onDeleteTask={deleteTask} onEditProject={editProject} onEditTask={editTask} />;
    } else if (page === "projects") {
      pageTitle = { title: "Projects", subtitle: `${projectsList.length} project · ${tasksListState.filter(t => !["Completed","Cancelled"].includes(t.status)).length} active task` };
      pageContent = <ProjectsPage projects={projectsList} tasks={tasksListState} onOpenTask={setOpenTaskId} onOpenProject={() => {}}
        onDeleteProject={deleteProject} onDeleteTask={deleteTask} onEditProject={editProject} onEditTask={editTask} />;
    } else if (page === "tasks") {
      pageTitle = { title: "All Tasks", subtitle: `${tasksListState.length} total tasks · Kanban view` };
      pageContent = <TasksPage tasks={tasksListState} onOpenTask={setOpenTaskId} currentUser={currentUser} isAdmin={true} />;
    } else {
      pageTitle = { title: page, subtitle: "এই module পরের session-এ আসছে" };
      pageContent = <div className="p-12 text-center bg-stone-50 min-h-screen">
        <div className="text-6xl mb-4">🚧</div>
        <div className="text-stone-600 font-medium">এই page পরের session-এ আসবে</div>
        <div className="text-xs text-stone-400 mt-2">আজকের session-এ Login + Admin Dashboard complete হয়েছে</div>
      </div>;
    }
  } else {
    if (page === "my-dashboard") {
      pageTitle = { title: "My Dashboard", subtitle: currentUser.role };
      pageContent = <MemberDashboard tasks={tasksListState} currentUser={currentUser} onOpenTask={setOpenTaskId} />;
    } else if (page === "my-tasks") {
      pageTitle = { title: "My Tasks", subtitle: "আপনার assigned কাজগুলো" };
      pageContent = <TasksPage tasks={tasksListState} onOpenTask={setOpenTaskId} currentUser={currentUser} isAdmin={false} />;
    } else {
      pageTitle = { title: page };
      pageContent = <div className="p-12 text-center bg-stone-50 min-h-screen">
        <div className="text-6xl mb-4">🚧</div>
        <div className="text-stone-600 font-medium">পরের session-এ আসছে</div>
      </div>;
    }
  }

  const openTask = openTaskId ? tasksListState.find(t => t.id === openTaskId) : null;

  return (
    <div className="flex bg-stone-50 min-h-screen text-stone-900" style={{ fontFamily: "'Inter', system-ui, sans-serif" }}>
      <Sidebar current={page} onNav={setPage} currentUser={currentUser}
        onLogout={() => { setCurrentUserId(null); setPage("dashboard"); }}
        isAdmin={isAdmin} badges={badges} />
      <main className="flex-1 min-w-0">
        <Topbar {...pageTitle} onNewProject={isAdmin ? () => setShowNewProject(true) : null}
          isAdmin={isAdmin} notifications={myNotifs}
          onMarkRead={() => setNotifications(notifications.map(n => n.userId === currentUserId ? { ...n, read: true } : n))} />
        {pageContent}
      </main>
      {openTask && <TaskModal task={openTask} projects={projectsList} onClose={() => setOpenTaskId(null)} />}
      {showNewProject && <NewProjectForm onClose={() => setShowNewProject(false)} onCreate={(proj, taskList) => {
        const projNum = projectsList.length + 1;
        const newProjId = "prj-" + projNum;
        const newProject = {
          ...proj, id: newProjId, projectId: "PRJ-" + projNum,
          status: "In Progress", createdAt: todayISO(),
          milestones: [],
        };
        const baseTaskNum = tasksListState.length;
        const newTasks = taskList.map((t, i) => ({
          id: "tsk-" + (baseTaskNum + i + 1),
          taskId: "TSK-" + (baseTaskNum + i + 1),
          name: t.name, icon: t.icon,
          status: "Not Started", priority: t.priority,
          dept: proj.dept, projectId: newProjId,
          currentAssigneeId: t.assigneeId,
          createdAt: todayISO(), assignedAt: todayISO(),
          startDate: t.startDate || proj.startDate,
          deadline: t.deadline,
          docLink: t.referenceLink || "", docStatus: t.referenceLink ? "Draft" : "No Doc",
          instructions: t.instructions,
          attachments: t.attachments || [],
          qcRounds: 0,
          journey: [{
            stage: "Assigned", actorId: currentUserId,
            at: todayISO(),
            note: `Task created and assigned to ${memberById(t.assigneeId)?.nameBn}`,
          }],
          updates: [],
        }));
        setProjectsList([newProject, ...projectsList]);
        setTasksListState([...newTasks, ...tasksListState]);
        // Add notifications for each assignee
        const newNotifs = taskList.map((t, i) => ({
          id: "n-" + Date.now() + "-" + i,
          userId: t.assigneeId,
          title: `নতুন task assigned: ${t.name}`,
          body: `পারভেজ ভাই আপনাকে এই task দিয়েছেন। Deadline: ${formatDate(t.deadline)}`,
          at: todayISO(), read: false,
        }));
        setNotifications([...newNotifs, ...notifications]);
        setShowNewProject(false);
        const assigneeNames = [...new Set(taskList.map(t => memberById(t.assigneeId)?.nameBn))].join(", ");
        setToast({
          title: "✅ Project তৈরি হয়েছে!",
          body: `"${proj.name}" — ${taskList.length}টা task assigned to ${assigneeNames}`,
        });
      }} />}
      {toast && (
        <div className="fixed bottom-6 right-6 z-50 bg-white border-2 rounded-xl shadow-2xl p-4 max-w-sm"
          style={{ borderColor: "#7A9E63" }}>
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0"
              style={{ backgroundColor: "#7A9E63", color: "#ffffff" }}>
              <CheckCheck className="w-4 h-4" />
            </div>
            <div className="flex-1">
              <div className="font-semibold text-stone-900 text-sm">{toast.title}</div>
              <div className="text-xs text-stone-600 mt-0.5">{toast.body}</div>
            </div>
            <button onClick={() => setToast(null)} className="text-stone-400 hover:text-stone-700"><X className="w-4 h-4" /></button>
          </div>
        </div>
      )}
    </div>
  );
}
