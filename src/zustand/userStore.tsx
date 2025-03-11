import { create } from "zustand";

interface Location {
  latitude: number;
  longitude: number;
}

interface User {
  _id: {
    $oid: string;
  };
  name: string;
  email: string;
  idToken: string;
  photoUrl: string;
  address: string;
  phoneNumber: string;
  location: Location;
  __v: number;
}

interface UserState {
  user: User;
  setUser: (user: User) => void;
  getUser: () => User;
  clearUser: () => void;
}

const userStore = create<UserState>((set, get) => ({
  user: {
    _id: { $oid: "" },
    name: "",
    email: "",
    idToken: "",
    photoUrl: "",
    address: "",
    phoneNumber: "",
    location: { latitude: 0, longitude: 0 },
    __v: 0,
  },
  setUser: (user) => set({ user }),
  getUser: () => get().user,
  clearUser: () =>
    set({
      user: {
        _id: { $oid: "" },
        name: "",
        email: "",
        idToken: "",
        photoUrl: "",
        address: "",
        phoneNumber: "",
        location: { latitude: 0, longitude: 0 },
        __v: 0,
      },
    }),
}));

export default userStore;