<div align="center">

<img src="https://img.shields.io/badge/platform-iOS%20%7C%20Android-5B8FD4?style=flat-square" />
<img src="https://img.shields.io/badge/built%20with-React%20Native%20%2B%20Expo-000000?style=flat-square&logo=expo" />
<img src="https://img.shields.io/badge/backend-Supabase-3ECF8E?style=flat-square&logo=supabase" />
<img src="https://img.shields.io/badge/status-in%20development-F0D44A?style=flat-square" />

# Auto-Attend

### Automatic attendance tracking for college students — no tapping required.

> 🚧 Work in progress — currently in UI design phase. Not yet functional.

</div>

---

## The problem

Every college student tracks attendance manually — opening an app after every class, tapping present or absent, trying to remember if they actually went. Most forget. Most lose track. And then week 12 arrives and they're below 75% with no way out.

Auto-Attend fixes this by tracking attendance automatically using your phone's GPS. You set your classroom location once. The app does the rest — silently, in the background, every single day.

---

## How it works

1. **Set up your schedule** — add subjects, class timings, and pin your classroom location once
2. **Carry your phone to class** — that's it
3. **Auto-Attend detects when you're inside the classroom** using a GPS geofence and marks you present automatically
4. **If something changes** — class cancelled, proxy, holiday — you update it manually in one tap
5. **Check your dashboard anytime** — see your attendance percentage per subject, how many classes you can still skip safely, and a full semester log

---

## Features

- Background geofencing using expo-task-manager — marks attendance silently even when the app is closed
- Per-subject attendance percentage with a live safe-skips calculator
- Manual override for cancelled classes, medical leave, and holidays
- At-risk alerts when any subject drops below 75%
- Monthly calendar view with per-day present / absent / cancelled breakdown
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
| Build & deploy | EAS Build + EAS Submit |

---

## Project structure

```
auto-attend/
├── frontend/
│   ├── app/
│   │   ├── (auth)/
│   │   │   ├── welcome.tsx
│   │   │   ├── login.tsx
│   │   │   └── signup.tsx
│   │   ├── (tabs)/
│   │   │   ├── index.tsx            # Home dashboard
│   │   │   ├── report.tsx           # Subject list + attendance %
│   │   │   ├── schedule.tsx         # Weekly timetable
│   │   │   └── settings.tsx         # Profile + preferences
│   │   ├── onboarding/
│   │   │   ├── college.tsx          # College search
│   │   │   ├── subjects.tsx         # Add subjects
│   │   │   ├── timetable.tsx        # Build timetable
│   │   │   └── notifications.tsx
│   │   └── subject/[id].tsx         # Subject detail + calendar
│   ├── components/
│   ├── lib/
│   │   ├── supabase.ts
│   │   ├── geofence.ts
│   │   └── attendance.ts
│   ├── tasks/
│   │   └── backgroundLocation.ts
│   └── types/
└── README.md
```

---

## Database schema (Supabase)

```sql
users                -- auth handled by Supabase
subjects             -- name, color, type, minimum_percentage
schedules            -- subject_id, day_of_week, start_time, end_time, room
classroom_locations  -- subject_id, latitude, longitude, radius_meters
attendance_records   -- subject_id, date, status (present/absent/cancelled/holiday)
```

---

## Roadmap

- [x] Project setup and architecture
- [ ] Auth flow (welcome, login, signup)
- [ ] Onboarding (college search, subjects, timetable, notifications)
- [ ] Home dashboard
- [ ] Report screen + subject detail + calendar view
- [ ] Schedule screen
- [ ] GPS geofencing + background attendance marking
- [ ] Supabase integration
- [ ] Voice schedule input (Groq Whisper)
- [ ] AI weekly summary
- [ ] Settings + safe-skips calculator
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

MIT

---

<div align="center">
  <sub>Built with React Native · Expo · Supabase</sub>
</div>
