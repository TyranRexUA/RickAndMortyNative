import React, { useEffect, useState } from 'react';
import { Keyboard, NativeScrollEvent, NativeSyntheticEvent, Text, ScrollView } from 'react-native';
import { useLazyQuery } from '@apollo/client';
import { ActivityIndicator, TextInput } from 'react-native-paper';
import { getEpisodesQuery } from '../../api/apiQuery';
import { episodesItemType, getEpisodesQueryType } from '../../api/apiTypes';
import { episodesColor, episodesTheme } from '../../constants/themes';
import EpisodesItem from '../../components/EpisodesItem/EpisodesItem';
import styles from './styles/EpisodesListStyles';

const EpisodesList = () => {
    const [filterName, setFilterName] = useState<string>('')
    const [dataList, setDataList] = useState<episodesItemType[]>([])
    const [getEpisodes, { loading, error, data }] = useLazyQuery<getEpisodesQueryType, { page?: number | null, name?: string }>(getEpisodesQuery);

    useEffect(() => {
        setDataList([])
        getEpisodes({ variables: { page: 1, name: filterName } })
    }, [filterName])

    useEffect(() => {
        if (data?.episodes?.results) setDataList([...dataList, ...data.episodes.results])
    }, [data])

    const scrollHandler = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
        if (e.nativeEvent.contentOffset.y > e.nativeEvent.contentSize.height - e.nativeEvent.layoutMeasurement.height - 50 && !loading && data?.episodes.info.next) {
            getEpisodes({ variables: { page: data?.episodes.info.next, name: filterName } })
        }
    }

    return (
        <>
            <TextInput
                value={filterName}
                onChangeText={setFilterName}
                label="Search episodes name..."
                selectionColor={episodesColor}
                right={filterName && (
                    <TextInput.Icon name={'close'} color={episodesColor} onPress={() => {
                        setFilterName('')
                        Keyboard.dismiss()
                    }} />
                )}
                theme={episodesTheme}
            />
            <ScrollView
                style={styles.list}
                onScroll={scrollHandler}
            >
                {dataList.map(item => (
                    <EpisodesItem key={item.id} item={item} />
                ))}

                {loading && (
                    <ActivityIndicator style={styles.preloader} size="large" color={episodesColor}/>
                )}
            </ScrollView>
            {error && (
                <Text style={styles.notFound}>Not Found</Text>
            )}
        </>
    )
}

export default EpisodesList;