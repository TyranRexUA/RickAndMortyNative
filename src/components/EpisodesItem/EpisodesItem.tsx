import { useNavigation } from '@react-navigation/native';
import React, { memo } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { Divider } from 'react-native-paper';
import { episodesItemType } from '../../types/apiTypes';
import { bottomNavigationProp } from '../../types/navigationTypes';
import styles from './styles/EpisodesItemStyle'

const EpisodesItem: React.FC<{ item: episodesItemType }> = ({ item }) => {
    const navigation = useNavigation<bottomNavigationProp>();

    return (
        <TouchableOpacity style={styles.container} testID="EpisodesItem" onPress={() => {
            navigation.navigate("Episodes", { screen: 'SingleEpisode', params: { id: item.id } })
        }}>
            <View style={styles.item}>
                <Text style={styles.itemNumber}>{item.id}</Text>
                <Text style={styles.itemName}>{item.name}</Text>
            </View>
            <Divider />
        </TouchableOpacity>
    )
};

export default memo(EpisodesItem);