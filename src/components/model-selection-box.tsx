import { Model, ModelLocation } from "@/app/api/models/model-types";
import { Dialog, DialogContent, DialogTrigger } from "./ui/dialog";
import { useState } from "react";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { Label } from "./ui/label";

export function ModelSelectionBox({
  model,
  setModel,
}: {
  model: Model;
  onClick: () => any;
  setModel: (m: Model) => any;
}) {
  const [location, setLocation] = useState<ModelLocation>("platform");
  const [dialogOpen, setDialogOpen] = useState(false);
  return (
    <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
      <DialogTrigger asChild>
        <Button
          variant="ghost"
          className={cn(
            "min-w-44 max-w-44 border flex flex-row items-center gap-4",
            model ? "justify-start" : "justify-center"
          )}
        >
          {model.id >= 0 ? (
            <>
              <Image
                src={model.imageUrl}
                alt="Model image"
                width={20}
                height={50}
              ></Image>
              <p className="w-full truncate text-start">{model.displayName}</p>
            </>
          ) : (
            <Label>Select</Label>
          )}
        </Button>
      </DialogTrigger>
      <DialogContent>Hello</DialogContent>
    </Dialog>
  );
}
