import React from 'react';
import 'react-native-gesture-handler';
import { Image, StyleSheet } from 'react-native';
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import EpisodesScreen from './src/screens/Episodes/EpisodesScreen';
import SingleEpisodeScreen from './src/screens/SingleEpisode/SingleEpisodeScreen';
import SingleCharacterScreen from './src/screens/SingleCharacter/SingleCharacterScreen';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { BottomTabNavigatorParams, CharactersStackNavigatorParams, EpisodesStackNavigatorParams } from './src/types/types';
import CharactersScreen from './src/screens/Characters/CharactersScreen';
import { charactersColor, episodesColor } from './src/constants/themes';

const client = new ApolloClient({
  cache: new InMemoryCache(),
  uri: "https://rickandmortyapi.com/graphql"
})

const EpisodesStack = createStackNavigator<EpisodesStackNavigatorParams>();
const CharactersStack = createStackNavigator<CharactersStackNavigatorParams>();
const BottomTab = createMaterialBottomTabNavigator<BottomTabNavigatorParams>();

const EpisodesStackNavigator = () => (
  <EpisodesStack.Navigator
    screenOptions={{
      headerTintColor: 'white',
      headerStyle: styles.episodesHeader,
    }}
  >

    <EpisodesStack.Screen
      name="Init"
      component={EpisodesScreen}
      options={{
        title: "Episodes"
      }}
    />

    <EpisodesStack.Screen
      name="SingleEpisode"
      component={SingleEpisodeScreen}
      options={{
        title: "SingleEpisode"
      }}
    />

  </EpisodesStack.Navigator>
)

const CharactersStackNavigator = () => (
  <CharactersStack.Navigator
  screenOptions={{
    headerTintColor: 'white',
    headerStyle: styles.charactersHeader,
  }}
  >

    <CharactersStack.Screen
      name="Init"
      component={CharactersScreen}
      options={{
        title: "Characters",
      }}
    />

    <CharactersStack.Screen
      name="SingleCharacter"
      component={SingleCharacterScreen}
      options={({ route, navigation }) => ({
        title: "SingleCharacter",
      })}
    />

  </CharactersStack.Navigator>
)

export default function App() {
  return (
    <ApolloProvider client={client}>
      <NavigationContainer>

        <BottomTab.Navigator
          shifting={true}
          activeColor="black"
        >

          <BottomTab.Screen name="Episodes" component={EpisodesStackNavigator}
            options={{
              tabBarIcon: () => (<Image style={{ width: '100%', height: '100%' }} source={require('./src/images/episodesIcon.png')} />),
              tabBarTestID: 'EpisodesTab',
              tabBarColor: episodesColor,
            }}
          />

          <BottomTab.Screen name="Characters" component={CharactersStackNavigator}
            options={{
              tabBarIcon: () => (<Image style={{ width: '100%', height: '100%' }} source={require('./src/images/charactersIcon.png')} />),
              tabBarTestID: 'CharactersTab',
              tabBarColor: charactersColor,
            }}
          />

        </BottomTab.Navigator>

      </NavigationContainer>
    </ApolloProvider>
  );
};

const styles = StyleSheet.create({
  episodesHeader: {
    backgroundColor: episodesColor,
  },
  charactersHeader: {
    backgroundColor: charactersColor
  }
})
