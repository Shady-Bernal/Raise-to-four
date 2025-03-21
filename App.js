import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import StartScreen from './components/StartScreen';
import ConnectFour from './components/ConnectFour';

const Stack = createStackNavigator();

export default function App() {
    return (
        <NavigationContainer>
            <Stack.Navigator screenOptions={{ headerShown: false }}>
                <Stack.Screen name="Start" component={StartScreen} />
                <Stack.Screen name="Game" component={ConnectFour} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}
