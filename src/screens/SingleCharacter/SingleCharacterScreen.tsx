import React, { useEffect } from 'react';
import { Text, View } from 'react-native';
import { useQuery } from "@apollo/client";
import { useNavigation, useRoute } from "@react-navigation/core";
import { getSingleCharacterQuery } from "../../api/apiQuery";
import { getSingleCharacterType } from '../../api/apiTypes';
import { charactersNavigationProp, charactersStackNavigatorParams } from '../../types/types';
import { RouteProp } from '@react-navigation/native';
import SingleCharacterView from './SingleCharacterView';
import { ActivityIndicator } from 'react-native-paper';
import { charactersColor } from '../../constants/themes';
import styles from './styles/SingleCharacterStyles';

const SingleCharacterScreen = () => {
    const route = useRoute<RouteProp<charactersStackNavigatorParams, 'SingleCharacter'>>()
    const { loading, error, data } = useQuery<getSingleCharacterType, { id: string }>(getSingleCharacterQuery, { variables: { id: route.params.id } });
    const navigation = useNavigation<charactersNavigationProp>();

    useEffect(() => {
        if (navigation.dangerouslyGetState().routes.length < 2) {
            navigation.reset({

                routes: [
                    {
                        name: 'Init',
                    },
                    {
                        name: 'SingleCharacter',
                        params: { id: route.params.id },
                    },
                ],
            })
        }
    }, [])

    if (loading) return (<ActivityIndicator size="large" color={charactersColor} style={styles.preloader}/>)
    if (data) return (<SingleCharacterView character={data?.character}/>)

    return (
        <View style={styles.error}>
            <Text style={styles.errorText}>Error</Text>
        </View>
    )
}

export default SingleCharacterScreen;