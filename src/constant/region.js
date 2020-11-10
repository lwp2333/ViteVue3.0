const arr = [
  { lat: 39.919671, lng: 116.411547 },
  {
    lat: 39.91034,
    lng: 116.428702
  },
  { lat: 39.888465, lng: 116.424642 },
  {
    lat: 39.890434,
    lng: 116.387214
  },
  {
    lat: 39.903703,
    lng: 116.397954
  },
  {
    lat: 39.911199,
    lng: 116.372794
  }
]

const regionJson = arr.map(item => {
  const { lng, lat } = item
  return [lng, lat]
})

export default regionJson
