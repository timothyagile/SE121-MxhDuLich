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
import NotificationsScreen from '@/screen/NotificationsScreen'
import ChatBoardScreen from '@/screen/ChatBoardScreen'
import ChatScreen from '@/screen/ChatScreen'
import PaymentMethodScreen from '@/screen/PaymentMethodScreen'
import AddNewPaymentMethodScreen from '@/screen/AddNewPaymentMethodScreen'
import ReservationRequiredScreen from '@/screen/ReservationRequiredScreen'
import AvailableRoomScreen from '@/screen/AvailableRoomScreen'

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
        name = "notifications-screen"
        component={NotificationsScreen}
        options={{
          headerShown: false
        }}/>

        <Stack.Screen 
        name = "chat-board-screen"
        component={ChatBoardScreen}
        options={{
          headerShown: false
        }}/>

        <Stack.Screen 
        name = "chat-screen"
        component={ChatScreen}
        options={{
          headerShown: false
        }}/>

        <Stack.Screen 
        name = "main-screen"
        component={MainScreen}
        options={{
          headerShown: false
        }}/>

        <Stack.Screen 
        name = "payment-method-screen"
        component={PaymentMethodScreen}
        options={{
          headerShown: false
        }}/>

        <Stack.Screen 
        name = "add-new-payment-method-screen"
        component={AddNewPaymentMethodScreen}
        options={{
          headerShown: false
        }}/>

        <Stack.Screen 
        name = "reservation-required-screen"
        component={ReservationRequiredScreen}
        options={{
          headerShown: false
        }}/>

        <Stack.Screen 
        name = "available-room-screen"
        component={AvailableRoomScreen}
        options={{
          headerShown: false
        }}/>

      </Stack.Navigator>
    </NavigationContainer>
  );
}