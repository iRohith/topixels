import { z } from "zod";

export const zBaseModelType = z.enum(["sd1.5", "sdxl", "sc"]);
export const zModelType = z.enum(["checkpoint", "lora", "embedding", "vae"]);
export const zModelExt = z.enum(["safetensors", "ckpt", "bin"]);
export const zModelLocation = z.enum([
  "platform",
  "community",
  "user",
  "favorites",
]);
export const zBoolean = z.enum(["true", "false"]);
export const zSortBy = z.enum(["created_asc", "created_dsc", "favorites_dsc"]);
export const zSampler = z.enum([
  "euler",
  "heun",
  "heunpp2",
  "dpm_2",
  "lms",
  "dpm_fast",
  "dpm_adaptive",
  "dpmpp_sde",
  "dpmpp_2m",
  "dpmpp_2m_sde",
  "dpmpp_3m",
  "dpmpp_3m_sde",
  "ddpm",
  "lcm",
  "ddim",
  "uni_pc",
  "uni_pc_bh2",
]);
export const zScheduler = z.enum([
  "normal",
  "karras",
  "exponential",
  "sgm_uniform",
  "simple",
  "ddim_uniform",
]);

export const zModel = z.object({
  id: z.number(),
  displayName: z
    .string()
    .min(5)
    .regex(/^(?![-._])[a-zA-Z0-9_-]+(?<![-._])$/),
  description: z.string(),
  url: z.string().url(),
  imageUrl: z.string().url(),
  baseModelType: zBaseModelType,
  type: zModelType,
  ext: zModelExt,
  location: zModelLocation,
  createdBy: z.string(),
  createdAt: z.date(),
  favoriteCount: z.number(),
  favoritedByUser: z.boolean(),
});

export const zLoraModel = zModel.extend({
  weight: z.number(),
});

export const zModelGetParams = z
  .object({
    search: z.string(),
    location: zModelLocation,
    baseModelType: zBaseModelType,
    type: zModelType,
    favorite: z
      .string()
      .toLowerCase()
      .transform((x) => x === "true")
      .pipe(z.boolean()),
    page: z.coerce.number(),
    perPage: z.coerce.number(),
    sortBy: zSortBy,
  })
  .partial();

export const zCreateModel = zModel
  .omit({
    id: true,
    createdAt: true,
    createdBy: true,
    favoriteCount: true,
    favoritedByUser: true,
  })
  .partial()
  .required({
    url: true,
    displayName: true,
    baseModelType: true,
    ext: true,
    location: true,
    type: true,
  });

export const zUpdateModel = zModel
  .omit({
    createdAt: true,
    createdBy: true,
    favoriteCount: true,
    favoritedByUser: true,
  })
  .partial()
  .required({
    id: true,
  });

export type UpdateModel = z.infer<typeof zUpdateModel>;
export type CreateModel = z.infer<typeof zCreateModel>;
export type BaseModelType = z.infer<typeof zBaseModelType>;
export type ModelType = z.infer<typeof zModelType>;
export type ModelExt = z.infer<typeof zModelExt>;
export type ModelLocation = z.infer<typeof zModelLocation>;
export type Model = z.infer<typeof zModel>;
export type LoraModel = z.infer<typeof zLoraModel>;
export type Boolean = z.infer<typeof zBoolean>;
export type SortBy = z.infer<typeof zSortBy>;
export type ModelGetParams = z.infer<typeof zModelGetParams>;
export type Sampler = z.infer<typeof zSampler>;
export type Scheduler = z.infer<typeof zScheduler>;
