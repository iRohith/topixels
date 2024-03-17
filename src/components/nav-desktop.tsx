"use client";

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { ImgToolItems, NavItems, VidToolItems } from "@/lib/config";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { Separator } from "./ui/separator";
import { Card, CardContent } from "./ui/card";

export default function NavDesktop() {
  const path = usePathname();
  return (
    <NavigationMenu className="hidden md:block">
      <NavigationMenuList>
        {NavItems.map((menu) => (
          <NavigationMenuItem key={menu.name}>
            {menu.href ? (
              <Link href={menu.href} legacyBehavior passHref>
                <NavigationMenuLink
                  className={cn(
                    navigationMenuTriggerStyle(),
                    `${
                      path.startsWith(menu.href)
                        ? "bg-gray-500/20"
                        : "bg-transparent"
                    }`
                  )}
                >
                  {menu.name}
                </NavigationMenuLink>
              </Link>
            ) : (
              <>
                <NavigationMenuTrigger
                  className={
                    path.startsWith("/tools")
                      ? "bg-gray-500/20"
                      : "bg-transparent"
                  }
                >
                  {menu.name}
                </NavigationMenuTrigger>
                <NavigationMenuContent className="flex flex-row left-0">
                  <Card className="w-[50vw] h-[60vh] overflow-scroll">
                    <CardContent>
                      <h1 className="mt-5">Image generation</h1>
                      <ul className="grid gap-3 p-4 grid-cols-3">
                        {ImgToolItems.map((component) => (
                          <ListItem
                            key={component.id}
                            title={component.name}
                            href={component.id}
                          >
                            {component.description}
                          </ListItem>
                        ))}
                      </ul>
                      <Separator />
                      <h1 className="mt-5">Video generation</h1>
                      <ul className="grid gap-3 p-4 grid-cols-3">
                        {VidToolItems.map((component) => (
                          <ListItem
                            key={component.id}
                            title={component.name}
                            href={component.id}
                          >
                            {component.description}
                          </ListItem>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                </NavigationMenuContent>
              </>
            )}
          </NavigationMenuItem>
        ))}
      </NavigationMenuList>
    </NavigationMenu>
  );
}

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = "ListItem";
