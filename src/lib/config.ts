import { LoraModel, Model } from "@/app/api/models/model-types";

export const APP_NAME = "topixels";

export const NavItems: { name: string; href?: string }[] = [
  {
    name: "Home",
    href: "/",
  },
  {
    name: "Tools",
  },
  {
    name: "Pricing",
    href: "/pricing",
  },
  {
    name: "Contact Us",
    href: "/contact",
  },
];

export const ImgToolItems: {
  id: string;
  name: string;
  description: string;
}[] = [
  {
    id: "txt2img",
    name: "Text to Image",
    description: "Convert text to image",
  },
  {
    id: "img2img",
    name: "Image to Image",
    description: "Start from an initial image and convert it to another image",
  },
  {
    id: "inpaint",
    name: "Inpaint",
    description: "Mask a part of an image and replace it",
  },
  {
    id: "outpaint",
    name: "Outpaint",
    description: "Extend boundaries of an image",
  },
  {
    id: "upscale",
    name: "Upscale",
    description: "Increase resolution of an image by upscaling",
  },
  {
    id: "control_net",
    name: "Control Net",
    description: "Control generation using structures of other images",
  },
  {
    id: "ipadapter",
    name: "IP Adapter",
    description: "Generate images with text + image prompt",
  },
  {
    id: "controlface",
    name: "Control Face",
    description:
      "Generate images with a custom face using PhotoMaker/InstantID",
  },
  {
    id: "magic_mix",
    name: "Magic Mix",
    description: "Convert images to other styles preserving original style",
  },
];

export const VidToolItems: {
  id: string;
  name: string;
  description: string;
}[] = [
  {
    id: "txt2vid",
    name: "Text to video",
    description: "Generate video from a text prompt",
  },
  {
    id: "img2vid",
    name: "Image to Video",
    description:
      "Generate video from a text prompt starting from an initial image",
  },
  {
    id: "vid2vid",
    name: "Video to Video",
    description:
      "Generate video from a text prompt following another video as base",
  },
];

export const nullModel: Model = {
  createdAt: new Date(),
  createdBy: "",
  description: "",
  displayName: "",
  favoriteCount: 0,
  id: -1,
  imageUrl:
    "https://imagedelivery.net/9UaeqBrXzrQ9mC5U6QFATQ/9fd6401f-cb5c-4d3f-4f9f-15fb7d76e600/public",
  location: "platform",
  type: "checkpoint",
  url: "",
  ext: "safetensors",
  baseModelType: "sd1.5",
  favoritedByUser: false,
};

export const defaultModel: Model = {
  createdAt: new Date(),
  createdBy: "topixels",
  description: "Dreamshaper 8",
  displayName: "dreamshaper_8",
  favoriteCount: 0,
  id: 0,
  imageUrl:
    "https://imagedelivery.net/9UaeqBrXzrQ9mC5U6QFATQ/fcda0b56-33ae-45e0-0ec2-f3c9b4740b00/public",
  location: "platform",
  type: "checkpoint",
  url: "",
  ext: "safetensors",
  baseModelType: "sd1.5",
  favoritedByUser: false,
};

export const nullLora: LoraModel = { ...nullModel, type: "lora", weight: 0 };
