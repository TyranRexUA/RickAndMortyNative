import { useNavigation } from '@react-navigation/native';
import React, { memo } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { Divider } from 'react-native-paper';
import { episodeType } from '../../api/apiTypes';
import { EpisodesNavigationProp } from '../../types/types';
import styles from './styles/EpisodesListItemStyle'

const EpisodesListItem: React.FC<{ item: episodeType }> = ({ item }) => {
    const navigation = useNavigation<EpisodesNavigationProp>();

    return (
        <TouchableOpacity style={styles.container} onPress={() => {
            navigation.navigate('SingleEpisode', { id: item.id })
        }}>
            <View style={styles.item}>
                <Text style={styles.itemNumber}>{item.id}</Text>
                <Text style={styles.itemName}>{item.name}</Text>
            </View>
            <Divider/>
        </TouchableOpacity>
    )
};

export default memo(EpisodesListItem);