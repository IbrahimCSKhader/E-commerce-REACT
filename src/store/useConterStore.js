import { create } from "zustand";

const useConterStore = create((set) => ({
  counter: 4,
 increase: (x) =>
  set((state) => ({
    counter: state.counter+x
  })),
  decrease:()=>set((state) =>({
    counter:--state.counter
  }))
}));

export default useConterStore;