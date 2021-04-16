import React, { useEffect } from 'react'
import { useQuery } from "@apollo/client";
import { useNavigation, useRoute } from "@react-navigation/core";
import { Image, Text, View, TouchableOpacity } from "react-native";
import styles from './styles/SingleEpisodeStyles';
import Preloader from '../../components/Preloader/Preloader';
import { getSingleCharacterQuery } from '../../api/apiQuery';
import { getSingleCharacterQueryType } from '../../api/apiTypes';

const SingleCharacterScreen = () => {
    const route = useRoute<any>()
    const navigation = useNavigation();
    const { loading, error, data } = useQuery<getSingleCharacterQueryType, { id: string }>(getSingleCharacterQuery, { variables: { id: route.params.id } });

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

    return loading ? (
        <Preloader />
    ) : (
        <View style={styles.container}>
            <Image source={{ uri: data?.character.image }} />

            <View>
                <Text>NAME</Text>
                <Text>{data?.character.name}</Text>
            </View>

            <View>
                <Text>SPECIES</Text>
                <Text>{data?.character.species}</Text>
            </View>

            <View>
                <Text>GENDER</Text>
                <Text>{data?.character.gender}</Text>
            </View>

            <View>
                <Text>EPISODES</Text>
                {data?.character.episode.map(item => (
                    <TouchableOpacity key={item.id} onPress={() => {
                        navigation.navigate('Episodes', { screen: 'SingleEpisode', params: { id: item.id } })
                    }}>
                        <Text>{item.name}</Text>
                    </TouchableOpacity>
                ))}
            </View>
        </View>
    )
}

export default SingleCharacterScreen;