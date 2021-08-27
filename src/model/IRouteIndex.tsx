export interface IRouteIndex {
  path: string
  index: number
}
const possibleRouteIndexes: Array<IRouteIndex> = [
  { index: 0, path: "/" },
  { index: 1, path: "/form" },
  { index: 1, path: "/summary" },
  { index: 3, path: "/policy" },
]
export default possibleRouteIndexes
