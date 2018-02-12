import faker from "faker"
import shortId from "short-id"

import firebase from "../../services/firebase"
import { CATEGORIES, TYPES, LOCATIONS } from "../../config"

export const generateGiveaways = amount => {
  const defaults = {
    createdBy: "oNFMES0YaOfyfAsEjY4AImsTwl22",
    approved: false,
  }
  let generated = []

  for (let i = 0; i < amount; i++) {
    generated.push({
      ...defaults,
      value: getRandomInt(10, 200),
      type: getRandomValueFromArray(TYPES),
      category: getRandomCategory(CATEGORIES),
      title: faker.lorem.words(getRandomInt(2, 5)),
      description: faker.lorem.words(getRandomInt(0, 25)),
      images: [faker.image.imageUrl()],
      link: faker.internet.url(),
      location: getRandomValueFromArray(LOCATIONS),
      endDate: faker.date.future(),
      id: shortId.generate(),
    })
  }

  return generated
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

function getRandomCategory(categories) {
  let arr = []

  const getValueFromGroup = group => {
    arr.push(group.value)
    if (group.children)
      getValueFromGroup(getRandomValueFromArray(group.children))
  }

  getValueFromGroup(getRandomValueFromArray(categories))

  return arr.join("/")
}
