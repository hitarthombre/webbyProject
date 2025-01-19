import { create } from "zustand";

interface User {
  email: string;
  idToken: string;
  name: string;
  photoUrl: string;
}

interface UserState {
  user: User ;
  setUser: (user: User) => void;
  getUser: () => User;
  clearUser: () => void;
}

const userStore = create<UserState>((set, get) => ({
  user: { email: "", idToken: "", name: "", photoUrl: "" },
  setUser: (user) => set({ user }),
  getUser: () => get().user,
  clearUser: () => set({ user: { email: "", idToken: "", name: "", photoUrl: "" } }),
}));

export default userStore;
