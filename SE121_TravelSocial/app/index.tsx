import {StyleSheet, Image} from 'react-native'
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "@/screen/HomeScreen";
import TicketScreen from "@/screen/TicketScreen";
import CollectionScreen from "@/screen/CollectionScreen";
import ProfileScreen from "@/screen/ProfileScreen";
import { AntDesign } from "@expo/vector-icons";
import React from 'react';

const Tab = createBottomTabNavigator()

export default function App() {
  return (
    <NavigationContainer independent={true}>
      <Tab.Navigator 
      screenOptions={{
        tabBarStyle: styles.container,
        tabBarItemStyle: styles.itemStyle,
      }}>
        <Tab.Screen 
        name="Home" 
        component={HomeScreen}
        options={{ 
          tabBarIcon: ({ focused }) => (
            <Image 
              source={require('../assets/icons/iconoir_home-simple.png')} 
              style={{ tintColor: focused ? "blue" : "gray", width: 22, height: 22 }} 
            />
          )
        }}
      />

        <Tab.Screen 
        name="Ticket" 
        component={TicketScreen}
        options={{ 
          tabBarIcon: ({ focused }) => (
            <Image 
              source={require('../assets/icons/mingcute_ticket-line.png')} 
              style={{ tintColor: focused ? "blue" : "gray", width: 22, height: 22 }} 
            />
          )
        }}
      />
        <Tab.Screen 
        name="Collection" 
        component={CollectionScreen}
        options={{ 
          tabBarIcon: ({ focused }) => (
            <Image 
              source={require('../assets/icons/collection.png')} 
              style={{ tintColor: focused ? "blue" : "gray", width: 22, height: 22 }} 
            />
          )
        }}
      />

        <Tab.Screen 
        name="Profile" 
        component={ProfileScreen}
        options={{ 
          tabBarIcon: ({ focused }) => (
            <Image 
              source={require('../assets/icons/Profile.png')} 
              style={{ tintColor: focused ? "blue" : "gray", width: 22, height: 22 }} 
            />
          )
        }}
      />      
      </Tab.Navigator>
    </NavigationContainer>
  )
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    height: "10%",
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    shadowColor: "#000",
  shadowOffset: {
    width: 0,
    height: 12,
  },
  shadowOpacity: 0.7,
  shadowRadius: 16,
  elevation: 24,
  },

  itemStyle: {
    marginBottom: 5
  }
})