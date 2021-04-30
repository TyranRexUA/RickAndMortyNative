import React from 'react';
import { Text } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import CharactersScreen from '../../screens/Characters/CharactersScreen';
import SingleCharacterScreen from '../../screens/SingleCharacter/SingleCharacterScreen';
import { charactersStackNavigatorParams } from '../../types/navigationTypes';
import styles from './styles/CharactersStackNavigatorStyles';
import { IconButton } from 'react-native-paper';

const CharactersStack = createStackNavigator<charactersStackNavigatorParams>();

const CharactersStackNavigator = () => (
    <CharactersStack.Navigator
        screenOptions={{
            headerTintColor: 'white',
            headerStyle: styles.charactersHeader,
            headerTitleStyle: styles.headerTitle,
            headerTitleAlign: 'center'
        }}
    >

        <CharactersStack.Screen
            name="Init"
            component={CharactersScreen}
            options={{
                title: "Characters",
                headerLeft: () => (null)
            }}
        />

        <CharactersStack.Screen
            name="SingleCharacter"
            component={SingleCharacterScreen}
            options={({ route, navigation }) => ({
                headerTitle: () => (<Text style={styles.headerTitle}>{route.params.name}</Text>),
                headerLeft: () => (
                    <IconButton testID="goToInitScreen" icon="chevron-left" size={32} color="white" onPress={() => {
                        navigation.navigate('Init')
                    }} />
                ),
            })}
        />

    </CharactersStack.Navigator>
);

export default CharactersStackNavigator;