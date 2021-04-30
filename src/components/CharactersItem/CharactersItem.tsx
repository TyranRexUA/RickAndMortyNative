import { useNavigation } from '@react-navigation/native';
import React, { memo } from 'react';
import { Text, TouchableOpacity, View, Image } from 'react-native';
import { Divider } from 'react-native-paper';
import { charactersItemType } from '../../types/apiTypes';
import { bottomNavigationProp } from '../../types/navigationTypes';
import styles from './styles/CharactersItemStyle'

const EpisodesItem: React.FC<{ item: charactersItemType }> = ({ item }) => {
    const navigation = useNavigation<bottomNavigationProp>();

    return (
        <TouchableOpacity key={item.id} style={styles.container} testID="CharactersItem"
            onPress={async () => {
                navigation.navigate('Characters', { screen: 'SingleCharacter', params: { id: item.id, name: item.name } })
            }}
        >
            <View style={styles.item}>
                <Image style={styles.itemImage} source={{ uri: item.image }} />
                <Text style={styles.itemName}>{item.name}</Text>
            </View>
            <Divider />
        </TouchableOpacity>
    )
};

export default memo(EpisodesItem);