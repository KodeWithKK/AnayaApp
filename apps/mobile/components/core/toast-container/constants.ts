import { Check, Info, XIcon } from "@/lib/icons";

export const toastMap = {
  success: {
    icon: Check,
    toastBg: "bg-emerald-500/20",
    iconBg: "bg-emerald-500",
  },
  info: {
    icon: Info,
    toastBg: "bg-blue-600/20",
    iconBg: "bg-blue-600",
  },
  warning: {
    icon: Info,
    toastBg: "bg-amber-600/20",
    iconBg: "bg-amber-600",
  },
  error: {
    icon: XIcon,
    toastBg: "bg-red-500/20",
    iconBg: "bg-red-500",
  },
};
