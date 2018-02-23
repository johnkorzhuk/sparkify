import {
  Tech,
  Audio,
  Books,
  Services,
  Gaming,
  Clothing,
  Other,
} from "./components/icons/category"

import {
  Facebook,
  Rafflecopter,
  Gleam,
  GiveawayTools,
  KingSumo,
  Instagram,
  Twitter,
  Youtube,
  EmailSubscription,
  CommentEntry,
} from "./components/icons/types"

export const AUTHED_ROUTES = ["/giveaways", "/profile", "/submit"]

export const LOCATIONS = ["U.S.A", "Canada", "Mexico", "Europe", "Worldwide"]

export const CATEGORY_RESOURCES = {
  tech: {
    gradient:
      "background-image: linear-gradient(147deg, #FFE53B 0%, #FF2525 74%)",
    Icon: Tech,
    label: "Tech",
  },
  audio: {
    gradient:
      "background-image: linear-gradient(19deg, #21D4FD 0%, #B721FF 100%)",
    Icon: Audio,
    label: "Audio",
  },
  books: {
    gradient:
      "background-image: linear-gradient(43deg, #4158D0 0%, #C850C0 46%, #FFCC70 100%)",
    Icon: Books,
    label: "Books",
  },
  services: {
    gradient:
      "background-image: linear-gradient(90deg, #FEE140 0%, #FA709A 100%)",
    Icon: Services,
    label: "Services",
  },
  gaming: {
    gradient:
      "background-image: linear-gradient(62deg, #FBAB7E 0%, #F7CE68 100%)",
    Icon: Gaming,
    label: "Gaming",
  },
  clothing: {
    gradient:
      "background-image: linear-gradient(45deg, #FA8BFF 0%, #2BD2FF 52%, #2BFF88 90%)",
    Icon: Clothing,
    label: "Clothing",
  },
  other: {
    gradient:
      "background-image: linear-gradient(160deg, #0093E9 0%, #80D0C7 100%)",
    Icon: Other,
    label: "Other",
  },
}

export const TYPE_RESOURCES = {
  rafflecopter: {
    Icon: Rafflecopter,
    label: "Rafflecopter",
  },
  gleam: {
    Icon: Gleam,
    label: "Gleam",
  },
  giveawayTools: {
    Icon: GiveawayTools,
    label: "Giveaway Tools",
  },
  kingSumo: {
    Icon: KingSumo,
    label: "KingSumo",
  },
  facebook: {
    Icon: Facebook,
    label: "Facebook",
  },
  instagram: {
    Icon: Instagram,
    label: "Instagram",
  },
  twitter: {
    Icon: Twitter,
    label: "Twitter",
  },
  youtube: {
    Icon: Youtube,
    label: "Youtube",
  },
  emailSubscription: {
    Icon: EmailSubscription,
    label: "Email Subscription",
  },
  commentEntry: {
    Icon: CommentEntry,
    label: "Comment Entry",
  },
}
