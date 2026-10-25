import { createNavigation } from "next-intl/navigation";
import { routing } from "./routing";

/** Locale-aware Link/router helpers — use these instead of next/link. */
export const { Link, redirect, permanentRedirect, usePathname, useRouter, getPathname } = createNavigation(routing);
