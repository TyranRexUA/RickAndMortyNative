import React from 'react';
import 'react-native-gesture-handler';
import { Image, StyleSheet, Text } from 'react-native';
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import EpisodesScreen from './src/screens/Episodes/EpisodesScreen';
import SingleEpisodeScreen from './src/screens/SingleEpisode/SingleEpisodeScreen';
import SingleCharacterScreen from './src/screens/SingleCharacter/SingleCharacterScreen';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { bottomTabNavigatorParams, charactersStackNavigatorParams, episodesStackNavigatorParams } from './src/types/types';
import { charactersColor, episodesColor } from './src/constants/themes';
import CharactersScreen from './src/screens/Characters/CharactersScreen';

const client = new ApolloClient({
  cache: new InMemoryCache(),
  uri: "https://rickandmortyapi.com/graphql"
})

const EpisodesStack = createStackNavigator<episodesStackNavigatorParams>();
const CharactersStack = createStackNavigator<charactersStackNavigatorParams>();
const BottomTab = createMaterialBottomTabNavigator<bottomTabNavigatorParams>();

const EpisodesStackNavigator = () => (
  <EpisodesStack.Navigator
    screenOptions={{
      headerTintColor: 'white',
      headerStyle: styles.episodesHeader,
      headerTitleStyle: styles.headerTitle
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
      options={({ route, navigation }) => ({
        headerTitle: () => (<Text style={styles.headerTitle}>Episode {route.params.id}</Text>),
      })}
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
        headerTitle: () => (<Text style={styles.headerTitle}>{route.params.name}</Text>)
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
  headerTitle: {
    flex: 1,
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold'
  },
  charactersHeader: {
    backgroundColor: charactersColor
  }
})
