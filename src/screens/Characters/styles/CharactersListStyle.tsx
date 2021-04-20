import { StyleSheet } from "react-native";

const CharactersListStyle = StyleSheet.create({
    preloader: {
        flex: 1,
        width: 50,
        height: 50,
        marginVertical: 10,
        resizeMode: 'contain',
        alignSelf: 'center',
    },
    list: {
        flex: 1,
        paddingHorizontal: 10,
    },
    notFound: {
        flex: 1,
        fontSize: 16,
        textAlign: 'center' 
    }
});

export default CharactersListStyle;
