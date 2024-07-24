import {View, Text} from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

import WelcomeScreen1 from '@/screen/Welcome/WelcomeScreen1'
import LoginScreen from '@/screen/Welcome/LoginScreen'
import RegisterScreen from '@/screen/Welcome/RegisterScreen'
import MainScreen from '@/screen/MainScreen'
import React from 'react'
import RegisterScreen2 from '@/screen/Welcome/RegisterScreen2'
import AddNewCollectionScreen from '@/screen/AddNewCollectionScreen'
import CollectionScreen from '@/screen/CollectionScreen'
import PersonalInformationScreen from '@/screen/PersonalInformationScreen'

const Stack = createNativeStackNavigator()

export default function App() {
  return (
    <NavigationContainer independent={true}>
      <Stack.Navigator
      initialRouteName='main-screen'>
        <Stack.Screen 
        name = "welcome1" 
        component={WelcomeScreen1}
        options={{
          headerShown: false,
          headerTransparent:true,
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
        name = "register2" 
        component={RegisterScreen2}
        options={{
          headerShown: false
        }}/>

        <Stack.Screen 
        name = "collection-screen"
        component={CollectionScreen}
        options={{
          headerShown: false
        }}/>

        <Stack.Screen 
        name = "add-new-collection-screen"
        component={AddNewCollectionScreen}
        options={{
          headerShown: false
        }}/>

        <Stack.Screen 
        name = "personal-information-screen"
        component={PersonalInformationScreen}
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
  );
}