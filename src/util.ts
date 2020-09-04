import { Vector3 } from 'three'
import Yoga, { YogaNode } from 'yoga-layout-prebuilt'
import { R3FlexProps } from './props'

export const capitalize = (s: string) => s[0].toUpperCase() + s.slice(1)

export const jsxPropToYogaProp = (s: string) => s.toUpperCase().replace('-', '_')

export const setYogaProperties = (node: YogaNode, props: R3FlexProps, scaleFactor: number) => {
  return Object.keys(props).forEach((name) => {
    const value = props[name as keyof R3FlexProps]

    if (typeof value === 'string') {
      switch (name) {
        case 'flexDir':
        case 'dir':
        case 'flexDirection':
          return node.setFlexDirection((Yoga as any)[`FLEX_DIRECTION_${jsxPropToYogaProp(value)}`])
        case 'align':
        case 'alignItems':
          return node.setAlignItems((Yoga as any)[`ALIGN_${jsxPropToYogaProp(value)}`])
        case 'justify':
        case 'justifyContent':
          return node.setJustifyContent((Yoga as any)[`JUSTIFY_${jsxPropToYogaProp(value)}`])
        case 'wrap':
        case 'flexWrap':
          return node.setFlexWrap((Yoga as any)[`WRAP_${jsxPropToYogaProp(value)}`])

        default:
          return (node[`set${capitalize(name)}` as keyof YogaNode] as any)(value)
      }
    } else if (typeof value === 'number') {
      const scaledValue = value * scaleFactor
      switch (name) {
        case 'align':
          return node.setAlignItems(value as any)
        case 'justify':
          return node.setJustifyContent(value as any)
        case 'flexDir':
        case 'dir':
          return node.setFlexDirection(value as any)
        case 'wrap':
          return node.setFlexWrap(value as any)
        case 'padding':
        case 'p':
          return node.setPadding(Yoga.EDGE_ALL, scaledValue)
        case 'paddingLeft':
        case 'pl':
          return node.setPadding(Yoga.EDGE_LEFT, scaledValue)
        case 'paddingRight':
        case 'pr':
          return node.setPadding(Yoga.EDGE_RIGHT, scaledValue)
        case 'paddingTop':
        case 'pt':
          return node.setPadding(Yoga.EDGE_TOP, scaledValue)
        case 'paddingBottom':
        case 'pb':
          return node.setPadding(Yoga.EDGE_BOTTOM, scaledValue)

        case 'margin':
        case 'm':
          return node.setMargin(Yoga.EDGE_ALL, scaledValue)
        case 'marginLeft':
        case 'ml':
          return node.setMargin(Yoga.EDGE_LEFT, scaledValue)
        case 'marginRight':
        case 'mr':
          return node.setMargin(Yoga.EDGE_RIGHT, scaledValue)
        case 'marginTop':
        case 'mt':
          return node.setMargin(Yoga.EDGE_TOP, scaledValue)
        case 'marginBottom':
        case 'mb':
          return node.setMargin(Yoga.EDGE_BOTTOM, scaledValue)

        default:
          return (node[`set${capitalize(name)}` as keyof YogaNode] as any)(scaledValue)
      }
    }
  })
}

export const vectorFromObject = ({ x, y, z }: { x: number; y: number; z: number }) => new Vector3(x, y, z)

export type Axis = 'x' | 'y' | 'z'
export const axes: Axis[] = ['x', 'y', 'z']

export const rmUndefFromObj = (obj: Record<string, any>) =>
  Object.keys(obj).forEach((key) => (obj[key] === undefined ? delete obj[key] : {}))
