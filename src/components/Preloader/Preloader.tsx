import React from 'react';
import { Image, View } from 'react-native';
import styles from './styles/PreloaderStyles';

const Preloader = () => (
    <View style={styles.container}>
        <Image source={require('../../images/preloader.gif')} style={styles.preloader}/>
    </View>
)

export default Preloader;