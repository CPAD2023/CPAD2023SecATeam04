import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from '../screens/LoginScreen';
import HomeScreen from '../screens/HomeScreen';
import SearchScreen from '../screens/SearchScreen';
import SeeAllScreen from '../screens/SeeAllScreen'
import { onAuthStateChanged } from 'firebase/auth';
import { FIREBASE_AUTH } from '../Firebase';
import MovieScreen from '../screens/MovieScreen';
import PersonScreen from '../screens/PersonScreen';
import AsyncStorage from '@react-native-async-storage/async-storage';


const Stack = createNativeStackNavigator();

const InsideStack = createNativeStackNavigator();

function InsideLayout() {
    return (
        <InsideStack.Navigator>
            <InsideStack.Screen
                name="Home"
                options={{ headerShown: false }}
                component={HomeScreen}
            />
            <InsideStack.Screen
                name="Movie"
                options={{ headerShown: false }}
                component={MovieScreen}
            />
            <InsideStack.Screen
                name="Search"
                options={{ headerShown: false }}
                component={SearchScreen}
            />
            <InsideStack.Screen
                name="SeeAll"
                options={{ headerShown: false }}
                component={SeeAllScreen}
            />
            <InsideStack.Screen
                name="Person"
                options={{ headerShown: false }}
                component={PersonScreen}
            />
        </InsideStack.Navigator>
    )
}

export default  function AppNavigation() {
    const [user, setUser] = useState(null);

    const setUserToStorage = async (user) => {
        console.log("user is set to storage");
        try {
            await AsyncStorage.setItem('user', JSON.stringify(user));
          } catch (error) {
            console.error('Error saving user data to AsyncStorage: ', error);
          }
    }

    useEffect(() => {
        // onAuthStateChanged(FIREBASE_AUTH, (user) => {
        //     console.log('user from', user);
        //     setUser(user);
        //      setUserToStorage(user);
        // })
        const handleAuthStateChanged = async (user) => {
            console.log('user got ', user);
            setUser(user);
            await setUserToStorage(user);
          };
        
          onAuthStateChanged(FIREBASE_AUTH, handleAuthStateChanged);
    }, [])
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Login">
                {user ? (
                    <Stack.Screen
                        name="InsideLayout"
                        options={{ headerShown: false }}
                        component={InsideLayout}
                    />
                ) : (
                    <Stack.Screen
                        name="Login"
                        options={{ headerShown: false }}
                        component={LoginScreen}
                    />
                )}

            </Stack.Navigator>
        </NavigationContainer>
    );
}
