import { StyleSheet } from "react-native";

const CharactersListStyles = StyleSheet.create({
    preloader: {
        width: 50,
        height: 50,
        resizeMode: 'contain',
        alignSelf: 'center'
    },
    list: {
        flex: 1,
        display: 'flex',
        padding: 10,
    },
    item: {
        marginTop: 10,
        marginBottom: 10,
        display: 'flex',
        justifyContent: 'center'
    }
});

export default CharactersListStyles;
