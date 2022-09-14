import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import Home from './pages/Home';
import GetStarted from './pages/GetStarted';
import Details from './pages/Details';
import LiveTour from './pages/LiveTour';
import Profil from './pages/Profil';
import Map from './pages/Map';
import MapTest from './pages/MapTest';
import DrawerNavigation from './navigation/DrawerNavigation'

import 'react-native-gesture-handler';

const Stack = createStackNavigator();

export default function App() {
  return (
      <NavigationContainer>
        <StatusBar style="auto" />
        <Stack.Navigator
          screenOptions={{
            headerShown: false
          }}
        >
          <Stack.Screen name="GetStarted" component={GetStarted} />
          <Stack.Screen name="Drawer" component={DrawerNavigation} />
          {/* <Stack.Screen name="Profil" component={Profil} /> */}
          {/* <Stack.Screen name="Home" component={Home} /> */}
          <Stack.Screen name="Details" component={Details} />
          <Stack.Screen name="LiveTour" component={LiveTour} />
          <Stack.Screen name="Map" component={Map} />
          <Stack.Screen name="MapTest" component={MapTest} />
        </Stack.Navigator>
        
      </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
