export const checkUserFields = async (store, fields) => {
  const fieldsArr = Object.keys(fields)
  const data = await Promise.all(
    fieldsArr.map(field => {
      return store
        .collection("users")
        .where(field, "==", fields[field])
        .get()
    }),
  )

  return data.reduce((aggr, curr, index) => {
    aggr[fieldsArr[index]] = {
      exists: !curr.empty,
    }
    return aggr
  }, {})
}
