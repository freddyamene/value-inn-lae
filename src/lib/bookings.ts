import { create } from "zustand";
import { persist } from "zustand/middleware";
import {
  addDays,
  getRoom,
  nightsBetween,
  todayPNG,
} from "@/lib/motel";

export type Draft = {
  checkIn: string;
  checkOut: string;
  guests: number;
  roomSlug: string;
  name: string;
  phone: string;
  email: string;
  notes: string;
  transfer: boolean;
};

export type Reservation = Draft & {
  id: string;
  createdAt: string;
  roomName: string;
  nights: number;
  total: number;
};

function freshDraft(): Draft {
  const checkIn = todayPNG();
  return {
    checkIn,
    checkOut: addDays(checkIn, 2),
    guests: 1,
    roomSlug: "",
    name: "",
    phone: "",
    email: "",
    notes: "",
    transfer: false,
  };
}

type Store = {
  draft: Draft;
  reservations: Reservation[];
  setDraft: (patch: Partial<Draft>) => void;
  resetDraft: () => void;
  submit: () => Reservation | null;
};

function reservationId(): string {
  const n = Math.floor(Math.random() * 9000) + 1000;
  return `VI-${todayPNG().replaceAll("-", "")}-${n}`;
}

export const useBookings = create<Store>()(
  persist(
    (set, get) => ({
      draft: freshDraft(),
      reservations: [],
      setDraft: (patch) =>
        set((state) => ({ draft: { ...state.draft, ...patch } })),
      resetDraft: () => set({ draft: freshDraft() }),
      submit: () => {
        const { draft } = get();
        const room = getRoom(draft.roomSlug);
        const nights = nightsBetween(draft.checkIn, draft.checkOut);
        if (!room || nights < 1 || !draft.name.trim() || !draft.phone.trim()) {
          return null;
        }
        const reservation: Reservation = {
          ...draft,
          id: reservationId(),
          createdAt: new Date().toISOString(),
          roomName: room.name,
          nights,
          total: nights * room.rate,
        };
        set((state) => ({
          reservations: [reservation, ...state.reservations],
          draft: {
            ...freshDraft(),
            roomSlug: draft.roomSlug,
            guests: draft.guests,
          },
        }));
        return reservation;
      },
    }),
    {
      name: "value-inn-bookings",
      partialize: (state) => ({ reservations: state.reservations }),
    },
  ),
);
