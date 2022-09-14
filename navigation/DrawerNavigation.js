import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';

import Home from '../pages/Home'
import Profil from '../pages/Profil'

import  DrawerContent  from './DrawerContent';

const Drawer = createDrawerNavigator();

const DrawerNavigation = () => {
    return (
        <Drawer.Navigator
            screenOptions={{
                headerShown: false
            }}
            drawerContent={props => <DrawerContent {...props} />}
        >
            <Drawer.Screen name="Home" component={Home} />
            <Drawer.Screen name="Profil" component={Profil} />
        </Drawer.Navigator>
    )
}

export default DrawerNavigation