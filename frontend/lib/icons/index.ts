import {
  ArrowLeft,
  Check,
  ChevronDown,
  ChevronUp,
  Info,
  MoonStar,
  Sun,
  XIcon,
  type LucideIcon,
} from "lucide-react-native";
import { SvgProps } from "react-native-svg";

import IconCartFilled from "~/assets/icons/filled/cart.svg";
import IconHeartFilled from "~/assets/icons/filled/heart.svg";
import IconHomeFilled from "~/assets/icons/filled/home.svg";
import IconLocationFilled from "~/assets/icons/filled/location.svg";
import IconProfileFilled from "~/assets/icons/filled/profile.svg";
import IconSearchFilled from "~/assets/icons/filled/search.svg";
import IconBottomwear from "~/assets/icons/outline/bottomwear.svg";
import IconCart from "~/assets/icons/outline/cart.svg";
import IconClipboard from "~/assets/icons/outline/clipboard.svg";
import IconHeart from "~/assets/icons/outline/heart.svg";
import IconHome from "~/assets/icons/outline/home.svg";
import IconLogout from "~/assets/icons/outline/logout.svg";
import IconMen from "~/assets/icons/outline/men.svg";
import IconNotification from "~/assets/icons/outline/notification.svg";
import IconOptions from "~/assets/icons/outline/options.svg";
import IconPayment from "~/assets/icons/outline/payment.svg";
import IconProfile from "~/assets/icons/outline/profile.svg";
import IconRecent from "~/assets/icons/outline/recent.svg";
import IconSearch from "~/assets/icons/outline/search.svg";
import IconSetting from "~/assets/icons/outline/setting.svg";
import IconShare from "~/assets/icons/outline/share.svg";
import IconTopwear from "~/assets/icons/outline/topwear.svg";
import IconWomen from "~/assets/icons/outline/women.svg";
import IconLoader from "~/assets/icons/special/loader.svg";
import IconUpload from "~/assets/icons/special/upload.svg";

import { iconWithClassName } from "./iconWithClassName";

iconWithClassName(MoonStar);
iconWithClassName(Info);
iconWithClassName(Sun);
iconWithClassName(ArrowLeft);
iconWithClassName(Check);
iconWithClassName(ChevronDown);
iconWithClassName(ChevronUp);
iconWithClassName(XIcon);

iconWithClassName(IconCartFilled);
iconWithClassName(IconHomeFilled);
iconWithClassName(IconProfileFilled);
iconWithClassName(IconSearchFilled);
iconWithClassName(IconLocationFilled);
iconWithClassName(IconHeartFilled);

iconWithClassName(IconShare);
iconWithClassName(IconHome);
iconWithClassName(IconOptions);
iconWithClassName(IconSearch);
iconWithClassName(IconHeart);
iconWithClassName(IconCart);
iconWithClassName(IconProfile);
iconWithClassName(IconNotification);
iconWithClassName(IconClipboard);
iconWithClassName(IconLogout);
iconWithClassName(IconSetting);
iconWithClassName(IconPayment);
iconWithClassName(IconMen);
iconWithClassName(IconWomen);
iconWithClassName(IconTopwear);
iconWithClassName(IconBottomwear);
iconWithClassName(IconRecent);

iconWithClassName(IconLoader);
iconWithClassName(IconUpload);

export {
  MoonStar,
  Info,
  Sun,
  ArrowLeft,
  Check,
  ChevronDown,
  ChevronUp,
  XIcon,
  IconCartFilled,
  IconHomeFilled,
  IconProfileFilled,
  IconSearchFilled,
  IconLocationFilled,
  IconHeartFilled,
  IconShare,
  IconHome,
  IconOptions,
  IconSearch,
  IconHeart,
  IconCart,
  IconProfile,
  IconNotification,
  IconClipboard,
  IconLogout,
  IconSetting,
  IconPayment,
  IconMen,
  IconWomen,
  IconTopwear,
  IconBottomwear,
  IconRecent,
  IconLoader,
  IconUpload,
};

export type IconFC = React.FC<SvgProps> | LucideIcon;
