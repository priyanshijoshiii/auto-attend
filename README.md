<div align="center">

<img src="https://img.shields.io/badge/platform-iOS%20%7C%20Android-5B8FD4?style=flat-square" />
<img src="https://img.shields.io/badge/built%20with-React%20Native%20%2B%20Expo-000000?style=flat-square&logo=expo" />
<img src="https://img.shields.io/badge/backend-Supabase-3ECF8E?style=flat-square&logo=supabase" />
<img src="https://img.shields.io/badge/status-in%20development-F0D44A?style=flat-square" />

# Auto-Attend

### Automatic attendance tracking for college students — no tapping required.

> 🚧 Work in progress — screens being built. Not yet functional.

</div>

---

## The problem

Every college student in India tracks attendance manually — opening an app after every class, tapping present or absent, trying to remember if they actually went. Most forget. Most lose track. And then week 12 arrives and they're below 75% with no way out.

Auto-Attend fixes this by tracking attendance automatically using your phone's GPS. You set your classroom location once. The app does the rest — silently, in the background, every single day.

---

## How it works

1. **Set up your schedule** — add subjects, class timings, and pin your classroom location once
2. **Carry your phone to class** — that's it
3. **Auto-Attend detects when you're inside the classroom** using a GPS geofence and marks you present automatically
4. **If something changes** — class cancelled, proxy, holiday — you update it manually in one tap
5. **Check your dashboard anytime** — see your attendance percentage per subject and a full semester log

---

## UI Reference

The visual design is prototyped in React + Lovable and deployed at:
**[campus-track-hero.lovable.app](https://campus-track-hero.lovable.app)**

All React Native screens are built to match this reference.

---

## Features

- Background geofencing using expo-task-manager — marks attendance silently even when the app is closed
- Per-subject attendance percentage, live
- Manual override for cancelled classes, medical leave, and holidays
- At-risk alerts when any subject drops below 75%
- Monthly calendar view with per-day present / absent / cancelled breakdown

---

## Tech stack

| Layer | Technology |
|---|---|
| Mobile framework | React Native + Expo (SDK 56) |
| Navigation | Expo Router (file-based) |
| Location & geofencing | expo-location + expo-task-manager |
| Notifications | expo-notifications |
| Backend & database | Supabase (PostgreSQL + Auth) |
| Global state | Zustand |
| Build & deploy | EAS Build + EAS Submit |

---

## Design system

All visual decisions live in three files — never hardcode values anywhere else:

| File | What it controls |
|---|---|
| `constants/colors.ts` | Full color palette, attendance status colors |
| `constants/typography.ts` | Font sizes, weights, line heights |
| `constants/layout.ts` | Spacing scale, border radius, screen padding |

Color palette is inspired by a soft blue + warm yellow + off-white aesthetic — friendly, clean, student-focused.

---

## Project structure

```
auto-attend/
├── frontend/
│   ├── app/
│   │   ├── (auth)/
│   │   │   ├── welcome.tsx          # Landing screen
│   │   │   ├── login.tsx
│   │   │   └── signup.tsx
│   │   ├── onboarding/
│   │   │   ├── college.tsx          # College search
│   │   │   ├── subjects.tsx         # Add subjects
│   │   │   ├── timetable.tsx        # Build timetable
│   │   │   └── notifications.tsx
│   │   ├── (tabs)/
│   │   │   ├── index.tsx            # Home dashboard
│   │   │   ├── report.tsx           # Subject list + attendance %
│   │   │   ├── schedule.tsx         # Weekly timetable
│   │   │   └── settings.tsx         # Profile + preferences
│   │   └── subject/[id].tsx         # Subject detail + calendar
│   ├── components/
│   │   ├── ui/                      # Reusable visual components
│   │   └── layout/                  # Screen wrappers, tab bar
│   ├── constants/                   # Design system
│   ├── hooks/                       # Custom React hooks
│   ├── lib/                         # Supabase, geofence, notifications
│   ├── store/                       # Zustand global state
│   ├── tasks/                       # Background location task
│   ├── types/                       # Shared TypeScript types
│   └── utils/                       # Pure helper functions
└── README.md
```

---

## Database schema

```sql
users                -- auth handled by Supabase
subjects             -- name, color, type, minimum_percentage
schedules            -- subject_id, day_of_week, start_time, end_time, room
classroom_locations  -- subject_id, latitude, longitude, radius_meters
attendance_records   -- subject_id, date, status (present/absent/cancelled/holiday)
```

---

## Branch workflow

```
feature/screen-name  →  PR + review  →  dev  →  PR  →  main
```

- All development happens on `feature/` branches cut from `dev`
- PRs are opened into `dev` and reviewed before merging
- `dev` is merged into `main` only when a full working version is ready
- `main` is always stable

---

## Getting started

### Prerequisites
- Node.js 18+
- Expo Go app on your phone ([Android](https://play.google.com/store/apps/details?id=host.exp.exponent) / [iOS](https://apps.apple.com/app/expo-go/id982107779))

### Setup

```bash
git clone https://github.com/priyanshijoshiii/auto-attend.git
cd auto-attend/frontend
npm install
cp .env.example .env        # fill in your Supabase keys
npx expo start
```

Scan the QR code with Expo Go. The app loads instantly on your phone.

### Environment variables

```env
EXPO_PUBLIC_SUPABASE_URL=your_supabase_project_url
EXPO_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

---

## Contributing

This project is being built collaboratively. If you've been added as a contributor:

1. Cut a branch from `dev` — `git checkout -b feature/your-screen-name dev`
2. Build your assigned screen referencing the [UI reference](https://campus-track-hero.lovable.app)
3. Use only values from `constants/` — no hardcoded colors or sizes
4. Open a PR into `dev` with the PR template filled out
5. Wait for review before merging

See open [Issues](https://github.com/priyanshijoshiii/auto-attend/issues) for available tasks.

---

## Roadmap

- [x] Project setup and architecture
- [x] Design system (colors, typography, layout)
- [x] Routing and navigation structure
- [x] TypeScript types
- [ ] Auth screens (welcome, login, signup)
- [ ] Onboarding flow
- [ ] Home dashboard
- [ ] Report screen + subject detail + calendar view
- [ ] Schedule screen
- [ ] GPS geofencing + background attendance marking
- [ ] Supabase integration
- [ ] Voice schedule input (Groq Whisper)
- [ ] Settings screen
- [ ] Play Store release
- [ ] App Store release

---

## Why this exists

Noticed that almost every student around me was stressing about attendance —
not because they weren't attending, but because manually tracking it is a mess.
Missed a log here, forgot to update there, and suddenly you're doing panic maths
at the end of the semester. There's clearly a gap, and this is my attempt at
fixing it. Also my first React Native app — building and learning at the same time.

---

## License

See [LICENSE](./LICENSE).

---

<div align="center">
  <sub>Built with React Native · Expo · Supabase</sub>
</div>
