import React from 'react';
import { Text } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import EpisodesScreen from '../../screens/Episodes/EpisodesScreen';
import SingleEpisodeScreen from '../../screens/SingleEpisode/SingleEpisodeScreen';
import { episodesStackNavigatorParams } from '../../types/navigationTypes';
import styles from './styles/EpisodesStackNavigatorStyles';
import { IconButton } from 'react-native-paper';

const EpisodesStack = createStackNavigator<episodesStackNavigatorParams>();

const EpisodesStackNavigator = () => (
  <EpisodesStack.Navigator
    screenOptions={{
      headerTintColor: 'white',
      headerStyle: styles.episodesHeader,
      headerTitleStyle: styles.headerTitle,
      headerTitleAlign: 'center'
    }}
  >

    <EpisodesStack.Screen
      name="Init"
      component={EpisodesScreen}
      options={{
        title: "Episodes",
        headerLeft: () => (null)
      }}
    />

    <EpisodesStack.Screen
      name="SingleEpisode"
      component={SingleEpisodeScreen}
      options={({ route, navigation }) => ({
        headerTitle: () => (<Text style={styles.headerTitle}>Episode {route.params.id}</Text>),
        headerLeft: () => (
          <IconButton testID="goToInitScreen" icon="chevron-left" size={32} color="white" onPress={() => {
            navigation.navigate('Init')
          }} />
        ),
      })}
    />

  </EpisodesStack.Navigator>
);

export default EpisodesStackNavigator;