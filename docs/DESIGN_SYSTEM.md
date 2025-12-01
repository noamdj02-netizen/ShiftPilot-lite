# 🎨 SHIFTPILOT - DESIGN SYSTEM

## 📐 GRID & LAYOUT

### Grille
- **Desktop** : 12 colonnes
- **Tablet** : 8 colonnes
- **Mobile** : 4 colonnes
- **Gutter** : 24px (desktop), 16px (tablet), 12px (mobile)

### Spacing Scale
```
xs: 4px
sm: 8px
md: 16px
lg: 24px
xl: 32px
2xl: 48px
3xl: 64px
```

### Container
- **Max width** : 1280px
- **Padding** : 24px (desktop), 16px (mobile)

---

## 📝 TYPOGRAPHY

### Font Families
- **Primary** : Inter (sans-serif)
- **Secondary** : IBM Plex Sans (pour certains éléments)
- **Icons** : Material Symbols Outlined

### Headings

**H1 - Page Title**
- Font size: 32px (desktop) / 24px (mobile)
- Font weight: 700
- Line height: 1.2
- Color: `text-white` (dark mode) / `text-slate-900` (light mode)

**H2 - Section Title**
- Font size: 24px (desktop) / 20px (mobile)
- Font weight: 600
- Line height: 1.3
- Color: `text-white` / `text-slate-900`

**H3 - Subsection**
- Font size: 20px (desktop) / 18px (mobile)
- Font weight: 600
- Line height: 1.4

**Body**
- Font size: 16px (desktop) / 14px (mobile)
- Font weight: 400
- Line height: 1.5
- Color: `text-slate-300` (dark) / `text-slate-600` (light)

**Small / Label**
- Font size: 14px (desktop) / 12px (mobile)
- Font weight: 500
- Color: `text-slate-400` (dark) / `text-slate-500` (light)

---

## 🎨 COULEURS

### Primary (Accent)
- **Primary** : `#6C63FF` (violet)
- **Primary Dark** : `#5a52d5`
- **Primary Light** : `#818cf8`

### Background
- **Background Dark** : `#0A0A0B` (fond principal dark)
- **Background Card** : `#1C1C1E` (cartes dark)
- **Background Light** : `#F5F5F7` (fond principal light)
- **Background Card Light** : `#FFFFFF` (cartes light)

### Surface
- **Surface** : `#1C1C1E` (dark) / `#FFFFFF` (light)
- **Surface Hover** : `rgba(255, 255, 255, 0.05)` (dark) / `rgba(0, 0, 0, 0.02)` (light)
- **Border** : `rgba(255, 255, 255, 0.1)` (dark) / `rgba(0, 0, 0, 0.1)` (light)

### Semantic Colors
- **Success** : `#10B981` (green-500)
- **Warning** : `#F59E0B` (amber-500)
- **Error** : `#EF4444` (red-500)
- **Info** : `#3B82F6` (blue-500)

### Text Colors
- **Primary Text** : `#FFFFFF` (dark) / `#0F172A` (light)
- **Secondary Text** : `#94A3B8` (slate-400)
- **Muted Text** : `#64748B` (slate-500)

---

## 🔘 BOUTONS

### Primary Button
```tsx
className="bg-[#6C63FF] text-white px-4 py-2 rounded-xl 
           font-medium hover:bg-[#5a52d5] transition-colors
           disabled:opacity-50 disabled:cursor-not-allowed"
```
- **Padding** : 12px 16px
- **Border radius** : 12px
- **Font weight** : 500
- **States** : hover, active, disabled

### Secondary Button
```tsx
className="bg-white/5 text-white border border-white/10 
           px-4 py-2 rounded-xl font-medium 
           hover:bg-white/10 transition-colors"
```

### Ghost Button
```tsx
className="text-slate-400 hover:text-white 
           px-3 py-2 rounded-lg transition-colors"
```

### Icon Button
```tsx
className="p-2 hover:bg-white/5 rounded-lg transition-colors"
```

---

## 📦 COMPOSANTS

### Card KPI
```tsx
<div className="bg-[#1C1C1E] rounded-2xl p-6 border border-white/5">
  <div className="flex items-center justify-between mb-2">
    <span className="text-slate-400 text-sm">Label</span>
    <Icon />
  </div>
  <p className="text-3xl font-bold text-white">{value}</p>
</div>
```
- **Padding** : 24px
- **Border radius** : 16px
- **Border** : 1px solid rgba(255, 255, 255, 0.05)

### Planning Card (Shift)
```tsx
<div className="bg-[#1C1C1E] rounded-xl p-4 border border-white/5 
                hover:border-[#6C63FF]/30 transition-colors">
  <div className="flex items-center justify-between mb-2">
    <span className="font-medium text-white">Employee Name</span>
    <Badge status="published" />
  </div>
  <div className="text-sm text-slate-400">
    <span>09:00 - 17:00</span>
  </div>
</div>
```

### Input Field
```tsx
<input className="w-full bg-white/5 border border-white/10 
                  rounded-xl px-4 py-3 text-white 
                  placeholder:text-slate-500 
                  focus:outline-none focus:ring-2 focus:ring-[#6C63FF]/50" />
```

### Modal / Drawer
```tsx
<div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center">
  <div className="bg-[#1C1C1E] rounded-2xl p-6 max-w-md w-full 
                  border border-white/5 shadow-xl">
    {/* Content */}
  </div>
</div>
```

---

## 📱 RESPONSIVE BREAKPOINTS

```css
sm: 640px   /* Mobile landscape */
md: 768px   /* Tablet */
lg: 1024px  /* Desktop */
xl: 1280px  /* Large desktop */
```

### Mobile-First Approach
- **Base styles** : Mobile (< 640px)
- **sm:** : Mobile landscape
- **md:** : Tablet
- **lg:** : Desktop

---

## 🎭 ANIMATIONS

### Transitions
- **Default** : `transition-colors duration-200`
- **Fast** : `transition-all duration-150`
- **Smooth** : `transition-all duration-300 ease-in-out`

### Hover Effects
- **Cards** : `hover:border-[#6C63FF]/30`
- **Buttons** : `hover:bg-[#5a52d5]`
- **Links** : `hover:text-[#6C63FF]`

### Loading States
```tsx
<div className="size-10 border-4 border-[#6C63FF]/30 
                border-t-[#6C63FF] rounded-full animate-spin" />
```

---

## 🖼️ VUE DESKTOP (Employeur)

### Layout Structure
```
┌─────────────────────────────────────────┐
│  Sidebar (256px) │  Main Content       │
│                  │                      │
│  - Navigation    │  - Header            │
│  - User Info     │  - Page Content      │
│                  │  - Actions           │
└─────────────────────────────────────────┘
```

### Sidebar
- **Width** : 256px (desktop), hidden (mobile)
- **Background** : `#1C1C1E`
- **Border** : Right border `rgba(255, 255, 255, 0.05)`

### Main Content Area
- **Padding** : 32px (desktop), 16px (mobile)
- **Max width** : 1280px (centered)

---

## 📱 VUE MOBILE (Employé)

### Layout Structure
```
┌─────────────────┐
│  Header         │
├─────────────────┤
│                 │
│  Content        │
│  (Scrollable)   │
│                 │
├─────────────────┤
│  Bottom Nav     │
└─────────────────┘
```

### Bottom Navigation
- **Height** : 64px
- **Background** : `#1C1C1E`
- **Border** : Top border `rgba(255, 255, 255, 0.05)`
- **Icons** : 24px, Material Symbols
- **Active state** : `#6C63FF` color

---

## 🎯 COMPOSANTS SPÉCIFIQUES

### Schedule Week View
- **Grid** : 7 colonnes (jours) × N lignes (employés)
- **Cell** : Min height 80px
- **Shift card** : Hauteur dynamique selon durée
- **Colors** : Par poste (défini dans `positions.color`)

### Employee List
- **Row height** : 64px
- **Avatar** : 40px circle
- **Hover** : `bg-white/5`

### Time Off Request Card
- **Status badge** : 
  - PENDING: `bg-yellow-500/20 text-yellow-400`
  - APPROVED: `bg-green-500/20 text-green-400`
  - REJECTED: `bg-red-500/20 text-red-400`

---

## 📐 SPACING EXAMPLES

### Card Padding
- **Small card** : `p-4` (16px)
- **Medium card** : `p-6` (24px)
- **Large card** : `p-8` (32px)

### Section Spacing
- **Between sections** : `space-y-8` (32px)
- **Between cards** : `gap-4` (16px) ou `gap-6` (24px)

---

## 🎨 DARK MODE (Par défaut)

ShiftPilot utilise le dark mode par défaut pour une expérience moderne et professionnelle.

**Switch light/dark** : Optionnel, via `DarkModeToggle` component.

---

## 📚 RESSOURCES

- **Icons** : Material Symbols Outlined (Google Fonts)
- **Fonts** : Inter, IBM Plex Sans (Google Fonts)
- **Animations** : Framer Motion pour transitions complexes
- **Charts** : Recharts pour graphiques

---

## ✅ CHECKLIST DESIGN

- [x] Grille définie
- [x] Spacing scale
- [x] Typography scale
- [x] Couleurs primaires
- [x] Couleurs sémantiques
- [x] Styles de boutons
- [x] Composants de base
- [x] Responsive breakpoints
- [x] Animations
- [x] Layout desktop
- [x] Layout mobile

**Status** : Design system documenté et prêt à l'usage

