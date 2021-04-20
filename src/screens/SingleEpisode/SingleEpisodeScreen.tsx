import React from 'react';
import { Text, View } from 'react-native';
import { useQuery } from "@apollo/client";
import { useRoute } from "@react-navigation/core";
import { getSingleEpisodeQuery } from "../../api/apiQuery";
import { getSingleEpisodeType } from '../../api/apiTypes';
import { episodesStackNavigatorParams } from '../../types/types';
import { RouteProp } from '@react-navigation/native';
import SingleEpisodeView from './SingleEpisodeView';
import { ActivityIndicator } from 'react-native-paper';
import { episodesColor } from '../../constants/themes';
import styles from './styles/SingleEpisodeStyles';

const SingleEpisodeScreen = () => {
    const route = useRoute<RouteProp<episodesStackNavigatorParams, 'SingleEpisode'>>()
    const { loading, error, data } = useQuery<getSingleEpisodeType, { id: string }>(getSingleEpisodeQuery, { variables: { id: route.params.id } });

    if (loading) return (<ActivityIndicator size="large" color={episodesColor} style={styles.preloader}/>)
    if (data) return (<SingleEpisodeView episode={data?.episode}/>)

    return (
        <View style={styles.error}>
            <Text style={styles.errorText}>Error</Text>
        </View>
    )
}

export default SingleEpisodeScreen;