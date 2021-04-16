import { useLazyQuery } from '@apollo/client';
import React, { useEffect, useState } from 'react';
import { Image, Keyboard, NativeScrollEvent, NativeSyntheticEvent, Text } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { TextInput } from 'react-native-paper';
import { getEpisodesQuery } from '../../api/apiQuery';
import { episodeType, getEpisodesQueryType } from '../../api/apiTypes';
import { episodesTheme } from '../../constants/themes';
import EpisodesListItem from './EpisodesListItem';
import styles from './styles/EpisodesListStyles';

const EpisodesList = () => {
    const [filterName, setFilterName] = useState<string>('')
    const [dataList, setDataList] = useState<episodeType[]>([])
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
                label="Search episode name..."
                selectionColor="red"
                right={<TextInput.Icon name={'close'} color="red" onPress={() => {
                        setFilterName('')
                        Keyboard.dismiss()
                    }} />}
                style={styles.textInput}
                theme={episodesTheme}
            />
            <ScrollView
                onScroll={scrollHandler}
                style={styles.list}
            >
                {dataList.map(item => (
                    <EpisodesListItem key={item.id} item={item} />
                ))}

                {error && (
                    <Text>Not Found</Text>
                )}

                {loading && (
                    // <ActivityIndicator size="large" />
                    <Image style={styles.preloader} source={require('../../images/preloader.gif')} />
                )}
            </ScrollView>
        </>
    )
}

export default EpisodesList;