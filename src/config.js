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
