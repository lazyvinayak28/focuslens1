import { db } from './firebase'
import {
  doc, getDoc, setDoc, updateDoc,
  collection, addDoc, getDocs,
  query, orderBy, serverTimestamp
} from 'firebase/firestore'

// ─── SETTINGS ───────────────────────────────────────────

export async function saveSettings(userId: string, settings: object) {
  await setDoc(doc(db, 'users', userId, 'data', 'settings'), settings, { merge: true })
}

export async function loadSettings(userId: string) {
  const snap = await getDoc(doc(db, 'users', userId, 'data', 'settings'))
  return snap.exists() ? snap.data() : null
}

// ─── CREDITS & REDEEMED PERKS ───────────────────────────

export async function saveCredits(userId: string, credits: number) {
  await setDoc(doc(db, 'users', userId, 'data', 'stats'), { credits }, { merge: true })
}

export async function loadCredits(userId: string): Promise<number> {
  const snap = await getDoc(doc(db, 'users', userId, 'data', 'stats'))
  return snap.exists() ? (snap.data().credits ?? 0) : 0
}

export async function saveRedeemed(userId: string, redeemed: string[]) {
  await setDoc(doc(db, 'users', userId, 'data', 'stats'), { redeemed }, { merge: true })
}

export async function loadRedeemed(userId: string): Promise<string[]> {
  const snap = await getDoc(doc(db, 'users', userId, 'data', 'stats'))
  return snap.exists() ? (snap.data().redeemed ?? []) : []
}

// ─── SESSIONS ────────────────────────────────────────────

export interface FocusSession {
  focusPercent: number
  focusedSecs: number
  distractedSecs: number
  totalSecs: number
  blinks: number
  lookAways: number
  createdAt?: any
}

export async function saveSession(userId: string, session: FocusSession) {
  await addDoc(collection(db, 'users', userId, 'sessions'), {
    ...session,
    createdAt: serverTimestamp()
  })
  // Also update aggregate stats
  const statsSnap = await getDoc(doc(db, 'users', userId, 'data', 'stats'))
  const existing = statsSnap.exists() ? statsSnap.data() : {}
  const totalSessions = (existing.totalSessions ?? 0) + 1
  const totalFocusSecs = (existing.totalFocusSecs ?? 0) + session.focusedSecs
  const bestFocus = Math.max(existing.bestFocus ?? 0, session.focusPercent)
  const perfectSessions = (existing.perfectSessions ?? 0) + (session.focusPercent >= 100 && session.totalSecs >= 300 ? 1 : 0)
  await setDoc(doc(db, 'users', userId, 'data', 'stats'), {
    totalSessions, totalFocusSecs, bestFocus, perfectSessions
  }, { merge: true })
}

export async function loadSessions(userId: string): Promise<FocusSession[]> {
  const q = query(collection(db, 'users', userId, 'sessions'), orderBy('createdAt', 'desc'))
  const snap = await getDocs(q)
  return snap.docs.map(d => ({ id: d.id, ...d.data() } as any))
}

// ─── FULL STATS (for achievements) ──────────────────────

export async function loadStats(userId: string) {
  const snap = await getDoc(doc(db, 'users', userId, 'data', 'stats'))
  return snap.exists() ? snap.data() : {
    totalSessions: 0, totalFocusSecs: 0,
    bestFocus: 0, credits: 0, perfectSessions: 0
  }
}