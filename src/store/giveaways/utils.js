import faker from "faker"
import shortId from "short-id"

import firebase from "../../services/firebase"
import { CATEGORY_RESOURCES, TYPE_RESOURCES, LOCATIONS } from "../../config"

export const generateGiveaways = amount => {
  const defaults = {
    approved: false,
  }
  let generated = []
  let created = []
  const me = "oNFMES0YaOfyfAsEjY4AImsTwl22"
  const uids = [
    "3Idcd0BkdEUucEzknecOgQCjjOv1",
    "4zXTc0qcfURoHL8HpvrS7wjEZaZ2",
    "6KcHp11DpqdoB9fQNDB07BRATop1",
    "q6lXa79bkzTUqHj3MD4N9Av3tr73",
  ]

  for (let i = 0; i < amount; i++) {
    const createdByMe = Math.random() > 0.7
    const id = shortId.generate()
    if (createdByMe) created.push(id)

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
      createdOn: faker.date.between(
        new Date(1518901200000 - 3456000000),
        new Date(1518901200000 - 259200000),
      ),
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
