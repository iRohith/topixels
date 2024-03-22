import { create } from "zustand";
import {
  RandomOptions,
  RandomParams,
  RandomType,
} from "../random-prompt-generator";
import { createJSONStorage, persist } from "zustand/middleware";
import { produce } from "immer";

interface RandomButtonState {
  randomParams: RandomParams;

  setRandomType: (val: RandomType) => void;
  setRandomOptions: (val: RandomOptions[]) => void;
}

export const useRandomButtonState = create<RandomButtonState>()(
  persist(
    (set, get) => ({
      randomParams: {
        type: "random",
        options: [
          "objects",
          "places",
          "artists",
          "styles",
          "colors",
          "adjectives",
          "elements",
          "improvers",
          "prefixes",
          "suffixes",
        ],
      },
      setRandomType: (val: RandomType) =>
        set(
          produce((s) => {
            s.randomParams.type = val;
          })
        ),
      setRandomOptions: (val: RandomOptions[]) =>
        set(
          produce((s) => {
            s.randomParams.options = val;
          })
        ),
    }),
    {
      name: "generate-state",
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);
