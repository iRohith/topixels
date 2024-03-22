"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Separator } from "@/components/ui/separator";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import {
  GeneratePrompt,
  RandomOptions,
  RandomType,
} from "@/lib/random-prompt-generator";
import { useRandomButtonState } from "@/lib/state/random-button";
import { cn } from "@/lib/utils";
import { Dice5 } from "lucide-react";
import { useShallow } from "zustand/react/shallow";

export const RandomPromptButton = ({
  className,
  onGotPrompt,
}: {
  className?: string;
  onGotPrompt: (prompt: string) => void;
}) => {
  const { randomType, randomOptions, setRandomType, setRandomOptions } =
    useRandomButtonState(
      useShallow((state) => ({
        randomType: state.randomParams.type,
        randomOptions: state.randomParams.options,
        setRandomType: state.setRandomType,
        setRandomOptions: state.setRandomOptions,
      }))
    );

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant={"ghost"} className={cn("p-2", className)}>
          <Dice5 size={38} />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-72 p-2">
        <Button
          className="w-full p-4 mb-2"
          onClick={() => {
            onGotPrompt(GeneratePrompt());
          }}
        >
          Generate
        </Button>
        <ToggleGroup
          type="single"
          value={randomType}
          onValueChange={(v) => {
            if (v) {
              setRandomType(v as RandomType);
            }
          }}
        >
          <ToggleGroupItem value="random">Random</ToggleGroupItem>
          <ToggleGroupItem value="portrait">Portrait</ToggleGroupItem>
          <ToggleGroupItem value="landscape">Landscape</ToggleGroupItem>
        </ToggleGroup>
        <Separator className="my-2" />
        <ToggleGroup
          type="multiple"
          value={randomOptions}
          onValueChange={(v) => {
            setRandomOptions(v as RandomOptions[]);
          }}
        >
          <div className="w-full flex flex-wrap gap-2">
            <ToggleGroupItem
              className={randomType != "landscape" ? "" : "hidden"}
              value="objects"
            >
              Objects
            </ToggleGroupItem>
            <ToggleGroupItem
              className={randomType == "landscape" ? "hidden" : ""}
              value="places"
            >
              Places
            </ToggleGroupItem>
            <ToggleGroupItem value="artists">Artists</ToggleGroupItem>
            <ToggleGroupItem value="styles">Styles</ToggleGroupItem>
            <ToggleGroupItem value="colors">Colors</ToggleGroupItem>
            <ToggleGroupItem value="adjectives">Adjectives</ToggleGroupItem>
            <ToggleGroupItem
              className={randomType == "landscape" ? "hidden" : ""}
              value="elements"
            >
              Elements
            </ToggleGroupItem>
            <ToggleGroupItem value="improvers">Improvers</ToggleGroupItem>
            <ToggleGroupItem
              className={randomType == "landscape" ? "hidden" : ""}
              value="prefixes"
            >
              Prefixes
            </ToggleGroupItem>
            <ToggleGroupItem
              className={randomType == "landscape" ? "hidden" : ""}
              value="suffixes"
            >
              Suffixes
            </ToggleGroupItem>
          </div>
        </ToggleGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
