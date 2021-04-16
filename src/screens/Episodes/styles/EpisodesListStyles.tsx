import { StyleSheet } from "react-native";

const EpisodesListStyles = StyleSheet.create({
    preloader: {
        width: 50,
        height: 50,
        marginVertical: 10,
        resizeMode: 'contain',
        alignSelf: 'center',
    },
    list: {
        flex: 1,
        display: 'flex',
        paddingHorizontal: 10,
        // marginVertical: 10
    },
    textInput: {
        //backgroundColor: episodesColor
    }
});

export default EpisodesListStyles;
