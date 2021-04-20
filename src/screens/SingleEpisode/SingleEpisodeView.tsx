import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import { getSingleEpisodeType } from '../../api/apiTypes';
import CharactersItem from '../../components/CharactersItem/CharactersItem';
import styles from './styles/SingleEpisodeViewStyles';

const SingleEpisodeView: React.FC<getSingleEpisodeType> = ({ episode }) => (
    <ScrollView style={styles.screenContainer}>

        <Text style={styles.title}>{episode.name}</Text>

        <View style={styles.field}>
            <Text style={styles.fieldName}>AIR DATE</Text>
            <Text style={styles.fieldVal}>{episode.air_date}</Text>
        </View>

        <View style={styles.field}>
            <Text style={styles.fieldName}>CHARACTERS</Text>

            {episode.characters.map(item => (
                <CharactersItem key={item.id} item={item} />
            ))}
        </View>

    </ScrollView>
);

export default SingleEpisodeView;