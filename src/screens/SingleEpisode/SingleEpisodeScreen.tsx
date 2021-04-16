import React from 'react'
import { useQuery } from "@apollo/client";
import { useRoute } from "@react-navigation/core";
import { getSingleEpisodeQuery } from "../../api/apiQuery";
import Preloader from '../../components/Preloader/Preloader';
import { getSingleEpisodeType } from '../../api/apiTypes';
import { EpisodesStackNavigatorParams } from '../../types/types';
import { RouteProp } from '@react-navigation/native';
import SingleEpisodeView from './SingleEpisodeView';

const SingleEpisodeScreen = () => {
    const route = useRoute<RouteProp<EpisodesStackNavigatorParams, 'SingleEpisode'>>()
    const { loading, error, data } = useQuery<getSingleEpisodeType, { id: string }>(getSingleEpisodeQuery, { variables: { id: route.params.id } });

    if (loading) return (<Preloader />)
    if (data) return (<SingleEpisodeView episode={data?.episode}/>)
    return (<Preloader />)
}

export default SingleEpisodeScreen;