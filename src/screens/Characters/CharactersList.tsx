import React, { useEffect, useState } from 'react';
import { Keyboard, NativeScrollEvent, NativeSyntheticEvent, Text, ScrollView } from 'react-native';
import { useLazyQuery } from '@apollo/client';
import { ActivityIndicator, TextInput } from 'react-native-paper';
import { charactersItemType, getCharactersQueryType } from '../../types/apiTypes';
import { charactersColor, charactersTheme } from '../../constants/themes';
import CharactersItem from '../../components/CharactersItem/CharactersItem';
import { getCharactersQuery } from '../../api/apiQuery';
import styles from './styles/CharactersListStyle';

const CharactersList = () => {
    const [filterName, setFilterName] = useState<string>('')
    const [dataList, setDataList] = useState<charactersItemType[]>([])
    const [getCharacters, { loading, error, data }] = useLazyQuery<getCharactersQueryType, { page?: number | null, name?: string }>(getCharactersQuery);

    useEffect(() => {
        setDataList([])
        getCharacters({ variables: { page: 1, name: filterName } })
    }, [filterName])

    useEffect(() => {
        if (data?.characters?.results) setDataList([...dataList, ...data.characters.results])
    }, [data])

    const scrollHandler = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
        if (e.nativeEvent.contentOffset.y > e.nativeEvent.contentSize.height - e.nativeEvent.layoutMeasurement.height - 50 && !loading && data?.characters.info.next) {
            getCharacters({ variables: { page: data?.characters.info.next, name: filterName } })
        }
    }

    return (
        <>
            <TextInput
                testID="TextInput"
                value={filterName}
                onChangeText={setFilterName}
                label="Search characters name..."
                selectionColor={charactersColor}
                right={filterName && (
                    <TextInput.Icon name={'close'} testID="clearInputText" color={charactersColor} onPress={() => {
                        setFilterName('')
                        Keyboard.dismiss()
                    }} />
                )}
                theme={charactersTheme}
            />
            <ScrollView
                testID="ScrollView"
                style={styles.list}
                onScroll={scrollHandler}
            >
                {dataList.map(item => (
                    <CharactersItem key={item.id} item={item} />
                ))}

                {loading && (
                    <ActivityIndicator testID="Loader" style={styles.preloader} size="large" color={charactersColor} />
                )}
            </ScrollView>
            {error && (
                <Text style={styles.notFound}>Not Found</Text>
            )}
        </>
    )
}

export default CharactersList;