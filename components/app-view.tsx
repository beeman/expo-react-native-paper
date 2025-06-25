import { View, type ViewProps } from 'react-native'
import React from 'react'

export type AppViewProps = ViewProps & {
  lightColor?: string
  darkColor?: string
}

export function AppView({ style, lightColor, darkColor, ...otherProps }: AppViewProps) {
  return <View style={[{ gap: 8 }, style]} {...otherProps} />
}
