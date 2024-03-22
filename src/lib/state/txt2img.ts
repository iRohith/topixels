import { Txt2Img } from "@/app/api/prompts/prompt-types";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { defaultModel, nullModel } from "../config";

interface Txt2ImgState extends Txt2Img {
  coinCost: number;
  history: (Txt2Img & { outputs: string[] })[];
  updateCoinCost: () => any;
  setParams: (val: Partial<Txt2Img>) => any;
}

export const useTxt2ImgState = create<Txt2ImgState>()(
  persist(
    (set, get) => ({
      posPrompt: "",
      negPrompt: "",
      baseModelType: "sd1.5",
      batch: 4,
      width: 512,
      height: 512,
      steps: 25,
      cfg: 7.0,
      seed: -1,
      sampler: "euler",
      scheduler: "normal",
      model: defaultModel,
      vae: nullModel,
      embeddings: [],
      loras: [],
      coinCost: 1,
      history: [],
      updateCoinCost: () => {
        const t = get();
        let tokens =
          Math.max(1, Math.ceil(t.batch / 2)) *
          Math.max(1, Math.floor(Math.max(t.width, t.height) / 512)) *
          Math.max(1, Math.ceil(t.steps / 25));
        if (t.baseModelType == "sdxl") tokens *= 2;
        else if (t.baseModelType == "sc") tokens *= 4;
        tokens = Math.ceil(tokens);
        set({ coinCost: tokens });
      },
      setParams: (val: Partial<Txt2Img>) => {
        set(val);
        get().updateCoinCost();
      },
    }),
    {
      name: "txt2img-state",
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);
