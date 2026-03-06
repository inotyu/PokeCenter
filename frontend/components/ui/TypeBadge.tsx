import { PokemonType } from "@/types";
import { TYPE_COLORS } from "@/lib/utils";
import { cn } from "@/lib/utils";

interface TypeBadgeProps {
  type: PokemonType;
  size?: "sm" | "md";
}

export function TypeBadge({ type, size = "md" }: TypeBadgeProps) {
  const colors = TYPE_COLORS[type];
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full font-semibold border capitalize",
        colors.bg, colors.text, colors.border,
        size === "sm" ? "px-2 py-0.5 text-[10px]" : "px-3 py-1 text-xs"
      )}
    >
      {type}
    </span>
  );
}
