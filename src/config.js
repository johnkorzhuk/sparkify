import {
  Tech,
  Audio,
  Books,
  Services,
  Gaming,
  Clothing,
  Other,
} from "./components/icons/category"

import { Facebook, Idk, Some, Random, Types } from "./components/icons/types"

export const AUTHED_ROUTES = ["/giveaways", "/profile", "/submit"]

export const LOCATIONS = ["U.S.A", "Canada", "Mexico", "Europe", "Worldwide"]
export const TYPES = ["facebook", "idk", "some", "random", "types"]
export const CATEGORIES = [
  {
    value: "tech",
    label: "Tech",
    children: [
      {
        value: "accessories",
        label: "Accessories",
      },
      {
        value: "cellphones-tablets",
        label: "Cell phones & Tablets",
      },
      {
        value: "tv-monitors",
        label: "TVs & Monitors",
      },
    ],
  },
  {
    value: "audio",
    label: "Audio",
    children: [
      {
        value: "headphones",
        label: "Headphones",
        children: [
          {
            value: "gaming",
            label: "Gaming",
          },
          {
            value: "wireless",
            label: "Wireless",
          },
          {
            value: "audiophile",
            label: "Audiophile",
            children: [
              {
                value: "in-ear",
                label: "In-Ear",
              },
              {
                value: "over-head",
                label: "Over-Head",
                children: [
                  {
                    value: "open-back",
                    label: "Open-Back",
                  },
                  {
                    value: "closed-back",
                    label: "Closed-back",
                  },
                ],
              },
              {
                value: "on-ear",
                label: "On-Ear",
              },
            ],
          },
        ],
      },
      {
        value: "speakers",
        label: "Speakers",
      },
    ],
  },
  {
    value: "books",
    label: "Books",
  },
  {
    value: "services",
    label: "Services",
  },
  {
    value: "gaming",
    label: "Gaming",
    children: [
      {
        value: "game-keys",
        label: "Game keys",
      },
      {
        value: "skins",
        label: "Skins",
      },
    ],
  },
  {
    value: "clothing",
    label: "Clothing",
    children: [
      {
        value: "womens",
        label: "Womens",
      },
      {
        value: "mens",
        label: "Men",
      },
      {
        value: "kids",
        label: "Kids",
      },
    ],
  },
  {
    value: "other",
    label: "Other",
  },
]

export const CATEGORY_RESOURCES = {
  tech: {
    gradient:
      "background-image: linear-gradient(147deg, #FFE53B 0%, #FF2525 74%)",
    Icon: Tech,
  },
  audio: {
    gradient:
      "background-image: linear-gradient(19deg, #21D4FD 0%, #B721FF 100%)",
    Icon: Audio,
  },
  books: {
    gradient:
      "background-image: linear-gradient(43deg, #4158D0 0%, #C850C0 46%, #FFCC70 100%)",
    Icon: Books,
  },
  services: {
    gradient:
      "background-image: linear-gradient(90deg, #FEE140 0%, #FA709A 100%)",
    Icon: Services,
  },
  gaming: {
    gradient:
      "background-image: linear-gradient(62deg, #FBAB7E 0%, #F7CE68 100%)",
    Icon: Gaming,
  },
  clothing: {
    gradient:
      "background-image: linear-gradient(45deg, #FA8BFF 0%, #2BD2FF 52%, #2BFF88 90%)",
    Icon: Clothing,
  },
  other: {
    gradient:
      "background-image: linear-gradient(160deg, #0093E9 0%, #80D0C7 100%)",
    Icon: Other,
  },
}

export const TYPE_RESOURCES = {
  facebook: {
    Icon: Facebook,
  },
  idk: {
    Icon: Idk,
  },
  some: {
    Icon: Some,
  },
  random: {
    Icon: Random,
  },
  types: {
    Icon: Types,
  },
}
