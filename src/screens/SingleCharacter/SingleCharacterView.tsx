import React from 'react';
import { View, Text, Image, ScrollView } from 'react-native';
import { getSingleCharacterType } from '../../types/apiTypes';
import EpisodesItem from '../../components/EpisodesItem/EpisodesItem';
import styles from './styles/SingleCharacterViewStyles';

const SingleCharacterView: React.FC<getSingleCharacterType> = ({ character }) => (
    <ScrollView style={styles.screenContainer}>
        <Image style={styles.image} source={{ uri: character.image }} />

        <Text style={styles.title}>{character.name}</Text>

        <View style={styles.field}>
            <Text style={styles.fieldName}>STATUS</Text>
            <Text style={styles.fieldVal}>{character.status}</Text>
        </View>

        <View style={styles.field}>
            <Text style={styles.fieldName}>SPECIES</Text>
            <Text style={styles.fieldVal}>{character.species}</Text>
        </View>

        <View style={styles.field}>
            <Text style={styles.fieldName}>GENDER</Text>
            <Text style={styles.fieldVal}>{character.gender}</Text>
        </View>

        <View style={styles.field}>
            <Text style={styles.fieldName}>EPISODES</Text>

            {character.episode.map(item => (
                <EpisodesItem key={item.id} item={item} />
            ))}
        </View>

    </ScrollView>
);

export default SingleCharacterView;