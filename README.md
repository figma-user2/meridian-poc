# Meridian

A two-screen banking app built from the Meridian Figma designs, using the same component library as the design file: [HeroUI v3](https://heroui.com) (HeroUI Figma Kit V3).

| Route        | Screen             | Figma frame                     |
| ------------ | ------------------ | ------------------------------- |
| `/dashboard` | Financial overview | Meridian • Financial dashboard  |
| `/workspace` | Client workspace   | Meridian • Client workspace     |

## Stack

- React 19 + TypeScript, Vite
- HeroUI v3 (`@heroui/react`, `@heroui/styles`) on Tailwind CSS v4
- Gravity UI icons (the icon set used by the HeroUI Figma kit)
- Recharts for the balance trend chart
- React Router for navigation

## Getting started

```bash
npm install
npm run dev
```

Other scripts: `npm run build`, `npm run preview`, `npm run typecheck`.

## Structure

```
src/
  styles/theme.css      HeroUI theme overrides (colours, radius, shadows) taken from Figma
  layout/               App shell: dark sidebar, application bar, mobile drawer
  components/           Shared pieces: PageHeader, Panel, SectionTabs, SegmentedToggle, StatusChip…
  features/dashboard/   Financial overview cards, chart and members table
  features/workspace/   Priority clients, task board, selected client, activity & notes
  pages/                Route-level screens
  data/                 Demo data
public/avatars/         Avatar images extracted from the Figma SVG export
```

All data is local demo data; there is no backend.
