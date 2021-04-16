import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { EpisodesNavigationProp } from '../../types/types';
import { View, Text, Image, TouchableOpacity, ScrollView } from 'react-native';
import { getSingleEpisodeType } from '../../api/apiTypes';
import styles from './styles/SingleEpisodeViewStyles'

const SingleEpisodeView: React.FC<getSingleEpisodeType> = ({ episode }) => {
    const navigation = useNavigation<EpisodesNavigationProp>();

    return (
        <ScrollView style={styles.screenContainer}>

            <View style={styles.title}>
                <Text style={styles.titleId}>{episode.id}</Text>
                <Text style={styles.titleName}>{episode.name}</Text>
            </View>

            <View style={styles.field}>
                <Text>AIR DATE</Text>
                <Text>{episode.air_date}</Text>
            </View>

            <View style={styles.field}>
                <Text>CHARACTERS</Text>

                {episode.characters.map(item => (
                    <TouchableOpacity key={item.id} style={styles.character}
                        onPress={async () => {
                            navigation.navigate('Characters', { screen: 'SingleCharacter', params: { id: item.id } })
                        }}
                    >
                        <Image style={styles.characterImage} source={{ uri: item.image }} />
                        <Text style={styles.characterName}>{item.name}</Text>
                    </TouchableOpacity>
                ))}
            </View>

        </ScrollView>
    )
};

export default SingleEpisodeView;