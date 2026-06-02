import { useState, useEffect, useCallback, useRef } from "react";

// ─── IKONER (inbyggda, inget externt bibliotek behövs) ──────────────────────
const Svg = ({ size = 24, color = "currentColor", style, children }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
    stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
    style={style} aria-hidden="true">{children}</svg>
);
const Settings = (p) => (
  <Svg {...p}>
    <line x1="4" y1="21" x2="4" y2="14"/><line x1="4" y1="10" x2="4" y2="3"/>
    <line x1="12" y1="21" x2="12" y2="12"/><line x1="12" y1="8" x2="12" y2="3"/>
    <line x1="20" y1="21" x2="20" y2="16"/><line x1="20" y1="12" x2="20" y2="3"/>
    <line x1="1" y1="14" x2="7" y2="14"/><line x1="9" y1="8" x2="15" y2="8"/>
    <line x1="17" y1="16" x2="23" y2="16"/>
  </Svg>
);
const Plus = (p) => (<Svg {...p}><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></Svg>);
const Minus = (p) => (<Svg {...p}><line x1="5" y1="12" x2="19" y2="12"/></Svg>);
const X = (p) => (<Svg {...p}><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></Svg>);
const Pencil = (p) => (
  <Svg {...p}><path d="M12 20h9"/><path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z"/></Svg>
);
const Trash2 = (p) => (
  <Svg {...p}>
    <path d="M3 6h18"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6"/>
    <path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>
    <line x1="10" y1="11" x2="10" y2="17"/><line x1="14" y1="11" x2="14" y2="17"/>
  </Svg>
);
const AlertTriangle = (p) => (
  <Svg {...p}>
    <path d="M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/>
    <line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/>
  </Svg>
);
const Info = (p) => (
  <Svg {...p}><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></Svg>
);
const ClipboardList = (p) => (
  <Svg {...p}>
    <rect x="8" y="2" width="8" height="4" rx="1" ry="1"/>
    <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/>
    <path d="M12 11h4"/><path d="M12 16h4"/><path d="M8 11h.01"/><path d="M8 16h.01"/>
  </Svg>
);
const Mail = (p) => (
  <Svg {...p}><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-10 6L2 7"/></Svg>
);
const CheckCircle2 = (p) => (
  <Svg {...p}><circle cx="12" cy="12" r="10"/><path d="m9 12 2 2 4-4"/></Svg>
);
const Home = (p) => (
  <Svg {...p}><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></Svg>
);
const List = (p) => (
  <Svg {...p}>
    <line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/><line x1="8" y1="18" x2="21" y2="18"/>
    <line x1="3" y1="6" x2="3.01" y2="6"/><line x1="3" y1="12" x2="3.01" y2="12"/><line x1="3" y1="18" x2="3.01" y2="18"/>
  </Svg>
);
const PlusCircle = (p) => (
  <Svg {...p}><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="16"/><line x1="8" y1="12" x2="16" y2="12"/></Svg>
);

const EMAILJS_SERVICE_ID  = "service_q31khee";
const EMAILJS_TEMPLATE_ID = "template_xyqmdwf";
const EMAILJS_PUBLIC_KEY  = "68NjABWJDAaKbOLd4";

// ─── SUPABASE (molndatabas – sparar artiklarna på riktigt) ──────────────────
// Publishable key är avsedd att ligga i app-kod. Skyddas av RLS i databasen.
const SUPABASE_URL = "https://euixplzkebiuvjulquip.supabase.co";
const SUPABASE_KEY = "sb_publishable_TtLzk6dXho-Zn5_ODPvjxw_vLueJLdb";
const TABLE = "inventory_state";   // tabellnamn i Supabase
const ROW_ID = "shared";           // hela lagret sparas som en rad

// Ladda Supabase-biblioteket via CDN och skapa klienten (inget npm-import behövs)
function ensureSupabase(sbRef) {
  return new Promise((resolve) => {
    if (sbRef.current) return resolve();
    const make = () => {
      try { sbRef.current = window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY); } catch {}
      resolve();
    };
    if (window.supabase && window.supabase.createClient) return make();
    const s = document.createElement("script");
    s.src = "https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2";
    s.async = true;
    s.onload = make;
    s.onerror = () => resolve();   // fall tillbaka tyst om CDN blockeras
    document.body.appendChild(s);
  });
}

// Läs hela lagret. Försök Supabase först, annars window.storage (för test inne i Claude).
async function loadState(sbRef) {
  if (sbRef.current) {
    const { data, error } = await sbRef.current
      .from(TABLE).select("data").eq("id", ROW_ID).maybeSingle();
    if (!error && data) return data.data;
    return null;
  }
  if (typeof window !== "undefined" && window.storage) {
    const r = await window.storage.get("resto-v4-shared", true);
    return r ? JSON.parse(r.value) : null;
  }
  return null;
}

// Spara hela lagret (samma reservlogik).
async function saveState(sbRef, state) {
  if (sbRef.current) {
    await sbRef.current.from(TABLE).upsert({ id: ROW_ID, data: state });
    return;
  }
  if (typeof window !== "undefined" && window.storage) {
    await window.storage.set("resto-v4-shared", JSON.stringify(state), true);
  }
}


const INITIAL_DATA = {
  email: "",
  categories: [
    "Fisk & Skaldjur","Kött & Chark","Fågel","Ostar & Mejeri",
    "Grönsaker","Frukt","Torrvaror","Konserver","Oljor & Såser","Dessert",
    "Bubbel","Rosé","Rött vin","Vitt vin","Vermouth & Aperitif",
    "Amari & Liquori","Brandy & Grappa"
  ],
  items: [
    {id:"f1",name:"Jätteräkor",category:"Fisk & Skaldjur",unit:"kg",current:2,min:1},
    {id:"f2",name:"Havskräftor",category:"Fisk & Skaldjur",unit:"kg",current:2,min:1},
    {id:"f3",name:"Blåmusslor",category:"Fisk & Skaldjur",unit:"kg",current:3,min:2},
    {id:"f4",name:"Vongole",category:"Fisk & Skaldjur",unit:"kg",current:2,min:1},
    {id:"f5",name:"Torskfilé",category:"Fisk & Skaldjur",unit:"kg",current:2,min:1},
    {id:"f6",name:"Lax",category:"Fisk & Skaldjur",unit:"kg",current:3,min:2},
    {id:"f7",name:"Räkor",category:"Fisk & Skaldjur",unit:"kg",current:2,min:1},
    {id:"f8",name:"Ansjovis",category:"Fisk & Skaldjur",unit:"burkar",current:4,min:2},
    {id:"f9",name:"Tonfisk",category:"Fisk & Skaldjur",unit:"burkar",current:6,min:3},
    {id:"k1",name:"Parmaskinka",category:"Kött & Chark",unit:"kg",current:1,min:1},
    {id:"k2",name:"Bresaola",category:"Kött & Chark",unit:"kg",current:1,min:1},
    {id:"k3",name:"Salami",category:"Kött & Chark",unit:"kg",current:1,min:1},
    {id:"k4",name:"Skinka",category:"Kött & Chark",unit:"kg",current:2,min:1},
    {id:"k5",name:"Oxfilé",category:"Kött & Chark",unit:"kg",current:2,min:1},
    {id:"k6",name:"Kalvkött",category:"Kött & Chark",unit:"kg",current:2,min:1},
    {id:"k7",name:"Kalvschnitzel",category:"Kött & Chark",unit:"kg",current:2,min:1},
    {id:"k8",name:"Biff",category:"Kött & Chark",unit:"kg",current:3,min:2},
    {id:"k9",name:"Fläsk",category:"Kött & Chark",unit:"kg",current:2,min:1},
    {id:"k10",name:"Parmaskinka i skivor",category:"Kött & Chark",unit:"paket",current:3,min:2},
    {id:"k11",name:"Mortadella",category:"Kött & Chark",unit:"kg",current:1,min:1},
    {id:"k12",name:"Prosciutto",category:"Kött & Chark",unit:"kg",current:1,min:1},
    {id:"fa1",name:"Kycklingfilé",category:"Fågel",unit:"kg",current:4,min:2},
    {id:"o1",name:"Mozzarella",category:"Ostar & Mejeri",unit:"st",current:6,min:4},
    {id:"o2",name:"Burrata",category:"Ostar & Mejeri",unit:"st",current:4,min:2},
    {id:"o3",name:"Ricotta",category:"Ostar & Mejeri",unit:"kg",current:1,min:1},
    {id:"o4",name:"Gorgonzola",category:"Ostar & Mejeri",unit:"kg",current:1,min:1},
    {id:"o5",name:"Pecorino",category:"Ostar & Mejeri",unit:"kg",current:1,min:1},
    {id:"o6",name:"Parmesan",category:"Ostar & Mejeri",unit:"kg",current:2,min:1},
    {id:"o7",name:"Taleggio",category:"Ostar & Mejeri",unit:"kg",current:1,min:1},
    {id:"o8",name:"Grädde",category:"Ostar & Mejeri",unit:"dl",current:10,min:5},
    {id:"o9",name:"Crème fraiche",category:"Ostar & Mejeri",unit:"dl",current:8,min:4},
    {id:"o10",name:"Äggula",category:"Ostar & Mejeri",unit:"ägg",current:12,min:6},
    {id:"o11",name:"Smör",category:"Ostar & Mejeri",unit:"kg",current:2,min:1},
    {id:"g1",name:"Tomat",category:"Grönsaker",unit:"kg",current:3,min:2},
    {id:"g2",name:"San Marzano-tomater",category:"Grönsaker",unit:"burkar",current:6,min:4},
    {id:"g3",name:"Körsbärstomater",category:"Grönsaker",unit:"kg",current:2,min:1},
    {id:"g4",name:"Zucchini",category:"Grönsaker",unit:"st",current:6,min:4},
    {id:"g5",name:"Aubergine",category:"Grönsaker",unit:"st",current:4,min:2},
    {id:"g6",name:"Champinjoner",category:"Grönsaker",unit:"kg",current:2,min:1},
    {id:"g7",name:"Lök",category:"Grönsaker",unit:"kg",current:3,min:2},
    {id:"g8",name:"Rödlök",category:"Grönsaker",unit:"kg",current:2,min:1},
    {id:"g9",name:"Vitlök",category:"Grönsaker",unit:"huvuden",current:5,min:3},
    {id:"g10",name:"Paprika",category:"Grönsaker",unit:"st",current:6,min:4},
    {id:"g11",name:"Sparris",category:"Grönsaker",unit:"kg",current:1,min:1},
    {id:"g12",name:"Kronärtskocka",category:"Grönsaker",unit:"st",current:4,min:2},
    {id:"g13",name:"Ruccola",category:"Grönsaker",unit:"påsar",current:3,min:2},
    {id:"g14",name:"Spenat",category:"Grönsaker",unit:"kg",current:1,min:1},
    {id:"g15",name:"Sallad",category:"Grönsaker",unit:"huvuden",current:4,min:2},
    {id:"g16",name:"Basilika",category:"Grönsaker",unit:"kruka",current:2,min:1},
    {id:"g17",name:"Chili",category:"Grönsaker",unit:"st",current:10,min:5},
    {id:"g18",name:"Potatis",category:"Grönsaker",unit:"kg",current:5,min:3},
    {id:"fr1",name:"Melon",category:"Frukt",unit:"st",current:2,min:1},
    {id:"fr2",name:"Citron",category:"Frukt",unit:"st",current:8,min:4},
    {id:"t1",name:"Tagliatelle",category:"Torrvaror",unit:"kg",current:3,min:2},
    {id:"t2",name:"Spaghetti",category:"Torrvaror",unit:"kg",current:3,min:2},
    {id:"t3",name:"Penne",category:"Torrvaror",unit:"kg",current:3,min:2},
    {id:"t4",name:"Cannelloni",category:"Torrvaror",unit:"paket",current:3,min:2},
    {id:"t5",name:"Fylld pasta",category:"Torrvaror",unit:"kg",current:2,min:1},
    {id:"t6",name:"Risotto-ris",category:"Torrvaror",unit:"kg",current:4,min:2},
    {id:"t7",name:"Pizza-mjöl",category:"Torrvaror",unit:"kg",current:5,min:3},
    {id:"t8",name:"Brödsmulor",category:"Torrvaror",unit:"kg",current:2,min:1},
    {id:"t9",name:"Oregano",category:"Torrvaror",unit:"påsar",current:4,min:2},
    {id:"t10",name:"Svartpeppar",category:"Torrvaror",unit:"burkar",current:3,min:1},
    {id:"t11",name:"Salt",category:"Torrvaror",unit:"kg",current:3,min:1},
    {id:"ko1",name:"Kapris",category:"Konserver",unit:"burkar",current:4,min:2},
    {id:"ko2",name:"Svarta oliver",category:"Konserver",unit:"burkar",current:3,min:2},
    {id:"ko3",name:"Oliver",category:"Konserver",unit:"burkar",current:3,min:2},
    {id:"ko4",name:"Kronärtskockor (inlagda)",category:"Konserver",unit:"burkar",current:4,min:2},
    {id:"os1",name:"Olivolja",category:"Oljor & Såser",unit:"L",current:3,min:2},
    {id:"os2",name:"Tomatsås",category:"Oljor & Såser",unit:"burkar",current:6,min:4},
    {id:"os3",name:"Marsalasås",category:"Oljor & Såser",unit:"flaskor",current:2,min:1},
    {id:"os4",name:"Bearnaisesås",category:"Oljor & Såser",unit:"burkar",current:3,min:2},
    {id:"os5",name:"Pestosås",category:"Oljor & Såser",unit:"burkar",current:4,min:2},
    {id:"os6",name:"Peperoncino",category:"Oljor & Såser",unit:"burkar",current:3,min:2},
    {id:"d1",name:"Tiramisu-komponenter",category:"Dessert",unit:"portioner",current:8,min:4},
    {id:"d2",name:"Profiteroles-komponenter",category:"Dessert",unit:"portioner",current:8,min:4},
    {id:"d3",name:"Tartufo-glass",category:"Dessert",unit:"st",current:6,min:4},
    {id:"b1",name:"Prosecco DOC Treviso",category:"Bubbel",unit:"flaskor",current:12,min:6},
    {id:"ro1",name:"Le Piere Rosè Trevenezie IGT",category:"Rosé",unit:"flaskor",current:8,min:4},
    {id:"rv0",name:"Husets röda",category:"Rött vin",unit:"flaskor",current:12,min:6},
    {id:"rv1",name:"Primitivo Terre Carsiche IGT",category:"Rött vin",unit:"flaskor",current:6,min:4},
    {id:"rv2",name:"Nero d'Avola Campanile",category:"Rött vin",unit:"flaskor",current:6,min:4},
    {id:"rv3",name:"Barbera D'Alba DOC",category:"Rött vin",unit:"flaskor",current:6,min:4},
    {id:"rv4",name:"Chianti Riserva Bacchio DOCG",category:"Rött vin",unit:"flaskor",current:6,min:4},
    {id:"rv5",name:"Morellino di Scansano DOCG",category:"Rött vin",unit:"flaskor",current:4,min:3},
    {id:"rv6",name:"Valpolicella Ripasso DOC",category:"Rött vin",unit:"flaskor",current:6,min:4},
    {id:"rv7",name:"Amarone della Valpolicella DOCG",category:"Rött vin",unit:"flaskor",current:4,min:2},
    {id:"rv8",name:"Barbaresco Sanadaive DOCG",category:"Rött vin",unit:"flaskor",current:3,min:2},
    {id:"rv9",name:"Barolo Marrone DOCG",category:"Rött vin",unit:"flaskor",current:3,min:2},
    {id:"rv10",name:"Brunello di Montalcino DOCG",category:"Rött vin",unit:"flaskor",current:3,min:2},
    {id:"vv0",name:"Husets vita",category:"Vitt vin",unit:"flaskor",current:12,min:6},
    {id:"vv1",name:"Pinot Grigio DOC GRAVE",category:"Vitt vin",unit:"flaskor",current:8,min:4},
    {id:"vv2",name:"Chardonnay DOC GRAVE",category:"Vitt vin",unit:"flaskor",current:8,min:4},
    {id:"vv3",name:"Vermentino di Sardegna DOC",category:"Vitt vin",unit:"flaskor",current:6,min:4},
    {id:"va1",name:"Martini Dry",category:"Vermouth & Aperitif",unit:"flaskor",current:2,min:1},
    {id:"va2",name:"Martini Bianco",category:"Vermouth & Aperitif",unit:"flaskor",current:2,min:1},
    {id:"va3",name:"Martini Rosso",category:"Vermouth & Aperitif",unit:"flaskor",current:2,min:1},
    {id:"va4",name:"Campari",category:"Vermouth & Aperitif",unit:"flaskor",current:2,min:1},
    {id:"va5",name:"Aperol",category:"Vermouth & Aperitif",unit:"flaskor",current:3,min:2},
    {id:"al1",name:"Amaro Averna",category:"Amari & Liquori",unit:"flaskor",current:2,min:1},
    {id:"al2",name:"Amaro Ramazzotti",category:"Amari & Liquori",unit:"flaskor",current:2,min:1},
    {id:"al3",name:"Fernet Branca",category:"Amari & Liquori",unit:"flaskor",current:2,min:1},
    {id:"al4",name:"Fernet Menta",category:"Amari & Liquori",unit:"flaskor",current:2,min:1},
    {id:"al5",name:"Jägermeister",category:"Amari & Liquori",unit:"flaskor",current:1,min:1},
    {id:"al6",name:"Strega",category:"Amari & Liquori",unit:"flaskor",current:1,min:1},
    {id:"al7",name:"Sambuca Extra",category:"Amari & Liquori",unit:"flaskor",current:2,min:1},
    {id:"al8",name:"Amaretto",category:"Amari & Liquori",unit:"flaskor",current:2,min:1},
    {id:"al9",name:"Limoncello",category:"Amari & Liquori",unit:"flaskor",current:2,min:1},
    {id:"bg1",name:"Vecchia Romagna 10 år",category:"Brandy & Grappa",unit:"flaskor",current:2,min:1},
    {id:"bg2",name:"Grappe Varie",category:"Brandy & Grappa",unit:"flaskor",current:2,min:1},
    {id:"bg3",name:"Lagrad Grappa",category:"Brandy & Grappa",unit:"flaskor",current:1,min:1},
    {id:"bg4",name:"Jameson",category:"Brandy & Grappa",unit:"flaskor",current:2,min:1},
  ]
};

function uid() { return Math.random().toString(36).slice(2,9); }
function getStatus(c, m) {
  const n=Number(c), mn=Number(m);
  if(n<=0) return "empty";
  if(n<=mn) return "low";
  if(n<mn*1.5) return "warning";
  return "ok";
}
const ST = {
  empty:   {label:"Tom",    bg:"#FEECEC",text:"#B91C1C",border:"#FCA5A5",dot:"#EF4444"},
  low:     {label:"Lågt",   bg:"#FEECEC",text:"#B91C1C",border:"#FCA5A5",dot:"#EF4444"},
  warning: {label:"Bevaka",bg:"#FEF3C7",text:"#92400E",border:"#FCD34D",dot:"#F59E0B"},
  ok:      {label:"OK",     bg:"#ECFDF5",text:"#065F46",border:"#6EE7B7",dot:"#10B981"},
};

// ─── MODAL (centered popup, not bottom sheet) ──────────────────────────────
function Modal({ onClose, children }) {
  return (
    <div style={{
      position:"fixed",inset:0,zIndex:500,
      display:"flex",alignItems:"center",justifyContent:"center",
      padding:"20px",
      background:"rgba(0,0,0,0.55)"
    }} onClick={onClose}>
      <div onClick={e=>e.stopPropagation()} style={{
        background:"#ffffff",
        borderRadius:"16px",
        width:"100%",maxWidth:"400px",
        maxHeight:"85vh",overflowY:"auto",
        padding:"24px 20px 28px",
        boxShadow:"0 20px 60px rgba(0,0,0,0.3)"
      }}>
        {children}
      </div>
    </div>
  );
}
function ModalHead({ title, onClose }) {
  return (
    <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:"20px"}}>
      <div style={{fontSize:"18px",fontWeight:"600",color:"#111827"}}>{title}</div>
      <button onClick={onClose} style={{width:"32px",height:"32px",borderRadius:"8px",
        background:"#F3F4F6",border:"none",cursor:"pointer",
        display:"flex",alignItems:"center",justifyContent:"center"}}>
        <X size={18} color="#6B7280" />
      </button>
    </div>
  );
}
function Field({ label, children }) {
  return (
    <div style={{marginBottom:"14px"}}>
      <div style={{fontSize:"12px",fontWeight:"500",color:"#6B7280",marginBottom:"6px",textTransform:"uppercase",letterSpacing:"0.5px"}}>{label}</div>
      {children}
    </div>
  );
}
const inputStyle = {
  width:"100%", boxSizing:"border-box", height:"44px",
  borderRadius:"10px", border:"1.5px solid #D1D5DB",
  padding:"0 12px", fontSize:"15px", color:"#111827",
  background:"#F9FAFB", fontFamily:"inherit",
  outline:"none"
};
const selectStyle = {...inputStyle, cursor:"pointer"};

// ─── APP ───────────────────────────────────────────────────────────────────
export default function App() {
  const [loaded, setLoaded]     = useState(false);
  const [items, setItems]       = useState([]);
  const [cats, setCats]         = useState([]);
  const [email, setEmail]       = useState("");
  const [tab, setTab]           = useState("home");   // home | stock
  const [activeCat, setActiveCat] = useState("Alla");
  const [modal, setModal]       = useState(null);     // null|"item"|"settings"
  const [editId, setEditId]     = useState(null);
  const [form, setForm]         = useState({});
  const [settingsEmail, setSettingsEmail] = useState("");
  const [newCat, setNewCat]     = useState("");
  const [alertFlash, setAlertFlash] = useState(false);
  const [copyDone, setCopyDone] = useState(false);
  const [emailReady, setEmailReady] = useState(false);   // SDK laddad?
  const [sending, setSending] = useState(false);
  const [sendResult, setSendResult] = useState(null);    // null | "ok" | "error"
  const [sendError, setSendError] = useState("");
  const [dbWarn, setDbWarn] = useState(false);   // databasen kunde inte nås
  const saveRef = useRef(null);
  const sbRef = useRef(null);

  // Starta databasen, läs in lagret (eller seed:a med startdata första gången)
  useEffect(() => {
    let cancelled = false;
    (async () => {
      await ensureSupabase(sbRef);
      if (!sbRef.current && !(typeof window !== "undefined" && window.storage)) {
        setDbWarn(true);  // varken Supabase eller Claude-lagring tillgänglig
      }
      let state = null;
      try { state = await loadState(sbRef); } catch { setDbWarn(true); }
      if (cancelled) return;
      if (state) {
        setItems(state.items ?? INITIAL_DATA.items);
        setCats(state.cats ?? INITIAL_DATA.categories);
        setEmail(state.email ?? "");
      } else {
        setItems(INITIAL_DATA.items);
        setCats(INITIAL_DATA.categories);
        // Skapa första raden så datan finns i databasen direkt
        try { await saveState(sbRef, { items: INITIAL_DATA.items, cats: INITIAL_DATA.categories, email: "" }); } catch {}
      }
      setLoaded(true);
    })();
    return () => { cancelled = true; };
  }, []);

  // Ladda EmailJS-SDK (för riktig e-postutskick)
  useEffect(() => {
    if (window.emailjs) {
      try { window.emailjs.init({ publicKey: EMAILJS_PUBLIC_KEY }); setEmailReady(true); } catch {}
      return;
    }
    const s = document.createElement("script");
    s.src = "https://cdn.jsdelivr.net/npm/@emailjs/browser@4/dist/email.min.js";
    s.async = true;
    s.onload = () => {
      try { window.emailjs.init({ publicKey: EMAILJS_PUBLIC_KEY }); setEmailReady(true); }
      catch { setEmailReady(false); }
    };
    s.onerror = () => setEmailReady(false);
    document.body.appendChild(s);
  }, []);

  const persist = useCallback((i, c, e) => {
    if(saveRef.current) clearTimeout(saveRef.current);
    saveRef.current = setTimeout(async () => {
      try { await saveState(sbRef, {items:i,cats:c,email:e}); } catch{}
    }, 500);
  }, []);

  const bump = (id, d) => setItems(prev => {
    const next = prev.map(it => it.id===id ? {...it,current:Math.max(0,Number(it.current)+d)} : it);
    persist(next, cats, email); return next;
  });
  const setStock = (id, v) => setItems(prev => {
    const next = prev.map(it => it.id===id ? {...it,current:Math.max(0,parseInt(v)||0)} : it);
    persist(next, cats, email); return next;
  });

  const openAdd = () => {
    setForm({name:"", category: activeCat==="Alla" ? cats[0] : activeCat, unit:"st", current:"", min:""});
    setEditId(null); setModal("item");
  };
  const openEdit = item => { setForm({...item}); setEditId(item.id); setModal("item"); };
  const saveItem = () => {
    if(!form.name?.trim()) return;
    const p = {...form, current:Number(form.current)||0, min:Number(form.min)||1};
    const next = editId
      ? items.map(it => it.id===editId ? {...it,...p} : it)
      : [...items, {...p, id:uid()}];
    setItems(next); persist(next, cats, email); setModal(null);
  };
  const delItem = id => {
    const next = items.filter(it=>it.id!==id);
    setItems(next); persist(next, cats, email); setModal(null);
  };
  const addCat = () => {
    const t = newCat.trim();
    if(!t||cats.includes(t)) return;
    const next=[...cats,t]; setCats(next); persist(items,next,email); setNewCat("");
  };
  const saveSettings = () => { setEmail(settingsEmail); persist(items,cats,settingsEmail); setModal(null); };

  const lowItems = items.filter(it => ["low","empty"].includes(getStatus(it.current,it.min)));
  const warnItems = items.filter(it => getStatus(it.current,it.min)==="warning");

  // Build the order message text (used for copy + email)
  const orderSubject = "Lagerstatus – artiklar att bestalla";
  const orderBody =
    `Hej,\n\nFoljande artiklar behover bestallas omgaende:\n\n` +
    lowItems.map(it=>`- ${it.name}: ${it.current} ${it.unit} (minimum: ${it.min})`).join("\n") +
    `\n\nVanligen atgarda sa snart som mojligt.\n\n— Lagersystemet`;

  // Open the order popup (so the list is always visible even if email is blocked)
  const sendAlert = () => {
    if(lowItems.length===0) return;
    setCopyDone(false);
    setSendResult(null);
    setSendError("");
    setModal("order");
  };

  // Skicka e-post via EmailJS
  const sendEmail = async () => {
    if(!email){ setSettingsEmail(""); setModal("settings"); return; }
    if(!window.emailjs){
      setSendResult("error");
      setSendError("E-posttjänsten kunde inte laddas. Använd 'Kopiera lista' så länge.");
      return;
    }
    setSending(true); setSendResult(null); setSendError("");
    try {
      await window.emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, {
        to_email: email,
        subject: orderSubject,
        message: orderBody,
      });
      setSendResult("ok");
    } catch (err) {
      setSendResult("error");
      const msg = (err && (err.text || err.message)) ? (err.text || err.message) : "Okänt fel";
      setSendError(String(msg));
    } finally {
      setSending(false);
    }
  };

  // Copy order list to clipboard (works inside the sandbox, unlike mailto)
  const copyOrder = async () => {
    const text = email ? `Till: ${email}\nAmne: ${orderSubject}\n\n${orderBody}` : `Amne: ${orderSubject}\n\n${orderBody}`;
    try {
      await navigator.clipboard.writeText(text);
      setCopyDone(true); setTimeout(()=>setCopyDone(false), 2500);
    } catch {
      // Fallback for older browsers
      const ta = document.createElement("textarea");
      ta.value = text; document.body.appendChild(ta); ta.select();
      try { document.execCommand("copy"); setCopyDone(true); setTimeout(()=>setCopyDone(false),2500); } catch {}
      document.body.removeChild(ta);
    }
  };

  const displayCats = ["Alla", ...cats];
  const displayItems = activeCat==="Alla" ? items : items.filter(it=>it.category===activeCat);

  if(!loaded) return (
    <div style={{height:"100vh",display:"flex",alignItems:"center",justifyContent:"center",
      fontFamily:"system-ui",color:"#6B7280",fontSize:"15px"}}>
      Laddar lager…
    </div>
  );

  return (
    <div style={{fontFamily:"system-ui, -apple-system, sans-serif",height:"100vh",
      display:"flex",flexDirection:"column",background:"#F3F4F6",overflow:"hidden"}}>

      {/* ═══ TOP BAR ═══ */}
      <div style={{background:"#1F2937",flexShrink:0,padding:"0 16px"}}>
        <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",height:"52px"}}>
          <div style={{display:"flex",alignItems:"center",gap:"8px"}}>
            <ClipboardList size={20} color="#9CA3AF" />
            <span style={{fontSize:"17px",fontWeight:"600",color:"#F9FAFB",letterSpacing:"-0.2px"}}>
              Lagerhantering
            </span>
          </div>
          <button onClick={()=>{ setSettingsEmail(email); setModal("settings"); }}
            aria-label="Inställningar"
            style={{display:"flex",alignItems:"center",gap:"6px",padding:"6px 12px",
              background:"#374151",border:"1px solid #4B5563",borderRadius:"8px",
              cursor:"pointer",color:"#D1D5DB",fontSize:"13px",fontWeight:"500"}}>
            <Settings size={15} color="#D1D5DB" />
            Inställningar
          </button>
        </div>

        {/* Category tabs */}
        {tab === "stock" && (
          <div style={{display:"flex",gap:"6px",overflowX:"auto",paddingBottom:"10px",
            scrollbarWidth:"none",WebkitOverflowScrolling:"touch"}}>
            {displayCats.map(c => {
              const isActive = activeCat===c;
              const cLow = items.filter(it=>it.category===c && ["low","empty"].includes(getStatus(it.current,it.min)));
              return (
                <button key={c} onClick={()=>setActiveCat(c)} style={{
                  flexShrink:0, padding:"6px 14px",
                  borderRadius:"20px",border:"none",cursor:"pointer",
                  background: isActive ? "#F9FAFB" : "#374151",
                  color: isActive ? "#1F2937" : "#D1D5DB",
                  fontSize:"13px",fontWeight: isActive ? "600" : "400",
                  fontFamily:"inherit",
                  display:"flex",alignItems:"center",gap:"5px"
                }}>
                  {c}
                  {cLow.length>0 && (
                    <span style={{background:"#EF4444",color:"#fff",fontSize:"10px",fontWeight:"700",
                      padding:"1px 5px",borderRadius:"10px",lineHeight:"1.4"}}>
                      {cLow.length}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        )}
      </div>

      {/* ═══ CONTENT ═══ */}
      <div style={{flex:1,overflowY:"auto",padding:"14px 14px 80px"}}>

        {/* ── HOME TAB ── */}
        {tab === "home" && (
          <div style={{display:"flex",flexDirection:"column",gap:"12px"}}>

            {/* Summary cards */}
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:"8px"}}>
              <SumCard n={items.length} label="Artiklar" color="#1F2937" />
              <SumCard n={lowItems.length} label="Att beställa" color={lowItems.length>0?"#B91C1C":"#065F46"} bg={lowItems.length>0?"#FEECEC":"#ECFDF5"} />
              <SumCard n={warnItems.length} label="Bevaka" color={warnItems.length>0?"#92400E":"#6B7280"} bg={warnItems.length>0?"#FEF3C7":"#F3F4F6"} />
            </div>

            {/* ORDER LIST */}
            <div style={{background:"#fff",borderRadius:"14px",border:"1px solid #E5E7EB",overflow:"hidden"}}>
              <div style={{padding:"14px 16px 10px",display:"flex",justifyContent:"space-between",alignItems:"center",borderBottom:"1px solid #F3F4F6"}}>
                <div style={{fontSize:"15px",fontWeight:"600",color:"#111827",display:"flex",alignItems:"center",gap:"7px"}}>
                  <AlertTriangle size={17} color={lowItems.length>0?"#EF4444":"#10B981"} />
                  {lowItems.length>0 ? `${lowItems.length} artikel${lowItems.length>1?"er":""} att beställa` : "Allt är i lager!"}
                </div>
                {lowItems.length>0 && (
                  <button onClick={sendAlert} style={{
                    display:"flex",alignItems:"center",gap:"6px",
                    padding:"8px 14px",background:"#1F2937",
                    border:"none",borderRadius:"8px",cursor:"pointer",
                    color:"#fff",fontSize:"13px",fontWeight:"600",fontFamily:"inherit"
                  }}>
                    <Mail size={14} color="#fff" />
                    Beställ
                  </button>
                )}
              </div>

              {lowItems.length===0 && (
                <div style={{padding:"24px",textAlign:"center"}}>
                  <CheckCircle2 size={36} color="#10B981" style={{margin:"0 auto 8px"}} />
                  <div style={{fontSize:"14px",color:"#6B7280"}}>Alla artiklar är över minimumnivå.</div>
                </div>
              )}

              {/* Group by category */}
              {Object.entries(
                lowItems.reduce((acc,it)=>{ (acc[it.category]=acc[it.category]||[]).push(it); return acc; }, {})
              ).map(([cat,catItems])=>(
                <div key={cat}>
                  <div style={{padding:"8px 16px",background:"#F9FAFB",fontSize:"11px",
                    fontWeight:"600",color:"#6B7280",textTransform:"uppercase",letterSpacing:"0.8px",
                    borderBottom:"1px solid #F3F4F6"}}>
                    {cat}
                  </div>
                  {catItems.map((it,i)=>{
                    const s=ST[getStatus(it.current,it.min)];
                    return (
                      <div key={it.id} style={{
                        padding:"12px 16px",
                        borderBottom: i<catItems.length-1?"1px solid #F9FAFB":"none",
                        display:"flex",justifyContent:"space-between",alignItems:"center"
                      }}>
                        <div>
                          <div style={{fontSize:"15px",fontWeight:"500",color:"#111827"}}>{it.name}</div>
                          <div style={{fontSize:"12px",color:"#9CA3AF",marginTop:"1px"}}>
                            Har: {it.current} {it.unit} · Minimum: {it.min} {it.unit}
                          </div>
                        </div>
                        <span style={{background:s.bg,color:s.text,fontSize:"12px",fontWeight:"600",
                          padding:"3px 9px",borderRadius:"20px",border:`1px solid ${s.border}`}}>
                          {s.label}
                        </span>
                      </div>
                    );
                  })}
                </div>
              ))}
            </div>

            {/* Watch list */}
            {warnItems.length>0 && (
              <div style={{background:"#fff",borderRadius:"14px",border:"1px solid #E5E7EB",overflow:"hidden"}}>
                <div style={{padding:"12px 16px",borderBottom:"1px solid #F3F4F6",
                  fontSize:"14px",fontWeight:"600",color:"#92400E",display:"flex",alignItems:"center",gap:"6px"}}>
                  <AlertTriangle size={15} color="#F59E0B" />
                  {warnItems.length} artikel{warnItems.length>1?"er":""} att bevaka
                </div>
                {warnItems.map((it,i)=>(
                  <div key={it.id} style={{padding:"10px 16px",
                    borderBottom:i<warnItems.length-1?"1px solid #F9FAFB":"none",
                    display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                    <div>
                      <div style={{fontSize:"14px",fontWeight:"500",color:"#374151"}}>{it.name}</div>
                      <div style={{fontSize:"12px",color:"#9CA3AF"}}>{it.category} · {it.current}/{it.min} {it.unit}</div>
                    </div>
                    <span style={{background:"#FEF3C7",color:"#92400E",fontSize:"12px",fontWeight:"600",
                      padding:"3px 9px",borderRadius:"20px",border:"1px solid #FCD34D"}}>Bevaka</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* ── STOCK TAB ── */}
        {tab === "stock" && (
          <div style={{display:"flex",flexDirection:"column",gap:"8px"}}>
            {displayItems.length===0 && (
              <div style={{textAlign:"center",padding:"48px 0",color:"#9CA3AF",fontSize:"15px"}}>
                Inga artiklar i den här kategorin.
              </div>
            )}
            {displayItems.map(item => <ItemCard key={item.id} item={item} onBump={bump} onSetStock={setStock} onEdit={openEdit} />)}
          </div>
        )}
      </div>

      {/* ═══ BOTTOM NAV ═══ */}
      <div style={{position:"fixed",bottom:0,left:0,right:0,
        background:"#fff",borderTop:"1px solid #E5E7EB",
        display:"flex",zIndex:100,paddingBottom:"env(safe-area-inset-bottom)"}}>
        <NavBtn label="Hem" icon={<Home size={22} />} active={tab==="home"}
          badge={lowItems.length} onClick={()=>setTab("home")} />
        <NavBtn label="Lager" icon={<List size={22} />} active={tab==="stock"} onClick={()=>setTab("stock")} />
        <NavBtn label="Ny artikel" icon={<PlusCircle size={22} />} active={false} onClick={openAdd} accent />
      </div>

      {/* ═══ MODALS ═══ */}
      {modal==="order" && (
        <Modal onClose={()=>setModal(null)}>
          <ModalHead title="Beställningslista" onClose={()=>setModal(null)} />

          {!email && (
            <div style={{padding:"10px 12px",background:"#FEF3C7",border:"1px solid #FCD34D",
              borderRadius:"10px",fontSize:"12px",color:"#92400E",lineHeight:"1.5",marginBottom:"14px",
              display:"flex",gap:"8px",alignItems:"flex-start"}}>
              <Info size={14} color="#B45309" style={{flexShrink:0,marginTop:"1px"}} />
              <span>Ingen chef-e-post är inställd. Lägg till den under Inställningar, eller kopiera listan nedan och skicka manuellt.</span>
            </div>
          )}

          <div style={{fontSize:"13px",color:"#6B7280",marginBottom:"8px"}}>
            {lowItems.length} artikel{lowItems.length>1?"er":""} att beställa{email?` · skickas till ${email}`:""}:
          </div>

          {/* The list as readable, selectable text */}
          <div style={{background:"#F9FAFB",border:"1px solid #E5E7EB",borderRadius:"10px",
            padding:"12px 14px",maxHeight:"34vh",overflowY:"auto",marginBottom:"16px"}}>
            {Object.entries(
              lowItems.reduce((acc,it)=>{ (acc[it.category]=acc[it.category]||[]).push(it); return acc; }, {})
            ).map(([cat,catItems])=>(
              <div key={cat} style={{marginBottom:"10px"}}>
                <div style={{fontSize:"11px",fontWeight:"700",color:"#9CA3AF",
                  textTransform:"uppercase",letterSpacing:"0.6px",marginBottom:"4px"}}>{cat}</div>
                {catItems.map(it=>(
                  <div key={it.id} style={{fontSize:"14px",color:"#374151",padding:"2px 0"}}>
                    • {it.name} <span style={{color:"#9CA3AF"}}>— har {it.current} {it.unit}, min {it.min}</span>
                  </div>
                ))}
              </div>
            ))}
          </div>

          {/* Resultatmeddelande */}
          {sendResult==="ok" && (
            <div style={{padding:"12px 14px",background:"#ECFDF5",border:"1px solid #6EE7B7",
              borderRadius:"10px",marginBottom:"12px",display:"flex",gap:"10px",alignItems:"center"}}>
              <CheckCircle2 size={20} color="#059669" style={{flexShrink:0}} />
              <div style={{fontSize:"14px",color:"#065F46",fontWeight:"500"}}>
                Mejlet har skickats till {email}!
              </div>
            </div>
          )}
          {sendResult==="error" && (
            <div style={{padding:"12px 14px",background:"#FEECEC",border:"1px solid #FCA5A5",
              borderRadius:"10px",marginBottom:"12px",display:"flex",gap:"10px",alignItems:"flex-start"}}>
              <AlertTriangle size={18} color="#DC2626" style={{flexShrink:0,marginTop:"1px"}} />
              <div style={{fontSize:"13px",color:"#991B1B",lineHeight:"1.5"}}>
                Kunde inte skicka automatiskt{sendError?`: ${sendError}`:""}. Använd "Kopiera lista" nedan så länge.
              </div>
            </div>
          )}

          {/* Actions */}
          {sendResult!=="ok" && (
            <button onClick={sendEmail} disabled={sending} style={{width:"100%",height:"50px",border:"none",
              borderRadius:"10px",background: sending?"#9CA3AF":"#1F2937",color:"#fff",
              cursor: sending?"default":"pointer",fontFamily:"inherit",fontSize:"16px",fontWeight:"600",
              display:"flex",alignItems:"center",justifyContent:"center",gap:"8px",marginBottom:"8px"}}>
              <Mail size={18} color="#fff" />
              {sending ? "Skickar…" : "Skicka till chef"}
            </button>
          )}
          <button onClick={copyOrder} style={{width:"100%",height:"46px",
            border:"1.5px solid #D1D5DB",
            borderRadius:"10px",background: copyDone?"#ECFDF5":"#fff",
            color: copyDone?"#065F46":"#374151",
            cursor:"pointer",fontFamily:"inherit",fontSize:"15px",fontWeight:"500",
            display:"flex",alignItems:"center",justifyContent:"center",gap:"8px"}}>
            {copyDone ? <CheckCircle2 size={17} color="#059669" /> : <ClipboardList size={17} color="#374151" />}
            {copyDone ? "Kopierad! Klistra in i mejl/SMS" : "Kopiera lista"}
          </button>
          <div style={{fontSize:"11px",color:"#9CA3AF",textAlign:"center",marginTop:"10px",lineHeight:"1.5"}}>
            "Skicka till chef" mejlar listan automatiskt. "Kopiera lista" fungerar alltid som reserv.
          </div>
        </Modal>
      )}

      {modal==="item" && (
        <Modal onClose={()=>setModal(null)}>
          <ModalHead title={editId?"Redigera artikel":"Ny artikel"} onClose={()=>setModal(null)} />
          <Field label="Namn">
            <input value={form.name||""} onChange={e=>setForm(f=>({...f,name:e.target.value}))}
              placeholder="t.ex. Mozzarella" style={inputStyle} autoFocus />
          </Field>
          <Field label="Kategori">
            <select value={form.category||cats[0]} onChange={e=>setForm(f=>({...f,category:e.target.value}))}
              style={selectStyle}>
              {cats.map(c=><option key={c}>{c}</option>)}
            </select>
          </Field>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:"10px"}}>
            <Field label="Enhet">
              <input value={form.unit||""} onChange={e=>setForm(f=>({...f,unit:e.target.value}))}
                placeholder="flaskor" style={{...inputStyle,padding:"0 8px",fontSize:"14px"}} />
            </Field>
            <Field label="Nuvarande">
              <input type="number" min="0" value={form.current??""} placeholder="0"
                onChange={e=>setForm(f=>({...f,current:e.target.value}))}
                style={{...inputStyle,padding:"0 8px",fontSize:"14px",textAlign:"center"}} />
            </Field>
            <Field label="Minimum">
              <input type="number" min="0" value={form.min??""} placeholder="1"
                onChange={e=>setForm(f=>({...f,min:e.target.value}))}
                style={{...inputStyle,padding:"0 8px",fontSize:"14px",textAlign:"center"}} />
            </Field>
          </div>
          <div style={{display:"flex",gap:"8px",marginTop:"6px"}}>
            {editId && (
              <button onClick={()=>delItem(editId)}
                style={{padding:"0 16px",height:"48px",border:"1.5px solid #FCA5A5",
                  borderRadius:"10px",background:"#FEECEC",color:"#B91C1C",cursor:"pointer",
                  display:"flex",alignItems:"center",justifyContent:"center"}}>
                <Trash2 size={20} color="#B91C1C" />
              </button>
            )}
            <button onClick={saveItem}
              style={{flex:1,height:"48px",border:"none",borderRadius:"10px",
                background:"#1F2937",color:"#fff",cursor:"pointer",
                fontFamily:"inherit",fontSize:"16px",fontWeight:"600"}}>
              {editId ? "Spara ändringar" : "Lägg till artikel"}
            </button>
          </div>
        </Modal>
      )}

      {modal==="settings" && (
        <Modal onClose={()=>setModal(null)}>
          <ModalHead title="Inställningar" onClose={()=>setModal(null)} />
          <Field label="Chefens e-post (för lagervarningar)">
            <input type="email" value={settingsEmail} onChange={e=>setSettingsEmail(e.target.value)}
              placeholder="chef@restaurang.se" style={inputStyle} autoFocus />
          </Field>
          <div style={{marginBottom:"16px"}}>
            <div style={{fontSize:"12px",fontWeight:"500",color:"#6B7280",marginBottom:"8px",
              textTransform:"uppercase",letterSpacing:"0.5px"}}>Kategorier</div>
            <div style={{display:"flex",flexWrap:"wrap",gap:"6px",marginBottom:"10px"}}>
              {cats.map(c=>(
                <span key={c} style={{background:"#F3F4F6",border:"1px solid #E5E7EB",
                  borderRadius:"20px",padding:"4px 11px",fontSize:"13px",color:"#374151"}}>
                  {c}
                </span>
              ))}
            </div>
            <div style={{display:"flex",gap:"8px"}}>
              <input value={newCat} onChange={e=>setNewCat(e.target.value)}
                onKeyDown={e=>e.key==="Enter"&&addCat()}
                placeholder="Ny kategori…"
                style={{...inputStyle,flex:1}} />
              <button onClick={addCat} style={{padding:"0 16px",height:"44px",border:"1.5px solid #D1D5DB",
                borderRadius:"10px",background:"#F9FAFB",cursor:"pointer",color:"#374151",
                fontFamily:"inherit",fontSize:"14px",fontWeight:"500",whiteSpace:"nowrap"}}>
                Lägg till
              </button>
            </div>
          </div>
          {dbWarn ? (
            <div style={{padding:"10px 12px",background:"#FEF3C7",border:"1px solid #FCD34D",
              borderRadius:"10px",fontSize:"12px",color:"#92400E",lineHeight:"1.5",marginBottom:"16px",
              display:"flex",gap:"8px",alignItems:"flex-start"}}>
              <AlertTriangle size={14} color="#B45309" style={{flexShrink:0,marginTop:"1px"}} />
              Databasen kunde inte nås här (vanligt inne i förhandsvisningen). På Netlify sparas och synkas allt automatiskt mellan alla enheter.
            </div>
          ) : (
            <div style={{padding:"10px 12px",background:"#F0FDF4",border:"1px solid #BBF7D0",
              borderRadius:"10px",fontSize:"12px",color:"#065F46",lineHeight:"1.5",marginBottom:"16px",
              display:"flex",gap:"8px",alignItems:"flex-start"}}>
              <Info size={14} color="#059669" style={{flexShrink:0,marginTop:"1px"}} />
              Ansluten till databasen. Artiklar och antal sparas och synkas automatiskt mellan alla enheter.
            </div>
          )}
          <button onClick={saveSettings}
            style={{width:"100%",height:"48px",border:"none",borderRadius:"10px",
              background:"#1F2937",color:"#fff",cursor:"pointer",
              fontFamily:"inherit",fontSize:"16px",fontWeight:"600"}}>
            Spara inställningar
          </button>
        </Modal>
      )}
    </div>
  );
}

function ItemCard({ item, onBump, onSetStock, onEdit }) {
  const st = getStatus(item.current, item.min);
  const s = ST[st];
  const [editing, setEditing] = useState(false);
  const [localVal, setLocalVal] = useState(String(item.current));
  const inputRef = useRef(null);

  useEffect(()=>{ setLocalVal(String(item.current)); }, [item.current]);

  const commit = () => { onSetStock(item.id, localVal); setEditing(false); };

  return (
    <div style={{background:"#fff",borderRadius:"12px",
      border:`1px solid ${st==="low"||st==="empty"?"#FCA5A5":"#E5E7EB"}`,
      padding:"13px 14px"}}>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:"11px"}}>
        <div style={{flex:1,minWidth:0,paddingRight:"8px"}}>
          <div style={{fontSize:"15px",fontWeight:"600",color:"#111827",
            overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{item.name}</div>
          <div style={{fontSize:"12px",color:"#9CA3AF",marginTop:"2px"}}>
            {item.category} · min {item.min} {item.unit}
          </div>
        </div>
        <div style={{display:"flex",alignItems:"center",gap:"7px",flexShrink:0}}>
          <span style={{background:s.bg,color:s.text,fontSize:"12px",fontWeight:"600",
            padding:"3px 9px",borderRadius:"20px",border:`1px solid ${s.border}`}}>{s.label}</span>
          <button onClick={()=>onEdit(item)} aria-label={`Redigera ${item.name}`}
            style={{width:"34px",height:"34px",background:"#F9FAFB",border:"1px solid #E5E7EB",
              borderRadius:"8px",display:"flex",alignItems:"center",justifyContent:"center",
              cursor:"pointer"}}>
            <Pencil size={15} color="#6B7280" />
          </button>
        </div>
      </div>
      <div style={{display:"flex",alignItems:"center",gap:"8px"}}>
        <StockBtn icon={<Minus size={18} color="#374151" />} onClick={()=>onBump(item.id,-1)} aria={`Minska ${item.name}`} />
        {editing ? (
          <input ref={inputRef} type="number" min="0" value={localVal}
            onChange={e=>setLocalVal(e.target.value)}
            onBlur={commit} onKeyDown={e=>e.key==="Enter"&&commit()}
            style={{width:"64px",height:"46px",textAlign:"center",fontSize:"18px",
              fontWeight:"700",borderRadius:"10px",border:"2px solid #3B82F6",
              background:"#EFF6FF",color:"#1D4ED8",fontFamily:"inherit",outline:"none"}} />
        ) : (
          <button onClick={()=>{ setLocalVal(String(item.current)); setEditing(true); setTimeout(()=>inputRef.current?.focus(),20); }}
            style={{width:"64px",height:"46px",textAlign:"center",fontSize:"20px",fontWeight:"700",
              borderRadius:"10px",border:"1.5px solid #E5E7EB",background:"#F9FAFB",
              color:"#111827",cursor:"pointer",fontFamily:"inherit"}}>
            {item.current}
          </button>
        )}
        <StockBtn icon={<Plus size={18} color="#374151" />} onClick={()=>onBump(item.id,1)} aria={`Öka ${item.name}`} />
        <span style={{fontSize:"13px",color:"#9CA3AF",marginLeft:"2px"}}>{item.unit}</span>
        <div style={{flex:1,height:"6px",background:"#F3F4F6",borderRadius:"3px",overflow:"hidden",marginLeft:"4px"}}>
          <div style={{height:"100%",borderRadius:"3px",background:s.dot,transition:"width 0.3s",
            width:`${Math.min(100,Math.round((item.current/Math.max(item.min*2,1))*100))}%`}} />
        </div>
      </div>
    </div>
  );
}

function StockBtn({ icon, onClick, aria }) {
  return (
    <button onClick={onClick} aria-label={aria}
      style={{width:"46px",height:"46px",flexShrink:0,border:"1.5px solid #E5E7EB",
        borderRadius:"10px",background:"#F9FAFB",cursor:"pointer",
        display:"flex",alignItems:"center",justifyContent:"center"}}>
      {icon}
    </button>
  );
}

function NavBtn({ label, icon, active, badge, onClick, accent }) {
  return (
    <button onClick={onClick} style={{flex:1,display:"flex",flexDirection:"column",
      alignItems:"center",gap:"3px",padding:"10px 0 8px",background:"none",border:"none",
      cursor:"pointer",
      color: accent ? "#1F2937" : active ? "#1F2937" : "#9CA3AF",
      fontFamily:"inherit",
      borderTop: active ? "2px solid #1F2937" : "2px solid transparent",
      position:"relative"}}>
      {badge>0 && (
        <span style={{position:"absolute",top:"6px",right:"calc(50% - 16px)",
          background:"#EF4444",color:"#fff",fontSize:"10px",fontWeight:"700",
          padding:"1px 5px",borderRadius:"10px",lineHeight:"1.4",minWidth:"18px",textAlign:"center"}}>
          {badge}
        </span>
      )}
      {icon}
      <span style={{fontSize:"11px",fontWeight: active?"600":"400"}}>{label}</span>
    </button>
  );
}

function SumCard({ n, label, color, bg }) {
  return (
    <div style={{background: bg||"#fff",borderRadius:"12px",border:"1px solid #E5E7EB",
      padding:"12px 8px",textAlign:"center"}}>
      <div style={{fontSize:"28px",fontWeight:"700",color: color||"#111827",lineHeight:1.1}}>{n}</div>
      <div style={{fontSize:"11px",color:"#6B7280",marginTop:"3px",fontWeight:"500"}}>{label}</div>
    </div>
  );
}
