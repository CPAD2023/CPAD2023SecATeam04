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

export default function AppNavigation() {
    const [user, setUser] = useState(null);

    useEffect(() => {
        onAuthStateChanged(FIREBASE_AUTH, (user) => {
            console.log('user', user);
            setUser(user);
        })
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
