import { useState, useEffect, useRef, useMemo } from "react";

/* ─── IKONER (inbyggda SVG, inga externa bibliotek) ───────────────────────── */
const Svg = ({ size = 24, color = "currentColor", fill = "none", style, children }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill={fill}
    stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
    style={style} aria-hidden="true">{children}</svg>
);
const Plus = (p) => (<Svg {...p}><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></Svg>);
const Minus = (p) => (<Svg {...p}><line x1="5" y1="12" x2="19" y2="12"/></Svg>);
const X = (p) => (<Svg {...p}><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></Svg>);
const Search = (p) => (<Svg {...p}><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></Svg>);
const Settings = (p) => (
  <Svg {...p}>
    <line x1="4" y1="21" x2="4" y2="14"/><line x1="4" y1="10" x2="4" y2="3"/>
    <line x1="12" y1="21" x2="12" y2="12"/><line x1="12" y1="8" x2="12" y2="3"/>
    <line x1="20" y1="21" x2="20" y2="16"/><line x1="20" y1="12" x2="20" y2="3"/>
    <line x1="1" y1="14" x2="7" y2="14"/><line x1="9" y1="8" x2="15" y2="8"/><line x1="17" y1="16" x2="23" y2="16"/>
  </Svg>
);
const Mail = (p) => (<Svg {...p}><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-10 6L2 7"/></Svg>);
const Check = (p) => (<Svg {...p}><circle cx="12" cy="12" r="10"/><path d="m9 12 2 2 4-4"/></Svg>);
const Alert = (p) => (<Svg {...p}><path d="M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></Svg>);
const Info = (p) => (<Svg {...p}><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></Svg>);
const HomeIcon = (p) => (<Svg {...p}><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></Svg>);
const ListIcon = (p) => (<Svg {...p}><line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/><line x1="8" y1="18" x2="21" y2="18"/><line x1="3" y1="6" x2="3.01" y2="6"/><line x1="3" y1="12" x2="3.01" y2="12"/><line x1="3" y1="18" x2="3.01" y2="18"/></Svg>);
const Cart = (p) => (<Svg {...p}><circle cx="8" cy="21" r="1"/><circle cx="19" cy="21" r="1"/><path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"/></Svg>);
const Chart = (p) => (<Svg {...p}><path d="M3 3v18h18"/><path d="M18 17V9"/><path d="M13 17V5"/><path d="M8 17v-3"/></Svg>);
const Star = (p) => (<Svg {...p}><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></Svg>);
const Pencil = (p) => (<Svg {...p}><path d="M12 20h9"/><path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z"/></Svg>);
const Trash = (p) => (<Svg {...p}><path d="M3 6h18"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6"/><path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/><line x1="10" y1="11" x2="10" y2="17"/><line x1="14" y1="11" x2="14" y2="17"/></Svg>);
const Chevron = (p) => (<Svg {...p}><polyline points="9 18 15 12 9 6"/></Svg>);
const Clock = (p) => (<Svg {...p}><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></Svg>);
const Trend = (p) => (<Svg {...p}><polyline points="22 7 13.5 15.5 8.5 10.5 2 17"/><polyline points="16 7 22 7 22 13"/></Svg>);
const PlusCircle = (p) => (<Svg {...p}><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="16"/><line x1="8" y1="12" x2="16" y2="12"/></Svg>);
const Clipboard = (p) => (<Svg {...p}><rect x="8" y="2" width="8" height="4" rx="1"/><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/><path d="M9 12h6"/><path d="M9 16h6"/></Svg>);
// Kategoriikoner
const Wine = (p) => (<Svg {...p}><path d="M8 22h8"/><path d="M7 10h10"/><path d="M12 15v7"/><path d="M12 15a5 5 0 0 0 5-5c0-2-.5-4-1-6H8c-.5 2-1 4-1 6a5 5 0 0 0 5 5Z"/></Svg>);
const Beer = (p) => (<Svg {...p}><path d="M17 11h1a3 3 0 0 1 0 6h-1"/><path d="M9 12v6"/><path d="M13 12v6"/><path d="M5 8v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V8"/><path d="M5 8a2.5 2.5 0 0 1 0-5c.7 0 1.4.3 2 .8A3 3 0 0 1 14 4a2.5 2.5 0 0 1 3 4"/></Svg>);
const Spirit = (p) => (<Svg {...p}><path d="M8 22h8"/><path d="M12 11v11"/><path d="m19 3-7 8-7-8Z"/></Svg>);
const Soda = (p) => (<Svg {...p}><path d="M5 8h14"/><path d="M5 8l1.4 12a2 2 0 0 0 2 1.8h7.2a2 2 0 0 0 2-1.8L19 8"/><path d="M9 8V5a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v3"/><line x1="12" y1="12" x2="12" y2="18"/></Svg>);
const GlassWater = (p) => (<Svg {...p}><path d="M5 3h14l-1.4 17a2 2 0 0 1-2 1.8H8.4a2 2 0 0 1-2-1.8L5 3Z"/><path d="M6 9h12"/></Svg>);

/* ─── EMAILJS ──────────────────────────────────────────────────────────────── */
const EMAILJS_SERVICE_ID  = "service_q31khee";
const EMAILJS_TEMPLATE_ID = "template_xyqmdwf";
const EMAILJS_PUBLIC_KEY  = "68NjABWJDAaKbOLd4";

/* ─── SUPABASE ─────────────────────────────────────────────────────────────── */
const SUPABASE_URL = "https://euixplzkebiuvjulquip.supabase.co";
const SUPABASE_KEY = "sb_publishable_TtLzk6dXho-Zn5_ODPvjxw_vLueJLdb";
const TABLE = "inventory_state";
const ROW_ID = "shared";

function ensureSupabase(sbRef) {
  return new Promise((resolve) => {
    if (sbRef.current) return resolve();
    const make = () => { try { sbRef.current = window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY); } catch {} resolve(); };
    if (window.supabase && window.supabase.createClient) return make();
    const s = document.createElement("script");
    s.src = "https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2";
    s.async = true; s.onload = make; s.onerror = () => resolve();
    document.body.appendChild(s);
  });
}
async function loadState(sbRef) {
  if (sbRef.current) {
    const { data, error } = await sbRef.current.from(TABLE).select("data").eq("id", ROW_ID).maybeSingle();
    if (!error && data) return data.data;
    return null;
  }
  if (typeof window !== "undefined" && window.storage) {
    const r = await window.storage.get("resto-drinks-v1", true);
    return r ? JSON.parse(r.value) : null;
  }
  return null;
}
async function saveState(sbRef, state) {
  if (sbRef.current) { await sbRef.current.from(TABLE).upsert({ id: ROW_ID, data: state }); return; }
  if (typeof window !== "undefined" && window.storage) {
    await window.storage.set("resto-drinks-v1", JSON.stringify(state), true);
  }
}

/* ─── KATEGORIER & DATA ────────────────────────────────────────────────────── */
const CATEGORIES = ["Vin", "Öl", "Sprit", "Läsk", "Övriga drycker"];
const CAT_ICON = { "Vin": Wine, "Öl": Beer, "Sprit": Spirit, "Läsk": Soda, "Övriga drycker": GlassWater };
const UNITS = ["flaska", "burk", "fat", "liter", "st"];

// Mappning från gamla (mat+dryck) kategorier → nya dryckeskategorier
const CAT_MIGRATE = {
  "Bubbel":"Vin","Rosé":"Vin","Rött vin":"Vin","Vitt vin":"Vin","Vin":"Vin",
  "Öl":"Öl",
  "Vermouth & Aperitif":"Sprit","Amari & Liquori":"Sprit","Brandy & Grappa":"Sprit","Sprit":"Sprit",
  "Läsk":"Läsk","Övriga drycker":"Övriga drycker",
};
function migrateItems(items) {
  if (!Array.isArray(items)) return null;
  const out = [];
  for (const it of items) {
    const nc = CAT_MIGRATE[it.category];
    if (!nc) continue; // matvara → tas bort
    out.push({
      id: it.id || uid(), name: it.name, category: nc,
      unit: it.unit || "flaska",
      current: Number(it.current) || 0, min: Number(it.min) || 0,
      favorite: !!it.favorite,
    });
  }
  return out;
}

const DEFAULT_ITEMS = [
  // Vin
  {id:"v1",name:"Husets Röda",category:"Vin",unit:"flaska",current:12,min:6,favorite:true},
  {id:"v2",name:"Husets Vita",category:"Vin",unit:"flaska",current:11,min:6,favorite:true},
  {id:"v3",name:"Prosecco DOC Treviso",category:"Vin",unit:"flaska",current:8,min:6,favorite:false},
  {id:"v4",name:"Chianti Riserva",category:"Vin",unit:"flaska",current:5,min:4,favorite:false},
  {id:"v5",name:"Pinot Grigio",category:"Vin",unit:"flaska",current:8,min:4,favorite:false},
  // Öl
  {id:"o1",name:"Carlsberg Export",category:"Öl",unit:"flaska",current:24,min:12,favorite:true},
  {id:"o2",name:"IPA Fatöl",category:"Öl",unit:"fat",current:1,min:1,favorite:true},
  {id:"o3",name:"Stella Artois",category:"Öl",unit:"flaska",current:18,min:12,favorite:false},
  {id:"o4",name:"Brooklyn Lager",category:"Öl",unit:"burk",current:0,min:12,favorite:false},
  // Sprit
  {id:"s1",name:"Jameson Whiskey",category:"Sprit",unit:"flaska",current:3,min:2,favorite:true},
  {id:"s2",name:"Absolut Vodka",category:"Sprit",unit:"flaska",current:4,min:2,favorite:false},
  {id:"s3",name:"Tanqueray Gin",category:"Sprit",unit:"flaska",current:3,min:2,favorite:false},
  {id:"s4",name:"Bacardi Rom",category:"Sprit",unit:"flaska",current:2,min:2,favorite:false},
  {id:"s5",name:"Jägermeister",category:"Sprit",unit:"flaska",current:2,min:1,favorite:false},
  // Läsk
  {id:"l1",name:"Coca-Cola",category:"Läsk",unit:"flaska",current:30,min:18,favorite:true},
  {id:"l2",name:"Coca-Cola Zero",category:"Läsk",unit:"flaska",current:24,min:12,favorite:false},
  {id:"l3",name:"Fanta",category:"Läsk",unit:"flaska",current:16,min:12,favorite:false},
  {id:"l4",name:"Sprite",category:"Läsk",unit:"flaska",current:18,min:12,favorite:false},
  {id:"l5",name:"Tonic Water",category:"Läsk",unit:"flaska",current:24,min:12,favorite:false},
  // Övriga drycker
  {id:"d1",name:"Apelsinjuice",category:"Övriga drycker",unit:"liter",current:6,min:3,favorite:false},
  {id:"d2",name:"Mineralvatten",category:"Övriga drycker",unit:"flaska",current:36,min:24,favorite:false},
  {id:"d3",name:"Energidryck",category:"Övriga drycker",unit:"burk",current:24,min:12,favorite:false},
];

/* ─── HJÄLP ────────────────────────────────────────────────────────────────── */
function uid() { return Math.random().toString(36).slice(2, 9); }
function getStatus(cur, min) {
  if (Number(cur) <= 0) return "out";
  if (Number(cur) <= Number(min)) return "low";
  return "ok";
}
const STATUS = {
  ok:  { label:"OK",       dot:"#10B981", bg:"#ECFDF5", text:"#047857", border:"#A7F3D0" },
  low: { label:"Låg nivå", dot:"#F59E0B", bg:"#FFFBEB", text:"#B45309", border:"#FDE68A" },
  out: { label:"Slut",     dot:"#EF4444", bg:"#FEF2F2", text:"#B91C1C", border:"#FECACA" },
};
function relTime(t) {
  const s = Math.floor((Date.now() - t) / 1000);
  if (s < 60) return "nyss";
  const m = Math.floor(s / 60); if (m < 60) return `${m} min sedan`;
  const h = Math.floor(m / 60); if (h < 24) return `${h} tim sedan`;
  const d = Math.floor(h / 24); if (d === 1) return "igår";
  if (d < 7) return `${d} dgr sedan`;
  return new Date(t).toLocaleDateString("sv-SE");
}

/* ─── GEMENSAMMA STILAR ────────────────────────────────────────────────────── */
const inputStyle = {
  width:"100%", boxSizing:"border-box", height:"46px", borderRadius:"10px",
  border:"1.5px solid #CBD5E1", padding:"0 12px", fontSize:"15px",
  color:"#0F172A", background:"#F8FAFC", fontFamily:"inherit", outline:"none",
};
const C = { bg:"#F1F5F9", card:"#FFFFFF", line:"#E2E8F0", ink:"#0F172A", sub:"#64748B", faint:"#94A3B8" };

/* ─── APP ──────────────────────────────────────────────────────────────────── */
export default function App() {
  const [loaded, setLoaded] = useState(false);
  const [items, setItems] = useState([]);
  const [history, setHistory] = useState([]);
  const [email, setEmail] = useState("");
  const [who, setWho] = useState("");
  const [tab, setTab] = useState("dash");           // dash | inv | order | stats
  const [catFilter, setCatFilter] = useState("Alla");
  const [search, setSearch] = useState("");
  const [modal, setModal] = useState(null);          // null | "product" | "settings" | "order"
  const [editId, setEditId] = useState(null);
  const [form, setForm] = useState({});
  const [tmpEmail, setTmpEmail] = useState("");
  const [tmpWho, setTmpWho] = useState("");
  const [copyDone, setCopyDone] = useState(false);
  const [sending, setSending] = useState(false);
  const [sendResult, setSendResult] = useState(null);
  const [sendError, setSendError] = useState("");
  const [dbWarn, setDbWarn] = useState(false);

  const sbRef = useRef(null);
  const saveRef = useRef(null);
  const itemsRef = useRef(items); useEffect(()=>{itemsRef.current=items;},[items]);
  const histRef = useRef(history); useEffect(()=>{histRef.current=history;},[history]);
  const emailRef = useRef(email); useEffect(()=>{emailRef.current=email;},[email]);
  const whoRef = useRef(who); useEffect(()=>{whoRef.current=who;},[who]);
  const editStartRef = useRef({});
  const histTimerRef = useRef(null);

  /* Starta databas + läs in (med migrering från gammal matversion) */
  useEffect(() => {
    let cancelled = false;
    (async () => {
      await ensureSupabase(sbRef);
      if (!sbRef.current && !(typeof window !== "undefined" && window.storage)) setDbWarn(true);
      let state = null;
      try { state = await loadState(sbRef); } catch { setDbWarn(true); }
      if (cancelled) return;
      let nextItems, nextHist = [], nextEmail = "", nextWho = "";
      if (state) {
        const migrated = migrateItems(state.items);
        nextItems = (migrated && migrated.length) ? migrated : DEFAULT_ITEMS;
        nextHist = Array.isArray(state.history) ? state.history : [];
        nextEmail = state.email || "";
        nextWho = state.inventoryName || "";
      } else {
        nextItems = DEFAULT_ITEMS;
      }
      setItems(nextItems); setHistory(nextHist); setEmail(nextEmail); setWho(nextWho);
      setLoaded(true);
      // Skriv tillbaka i rensat dryckesformat
      try { await saveState(sbRef, { items: nextItems, history: nextHist, email: nextEmail, inventoryName: nextWho }); } catch {}
    })();
    return () => { cancelled = true; };
  }, []);

  /* EmailJS */
  useEffect(() => {
    if (window.emailjs) { try { window.emailjs.init({ publicKey: EMAILJS_PUBLIC_KEY }); } catch {} return; }
    const s = document.createElement("script");
    s.src = "https://cdn.jsdelivr.net/npm/@emailjs/browser@4/dist/email.min.js";
    s.async = true;
    s.onload = () => { try { window.emailjs.init({ publicKey: EMAILJS_PUBLIC_KEY }); } catch {} };
    document.body.appendChild(s);
  }, []);

  const persist = (partial) => {
    if (saveRef.current) clearTimeout(saveRef.current);
    const snap = {
      items: partial.items ?? itemsRef.current,
      history: partial.history ?? histRef.current,
      email: partial.email ?? emailRef.current,
      inventoryName: partial.inventoryName ?? whoRef.current,
    };
    saveRef.current = setTimeout(() => { saveState(sbRef, snap).catch(()=>{}); }, 500);
  };

  /* Historik (buntar ihop snabba +/- till en post) */
  const noteChange = (id, before) => { if (editStartRef.current[id] === undefined) editStartRef.current[id] = before; };
  const scheduleHistory = () => {
    if (histTimerRef.current) clearTimeout(histTimerRef.current);
    histTimerRef.current = setTimeout(commitHistory, 3500);
  };
  const commitHistory = () => {
    const starts = editStartRef.current; const entries = [];
    for (const id of Object.keys(starts)) {
      const it = itemsRef.current.find(x => x.id === id); if (!it) continue;
      const from = starts[id], to = it.current;
      if (from !== to) entries.push({ t: Date.now(), id, name: it.name, category: it.category, from, to, by: (whoRef.current||"").trim() || "Okänd" });
    }
    editStartRef.current = {};
    if (!entries.length) return;
    const next = [...entries, ...histRef.current].slice(0, 400);
    setHistory(next); persist({ history: next });
  };

  /* Lageroperationer */
  const bump = (id, d) => {
    const before = itemsRef.current.find(x => x.id === id)?.current ?? 0;
    noteChange(id, before);
    setItems(prev => { const next = prev.map(it => it.id===id ? {...it, current: Math.max(0, Number(it.current)+d)} : it); persist({items:next}); return next; });
    scheduleHistory();
  };
  const setStock = (id, v) => {
    const before = itemsRef.current.find(x => x.id === id)?.current ?? 0;
    noteChange(id, before);
    const val = Math.max(0, parseInt(v)||0);
    setItems(prev => { const next = prev.map(it => it.id===id ? {...it, current: val} : it); persist({items:next}); return next; });
    scheduleHistory();
  };
  const toggleFav = (id) => setItems(prev => { const next = prev.map(it => it.id===id ? {...it, favorite: !it.favorite} : it); persist({items:next}); return next; });

  /* Produkt CRUD */
  const openAdd = () => { setForm({ name:"", category: CATEGORIES.includes(catFilter)?catFilter:"Vin", unit:"flaska", current:"", min:"" }); setEditId(null); setModal("product"); };
  const openEdit = (it) => { setForm({...it}); setEditId(it.id); setModal("product"); };
  const saveProduct = () => {
    if (!form.name?.trim()) return;
    const payload = { name: form.name.trim(), category: form.category||"Vin", unit: form.unit||"flaska", current: Number(form.current)||0, min: Number(form.min)||0, favorite: !!form.favorite };
    const next = editId ? items.map(it => it.id===editId ? {...it, ...payload} : it) : [...items, {...payload, id: uid()}];
    setItems(next); persist({items:next}); setModal(null);
  };
  const delProduct = (id) => { const next = items.filter(it => it.id!==id); setItems(next); persist({items:next}); setModal(null); };

  /* Beställning / e-post */
  const orderItems = useMemo(() => items.filter(it => getStatus(it.current,it.min)!=="ok"), [items]);
  const outItems = useMemo(() => items.filter(it => getStatus(it.current,it.min)==="out"), [items]);
  const lowItems = useMemo(() => items.filter(it => getStatus(it.current,it.min)==="low"), [items]);
  const orderSubject = "Bestallningslista – drycker";
  const orderBody = "Hej,\n\nFoljande drycker behover bestallas:\n\n" +
    orderItems.map(it => `- ${it.name} (${it.category}): ${it.current} ${it.unit}, miniminiva ${it.min}`).join("\n") +
    "\n\nVanligen bestall sa snart som mojligt.\n\n— Lagersystemet";

  const openOrder = () => { setCopyDone(false); setSendResult(null); setSendError(""); setModal("order"); };
  const sendEmail = async () => {
    if (!email) { setTmpEmail(""); setTmpWho(who); setModal("settings"); return; }
    if (!window.emailjs) { setSendResult("error"); setSendError("E-posttjänsten kunde inte laddas. Använd Kopiera lista."); return; }
    setSending(true); setSendResult(null); setSendError("");
    try {
      await window.emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, { to_email: email, subject: orderSubject, message: orderBody });
      setSendResult("ok");
    } catch (err) { setSendResult("error"); setSendError(String((err && (err.text||err.message)) || "Okänt fel")); }
    finally { setSending(false); }
  };
  const copyOrder = async () => {
    const text = (email ? `Till: ${email}\n` : "") + `Amne: ${orderSubject}\n\n${orderBody}`;
    try { await navigator.clipboard.writeText(text); setCopyDone(true); setTimeout(()=>setCopyDone(false), 2500); }
    catch { const ta=document.createElement("textarea"); ta.value=text; document.body.appendChild(ta); ta.select(); try{document.execCommand("copy"); setCopyDone(true); setTimeout(()=>setCopyDone(false),2500);}catch{} document.body.removeChild(ta); }
  };

  /* Statistik (7 dagar) */
  const stats = useMemo(() => {
    const weekAgo = Date.now() - 7*24*3600*1000;
    const recent = history.filter(h => h.t >= weekAgo);
    const consumed = {}, perCat = {}, outCount = {};
    for (const h of recent) {
      const drop = Math.max(0, h.from - h.to);
      if (drop > 0) { consumed[h.name] = (consumed[h.name]||0) + drop; perCat[h.category] = (perCat[h.category]||0) + drop; }
      if (h.to <= 0) outCount[h.name] = (outCount[h.name]||0) + 1;
    }
    const top = Object.entries(consumed).sort((a,b)=>b[1]-a[1]).slice(0,5);
    const outs = Object.entries(outCount).sort((a,b)=>b[1]-a[1]).slice(0,5);
    const cats = CATEGORIES.map(c => [c, perCat[c]||0]).filter(x=>x[1]>0).sort((a,b)=>b[1]-a[1]);
    const maxCat = cats.length ? cats[0][1] : 0;
    return { top, outs, cats, maxCat, lastAt: history[0]?.t || null };
  }, [history]);

  /* Filtrerad lista för inventering, grupperad per kategori */
  const groups = useMemo(() => {
    let list = items;
    if (catFilter === "fav") list = list.filter(i => i.favorite);
    else if (catFilter !== "Alla") list = list.filter(i => i.category === catFilter);
    if (search.trim()) { const q = search.toLowerCase(); list = list.filter(i => i.name.toLowerCase().includes(q)); }
    return CATEGORIES.map(cat => ({ cat, items: list.filter(i => i.category === cat).sort((a,b)=>a.name.localeCompare(b.name,"sv")) })).filter(g => g.items.length);
  }, [items, catFilter, search]);

  if (!loaded) return (
    <div style={{height:"100vh",display:"flex",alignItems:"center",justifyContent:"center",fontFamily:"system-ui",color:C.sub,fontSize:"15px"}}>Laddar lager…</div>
  );

  return (
    <div style={{fontFamily:"system-ui, -apple-system, sans-serif",height:"100vh",display:"flex",flexDirection:"column",background:C.bg,overflow:"hidden"}}>

      {/* HEADER */}
      <div style={{background:C.ink,flexShrink:0,padding:"0 16px"}}>
        <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",height:"54px"}}>
          <div style={{display:"flex",alignItems:"center",gap:"9px"}}>
            <Wine size={20} color="#E2E8F0" />
            <span style={{fontSize:"17px",fontWeight:"700",color:"#F8FAFC",letterSpacing:"-0.3px"}}>BarLager</span>
          </div>
          <div style={{display:"flex",alignItems:"center",gap:"8px"}}>
            <button onClick={()=>setTab("order")} aria-label="Beställningar"
              style={{position:"relative",width:"38px",height:"38px",display:"flex",alignItems:"center",justifyContent:"center",background:"#1E293B",border:"1px solid #334155",borderRadius:"9px",cursor:"pointer"}}>
              <Cart size={18} color="#CBD5E1" />
              {orderItems.length>0 && <span style={{position:"absolute",top:"-5px",right:"-5px",background:"#EF4444",color:"#fff",fontSize:"10px",fontWeight:"700",minWidth:"18px",height:"18px",borderRadius:"9px",display:"flex",alignItems:"center",justifyContent:"center",padding:"0 4px"}}>{orderItems.length}</span>}
            </button>
            <button onClick={()=>{ setTmpEmail(email); setTmpWho(who); setModal("settings"); }} aria-label="Inställningar"
              style={{width:"38px",height:"38px",display:"flex",alignItems:"center",justifyContent:"center",background:"#1E293B",border:"1px solid #334155",borderRadius:"9px",cursor:"pointer"}}>
              <Settings size={17} color="#CBD5E1" />
            </button>
          </div>
        </div>
      </div>

      {/* CONTENT */}
      <div style={{flex:1,overflowY:"auto",padding:"14px 14px 86px"}}>

        {/* ===== DASHBOARD ===== */}
        {tab === "dash" && (
          <div style={{display:"flex",flexDirection:"column",gap:"14px"}}>

            {/* Notifiering */}
            {orderItems.length > 0 ? (
              <div style={{background:"#0F172A",borderRadius:"16px",padding:"16px",color:"#fff"}}>
                <div style={{display:"flex",alignItems:"center",gap:"8px",fontSize:"15px",fontWeight:"600"}}>
                  <Alert size={18} color="#FCA5A5" />
                  {orderItems.length} produkt{orderItems.length>1?"er":""} behöver beställas
                </div>
                <div style={{fontSize:"13px",color:"#CBD5E1",marginTop:"6px",lineHeight:"1.6"}}>
                  {outItems.length>0 && <div>🔴 {outItems.map(i=>i.name).join(", ")} — slut i lager</div>}
                  {lowItems.length>0 && <div>🟡 {lowItems.slice(0,4).map(i=>i.name).join(", ")}{lowItems.length>4?` +${lowItems.length-4}`:""} — har nått miniminivån</div>}
                </div>
                <button onClick={()=>setTab("order")} style={{marginTop:"12px",width:"100%",height:"42px",background:"#fff",color:"#0F172A",border:"none",borderRadius:"10px",fontWeight:"600",fontSize:"14px",fontFamily:"inherit",cursor:"pointer"}}>Visa beställningslista</button>
              </div>
            ) : (
              <div style={{background:"#ECFDF5",border:"1px solid #A7F3D0",borderRadius:"16px",padding:"16px",display:"flex",alignItems:"center",gap:"10px"}}>
                <Check size={22} color="#059669" />
                <div style={{fontSize:"14px",color:"#047857",fontWeight:"500"}}>Allt är välfyllt — inget behöver beställas.</div>
              </div>
            )}

            {/* Statistik-kort */}
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"10px"}}>
              <Stat n={items.length} label="Produkter totalt" tone="ink" icon={<ListIcon size={16} color={C.sub} />} />
              <Stat n={orderItems.length} label="Behöver beställas" tone="dark" icon={<Cart size={16} color="#fff" />} />
              <Stat n={lowItems.length} label="Låg nivå" tone="amber" icon={<Alert size={16} color="#B45309" />} />
              <Stat n={outItems.length} label="Slut i lager" tone="red" icon={<X size={16} color="#B91C1C" />} />
            </div>

            {/* Starta inventering */}
            <button onClick={()=>{ setCatFilter("Alla"); setSearch(""); setTab("inv"); }}
              style={{width:"100%",height:"56px",background:C.ink,color:"#fff",border:"none",borderRadius:"14px",fontSize:"16px",fontWeight:"700",fontFamily:"inherit",cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",gap:"10px",boxShadow:"0 4px 14px rgba(15,23,42,0.25)"}}>
              <PlusCircle size={20} color="#fff" /> Starta inventering
            </button>

            {/* Översikt per kategori */}
            <div>
              <div style={{fontSize:"11px",textTransform:"uppercase",letterSpacing:"1.2px",color:C.faint,fontWeight:"600",margin:"4px 2px 8px"}}>Översikt per kategori</div>
              <div style={{display:"flex",flexDirection:"column",gap:"8px"}}>
                {CATEGORIES.map(cat => {
                  const ci = items.filter(i => i.category === cat);
                  const ok = ci.filter(i=>getStatus(i.current,i.min)==="ok").length;
                  const lo = ci.filter(i=>getStatus(i.current,i.min)==="low").length;
                  const ou = ci.filter(i=>getStatus(i.current,i.min)==="out").length;
                  const Icon = CAT_ICON[cat];
                  return (
                    <button key={cat} onClick={()=>{ setCatFilter(cat); setSearch(""); setTab("inv"); }}
                      style={{background:C.card,border:`1px solid ${C.line}`,borderRadius:"14px",padding:"13px 15px",cursor:"pointer",display:"flex",alignItems:"center",gap:"13px",textAlign:"left",width:"100%",fontFamily:"inherit"}}>
                      <div style={{width:"42px",height:"42px",borderRadius:"11px",background:"#F1F5F9",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>
                        <Icon size={21} color={C.sub} />
                      </div>
                      <div style={{flex:1,minWidth:0}}>
                        <div style={{fontSize:"15px",fontWeight:"600",color:C.ink}}>{cat}</div>
                        <div style={{fontSize:"12px",color:C.sub,marginTop:"1px"}}>{ci.length} produkter</div>
                      </div>
                      <div style={{display:"flex",alignItems:"center",gap:"7px",flexShrink:0}}>
                        {ou>0 && <Dot color="#EF4444" n={ou} />}
                        {lo>0 && <Dot color="#F59E0B" n={lo} />}
                        {ok>0 && <Dot color="#10B981" n={ok} />}
                        <Chevron size={16} color={C.faint} />
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* ===== INVENTERING ===== */}
        {tab === "inv" && (
          <div>
            {/* Sök + lägg till */}
            <div style={{display:"flex",gap:"8px",marginBottom:"10px"}}>
              <div style={{flex:1,position:"relative"}}>
                <span style={{position:"absolute",left:"12px",top:"50%",transform:"translateY(-50%)",pointerEvents:"none"}}><Search size={17} color={C.faint} /></span>
                <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Sök produkt…"
                  style={{...inputStyle,paddingLeft:"38px",height:"44px"}} />
              </div>
              <button onClick={openAdd} aria-label="Lägg till produkt"
                style={{width:"44px",height:"44px",flexShrink:0,background:C.ink,border:"none",borderRadius:"10px",cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center"}}>
                <Plus size={22} color="#fff" />
              </button>
            </div>

            {/* Filter-chips */}
            <div style={{display:"flex",gap:"7px",overflowX:"auto",paddingBottom:"10px",scrollbarWidth:"none"}}>
              <Chip label="Alla" active={catFilter==="Alla"} onClick={()=>setCatFilter("Alla")} />
              <Chip label="⭐ Favoriter" active={catFilter==="fav"} onClick={()=>setCatFilter("fav")} />
              {CATEGORIES.map(c => <Chip key={c} label={c} active={catFilter===c} onClick={()=>setCatFilter(c)} />)}
            </div>

            {groups.length === 0 && (
              <div style={{textAlign:"center",padding:"48px 0",color:C.faint,fontSize:"15px"}}>
                {search ? `Hittade inget för "${search}"` : "Inga produkter här ännu."}
              </div>
            )}

            {groups.map(g => (
              <div key={g.cat} style={{marginBottom:"14px"}}>
                <div style={{display:"flex",alignItems:"center",gap:"7px",margin:"4px 2px 8px"}}>
                  {(() => { const Icon = CAT_ICON[g.cat]; return <Icon size={15} color={C.sub} />; })()}
                  <span style={{fontSize:"12px",fontWeight:"700",color:C.sub,textTransform:"uppercase",letterSpacing:"0.6px"}}>{g.cat}</span>
                  <span style={{fontSize:"12px",color:C.faint}}>· {g.items.length}</span>
                </div>
                <div style={{display:"flex",flexDirection:"column",gap:"8px"}}>
                  {g.items.map(it => <ProductRow key={it.id} item={it} onBump={bump} onSet={setStock} onEdit={openEdit} onFav={toggleFav} />)}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* ===== BESTÄLLNINGSLISTA ===== */}
        {tab === "order" && (
          <div>
            <div style={{display:"flex",alignItems:"center",gap:"9px",margin:"2px 2px 14px"}}>
              <Cart size={22} color={C.ink} />
              <div>
                <div style={{fontSize:"18px",fontWeight:"700",color:C.ink}}>Beställningslista</div>
                <div style={{fontSize:"13px",color:C.sub}}>{orderItems.length} produkt{orderItems.length!==1?"er":""} att beställa</div>
              </div>
            </div>

            {orderItems.length === 0 ? (
              <div style={{background:"#ECFDF5",border:"1px solid #A7F3D0",borderRadius:"16px",padding:"28px",textAlign:"center"}}>
                <Check size={40} color="#059669" style={{margin:"0 auto 10px"}} />
                <div style={{fontSize:"15px",color:"#047857",fontWeight:"500"}}>Inget behöver beställas just nu.</div>
              </div>
            ) : (
              <>
                <div style={{display:"flex",gap:"8px",marginBottom:"14px"}}>
                  <button onClick={openOrder} style={{flex:1,height:"48px",background:C.ink,color:"#fff",border:"none",borderRadius:"11px",fontWeight:"600",fontSize:"15px",fontFamily:"inherit",cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",gap:"8px"}}>
                    <Mail size={17} color="#fff" /> Skicka till chef
                  </button>
                </div>
                {CATEGORIES.map(cat => {
                  const ci = orderItems.filter(i => i.category === cat);
                  if (!ci.length) return null;
                  return (
                    <div key={cat} style={{background:C.card,border:`1px solid ${C.line}`,borderRadius:"14px",overflow:"hidden",marginBottom:"10px"}}>
                      <div style={{padding:"9px 15px",background:"#F8FAFC",borderBottom:`1px solid ${C.line}`,fontSize:"11px",fontWeight:"700",color:C.sub,textTransform:"uppercase",letterSpacing:"0.6px"}}>{cat}</div>
                      {ci.map((it,i) => {
                        const s = STATUS[getStatus(it.current,it.min)];
                        return (
                          <div key={it.id} style={{padding:"12px 15px",borderBottom: i<ci.length-1?`1px solid #F1F5F9`:"none",display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                            <div>
                              <div style={{fontSize:"15px",fontWeight:"600",color:C.ink}}>{it.name}</div>
                              <div style={{fontSize:"12px",color:C.faint,marginTop:"1px"}}>Har {it.current} {it.unit} · min {it.min}</div>
                            </div>
                            <span style={{background:s.bg,color:s.text,border:`1px solid ${s.border}`,fontSize:"12px",fontWeight:"600",padding:"3px 10px",borderRadius:"20px"}}>{s.label}</span>
                          </div>
                        );
                      })}
                    </div>
                  );
                })}
              </>
            )}
          </div>
        )}

        {/* ===== STATISTIK ===== */}
        {tab === "stats" && (
          <div style={{display:"flex",flexDirection:"column",gap:"14px"}}>
            <div style={{display:"flex",alignItems:"center",gap:"9px",margin:"2px 2px 0"}}>
              <Chart size={22} color={C.ink} />
              <div style={{fontSize:"18px",fontWeight:"700",color:C.ink}}>Statistik</div>
            </div>
            <div style={{fontSize:"13px",color:C.sub,display:"flex",alignItems:"center",gap:"6px",margin:"-6px 2px 0"}}>
              <Clock size={14} color={C.faint} />
              Senaste inventering: {stats.lastAt ? relTime(stats.lastAt) : "—"}
            </div>

            {/* Mest förbrukade */}
            <Panel title="Mest förbrukade (7 dagar)" icon={<Trend size={16} color={C.sub} />}>
              {stats.top.length === 0 ? <Empty text="Ingen förbrukning registrerad ännu." /> :
                stats.top.map(([name,q],i) => (
                  <Bar key={name} label={name} value={q} max={stats.top[0][1]} suffix=" enh." rank={i+1} />
                ))}
            </Panel>

            {/* Tar ofta slut */}
            <Panel title="Tar ofta slut (7 dagar)" icon={<Alert size={16} color={C.sub} />}>
              {stats.outs.length === 0 ? <Empty text="Inga produkter har tagit slut den senaste veckan." /> :
                stats.outs.map(([name,n]) => (
                  <div key={name} style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"9px 0",borderBottom:`1px solid #F1F5F9`}}>
                    <span style={{fontSize:"14px",color:C.ink}}>{name}</span>
                    <span style={{fontSize:"13px",color:"#B91C1C",fontWeight:"600"}}>{n} ggr</span>
                  </div>
                ))}
            </Panel>

            {/* Förbrukning per kategori */}
            <Panel title="Förbrukning per kategori (7 dagar)" icon={<Chart size={16} color={C.sub} />}>
              {stats.cats.length === 0 ? <Empty text="Ingen data ännu." /> :
                stats.cats.map(([cat,q]) => <Bar key={cat} label={cat} value={q} max={stats.maxCat} suffix=" enh." />)}
            </Panel>

            {/* Historik */}
            <Panel title="Inventeringshistorik" icon={<Clock size={16} color={C.sub} />}>
              {history.length === 0 ? <Empty text="Ingen historik ännu. Gör en inventering så loggas den här." /> :
                history.slice(0,20).map((h,i) => {
                  const delta = h.to - h.from; const up = delta >= 0;
                  return (
                    <div key={i} style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"10px 0",borderBottom: i<Math.min(history.length,20)-1?`1px solid #F1F5F9`:"none"}}>
                      <div style={{minWidth:0}}>
                        <div style={{fontSize:"14px",fontWeight:"500",color:C.ink}}>{h.name}</div>
                        <div style={{fontSize:"12px",color:C.faint}}>{relTime(h.t)} · {h.by}</div>
                      </div>
                      <div style={{textAlign:"right",flexShrink:0,marginLeft:"10px"}}>
                        <span style={{fontSize:"14px",fontWeight:"700",color: up?"#047857":"#B91C1C"}}>{up?"+":""}{delta}</span>
                        <div style={{fontSize:"11px",color:C.faint}}>{h.from} → {h.to}</div>
                      </div>
                    </div>
                  );
                })}
            </Panel>
          </div>
        )}
      </div>

      {/* BOTTEN-NAV */}
      <div style={{position:"fixed",bottom:0,left:0,right:0,background:"#fff",borderTop:`1px solid ${C.line}`,display:"flex",zIndex:100,paddingBottom:"env(safe-area-inset-bottom)"}}>
        <Nav label="Översikt" icon={<HomeIcon size={21} />} active={tab==="dash"} onClick={()=>setTab("dash")} />
        <Nav label="Inventering" icon={<ListIcon size={21} />} active={tab==="inv"} onClick={()=>setTab("inv")} />
        <Nav label="Beställning" icon={<Cart size={21} />} active={tab==="order"} badge={orderItems.length} onClick={()=>setTab("order")} />
        <Nav label="Statistik" icon={<Chart size={21} />} active={tab==="stats"} onClick={()=>setTab("stats")} />
      </div>

      {/* ===== MODAL: PRODUKT ===== */}
      {modal === "product" && (
        <Modal onClose={()=>setModal(null)}>
          <Head title={editId ? "Redigera produkt" : "Ny produkt"} onClose={()=>setModal(null)} />
          <Field label="Produktnamn">
            <input value={form.name||""} onChange={e=>setForm(f=>({...f,name:e.target.value}))} placeholder="t.ex. Carlsberg Export" style={inputStyle} autoFocus />
          </Field>
          <Field label="Kategori">
            <select value={form.category||"Vin"} onChange={e=>setForm(f=>({...f,category:e.target.value}))} style={{...inputStyle,cursor:"pointer"}}>
              {CATEGORIES.map(c => <option key={c}>{c}</option>)}
            </select>
          </Field>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:"10px"}}>
            <Field label="Enhet">
              <select value={form.unit||"flaska"} onChange={e=>setForm(f=>({...f,unit:e.target.value}))} style={{...inputStyle,padding:"0 6px",cursor:"pointer"}}>
                {[...new Set([form.unit, ...UNITS].filter(Boolean))].map(u => <option key={u}>{u}</option>)}
              </select>
            </Field>
            <Field label="Saldo">
              <input type="number" min="0" value={form.current??""} placeholder="0" onChange={e=>setForm(f=>({...f,current:e.target.value}))} style={{...inputStyle,padding:"0 8px",textAlign:"center"}} />
            </Field>
            <Field label="Minimum">
              <input type="number" min="0" value={form.min??""} placeholder="0" onChange={e=>setForm(f=>({...f,min:e.target.value}))} style={{...inputStyle,padding:"0 8px",textAlign:"center"}} />
            </Field>
          </div>
          <label style={{display:"flex",alignItems:"center",gap:"9px",margin:"4px 0 8px",cursor:"pointer"}}>
            <input type="checkbox" checked={!!form.favorite} onChange={e=>setForm(f=>({...f,favorite:e.target.checked}))} style={{width:"18px",height:"18px",cursor:"pointer"}} />
            <span style={{fontSize:"14px",color:C.ink}}>Markera som favorit (inventeras ofta)</span>
          </label>
          <div style={{display:"flex",gap:"8px",marginTop:"8px"}}>
            {editId && (
              <button onClick={()=>delProduct(editId)} style={{padding:"0 16px",height:"48px",border:"1.5px solid #FCA5A5",borderRadius:"10px",background:"#FEF2F2",color:"#B91C1C",cursor:"pointer",display:"flex",alignItems:"center"}}>
                <Trash size={20} color="#B91C1C" />
              </button>
            )}
            <button onClick={saveProduct} style={{flex:1,height:"48px",border:"none",borderRadius:"10px",background:C.ink,color:"#fff",cursor:"pointer",fontFamily:"inherit",fontSize:"16px",fontWeight:"600"}}>
              {editId ? "Spara ändringar" : "Lägg till produkt"}
            </button>
          </div>
        </Modal>
      )}

      {/* ===== MODAL: INSTÄLLNINGAR ===== */}
      {modal === "settings" && (
        <Modal onClose={()=>setModal(null)}>
          <Head title="Inställningar" onClose={()=>setModal(null)} />
          <Field label="Chefens e-post (för beställningar)">
            <input type="email" value={tmpEmail} onChange={e=>setTmpEmail(e.target.value)} placeholder="chef@restaurang.se" style={inputStyle} autoFocus />
          </Field>
          <Field label="Ditt namn (visas i historiken)">
            <input value={tmpWho} onChange={e=>setTmpWho(e.target.value)} placeholder="t.ex. Anna" style={inputStyle} />
          </Field>
          {dbWarn ? (
            <div style={{padding:"10px 12px",background:"#FFFBEB",border:"1px solid #FDE68A",borderRadius:"10px",fontSize:"12px",color:"#B45309",lineHeight:"1.5",margin:"6px 0 16px",display:"flex",gap:"8px",alignItems:"flex-start"}}>
              <Alert size={14} color="#B45309" style={{flexShrink:0,marginTop:"1px"}} />
              Databasen kunde inte nås här (vanligt i förhandsvisningen). På Netlify sparas och synkas allt mellan enheter.
            </div>
          ) : (
            <div style={{padding:"10px 12px",background:"#ECFDF5",border:"1px solid #A7F3D0",borderRadius:"10px",fontSize:"12px",color:"#047857",lineHeight:"1.5",margin:"6px 0 16px",display:"flex",gap:"8px",alignItems:"flex-start"}}>
              <Info size={14} color="#059669" style={{flexShrink:0,marginTop:"1px"}} />
              Ansluten till databasen. Saldo synkas automatiskt mellan alla enheter.
            </div>
          )}
          <button onClick={()=>{ setEmail(tmpEmail); setWho(tmpWho); persist({email:tmpEmail, inventoryName:tmpWho}); setModal(null); }}
            style={{width:"100%",height:"48px",border:"none",borderRadius:"10px",background:C.ink,color:"#fff",cursor:"pointer",fontFamily:"inherit",fontSize:"16px",fontWeight:"600"}}>
            Spara
          </button>
        </Modal>
      )}

      {/* ===== MODAL: SKICKA BESTÄLLNING ===== */}
      {modal === "order" && (
        <Modal onClose={()=>setModal(null)}>
          <Head title="Skicka beställning" onClose={()=>setModal(null)} />
          {!email && (
            <div style={{padding:"10px 12px",background:"#FFFBEB",border:"1px solid #FDE68A",borderRadius:"10px",fontSize:"12px",color:"#92400E",lineHeight:"1.5",marginBottom:"14px",display:"flex",gap:"8px",alignItems:"flex-start"}}>
              <Info size={14} color="#B45309" style={{flexShrink:0,marginTop:"1px"}} />
              Ingen chef-e-post är inställd. Lägg till den under Inställningar, eller kopiera listan nedan.
            </div>
          )}
          <div style={{fontSize:"13px",color:C.sub,marginBottom:"8px"}}>{orderItems.length} produkt{orderItems.length>1?"er":""}{email?` · skickas till ${email}`:""}:</div>
          <div style={{background:"#F8FAFC",border:`1px solid ${C.line}`,borderRadius:"10px",padding:"12px 14px",maxHeight:"32vh",overflowY:"auto",marginBottom:"14px"}}>
            {CATEGORIES.map(cat => {
              const ci = orderItems.filter(i=>i.category===cat); if (!ci.length) return null;
              return (
                <div key={cat} style={{marginBottom:"10px"}}>
                  <div style={{fontSize:"11px",fontWeight:"700",color:C.faint,textTransform:"uppercase",letterSpacing:"0.6px",marginBottom:"4px"}}>{cat}</div>
                  {ci.map(it => <div key={it.id} style={{fontSize:"14px",color:"#334155",padding:"2px 0"}}>• {it.name} <span style={{color:C.faint}}>— {it.current} {it.unit}, min {it.min}</span></div>)}
                </div>
              );
            })}
          </div>
          {sendResult==="ok" && (
            <div style={{padding:"12px 14px",background:"#ECFDF5",border:"1px solid #A7F3D0",borderRadius:"10px",marginBottom:"12px",display:"flex",gap:"10px",alignItems:"center"}}>
              <Check size={20} color="#059669" /><div style={{fontSize:"14px",color:"#047857",fontWeight:"500"}}>Beställningen har skickats till {email}!</div>
            </div>
          )}
          {sendResult==="error" && (
            <div style={{padding:"12px 14px",background:"#FEF2F2",border:"1px solid #FECACA",borderRadius:"10px",marginBottom:"12px",display:"flex",gap:"10px",alignItems:"flex-start"}}>
              <Alert size={18} color="#DC2626" style={{flexShrink:0,marginTop:"1px"}} /><div style={{fontSize:"13px",color:"#991B1B",lineHeight:"1.5"}}>Kunde inte skicka automatiskt{sendError?`: ${sendError}`:""}. Använd Kopiera lista nedan.</div>
            </div>
          )}
          {sendResult!=="ok" && (
            <button onClick={sendEmail} disabled={sending} style={{width:"100%",height:"50px",border:"none",borderRadius:"10px",background: sending?"#94A3B8":C.ink,color:"#fff",cursor:sending?"default":"pointer",fontFamily:"inherit",fontSize:"16px",fontWeight:"600",display:"flex",alignItems:"center",justifyContent:"center",gap:"8px",marginBottom:"8px"}}>
              <Mail size={18} color="#fff" /> {sending ? "Skickar…" : "Skicka till chef"}
            </button>
          )}
          <button onClick={copyOrder} style={{width:"100%",height:"46px",border:`1.5px solid ${C.line}`,borderRadius:"10px",background: copyDone?"#ECFDF5":"#fff",color: copyDone?"#047857":"#334155",cursor:"pointer",fontFamily:"inherit",fontSize:"15px",fontWeight:"500",display:"flex",alignItems:"center",justifyContent:"center",gap:"8px"}}>
            {copyDone ? <Check size={17} color="#059669" /> : <Clipboard size={17} color="#334155" />} {copyDone ? "Kopierad! Klistra in i mejl/SMS" : "Kopiera lista"}
          </button>
        </Modal>
      )}
    </div>
  );
}

/* ─── DELKOMPONENTER ───────────────────────────────────────────────────────── */
function ProductRow({ item, onBump, onSet, onEdit, onFav }) {
  const s = STATUS[getStatus(item.current, item.min)];
  const [editing, setEditing] = useState(false);
  const [val, setVal] = useState(String(item.current));
  const ref = useRef(null);
  useEffect(()=>{ setVal(String(item.current)); }, [item.current]);
  const commit = () => { onSet(item.id, val); setEditing(false); };
  return (
    <div style={{background:"#fff",borderRadius:"12px",border:`1px solid ${s.border==="#A7F3D0"?C.line:s.border}`,padding:"12px 14px"}}>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:"11px"}}>
        <div style={{display:"flex",alignItems:"flex-start",gap:"9px",flex:1,minWidth:0}}>
          <button onClick={()=>onFav(item.id)} aria-label="Favorit" style={{background:"none",border:"none",cursor:"pointer",padding:"1px",flexShrink:0,marginTop:"1px"}}>
            <Star size={18} color={item.favorite ? "#F59E0B" : "#CBD5E1"} fill={item.favorite ? "#F59E0B" : "none"} />
          </button>
          <div style={{minWidth:0}}>
            <div style={{fontSize:"15px",fontWeight:"600",color:C.ink,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{item.name}</div>
            <div style={{fontSize:"12px",color:C.faint,marginTop:"1px"}}>Miniminivå {item.min} {item.unit}</div>
          </div>
        </div>
        <div style={{display:"flex",alignItems:"center",gap:"7px",flexShrink:0,marginLeft:"8px"}}>
          <span style={{background:s.bg,color:s.text,border:`1px solid ${s.border}`,fontSize:"12px",fontWeight:"600",padding:"3px 9px",borderRadius:"20px"}}>{s.label}</span>
          <button onClick={()=>onEdit(item)} aria-label="Redigera" style={{width:"32px",height:"32px",background:"#F8FAFC",border:`1px solid ${C.line}`,borderRadius:"8px",display:"flex",alignItems:"center",justifyContent:"center",cursor:"pointer"}}>
            <Pencil size={14} color={C.sub} />
          </button>
        </div>
      </div>
      <div style={{display:"flex",alignItems:"center",gap:"8px"}}>
        <StockBtn icon={<Minus size={20} color="#334155" />} onClick={()=>onBump(item.id,-1)} />
        {editing ? (
          <input ref={ref} type="number" min="0" value={val} onChange={e=>setVal(e.target.value)} onBlur={commit} onKeyDown={e=>e.key==="Enter"&&commit()}
            style={{width:"66px",height:"48px",textAlign:"center",fontSize:"19px",fontWeight:"700",borderRadius:"10px",border:"2px solid #3B82F6",background:"#EFF6FF",color:"#1D4ED8",fontFamily:"inherit",outline:"none"}} />
        ) : (
          <button onClick={()=>{ setVal(String(item.current)); setEditing(true); setTimeout(()=>ref.current?.focus(),20); }}
            style={{width:"66px",height:"48px",textAlign:"center",fontSize:"21px",fontWeight:"700",borderRadius:"10px",border:`1.5px solid ${C.line}`,background:"#F8FAFC",color:C.ink,cursor:"pointer",fontFamily:"inherit"}}>{item.current}</button>
        )}
        <StockBtn icon={<Plus size={20} color="#334155" />} onClick={()=>onBump(item.id,1)} />
        <span style={{fontSize:"13px",color:C.sub,marginLeft:"2px"}}>{item.unit}</span>
        <div style={{flex:1,height:"6px",background:"#F1F5F9",borderRadius:"3px",overflow:"hidden",marginLeft:"4px"}}>
          <div style={{height:"100%",borderRadius:"3px",background:s.dot,transition:"width .3s",width:`${Math.min(100,Math.round((item.current/Math.max(item.min*2,1))*100))}%`}} />
        </div>
      </div>
    </div>
  );
}
function StockBtn({ icon, onClick }) {
  return (
    <button onClick={onClick} style={{width:"48px",height:"48px",flexShrink:0,border:`1.5px solid ${C.line}`,borderRadius:"10px",background:"#F8FAFC",cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center"}}>{icon}</button>
  );
}
function Stat({ n, label, tone, icon }) {
  const styles = {
    ink:  { bg:"#fff", border:C.line, num:C.ink, lab:C.sub },
    dark: { bg:"#0F172A", border:"#0F172A", num:"#fff", lab:"#CBD5E1" },
    amber:{ bg:"#FFFBEB", border:"#FDE68A", num:"#B45309", lab:"#92400E" },
    red:  { bg:"#FEF2F2", border:"#FECACA", num:"#B91C1C", lab:"#991B1B" },
  }[tone] || {};
  return (
    <div style={{background:styles.bg,border:`1px solid ${styles.border}`,borderRadius:"14px",padding:"14px 15px"}}>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:"6px"}}>
        <span style={{fontSize:"12px",fontWeight:"600",color:styles.lab}}>{label}</span>{icon}
      </div>
      <div style={{fontSize:"30px",fontWeight:"800",color:styles.num,lineHeight:1}}>{n}</div>
    </div>
  );
}
function Dot({ color, n }) {
  return (
    <span style={{display:"inline-flex",alignItems:"center",gap:"4px",fontSize:"12px",fontWeight:"600",color:"#475569"}}>
      <span style={{width:"9px",height:"9px",borderRadius:"50%",background:color}} />{n}
    </span>
  );
}
function Chip({ label, active, onClick }) {
  return (
    <button onClick={onClick} style={{flexShrink:0,padding:"7px 14px",borderRadius:"20px",border:active?"none":`1px solid ${C.line}`,background:active?C.ink:"#fff",color:active?"#fff":C.sub,fontSize:"13px",fontWeight:active?"600":"500",cursor:"pointer",fontFamily:"inherit"}}>{label}</button>
  );
}
function Nav({ label, icon, active, badge, onClick }) {
  return (
    <button onClick={onClick} style={{flex:1,display:"flex",flexDirection:"column",alignItems:"center",gap:"3px",padding:"9px 0 8px",background:"none",border:"none",cursor:"pointer",color:active?C.ink:C.faint,fontFamily:"inherit",borderTop:active?`2px solid ${C.ink}`:"2px solid transparent",position:"relative"}}>
      {badge>0 && <span style={{position:"absolute",top:"5px",right:"calc(50% - 18px)",background:"#EF4444",color:"#fff",fontSize:"10px",fontWeight:"700",minWidth:"17px",height:"17px",borderRadius:"9px",display:"flex",alignItems:"center",justifyContent:"center",padding:"0 4px"}}>{badge}</span>}
      {icon}<span style={{fontSize:"10.5px",fontWeight:active?"600":"500"}}>{label}</span>
    </button>
  );
}
function Panel({ title, icon, children }) {
  return (
    <div style={{background:"#fff",border:`1px solid ${C.line}`,borderRadius:"14px",padding:"14px 16px"}}>
      <div style={{display:"flex",alignItems:"center",gap:"7px",marginBottom:"10px"}}>{icon}<span style={{fontSize:"14px",fontWeight:"700",color:C.ink}}>{title}</span></div>
      {children}
    </div>
  );
}
function Bar({ label, value, max, suffix, rank }) {
  const pct = max > 0 ? Math.round((value/max)*100) : 0;
  return (
    <div style={{marginBottom:"10px"}}>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:"4px"}}>
        <span style={{fontSize:"14px",color:C.ink,fontWeight:"500"}}>{rank?`${rank}. `:""}{label}</span>
        <span style={{fontSize:"13px",color:C.sub,fontWeight:"600"}}>{value}{suffix||""}</span>
      </div>
      <div style={{height:"8px",background:"#F1F5F9",borderRadius:"4px",overflow:"hidden"}}>
        <div style={{height:"100%",width:`${pct}%`,background:C.ink,borderRadius:"4px"}} />
      </div>
    </div>
  );
}
function Empty({ text }) { return <div style={{fontSize:"13px",color:C.faint,padding:"6px 0"}}>{text}</div>; }
function Modal({ onClose, children }) {
  return (
    <div onClick={onClose} style={{position:"fixed",inset:0,zIndex:500,display:"flex",alignItems:"center",justifyContent:"center",padding:"20px",background:"rgba(15,23,42,0.55)"}}>
      <div onClick={e=>e.stopPropagation()} style={{background:"#fff",borderRadius:"18px",width:"100%",maxWidth:"410px",maxHeight:"88vh",overflowY:"auto",padding:"22px 20px 26px",boxShadow:"0 24px 60px rgba(0,0,0,0.35)"}}>{children}</div>
    </div>
  );
}
function Head({ title, onClose }) {
  return (
    <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:"18px"}}>
      <div style={{fontSize:"18px",fontWeight:"700",color:C.ink}}>{title}</div>
      <button onClick={onClose} style={{width:"32px",height:"32px",borderRadius:"8px",background:"#F1F5F9",border:"none",cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center"}}><X size={18} color={C.sub} /></button>
    </div>
  );
}
function Field({ label, children }) {
  return (
    <div style={{marginBottom:"13px"}}>
      <div style={{fontSize:"12px",fontWeight:"600",color:C.sub,marginBottom:"6px",textTransform:"uppercase",letterSpacing:"0.5px"}}>{label}</div>
      {children}
    </div>
  );
}
