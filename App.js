import { NavigationContainer } from '@react-navigation/native'
import React from 'react'
import { View, Text} from 'react-native'
import { Navigation } from './src/navigation/Navigation'


export const App = () => {
  return (
    <NavigationContainer>

        <Navigation/>

    </NavigationContainer>
  )
}
