import { mangelCategoryOptions } from './mangel-service'

export const initialViewport = {
  latitude: 52.497678727124054,
  longitude: 13.41515292321081,
  zoom: 14,
  width: '100%',
  height: '100%',
}

const colors = [
  'white',
  'red',
  'deepskyblue',
  'green',
  'magenta',
  'orange',
  'greenyellow',
  'indigo',
  'midnightblue',
  'turquoise',
  'lightslategrey',
]
export const mangelCategoryColors = Object.fromEntries(
  mangelCategoryOptions.map((category, i) => [category, colors[i]])
)
