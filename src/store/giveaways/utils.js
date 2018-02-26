import faker from "faker"
import shortId from "short-id"

import firebase from "../../services/firebase"
import { CATEGORY_RESOURCES, TYPE_RESOURCES, LOCATIONS } from "../../config"

export const generateGiveaways = (amount, uid) => {
  const defaults = {
    approved: false,
  }
  let generated = []
  let created = []
  const me = { uid, username: "johnkorz" }
  const uids = [
    { uid: "6KcHp11DpqdoB9fQNDB07BRATop1", username: "tyron" },
    { uid: "BGDdHyiqzihCWfAFdDrVbXCtaA22", username: "philly" },
    { uid: "3Idcd0BkdEUucEzknecOgQCjjOv1", username: "sparkify" },
    { uid: "ewJqEzFaPLfHLFz1f8jSyWHIWPx2", username: "randomDude123" },
  ]

  for (let i = 0; i < amount; i++) {
    const createdByMe = Math.random() > 0.8
    const id = shortId.generate()
    const createdOn = faker.date.between(
      new Date(1518901200000 - 3456000000),
      new Date(1518901200000 - 259200000),
    )
    if (createdByMe)
      created.push({
        id,
        createdOn,
      })

    generated.push({
      ...defaults,
      value: getRandomInt(10, 200),
      type: getRandomValueFromArray(Object.keys(TYPE_RESOURCES)),
      category: getRandomValueFromArray(Object.keys(CATEGORY_RESOURCES)),
      title: faker.lorem.words(getRandomInt(2, 5)),
      description: faker.lorem.words(getRandomInt(0, 25)),
      images: [faker.image.imageUrl()],
      link: faker.internet.url(),
      location: getRandomValueFromArray(LOCATIONS),
      createdBy: createdByMe ? me : getRandomValueFromArray(uids),
      endDate: faker.date.between(
        new Date(1518901200000),
        new Date(1522540800000),
      ),
      createdOn,
      id,
    })
  }

  return { generated, created }
}

function getRandomValueFromArray(arr) {
  const min = 0
  const max = arr.length - 1
  const index = Math.floor(Math.random() * (max - min + 1)) + min
  return arr[index]
}

function getRandomInt(min, max) {
  min = Math.ceil(min)
  max = Math.floor(max)
  return Math.floor(Math.random() * (max - min)) + min
}
