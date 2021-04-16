
import React from 'react';
import { View } from 'react-native';
import EpisodesList from './EpisodesList';
import styles from './styles/EpisodesScreenStyle';

const EpisodesScreen = () => {
    return (
        <View style={styles.screenContainer}>
            <EpisodesList />
        </View>
    )
}

export default EpisodesScreen;