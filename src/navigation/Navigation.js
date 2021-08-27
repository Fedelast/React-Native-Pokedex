import React from 'react'
import {createStackNavigator} from '@react-navigation/stack'
import { Homescreen } from '../screens/Homescreen';
import { Detailscreen } from '../screens/Detailscreen';

const Stack = createStackNavigator();


export const Navigation = () => {



    return (
        <Stack.Navigator
            screenOptions={
                {
                    headerShown:false
                }
            }
            
        >
                <Stack.Screen name="home" component={Homescreen}/>
                <Stack.Screen name="detail" component={Detailscreen}/>
                
        </Stack.Navigator>
    )
}

