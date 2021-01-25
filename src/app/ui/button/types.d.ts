export type Color = 'primary' | 'accent' | ''
export type ColorsMap = {
  // mapped object type
  [key in Color]: string
}