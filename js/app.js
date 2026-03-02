/* ============================================================
   DRRMO Integrated Lost & Found and Announcement System
   ZPPSU — Zamboanga City
   js/app.js — State, Mock Data, Canvas Charts, DOM Manipulation
   ============================================================ */

'use strict';

/* ── Priority Configuration ── */
const PriorityMap = {
  general: {
    label:'General', icon:'🟢', cssClass:'priority-general', badgeClass:'badge-general',
    color:'#2e7d32', bg:'#e8f5e9', border:'#81c784', tickerClass:'ticker-general',
  },
  warning: {
    label:'Warning', icon:'🟡', cssClass:'priority-warning', badgeClass:'badge-warning',
    color:'#e65100', bg:'#fff3e0', border:'#ffb74d', tickerClass:'ticker-warning',
  },
  critical: {
    label:'Critical', icon:'🔴', cssClass:'priority-critical', badgeClass:'badge-critical',
    color:'#b71c1c', bg:'#ffebee', border:'#ef9a9a', tickerClass:'ticker-critical',
  },
};

const EventTypeMap = {
  'Campus Emergency': { defaultPriority:'critical', icon:'🚨' },
  'Typhoon Warning':  { defaultPriority:'warning',  icon:'🌀' },
  'Earthquake Drill': { defaultPriority:'warning',  icon:'🌍' },
  'Fire Drill':       { defaultPriority:'warning',  icon:'🔥' },
  'Class Suspension': { defaultPriority:'warning',  icon:'📋' },
  'Holiday Notice':   { defaultPriority:'general',  icon:'🎉' },
  'General Info':     { defaultPriority:'general',  icon:'ℹ️'  },
  'Health Advisory':  { defaultPriority:'warning',  icon:'🏥' },
  'Security Alert':   { defaultPriority:'critical', icon:'🔒' },
};

/* ── Mock Seed Data ── */
const MockData = {
  announcements: [
    { id:'ann-001', eventType:'Campus Emergency', priority:'critical',
      note:'Active fire alarm triggered in Building C, 3rd floor. All occupants must evacuate immediately via emergency exits. Do NOT use elevators. Proceed to the oval assembly area.',
      timestamp: new Date(Date.now() - 12*60000).toISOString(), author:'Admin · DRRMO' },
    { id:'ann-002', eventType:'Typhoon Warning', priority:'warning',
      note:'PAGASA has raised Typhoon Signal No. 2 in the area. Classes may be suspended pending official LGU announcement. Students are advised to proceed home early.',
      timestamp: new Date(Date.now() - 2*3600000).toISOString(), author:'Admin · DRRMO' },
    { id:'ann-003', eventType:'Earthquake Drill', priority:'warning',
      note:'Mandatory Drop-Cover-Hold earthquake drill scheduled on March 5, 2026 at 10:00 AM. All faculty required to coordinate with students per DRRMO guide.',
      timestamp: new Date(Date.now() - 6*3600000).toISOString(), author:'Admin · DRRMO' },
    { id:'ann-004', eventType:'Holiday Notice', priority:'general',
      note:'In observance of Araw ng Kagitingan (Day of Valor), there will be NO CLASSES on April 9, 2026. Administrative offices on skeleton workforce.',
      timestamp: new Date(Date.now() - 24*3600000).toISOString(), author:'Admin · DRRMO' },
    { id:'ann-005', eventType:'General Info', priority:'general',
      note:'The Lost & Found office is now open Monday–Friday, 7:00 AM–6:00 PM, at the Administration Building, Room 104. Unclaimed items donated after 60 days.',
      timestamp: new Date(Date.now() - 48*3600000).toISOString(), author:'Admin · DRRMO' },
  ],
  items: [
    { id:'item-001', name:'Blue Backpack',       description:'Medium-sized blue canvas backpack with a broken zipper on the front pocket. Contains a water bottle holder on the side.',
      location:'Library – 2nd Floor',      datFound:'2026-02-28', status:'found',   tags:['Blue','Backpack','Canvas'],
      image:'https://placehold.co/300x200/1565c0/ffffff?text=Blue+Backpack' },
    { id:'item-002', name:'Red Wallet',          description:'Slim bifold wallet in red leather. Found near the cafeteria benches. Contains no ID or cash.',
      location:'Cafeteria Area',            datFound:'2026-02-27', status:'found',   tags:['Red','Wallet','Leather'],
      image:'https://placehold.co/300x200/b71c1c/ffffff?text=Red+Wallet' },
    { id:'item-003', name:'Black Android Phone', description:'Black Android smartphone with a cracked screen protector. Lock screen shows a landscape wallpaper.',
      location:'Gymnasium – Bleachers',     datFound:'2026-02-26', status:'found',   tags:['Black','Phone','Android'],
      image:'https://placehold.co/300x200/212121/ffffff?text=Black+Phone' },
    { id:'item-004', name:'Gray Laptop',         description:'Silver-gray 14″ laptop, brand sticker partially removed. Found inside a sleeve. Battery still functional.',
      location:'Computer Lab 3',            datFound:'2026-02-25', status:'found',   tags:['Gray','Laptop','Electronics'],
      image:'https://placehold.co/300x200/607d8b/ffffff?text=Gray+Laptop' },
    { id:'item-005', name:'Yellow Umbrella',     description:'Bright yellow folding umbrella with a floral print lining. Found outside the Engineering Building.',
      location:'Engineering Bldg – Entrance',datFound:'2026-02-24', status:'found',  tags:['Yellow','Umbrella','Folding'],
      image:'https://placehold.co/300x200/f9a825/212121?text=Yellow+Umbrella' },
    { id:'item-006', name:'White Earphones',     description:'White wired earphones, one earbud tip missing. Found in the Science building hallway.',
      location:'Science Bldg – Hallway',    datFound:'2026-02-23', status:'found',   tags:['White','Earphones','Electronics'],
      image:'https://placehold.co/300x200/eceff1/212121?text=White+Earphones' },
    { id:'item-007', name:'Green Jacket',        description:'Olive-green windbreaker jacket, size Large. Monogram "J.R." stitched inside the collar.',
      location:'Covered Court',             datFound:'2026-02-22', status:'found',   tags:['Green','Jacket','Clothing'],
      image:'https://placehold.co/300x200/388e3c/ffffff?text=Green+Jacket' },
    { id:'item-008', name:'Brown Leather Shoes', description:'Men\'s brown leather Oxford shoes, size 8. Found near the Stage Area after an event.',
      location:'Stage Area',                datFound:'2026-02-21', status:'claimed', tags:['Brown','Shoes','Leather'],
      image:'https://placehold.co/300x200/795548/ffffff?text=Brown+Shoes' },
    { id:'item-009', name:'Silver Watch',        description:'Stainless steel silver analog wristwatch, no brand visible. Strap shows signs of wear.',
      location:'PE Building – Locker Room', datFound:'2026-02-20', status:'found',   tags:['Silver','Watch','Accessories'],
      image:'https://placehold.co/300x200/9e9e9e/ffffff?text=Silver+Watch' },
    { id:'item-010', name:'Purple Notebook',     description:'Hardbound purple notebook with handwritten notes. Name "Maria Santos" on first page.',
      location:'Classroom 201 – Building B',datFound:'2026-02-19', status:'found',   tags:['Purple','Notebook','School'],
      image:'https://placehold.co/300x200/7b1fa2/ffffff?text=Purple+Notebook' },
  ],
  activities: [
    { color:'red',    text:'Critical alert posted: Campus Emergency — Building C fire alarm.', time:'12 min ago' },
    { color:'maroon', text:'New lost item added: Blue Backpack (Library, 2nd Floor).',          time:'1 hr ago'  },
    { color:'orange', text:'Typhoon Warning announcement created for Signal No. 2.',             time:'2 hr ago'  },
    { color:'green',  text:'Item #008 (Brown Leather Shoes) marked as Claimed.',                time:'4 hr ago'  },
    { color:'maroon', text:'New lost item added: Gray Laptop (Computer Lab 3).',                time:'6 hr ago'  },
    { color:'green',  text:'Holiday Notice announcement posted for April 9.',                   time:'1 day ago' },
    { color:'orange', text:'Earthquake Drill reminder updated for March 5.',                    time:'1 day ago' },
    { color:'maroon', text:'Admin "jdelacruz" logged in from 192.168.1.45.',                    time:'2 days ago'},
  ],
  analytics: {
    weeklyItems:   [3, 5, 2, 7, 4, 6, 3],
    weeklyLabels:  ['Mon','Tue','Wed','Thu','Fri','Sat','Sun'],
    monthlyItems:  [12, 18, 9, 24, 16, 22, 15, 28, 19, 31, 14, 25],
    monthlyLabels: ['Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec','Jan','Feb'],
    categories:    ['Electronics','Clothing','Bags','Accessories','School','Other'],
    catCounts:     [3, 2, 2, 2, 2, 1],
    priorityLabels:['Critical','Warning','General'],
    priorityCounts:[1, 2, 2],
    priorityColors:['#b71c1c','#e65100','#2e7d32'],
  },
};

/* ── Runtime State ── */
const State = {
  announcements: [...MockData.announcements],
  items:         [...MockData.items],
  activities:    [...MockData.activities],
  userAnnFilter: 'all',
  userItemSearch:'',
  userActiveTags:[],
  adminSection:  'overview',
  addItemTags:   [],
  addItemImage:  null,
  nextAnnId:     100,
  nextItemId:    100,
};

/* ── Helpers ── */
const $ = (sel, ctx=document) => ctx.querySelector(sel);
const $$ = (sel, ctx=document) => [...ctx.querySelectorAll(sel)];

function escHtml(str) {
  return String(str)
    .replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;')
    .replace(/"/g,'&quot;').replace(/'/g,'&#39;');
}
function formatTime(iso) {
  const d=new Date(iso), now=new Date(), diff=now-d;
  const m=Math.floor(diff/60000), h=Math.floor(diff/3600000), day=Math.floor(diff/86400000);
  if (m<1)  return 'Just now';
  if (m<60) return `${m}m ago`;
  if (h<24) return `${h}h ago`;
  if (day<7)return `${day}d ago`;
  return d.toLocaleDateString('en-PH',{month:'short',day:'numeric'});
}

/* ── Toast ── */
function showToast(msg, type='info') {
  const c = $('#toast-container');
  if (!c) return;
  const icons = {success:'✅',warning:'⚠️',danger:'🚨',info:'ℹ️'};
  const t = document.createElement('div');
  t.className = `toast toast-${type}`;
  t.innerHTML = `<span class="toast-icon">${icons[type]||'ℹ️'}</span><span class="toast-msg">${escHtml(msg)}</span>`;
  c.appendChild(t);
  setTimeout(()=>{ t.classList.add('toast-out'); setTimeout(()=>t.remove(), 320); }, 3500);
}

/* ── Live Clock ── */
function startClock(selector) {
  const el = $(selector);
  if (!el) return;
  const tick = () => {
    el.textContent = new Date().toLocaleString('en-PH',{
      weekday:'short', month:'short', day:'numeric',
      hour:'2-digit', minute:'2-digit', second:'2-digit', hour12:true,
    });
  };
  tick();
  setInterval(tick, 1000);
}

/* ============================================================
   CANVAS CHART ENGINE
   ============================================================ */
const Charts = {
  /* Utility: rounded rect path */
  _roundRect(ctx, x, y, w, h, r) {
    r = Math.min(r, w/2, h/2);
    if (w <= 0 || h <= 0) return;
    ctx.beginPath();
    ctx.moveTo(x+r, y);
    ctx.lineTo(x+w-r, y);
    ctx.quadraticCurveTo(x+w, y, x+w, y+r);
    ctx.lineTo(x+w, y+h);
    ctx.lineTo(x, y+h);
    ctx.lineTo(x, y+r);
    ctx.quadraticCurveTo(x, y, x+r, y);
    ctx.closePath();
  },

  /* Utility: set canvas resolution for HiDPI */
  _setRes(canvas) {
    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();
    canvas.width  = rect.width  * dpr;
    canvas.height = rect.height * dpr;
    const ctx = canvas.getContext('2d');
    ctx.scale(dpr, dpr);
    return { ctx, w: rect.width, h: rect.height, dpr };
  },

  /* Bar Chart */
  bar(canvas, labels, values, opts={}) {
    if (!canvas || !canvas.getBoundingClientRect) return;
    const { ctx, w, h } = this._setRes(canvas);
    const pad = { top:28, right:14, bottom:38, left:36 };
    const cW = w - pad.left - pad.right;
    const cH = h - pad.top  - pad.bottom;
    const maxV = Math.max(...values, 1);
    const n = values.length;
    const slotW = cW / n;
    const barW  = slotW * 0.58;

    /* Grid lines + Y labels */
    ctx.strokeStyle = 'rgba(40,9,5,.06)';
    ctx.lineWidth = 1;
    for (let i=0; i<=4; i++) {
      const y = pad.top + cH - (i/4)*cH;
      ctx.beginPath();
      ctx.moveTo(pad.left, y); ctx.lineTo(pad.left+cW, y); ctx.stroke();
      ctx.fillStyle = '#a08a88'; ctx.font='10px system-ui'; ctx.textAlign='right';
      ctx.fillText(Math.round(maxV*i/4), pad.left-5, y+3);
    }

    /* Bars */
    values.forEach((v, i) => {
      const barH = Math.max((v/maxV)*cH, 2);
      const x = pad.left + slotW*i + (slotW-barW)/2;
      const y = pad.top + cH - barH;
      const grad = ctx.createLinearGradient(0, y, 0, y+barH);
      grad.addColorStop(0, opts.color  || 'rgb(230,80,27)');
      grad.addColorStop(1, opts.color2 || 'rgb(116,10,3)');
      ctx.fillStyle = grad;
      this._roundRect(ctx, x, y, barW, barH, 4);
      ctx.fill();
      if (v > 0) {
        ctx.fillStyle='rgba(40,9,5,.75)'; ctx.font='bold 10px system-ui';
        ctx.textAlign='center'; ctx.fillText(v, x+barW/2, y-5);
      }
      ctx.fillStyle='#6b5755'; ctx.font='10px system-ui'; ctx.textAlign='center';
      ctx.fillText(labels[i], x+barW/2, pad.top+cH+16);
    });
  },

  /* Donut Chart */
  donut(canvas, labels, values, colors) {
    if (!canvas || !canvas.getBoundingClientRect) return;
    const { ctx, w, h } = this._setRes(canvas);
    const total = values.reduce((a,b)=>a+b,0)||1;
    const cx = w*0.40, cy = h/2;
    const outerR = Math.min(w*0.32, h*0.40);
    const innerR = outerR*0.62;
    let start = -Math.PI/2;

    values.forEach((v, i) => {
      const angle = (v/total)*2*Math.PI;
      ctx.beginPath();
      ctx.moveTo(cx, cy);
      ctx.arc(cx, cy, outerR, start, start+angle);
      ctx.closePath();
      ctx.fillStyle = colors[i];
      ctx.fill();
      start += angle;
    });
    /* Hole */
    ctx.beginPath(); ctx.arc(cx, cy, innerR, 0, 2*Math.PI);
    ctx.fillStyle='#fff'; ctx.fill();
    /* Center text */
    ctx.fillStyle='rgb(40,9,5)'; ctx.font='bold 18px system-ui';
    ctx.textAlign='center'; ctx.fillText(total, cx, cy+6);
    ctx.font='10px system-ui'; ctx.fillStyle='#6b5755'; ctx.fillText('Total', cx, cy+20);
    /* Legend */
    const legX = w*0.68;
    labels.forEach((lbl, i) => {
      const ly = h/2 - labels.length*22/2 + i*22 + 11;
      ctx.fillStyle = colors[i];
      ctx.beginPath(); ctx.arc(legX, ly, 6, 0, 2*Math.PI); ctx.fill();
      ctx.fillStyle='#6b5755'; ctx.font='11px system-ui'; ctx.textAlign='left';
      ctx.fillText(`${lbl}: ${values[i]}`, legX+12, ly+4);
    });
  },

  /* Line / Area Chart */
  line(canvas, labels, values, opts={}) {
    if (!canvas || !canvas.getBoundingClientRect) return;
    const { ctx, w, h } = this._setRes(canvas);
    const pad = { top:28, right:16, bottom:38, left:38 };
    const cW = w-pad.left-pad.right, cH = h-pad.top-pad.bottom;
    const maxV = Math.max(...values, 1);
    const pts = values.map((v,i) => ({
      x: pad.left + (i/(values.length-1))*cW,
      y: pad.top + cH - (v/maxV)*cH,
    }));

    /* Grid */
    ctx.strokeStyle='rgba(40,9,5,.06)'; ctx.lineWidth=1;
    for (let i=0; i<=4; i++) {
      const y=pad.top+cH-(i/4)*cH;
      ctx.beginPath(); ctx.moveTo(pad.left,y); ctx.lineTo(pad.left+cW,y); ctx.stroke();
      ctx.fillStyle='#a08a88'; ctx.font='10px system-ui'; ctx.textAlign='right';
      ctx.fillText(Math.round(maxV*i/4), pad.left-5, y+3);
    }

    /* Area fill */
    const aGrad = ctx.createLinearGradient(0, pad.top, 0, pad.top+cH);
    aGrad.addColorStop(0, 'rgba(230,80,27,.22)');
    aGrad.addColorStop(1, 'rgba(230,80,27,0)');
    ctx.beginPath();
    ctx.moveTo(pts[0].x, pad.top+cH);
    pts.forEach(p => ctx.lineTo(p.x, p.y));
    ctx.lineTo(pts[pts.length-1].x, pad.top+cH);
    ctx.closePath(); ctx.fillStyle=aGrad; ctx.fill();

    /* Line */
    ctx.beginPath(); ctx.moveTo(pts[0].x, pts[0].y);
    pts.forEach(p => ctx.lineTo(p.x, p.y));
    ctx.strokeStyle='rgb(195,17,12)'; ctx.lineWidth=2.5; ctx.lineJoin='round'; ctx.stroke();

    /* Dots + labels */
    pts.forEach((p, i) => {
      ctx.beginPath(); ctx.arc(p.x, p.y, 4, 0, 2*Math.PI);
      ctx.fillStyle='rgb(230,80,27)'; ctx.fill();
      ctx.beginPath(); ctx.arc(p.x, p.y, 2, 0, 2*Math.PI);
      ctx.fillStyle='#fff'; ctx.fill();
      ctx.fillStyle='rgba(40,9,5,.7)'; ctx.font='bold 9px system-ui';
      ctx.textAlign='center'; ctx.fillText(values[i], p.x, p.y-8);
      ctx.fillStyle='#6b5755'; ctx.font='10px system-ui';
      ctx.fillText(labels[i], p.x, pad.top+cH+16);
    });
  },

  /* Horizontal Bar */
  hbar(canvas, labels, values, colors) {
    if (!canvas || !canvas.getBoundingClientRect) return;
    const { ctx, w, h } = this._setRes(canvas);
    const pad = { top:8, right:48, bottom:8, left:90 };
    const cW = w-pad.left-pad.right, cH = h-pad.top-pad.bottom;
    const maxV = Math.max(...values, 1);
    const slotH = cH / values.length;
    const barH  = Math.min(slotH*0.6, 22);

    values.forEach((v, i) => {
      const y = pad.top + slotH*i + (slotH-barH)/2;
      const bW = (v/maxV)*cW;
      /* Label */
      ctx.fillStyle='#6b5755'; ctx.font='11px system-ui'; ctx.textAlign='right';
      ctx.fillText(labels[i], pad.left-8, y+barH/2+4);
      /* BG */
      ctx.fillStyle='rgba(40,9,5,.05)';
      this._roundRect(ctx, pad.left, y, cW, barH, 4); ctx.fill();
      /* Bar */
      if (bW > 2) {
        const grad = ctx.createLinearGradient(pad.left, 0, pad.left+bW, 0);
        grad.addColorStop(0, colors[i%colors.length]);
        grad.addColorStop(1, colors[(i+1)%colors.length]);
        ctx.fillStyle = grad;
        this._roundRect(ctx, pad.left, y, bW, barH, 4); ctx.fill();
      }
      /* Value */
      ctx.fillStyle='rgba(40,9,5,.75)'; ctx.font='bold 11px system-ui'; ctx.textAlign='left';
      ctx.fillText(v, pad.left+bW+6, y+barH/2+4);
    });
  },
};

/* ── Render all analytics charts ── */
function renderAnalytics() {
  const d = MockData.analytics;

  // Update analytics stat cards
  const totalItems = State.items.length;
  const foundItems = State.items.filter(i=>i.status==='found').length;
  const claimed    = State.items.filter(i=>i.status==='claimed').length;
  const critical   = State.announcements.filter(a=>a.priority==='critical').length;

  const setEl = (id, val) => { const el=$(id); if(el) el.textContent=val; };
  setEl('#an-total-items',  totalItems);
  setEl('#an-found-items',  foundItems);
  setEl('#an-claimed',      claimed);
  setEl('#an-critical-ann', critical);
  setEl('#an-total-anns',   State.announcements.length);
  setEl('#an-this-week',    d.weeklyItems.reduce((a,b)=>a+b,0));

  // Chart 1: Weekly Items Bar
  requestAnimationFrame(() => {
    const c1 = $('#chart-weekly');
    if (c1) Charts.bar(c1, d.weeklyLabels, d.weeklyItems);
  });
  // Chart 2: Priority Donut
  requestAnimationFrame(() => {
    const c2 = $('#chart-priority');
    if (c2) Charts.donut(c2, d.priorityLabels, d.priorityCounts, d.priorityColors);
  });
  // Chart 3: Monthly Trend Line
  requestAnimationFrame(() => {
    const c3 = $('#chart-monthly');
    if (c3) Charts.line(c3, d.monthlyLabels, d.monthlyItems);
  });
  // Chart 4: Category Horizontal Bar
  requestAnimationFrame(() => {
    const c4 = $('#chart-category');
    if (c4) Charts.hbar(c4, d.categories, d.catCounts,
      ['rgb(195,17,12)','rgb(230,80,27)','rgb(116,10,3)','rgb(240,110,60)']);
  });
}

/* Redraw charts on resize */
let _resizeTimer;
window.addEventListener('resize', () => {
  clearTimeout(_resizeTimer);
  _resizeTimer = setTimeout(() => {
    if (document.getElementById('admin-dashboard')) renderAnalytics();
  }, 200);
});

/* ============================================================
   USER PORTAL
   ============================================================ */
function initUserPortal() {
  startClock('.live-clock');
  renderTicker();
  renderAnnouncements('all');
  renderLostItems('', []);
  initAnnouncementFilters();
  initSearchAndTags();
}

/* Ticker */
function renderTicker() {
  const inner = $('#ticker-inner');
  const bar   = $('#ticker-bar');
  if (!inner || !bar) return;
  const ann = State.announcements;
  if (!ann.length) { inner.textContent='No active announcements.'; return; }
  const hasCritical = ann.some(a=>a.priority==='critical');
  const hasWarning  = ann.some(a=>a.priority==='warning');
  bar.className = 'ticker-bar' + (hasCritical?' has-critical': hasWarning?' has-warning':'');
  inner.innerHTML = ann.map(a => {
    const p=PriorityMap[a.priority], e=EventTypeMap[a.eventType]||{icon:'📢'};
    return `<span class="${p.tickerClass}">${p.icon} ${e.icon} ${escHtml(a.eventType)}: ${escHtml(a.note.substring(0,80))}${a.note.length>80?'…':''}</span>`;
  }).join(`<span class="ticker-sep">●</span>`);
}

/* Announcements */
function renderAnnouncements(filter) {
  const grid = $('#announcements-grid');
  if (!grid) return;
  State.userAnnFilter = filter;
  const list = filter==='all' ? State.announcements : State.announcements.filter(a=>a.priority===filter);
  $$('.filter-tab[data-filter]').forEach(tab => {
    const f=tab.dataset.filter;
    const cnt = f==='all' ? State.announcements.length : State.announcements.filter(a=>a.priority===f).length;
    const b=tab.querySelector('.tab-count'); if(b) b.textContent=cnt;
    tab.classList.toggle('active', f===filter);
  });
  grid.innerHTML = list.length
    ? list.map(buildAnnCard).join('')
    : `<div class="ann-no-results">No announcements for this filter.</div>`;
}

function buildAnnCard(ann) {
  const p=PriorityMap[ann.priority]||PriorityMap.general;
  const e=EventTypeMap[ann.eventType]||{icon:'📢'};
  return `
    <div class="ann-card ${p.cssClass}">
      <div class="ann-card-ribbon" style="background:${p.color}"></div>
      <div class="ann-card-body">
        <div class="ann-card-header">
          <div class="ann-event-type">${escHtml(e.icon)} ${escHtml(ann.eventType)}</div>
          <span class="badge ${p.badgeClass}">${p.icon} ${p.label}</span>
        </div>
        <p class="ann-card-note">${escHtml(ann.note)}</p>
        <div class="ann-card-footer">
          <span class="ann-date">🕐 ${formatTime(ann.timestamp)}</span>
          <span>${escHtml(ann.author)}</span>
        </div>
      </div>
    </div>`;
}

function initAnnouncementFilters() {
  $$('.filter-tab[data-filter]').forEach(tab =>
    tab.addEventListener('click', () => renderAnnouncements(tab.dataset.filter)));
}

/* Lost Items */
function renderLostItems(query, tags) {
  const grid = $('#items-grid');
  if (!grid) return;
  State.userItemSearch = query;
  State.userActiveTags = tags;
  const q = query.trim().toLowerCase();
  const filtered = State.items.filter(item => {
    const matchQ = !q
      || item.name.toLowerCase().includes(q)
      || item.description.toLowerCase().includes(q)
      || item.location.toLowerCase().includes(q)
      || item.tags.some(t=>t.toLowerCase().includes(q));
    const matchT = tags.length===0
      || tags.every(tag=>item.tags.map(t=>t.toLowerCase()).includes(tag.toLowerCase()));
    return matchQ && matchT;
  });
  grid.innerHTML = filtered.length
    ? filtered.map(buildItemCard).join('')
    : `<div class="empty-state" style="grid-column:1/-1">
         <div class="empty-state-icon">🔍</div>
         <div class="empty-state-text">No items found</div>
         <div class="empty-state-sub">Try adjusting search or clearing tag filters.</div>
       </div>`;
}

function buildItemCard(item) {
  const sBadge = item.status==='claimed'
    ? '<span class="badge status-claimed">Claimed</span>'
    : '<span class="badge status-found">Found</span>';
  return `
    <div class="item-card">
      <div class="item-card-img-wrap">
        <img src="${escHtml(item.image)}" alt="${escHtml(item.name)}" class="item-card-img" loading="lazy">
        <div class="item-card-status">${sBadge}</div>
      </div>
      <div class="item-card-body">
        <div class="item-card-name">${escHtml(item.name)}</div>
        <div class="item-card-meta">
          <span class="item-meta-row">📍 ${escHtml(item.location)}</span>
          <span class="item-meta-row">📅 Found: ${escHtml(item.datFound)}</span>
        </div>
        <p style="font-size:12px;color:var(--text-muted);line-height:1.5">${escHtml(item.description.substring(0,88))}${item.description.length>88?'…':''}</p>
        <div class="item-tags">${item.tags.map(t=>`<span class="tag-pill">${escHtml(t)}</span>`).join('')}</div>
      </div>
    </div>`;
}

function initSearchAndTags() {
  const inp = $('#item-search');
  inp && inp.addEventListener('input', () => renderLostItems(inp.value, State.userActiveTags));
  $$('.tag-pill-user[data-tag]').forEach(pill => {
    pill.addEventListener('click', () => {
      const t=pill.dataset.tag;
      pill.classList.toggle('active');
      State.userActiveTags = pill.classList.contains('active')
        ? [...State.userActiveTags, t]
        : State.userActiveTags.filter(x=>x!==t);
      renderLostItems(State.userItemSearch, State.userActiveTags);
    });
  });
  const clearBtn = $('#clear-filters-btn');
  clearBtn && clearBtn.addEventListener('click', () => {
    State.userActiveTags=[]; State.userItemSearch='';
    if(inp) inp.value='';
    $$('.tag-pill-user').forEach(p=>p.classList.remove('active'));
    renderLostItems('', []);
  });
}

/* ============================================================
   ADMIN DASHBOARD
   ============================================================ */
function initAdminDashboard() {
  startClock('.topbar-clock');
  initAdminNav();
  initMobileNav();
  renderStats();
  renderActivityFeed();
  renderAdminAnnouncementList();
  renderAdminItemsGrid();
  initAnnouncementForm();
  initAddItemForm();
  initSidebarToggle();
  initLogout();
  // Render analytics after a frame so canvas sizes are known
  setTimeout(renderAnalytics, 120);
}

/* ── Admin Nav ── */
function initAdminNav() {
  $$('.nav-item[data-section]').forEach(item =>
    item.addEventListener('click', () => activateSection(item.dataset.section)));
}

function initMobileNav() {
  $$('.mob-nav-btn[data-section]').forEach(btn =>
    btn.addEventListener('click', () => {
      activateSection(btn.dataset.section);
      // Close sidebar overlay if open
      $('.admin-sidebar')?.classList.remove('open');
      $('#sidebar-overlay')?.classList.remove('visible');
    }));
}

function activateSection(section) {
  State.adminSection = section;
  $$('.nav-item[data-section]').forEach(n => n.classList.toggle('active', n.dataset.section===section));
  $$('.mob-nav-btn[data-section]').forEach(b => b.classList.toggle('active', b.dataset.section===section));
  $$('.admin-tab-panel[data-panel]').forEach(p => p.classList.toggle('active', p.dataset.panel===section));
  const titles = {
    overview:'Dashboard Overview', announcements:'Announcement Management',
    items:'Lost Item Inventory', analytics:'Analytics & Reports', settings:'System Settings',
  };
  const tEl=$('.topbar-title');
  if (tEl) tEl.innerHTML=`DRRMO <span>/ ${titles[section]||section}</span>`;
  // Redraw charts when analytics tab becomes visible
  if (section==='analytics') setTimeout(renderAnalytics, 80);
}

function initSidebarToggle() {
  const btn=$('#sidebar-toggle-btn'), sb=$('.admin-sidebar'), ov=$('#sidebar-overlay');
  if (!btn||!sb) return;
  btn.addEventListener('click', () => {
    sb.classList.toggle('open');
    ov?.classList.toggle('visible');
  });
  ov?.addEventListener('click', () => { sb.classList.remove('open'); ov.classList.remove('visible'); });
}

function initLogout() {
  $('#logout-btn')?.addEventListener('click', () => {
    if (confirm('Log out of DRRMO Admin?')) {
      showToast('Logged out. Redirecting…', 'info');
      setTimeout(() => window.location.href='index.html', 1800);
    }
  });
}

/* Stats */
function renderStats() {
  const s = (id, v) => { const el=$(id); if(el) el.textContent=v; };
  s('#stat-total',   State.items.length);
  s('#stat-active',  State.announcements.length);
  s('#stat-pending', State.items.filter(i=>i.status==='found').length);
  s('#stat-returned',State.items.filter(i=>i.status==='claimed').length);
}

/* Activity Feed */
function renderActivityFeed() {
  const list=$('#activity-list');
  if (!list) return;
  list.innerHTML = State.activities.map(a => `
    <div class="activity-item">
      <div class="activity-dot ${a.color}"></div>
      <div class="activity-text">${escHtml(a.text)}</div>
      <div class="activity-time">${escHtml(a.time)}</div>
    </div>`).join('');
}

function prependActivity(color, text) {
  State.activities.unshift({color, text, time:'Just now'});
  if (State.activities.length > 20) State.activities.pop();
}

/* ── Announcement List ── */
function renderAdminAnnouncementList() {
  const list=$('#admin-ann-list');
  if (!list) return;
  if (!State.announcements.length) {
    list.innerHTML=`<div class="empty-state"><div class="empty-state-icon">📢</div><div class="empty-state-text">No announcements yet</div><div class="empty-state-sub">Use the form above to create one.</div></div>`;
    return;
  }
  list.innerHTML = State.announcements.map(ann => {
    const p=PriorityMap[ann.priority]||PriorityMap.general;
    const e=EventTypeMap[ann.eventType]||{icon:'📢'};
    return `
      <div class="ann-list-item ${p.cssClass}" data-id="${escHtml(ann.id)}">
        <div class="ann-list-left-bar" style="background:${p.color}"></div>
        <div class="ann-list-info">
          <div class="ann-list-title">${escHtml(e.icon)} ${escHtml(ann.eventType)}</div>
          <div class="ann-list-note">${escHtml(ann.note)}</div>
          <div class="ann-list-meta">
            <span class="badge ${p.badgeClass}">${p.icon} ${p.label}</span>
            · ${formatTime(ann.timestamp)} · ${escHtml(ann.author)}
          </div>
        </div>
        <div class="ann-list-actions">
          <button class="btn btn-secondary btn-sm edit-ann-btn" data-id="${escHtml(ann.id)}" title="Edit">✏️</button>
          <button class="btn btn-danger btn-sm delete-ann-btn" data-id="${escHtml(ann.id)}" title="Delete">🗑️</button>
        </div>
      </div>`;
  }).join('');
  $$('.delete-ann-btn').forEach(b => b.addEventListener('click', () => deleteAnnouncement(b.dataset.id)));
  $$('.edit-ann-btn').forEach(b   => b.addEventListener('click', () => editAnnouncement(b.dataset.id)));
}

function deleteAnnouncement(id) {
  if (!confirm('Delete this announcement?')) return;
  State.announcements = State.announcements.filter(a=>a.id!==id);
  renderAdminAnnouncementList();
  renderStats();
  prependActivity('red', `Announcement deleted (ID: ${id}).`);
  renderActivityFeed();
  showToast('Announcement deleted.', 'warning');
  if (State.adminSection==='analytics') renderAnalytics();
}

function editAnnouncement(id) {
  const ann=State.announcements.find(a=>a.id===id);
  if (!ann) return;
  const evtSel=$('#ann-event-type'), noteTa=$('#ann-note');
  if(evtSel) evtSel.value=ann.eventType;
  if(noteTa) noteTa.value=ann.note;
  $$('input[name="ann-priority"]').forEach(r=>r.checked=r.value===ann.priority);
  const sb=document.querySelector('.ann-submit-btn');
  if(sb){sb.textContent='💾 Update Announcement'; sb.dataset.editId=id;}
  updateLivePreview();
  document.getElementById('ann-form')?.scrollIntoView({behavior:'smooth',block:'start'});
  showToast('Editing — make changes and click Update.', 'info');
}

/* ── Announcement Form ── */
function initAnnouncementForm() {
  const form=$('#ann-form'), evtSel=$('#ann-event-type'), noteTa=$('#ann-note');
  const prioRad=()=>$$('input[name="ann-priority"]');
  if (!form) return;

  evtSel?.addEventListener('change', () => {
    const def=EventTypeMap[evtSel.value]?.defaultPriority||'general';
    prioRad().forEach(r=>r.checked=r.value===def);
    updateLivePreview();
  });
  [evtSel,noteTa].forEach(el=>el?.addEventListener('input',updateLivePreview));
  prioRad().forEach(r=>r.addEventListener('change',updateLivePreview));

  form.addEventListener('submit', e => {
    e.preventDefault();
    const eventType=evtSel?.value||'', note=noteTa?.value.trim()||'';
    const priority=(prioRad().find(r=>r.checked))?.value||'general';
    const editId=form.querySelector('.ann-submit-btn')?.dataset.editId;
    if (!eventType||!note){ showToast('Please fill all required fields.','warning'); return; }

    if (editId) {
      const idx=State.announcements.findIndex(a=>a.id===editId);
      if (idx>-1) State.announcements[idx]={...State.announcements[idx],eventType,note,priority};
      const sb=form.querySelector('.ann-submit-btn');
      if(sb){delete sb.dataset.editId; sb.textContent='📢 Publish Announcement';}
      showToast('Announcement updated!','success');
      prependActivity('maroon',`Announcement updated: ${eventType}.`);
    } else {
      State.announcements.unshift({
        id:`ann-${++State.nextAnnId}`,eventType,note,priority,
        timestamp:new Date().toISOString(), author:'Admin · DRRMO',
      });
      showToast(`Published: ${eventType}`,'success');
      prependActivity(priority==='critical'?'red':priority==='warning'?'orange':'green',`New ${priority} alert: ${eventType}.`);
      // Update analytics data
      const pi=MockData.analytics.priorityLabels.findIndex(l=>l.toLowerCase()===priority);
      if(pi>-1) MockData.analytics.priorityCounts[pi]++;
    }
    form.reset(); updateLivePreview();
    renderAdminAnnouncementList(); renderStats(); renderActivityFeed();
    if (State.adminSection==='analytics') renderAnalytics();
  });
  updateLivePreview();
}

function updateLivePreview() {
  const evtSel=$('#ann-event-type'), noteTa=$('#ann-note');
  const eventType=evtSel?.value||'Event Type';
  const note=noteTa?.value?.trim()||'Your announcement note will appear here…';
  const priority=($$('input[name="ann-priority"]').find(r=>r.checked))?.value||'general';
  const p=PriorityMap[priority], e=EventTypeMap[eventType]||{icon:'📢'};
  const pr=$('#preview-ribbon'), pe=$('#preview-event'), pn=$('#preview-note'), pb=$('#preview-badge');
  if(pr) pr.style.background=p.color;
  if(pe) pe.textContent=`${e.icon} ${eventType}`;
  if(pn) pn.textContent=note.substring(0,120)+(note.length>120?'…':'');
  if(pb){pb.className=`badge ${p.badgeClass}`; pb.textContent=`${p.icon} ${p.label}`;}
}

/* ── Add Item Form (Fully Functional Upload) ── */
function initAddItemForm() {
  const form=$('#add-item-form');
  const fileInput=$('#item-image-input');
  const previewImg=$('#item-img-preview');
  const uploadArea=$('#upload-area');
  const uploadPlaceholder=$('#upload-placeholder');
  const tagInput=$('#tag-input'), tagAddBtn=$('#tag-add-btn'), tagPreview=$('#tag-preview-row');
  if (!form) return;

  /* ── FileReader: show real image preview ── */
  function handleFile(file) {
    if (!file || !file.type.startsWith('image/')) {
      showToast('Please select a valid image file (PNG, JPG, WEBP, GIF).','warning'); return;
    }
    if (file.size > 8 * 1024 * 1024) {
      showToast('Image too large. Max file size is 8 MB.','warning'); return;
    }
    const reader = new FileReader();
    reader.onload = e => {
      State.addItemImage = e.target.result;
      if (previewImg) { previewImg.src=e.target.result; previewImg.style.display='block'; }
      if (uploadPlaceholder) uploadPlaceholder.style.display='none';
      showToast(`Image "${file.name}" loaded successfully.`,'success');
    };
    reader.onerror = () => showToast('Failed to read image file.','danger');
    reader.readAsDataURL(file);
  }

  fileInput?.addEventListener('change', () => { if(fileInput.files[0]) handleFile(fileInput.files[0]); });

  /* ── Drag and drop ── */
  uploadArea?.addEventListener('dragover', e => { e.preventDefault(); uploadArea.classList.add('drag-over'); });
  uploadArea?.addEventListener('dragleave', () => uploadArea.classList.remove('drag-over'));
  uploadArea?.addEventListener('drop', e => {
    e.preventDefault();
    uploadArea.classList.remove('drag-over');
    const file = e.dataTransfer?.files?.[0];
    if (file) handleFile(file);
  });

  /* ── Tag system ── */
  function addTag() {
    const v=tagInput?.value.trim();
    if (!v||State.addItemTags.includes(v)){if(tagInput)tagInput.value=''; return;}
    if (State.addItemTags.length >= 8){showToast('Max 8 tags per item.','warning'); return;}
    State.addItemTags.push(v);
    if(tagInput) tagInput.value='';
    renderTagPills();
  }
  function renderTagPills() {
    if (!tagPreview) return;
    tagPreview.innerHTML = State.addItemTags.map(t =>
      `<span class="tag-pill removable" data-tag="${escHtml(t)}">${escHtml(t)} <span class="pill-x">×</span></span>`
    ).join('');
    tagPreview.querySelectorAll('.tag-pill.removable').forEach(pill =>
      pill.addEventListener('click', () => {
        State.addItemTags=State.addItemTags.filter(t=>t!==pill.dataset.tag);
        renderTagPills();
      }));
  }
  tagAddBtn?.addEventListener('click', addTag);
  tagInput?.addEventListener('keydown', e => { if(e.key==='Enter'){e.preventDefault();addTag();} });

  /* ── Form Submit ── */
  form.addEventListener('submit', e => {
    e.preventDefault();
    const name=$('#item-name')?.value.trim();
    const desc=$('#item-desc')?.value.trim();
    const date=$('#item-date')?.value;
    const loc =$('#item-location')?.value.trim();
    if (!name||!desc||!date||!loc){showToast('Please fill in all required fields.','warning');return;}

    /* Pick placeholder color from first tag */
    const colorMap = {
      'blue':'1565c0/fff','red':'b71c1c/fff','black':'212121/fff','gray':'607d8b/fff',
      'yellow':'f9a825/212','white':'eceff1/212','green':'388e3c/fff','brown':'795548/fff',
      'silver':'9e9e9e/fff','purple':'7b1fa2/fff','orange':'e65100/fff','pink':'e91e63/fff',
    };
    const tagLower=(State.addItemTags[0]||'').toLowerCase();
    const ph = colorMap[tagLower] || '740a03/fff';

    const newItem = {
      id:`item-${++State.nextItemId}`, name, description:desc, location:loc,
      datFound:date, status:'found',
      tags:[...State.addItemTags],
      image: State.addItemImage || `https://placehold.co/300x200/${ph}?text=${encodeURIComponent(name)}`,
    };

    State.items.unshift(newItem);
    // Update analytics
    const catTag = State.addItemTags.find(t=>MockData.analytics.categories.some(c=>c.toLowerCase()===t.toLowerCase()));
    if (catTag) {
      const ci = MockData.analytics.categories.findIndex(c=>c.toLowerCase()===catTag.toLowerCase());
      if (ci>-1) MockData.analytics.catCounts[ci]++;
    }
    const today = new Date().getDay();
    if (today>=0 && today<7) MockData.analytics.weeklyItems[today===0?6:today-1]++;
    const mo = new Date().getMonth();
    if (MockData.analytics.monthlyItems[mo] !== undefined) MockData.analytics.monthlyItems[mo]++;

    /* Reset form state */
    State.addItemTags=[]; State.addItemImage=null;
    if(previewImg){previewImg.src=''; previewImg.style.display='none';}
    if(uploadPlaceholder) uploadPlaceholder.style.display='';
    renderTagPills(); form.reset();

    renderAdminItemsGrid(); renderStats();
    prependActivity('maroon', `New lost item added: ${name} (${loc}).`);
    renderActivityFeed();
    if (State.adminSection==='analytics') renderAnalytics();
    showToast(`"${name}" added to inventory!`,'success');
  });
}

/* ── Admin Items Grid ── */
function renderAdminItemsGrid() {
  const grid=$('#admin-items-grid');
  if (!grid) return;
  if (!State.items.length) {
    grid.innerHTML=`<div class="empty-state" style="grid-column:1/-1"><div class="empty-state-icon">📦</div><div class="empty-state-text">No items yet</div></div>`;
    return;
  }
  grid.innerHTML = State.items.map(item => {
    const sBadge=item.status==='claimed'
      ?`<span class="badge status-claimed" style="font-size:10px">Claimed</span>`
      :`<span class="badge status-found"   style="font-size:10px">Found</span>`;
    return `
      <div class="admin-item-card">
        <img src="${escHtml(item.image)}" alt="${escHtml(item.name)}" class="admin-item-img" loading="lazy"
          onerror="this.src='https://placehold.co/300x200/740a03/fff?text=No+Image'">
        <div class="admin-item-body">
          <div class="admin-item-name">${escHtml(item.name)}</div>
          <div class="admin-item-location">📍 ${escHtml(item.location)}</div>
          <div style="display:flex;flex-wrap:wrap;gap:4px">${item.tags.slice(0,3).map(t=>`<span class="tag-pill" style="font-size:10px">${escHtml(t)}</span>`).join('')}</div>
        </div>
        <div class="admin-item-footer">
          ${sBadge}
          <div style="display:flex;gap:5px">
            <button class="btn btn-sm btn-secondary toggle-status-btn" data-id="${escHtml(item.id)}" title="${item.status==='found'?'Mark Claimed':'Mark Found'}">${item.status==='found'?'✅':'↩️'}</button>
            <button class="btn btn-sm btn-danger delete-item-btn" data-id="${escHtml(item.id)}" title="Delete">🗑️</button>
          </div>
        </div>
      </div>`;
  }).join('');

  $$('.delete-item-btn').forEach(b => b.addEventListener('click', () => {
    if (!confirm('Remove this item?')) return;
    const it=State.items.find(i=>i.id===b.dataset.id);
    State.items=State.items.filter(i=>i.id!==b.dataset.id);
    renderAdminItemsGrid(); renderStats();
    prependActivity('red',`Item removed: ${it?.name||b.dataset.id}.`); renderActivityFeed();
    if (State.adminSection==='analytics') renderAnalytics();
    showToast('Item removed.','warning');
  }));
  $$('.toggle-status-btn').forEach(b => b.addEventListener('click', () => {
    const it=State.items.find(i=>i.id===b.dataset.id);
    if (!it) return;
    it.status=it.status==='found'?'claimed':'found';
    renderAdminItemsGrid(); renderStats();
    prependActivity('green',`"${it.name}" marked as ${it.status}.`); renderActivityFeed();
    if (State.adminSection==='analytics') renderAnalytics();
    showToast(`Item marked as ${it.status}.`,'success');
  }));
}

/* ============================================================
   BOOT
   ============================================================ */
let _adminInited = false;
function initAdminDashboardOnce() {
  if (_adminInited) return;
  _adminInited = true;
  initAdminDashboard();
}

document.addEventListener('DOMContentLoaded', () => {
  if (document.getElementById('user-portal')) initUserPortal();
});
