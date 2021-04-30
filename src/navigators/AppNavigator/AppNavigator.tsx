import React from 'react';
import { Image } from 'react-native';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { episodesColor, charactersColor } from '../../constants/themes';
import { bottomTabNavigatorParams } from '../../types/navigationTypes';
import CharactersStackNavigator from '../CharactersStackNavigator/CharactersStackNavigator';
import EpisodesStackNavigator from '../EpisodesStackNavigator/EpisodesStackNavigator';

const BottomTab = createMaterialBottomTabNavigator<bottomTabNavigatorParams>();

const AppNavigator = () => (

    <BottomTab.Navigator
        shifting={true}
        activeColor="white"
    >

        <BottomTab.Screen name="Episodes" component={EpisodesStackNavigator}
            options={{
                tabBarIcon: () => (<Image style={{ width: '100%', height: '100%' }} source={require('../../images/episodesIcon.png')} />),
                tabBarTestID: 'EpisodesTab',
                tabBarColor: episodesColor,
            }}
        />

        <BottomTab.Screen name="Characters" component={CharactersStackNavigator}
            options={{
                tabBarIcon: () => (<Image style={{ width: '100%', height: '100%' }} source={require('../../images/charactersIcon.png')} />),
                tabBarTestID: 'CharactersTab',
                tabBarColor: charactersColor,
            }}
        />

    </BottomTab.Navigator>
);

export default AppNavigator;