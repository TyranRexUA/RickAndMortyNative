import { useLazyQuery } from '@apollo/client';
import { useNavigation } from '@react-navigation/core';
import React, { useEffect, useState } from 'react';
import {  Image, Text, TouchableOpacity } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { getCharactersQuery } from '../../api/apiQuery';
import styles from './styles/CharactersListStyles';

const CharactersList = () => {
    const [dataList, setDataList] = useState([])
    const [getcharacters, { loading, error, data }] = useLazyQuery(getCharactersQuery);
    const navigation = useNavigation();

    useEffect(() => {
        if (!dataList.length) getcharacters({ variables: { page: 1 } })
    }, [])

    useEffect(() => {
        if (data?.characters?.results) setDataList([...dataList, ...data.characters.results])
    }, [data])

    return (
        <ScrollView
            onScroll={e => {
                if (e.nativeEvent.contentOffset.y > e.nativeEvent.contentSize.height - e.nativeEvent.layoutMeasurement.height - 50 && !loading && data?.characters.info.next) {
                    getcharacters({ variables: { page: data?.characters.info.next } })
                }
            }}
            style={styles.list}
        >
            {dataList.map(item => (
                <TouchableOpacity key={item.id} style={styles.item} onPress={() => {
                    navigation.navigate('SingleCharacter', { id: item.id })
                }}>
                    <Text>{item.id}. {item.name}</Text>
                </TouchableOpacity>
            ))}

            {loading && (
                // <ActivityIndicator size="large" />
                <Image style={styles.preloader} source={require('../../images/preloader.gif')} />
            )}
        </ScrollView>
    )
}

export default CharactersList;