// src/components/ui/Card.tsx
"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

type CardVariant = "default" | "soft" | "subtle" | "ghost" | "outline";
type AsProp<T extends React.ElementType> = { as?: T } & React.ComponentPropsWithoutRef<T>;

type BaseProps = {
  variant?: CardVariant;
  clickable?: boolean;
  inset?: boolean;
};

const variantClasses: Record<CardVariant, string> = {
  default: "bg-card border border-border/70 shadow-sm",
  soft: "bg-primary/5 border border-border/60",
  subtle: "bg-background/60 border border-border/50",
  ghost: "bg-transparent border border-transparent",
  outline: "bg-transparent border border-border/70"
};

export function Card<T extends React.ElementType = "div">({
  as,
  variant = "default",
  clickable = false,
  inset = false,
  className,
  ...props
}: AsProp<T> & BaseProps) {
  const Component = as || "div";
  return (
    <Component
      className={cn(
        "rounded-lg transition-colors",
        variantClasses[variant],
        clickable && "hover:bg-muted/50 cursor-pointer",
        inset && "p-4",
        className
      )}
      {...props}
    />
  );
}
