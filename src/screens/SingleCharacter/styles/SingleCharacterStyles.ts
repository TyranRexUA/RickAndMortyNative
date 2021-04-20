import { StyleSheet } from "react-native";

const SingleEpisodeStyles = StyleSheet.create({
    preloader: {
        flex: 1,
        width: 400,
        height: 400
    },
    error: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    errorText: {
        fontSize: 16
    }
})

export default SingleEpisodeStyles;