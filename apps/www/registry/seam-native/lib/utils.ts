// Identical to the web `cn` — clsx + tailwind-merge are pure string utilities
// and work unchanged under Uniwind / NativeWind classNames. Kept as a separate
// native file so the native registry item is self-contained.
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
