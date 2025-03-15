import { create } from "zustand";

interface Location {
  shopNo: string;
  floorNo: string;
  area: string;
  city: string;
}

interface Time {
  open: string;
  close: string;
}

interface Restaurant {
  _id: {
    $oid: string;
  };
  restaurantName: string;
  ownerName: string;
  email: string;
  phone: string;
  password: string;
  location: Location;
  time: Time;
  cuisine: string;
  resetPasswordToken?: string;
  resetPasswordExpire?: Date;
  createdAt: Date;
  image: string[];
  rating?: string;
  description: string;
  promoted: boolean;
}

interface RestaurantState {
  restaurants: Restaurant[];
  setRestaurants: (restaurants: Restaurant[]) => void;
  getRestaurants: () => Restaurant[];
  clearRestaurants: () => void;
}

const restaurantStore = create<RestaurantState>((set, get) => ({
  restaurants: [],
  setRestaurants: (restaurants) => set({ restaurants }),
  getRestaurants: () => get().restaurants,
  clearRestaurants: () => set({ restaurants: [] }),
}));

export default restaurantStore;
