"use client";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Coins } from "lucide-react";
import { RandomPromptButton } from "./random-prompt-button";

export const PromptBox = ({
  posPrompt,
  negPrompt,
  setPosPrompt,
  setNegPrompt,
  onGenerateClick,
  hideNeg = false,
  hideRand = false,
  coinCost = 0,
}: {
  posPrompt: string;
  negPrompt: string;
  setPosPrompt: (v: string) => void;
  setNegPrompt: (v: string) => void;
  onGenerateClick: () => void;
  hideNeg?: boolean;
  hideRand?: boolean;
  coinCost?: number;
}) => {
  return (
    <div className="flex flex-col w-full items-center">
      <div className="w-full flex flex-row">
        <div className="w-full h-fit relative">
          <Textarea
            placeholder="Positive Prompt (supports comfyui weighting style)"
            className="h-10 max-h-60 pr-20"
            value={posPrompt}
            onChange={(e) => {
              setPosPrompt(e.target.value);
            }}
          />
          {hideRand !== true && (
            <RandomPromptButton
              className="absolute top-1/2 right-4 transform -translate-y-1/2"
              onGotPrompt={(prompt) => {
                setPosPrompt(prompt);
              }}
            />
          )}
        </div>
      </div>
      {hideNeg !== true && (
        <Textarea
          placeholder="Negative Prompt"
          className="h-10 max-h-60 my-2"
          value={negPrompt}
          onChange={(e) => {
            setNegPrompt(e.target.value);
          }}
        />
      )}
      <Button
        className="flex flex-row gap-2 m-2 w-fit"
        onClick={onGenerateClick}
      >
        Generate
        <Coins size={12} />
        {coinCost}
      </Button>
    </div>
  );
};
