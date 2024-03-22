"use client";

import { ModelSelectionBox } from "@/components/model-selection-box";
import { PromptBox } from "@/components/prompt-box";
import { Button } from "@/components/ui/button";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { useTxt2ImgState } from "@/lib/state/txt2img";
import Image from "next/image";
import { useEffect } from "react";
import { useShallow } from "zustand/react/shallow";

export default function Page() {
  const t = useTxt2ImgState(useShallow((s) => s));

  useEffect(() => {
    t.updateCoinCost();
  }, [t]);

  return (
    <ResizablePanelGroup direction="horizontal" className="w-full h-full">
      <ResizablePanel
        minSize={25}
        defaultSize={100 - 18}
        className="p-5 min-h-full"
      >
        <PromptBox
          posPrompt={t.posPrompt}
          negPrompt={t.negPrompt}
          onGenerateClick={() => {}}
          setPosPrompt={(v) => {
            t.setParams({ posPrompt: v });
          }}
          setNegPrompt={(v) => {
            t.setParams({ negPrompt: v });
          }}
          coinCost={t.coinCost}
        />
        <Separator />
        <ResizablePanelGroup direction="horizontal" className="w-full h-full">
          <ResizablePanel
            minSize={30}
            defaultSize={60}
            className="p-5 min-h-full flex flex-col"
          >
            <div className="flex flex-wrap">
              <div className="flex flex-col border gap-4 p-2">
                Checkpoint
                <ModelSelectionBox
                  model={t.model}
                  onClick={() => {}}
                  setModel={(m) => t.setParams({ model: m })}
                />
              </div>
            </div>
          </ResizablePanel>
          <ResizableHandle withHandle />
          <ResizablePanel
            minSize={20}
            defaultSize={40}
            className="p-5 min-h-full"
          ></ResizablePanel>
        </ResizablePanelGroup>
      </ResizablePanel>
      <ResizableHandle withHandle />
      <ResizablePanel minSize={8} defaultSize={18} className="p-5 min-h-full">
        <div className="flex w-full justify-center mb-2">History</div>
        <Separator />
        {t.history.length === 0 ? (
          <div className="flex w-full h-full items-center justify-center">
            Nothings here!
          </div>
        ) : (
          <ScrollArea className="w-full h-full flex flex-wrap">
            {t.history.map((v, i) => {
              const gridSize =
                v.outputs.length <= 1 ? 1 : v.outputs.length <= 4 ? 2 : 3;
              return (
                <Button
                  asChild
                  onClick={() => {
                    t.setParams(v);
                  }}
                  key={`hb_${i}`}
                >
                  <div
                    className={`min-w-52 max-w-52 grid grid-cols-${gridSize}`}
                  >
                    {v.outputs.map((o, j) => (
                      <Image
                        key={`img_${j}`}
                        src={o}
                        alt={v.posPrompt}
                        width={v.width}
                        height={v.height}
                      />
                    ))}
                  </div>
                </Button>
              );
            })}
          </ScrollArea>
        )}
      </ResizablePanel>
    </ResizablePanelGroup>
  );
}
