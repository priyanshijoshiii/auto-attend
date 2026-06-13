<div align="center">

<img src="https://img.shields.io/badge/platform-iOS%20%7C%20Android-5B8FD4?style=flat-square" />
<img src="https://img.shields.io/badge/built%20with-React%20Native%20%2B%20Expo-000000?style=flat-square&logo=expo" />
<img src="https://img.shields.io/badge/backend-Supabase-3ECF8E?style=flat-square&logo=supabase" />
<img src="https://img.shields.io/badge/status-in%20development-F0D44A?style=flat-square" />

# Auto-Attend

### Automatic attendance tracking for college students — no tapping required.

</div>

---

## The problem

Every college student in India tracks attendance manually — opening an app after every class, tapping present or absent, trying to remember if they actually went. Most forget. Most lose track. And then week 12 arrives and they're below 75% with no way out.

Attenda fixes this by tracking attendance automatically using your phone's GPS. You set your classroom location once. The app does the rest — silently, in the background, every single day.

---

## How it works

1. **Set up your schedule** — add subjects, class timings, and pin your classroom location once
2. **Carry your phone to class** — that's it
3. **Attenda detects when you're inside the classroom** using a GPS geofence and marks you present automatically
4. **If something changes** — class cancelled, proxy, holiday — you update it manually in one tap
5. **Check your dashboard anytime** — see your attendance percentage per subject, how many classes you can still skip safely, and a full semester log

---

## Features

- Automatic GPS-based attendance marking (background geofencing)
- Per-subject attendance percentage, live
- "Safe skips" calculator — know exactly how many more you can afford
- Manual override for cancelled classes, medical leave, holidays
- At-risk alerts when a subject drops below 75%
- Monthly calendar view with present / absent / cancelled markers
- AI-powered schedule setup — type your timetable in plain language
- Weekly AI summary of your attendance
- Full semester export

---

## Tech stack

| Layer | Technology |
|---|---|
| Mobile framework | React Native + Expo |
| Navigation | React Navigation (bottom tabs + stack) |
| Location & geofencing | expo-location + expo-task-manager |
| Notifications | expo-notifications |
| Backend & database | Supabase (PostgreSQL + Auth) |
| AI features | Gemini 1.5 Flash API |
| Build & deploy | EAS Build + EAS Submit |

---

## Project structure

```
AttendanceApp/
├── app/
│   ├── (auth)/
│   │   ├── onboarding.tsx
│   │   ├── login.tsx
│   │   └── setup.tsx
│   ├── (tabs)/
│   │   ├── index.tsx          # Home dashboard
│   │   ├── subjects.tsx       # Subject list
│   │   ├── calendar.tsx       # Monthly view
│   │   └── profile.tsx        # Settings & export
│   └── subject/[id].tsx       # Subject detail screen
├── components/
├── lib/
│   ├── supabase.ts
│   ├── geofence.ts
│   └── attendance.ts
├── tasks/
│   └── backgroundLocation.ts  # Geofence background task
└── types/
```

---

## Database schema (Supabase)

```sql
users            -- auth handled by Supabase
subjects         -- name, color, minimum_percentage
schedules        -- subject_id, day_of_week, start_time, end_time
classroom_locations  -- subject_id, latitude, longitude, radius_meters
attendance_records   -- subject_id, date, status (present/absent/cancelled/holiday)
```

---

## Getting started

### Prerequisites
- Node.js 18+
- Expo CLI (`npm install -g eas-cli`)
- Expo Go app on your phone
- A Supabase project (free tier works)

## Roadmap

- [x] Project setup and architecture
- [ ] Auth flow (onboarding, login, schedule setup)
- [ ] Core schedule management (add/edit subjects)
- [ ] GPS geofencing + background attendance marking
- [ ] Dashboard and subject detail screens
- [ ] Calendar view
- [ ] Supabase integration
- [ ] AI schedule input (Gemini)
- [ ] Weekly AI summary
- [ ] Export to PDF
- [ ] Play Store release
- [ ] App Store release

---

## Why this exists

Built by a college student who got tired of manually tracking attendance and missed the 75% cutoff one too many times. Also a learning project — this is my first React Native app, built from scratch while learning mobile development.

---

## License

MIT

---

<div align="center">
  <sub>Built with React Native · Expo · Supabase</sub>
</div>
