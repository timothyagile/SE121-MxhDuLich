import {View, Text} from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

import WelcomeScreen1 from '@/screen/Welcome/WelcomeScreen1'
import WelcomeScreen2 from '@/screen/Welcome/WelcomeScreen2'
import WelcomeScreen3 from '@/screen/Welcome/WelcomeScreen3'
import LoginScreen from '@/screen/Welcome/LoginScreen'
import RegisterScreen from '@/screen/Welcome/RegisterScreen'
import MainScreen from '@/screen/MainScreen'

const Stack = createNativeStackNavigator()

export default function App() {
  return (
    <NavigationContainer independent={true}>
      <Stack.Navigator
      initialRouteName='WelcomeScreen1'>
        <Stack.Screen 
        name = "welcome1" 
        component={WelcomeScreen1}
        options={{
          headerShown: false
        }}/>

        <Stack.Screen 
        name = "welcome2" 
        component={WelcomeScreen2}
        options={{
          headerShown: false
        }}/>

        <Stack.Screen 
        name = "welcome3" 
        component={WelcomeScreen3}
        options={{
          headerShown: false
        }}/>

        <Stack.Screen 
        name = "login" 
        component={LoginScreen}
        options={{
          headerShown: false
        }}/>

        <Stack.Screen 
        name = "register" 
        component={RegisterScreen}
        options={{
          headerShown: false
        }}/>

        <Stack.Screen 
        name = "main-screen"
        component={MainScreen}
        options={{
          headerShown: false
        }}/>
      </Stack.Navigator>
    </NavigationContainer>
  )
}