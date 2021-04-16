
import React from 'react';
import { View, Image, ActivityIndicator } from 'react-native';
import CharactersList from './CharactersList';
import styles from './styles/CharactersScreenStyle';

const CharactersScreen = () => {
    return (
        <View style={styles.container}>
            <CharactersList />
        </View>
    )
}

export default CharactersScreen;