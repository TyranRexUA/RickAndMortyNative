import { StyleSheet } from "react-native";

const PreloaderStyles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 50
    },
    preloader: {
        flex: 1,
        width: '100%',
        alignSelf: 'center',
        resizeMode: 'contain',
    }
});

export default PreloaderStyles;