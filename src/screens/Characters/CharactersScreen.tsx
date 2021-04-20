
import React from 'react';
import { View } from 'react-native';
import CharactersList from './CharactersList';
import styles from './styles/CharactersScreenStyle';

const CharactersScreen = () => {
    return (
        <View style={styles.screenContainer}>
            <CharactersList />
        </View>
    )
}

export default CharactersScreen;