import { z } from "zod";
import {
  zBaseModelType,
  zLoraModel,
  zModel,
  zSampler,
  zScheduler,
} from "../models/model-types";

export const zPromptType = z.enum(["txt2img", "img2img"]);

export const zTxt2Img = z.object({
  posPrompt: z.string(),
  negPrompt: z.string(),
  baseModelType: zBaseModelType,
  batch: z.number().int().min(1).max(8),
  width: z.number().int().min(512).max(1024),
  height: z.number().int().min(512).max(1024),
  steps: z.number().int().min(1).max(200),
  cfg: z.number().min(0).max(20),
  seed: z.number(),
  sampler: zSampler,
  scheduler: zScheduler,
  model: zModel,
  vae: zModel,
  loras: zLoraModel.array(),
  embeddings: zLoraModel.array(),
});

export type PromptType = z.infer<typeof zPromptType>;
export type Txt2Img = z.infer<typeof zTxt2Img>;
