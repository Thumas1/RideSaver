// Importing modules, screens and components used for the bootom tab navigator
import React, { useEffect, useState } from 'react';
import { Image, View, TouchableWithoutFeedback, Alert } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import ProfileScreen from '../../screens/TestScreen';
import { auth, db } from '../../firebase';
import { Button } from 'react-native';
import MapScreen from '../../screens/MapScreen';
import CoordinateStackNavigator from './CoordinateStackNavigator';
import { GlobalStyles, Colors } from '../../styles/GlobalStyles';

const Tab = createBottomTabNavigator();

// Is passed navigation as state
const TabNavigator = ({ navigation }) => {
  // We set an initial state of loggedIn to false, to use firebase to check whether a user is logged in or not
  const [user, setUser] = useState({ loggedIn: false });
  const [group, setGroup] = useState();

  // Check the login state of a user - This is code from firebase
  function onAuthStateChange(callback) {
    return auth.onAuthStateChanged((user) => {
      if (user) {
        callback({ loggedIn: true, user: user });
      } else {
        callback({ loggedIn: false });
      }
    });
  }

  //useEffect hook, which listens for onAuthChanged to know if the user is active or not or unsubscribes them (log out)
  useEffect(() => {
    const unsubscribe = onAuthStateChange(setUser);
    return () => {
      unsubscribe();
    };
  }, []);

  // The logout button is shown if a user is logged in and changes the loggedIn state if pressed, and navigates to homescreen
  const LogoutButton = () => {
    if (user.loggedIn) {
      return (
        <View style={{ marginRight: 10 }}>
          <Button
            onPress={() => {
              auth
                .signOut()
                .then(() => {
                  navigation.replace('Login');
                })
                .catch((error) => alert(error.message));
            }}
            title='Logout'
            color={Colors.scn}
          />
        </View>
      );
    }
  };

  //Show Homescreen, MapScreen and CoordinateStackNavigator regardless of loggedIn status
  return (
    <Tab.Navigator screenOptions={{ tabBarActiveTintColor: Colors.prm }}>
      <Tab.Screen
        name='Profile'
        component={ProfileScreen}
        options={{
          headerTintColor: Colors.prm,
          headerTitleAlign: 'center',
          headerStyle: {
            backgroundColor: Colors.bck,
          },
          // Remove figma balls inden aflevering xx
          headerLeft: () => (
            <TouchableWithoutFeedback
              onPress={() => {
                Alert.alert('figma balls');
              }}
            >
              <Image
                style={GlobalStyles.logo}
                source={require('../../assets/RideSaverLogo.png')}
              />
            </TouchableWithoutFeedback>
          ),
          headerRight: () => LogoutButton(),
          tabBarIcon: () => <Ionicons name='person-circle-outline' size={20} />,
        }}
      />
      <Tab.Screen
        name='Map'
        component={MapScreen}
        initialParams={{ group: group }}
        options={{
          headerTintColor: Colors.prm,
          headerTitleAlign: 'center',
          headerStyle: {
            backgroundColor: Colors.bck,
          },
          // Remove figma balls inden aflevering xx
          headerLeft: () => (
            <TouchableWithoutFeedback
              onPress={() => {
                Alert.alert('figma balls');
              }}
            >
              <Image
                style={GlobalStyles.logo}
                source={require('../../assets/RideSaverLogo.png')}
              />
            </TouchableWithoutFeedback>
          ),
          headerRight: () => LogoutButton(),
          tabBarIcon: () => <Ionicons name='globe' size={20} />,
        }}
      />
      <Tab.Screen
        name='Coordinates'
        component={CoordinateStackNavigator}
        options={{
          headerTintColor: Colors.prm,
          headerTitleAlign: 'center',
          headerStyle: {
            backgroundColor: Colors.bck,
          },
          // Remove figma balls inden aflevering xx
          headerLeft: () => (
            <TouchableWithoutFeedback
              onPress={() => {
                Alert.alert('figma balls');
              }}
            >
              <Image
                style={GlobalStyles.logo}
                source={require('../../assets/RideSaverLogo.png')}
              />
            </TouchableWithoutFeedback>
          ),
          headerRight: () => LogoutButton(),
          tabBarIcon: () => <Ionicons name='location-outline' size={20} />,
        }}
      />
    </Tab.Navigator>
  );
};

export default TabNavigator;
