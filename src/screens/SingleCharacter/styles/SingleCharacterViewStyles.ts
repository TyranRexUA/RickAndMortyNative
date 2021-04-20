import { StyleSheet } from "react-native";

const SingleEpisodeViewStyles = StyleSheet.create({
    screenContainer: {
        flex: 1,
        paddingHorizontal: 10,
    },
    image: {
        marginTop: 20,
        height: 250,
        width: 250,
        borderRadius: 250,
        alignSelf: 'center'
    },
    title: {
        flex: 1,
        textAlign: 'center',
        marginTop: 20,
        fontSize: 20,
        fontWeight: 'bold',
    },
    field: {
        flex: 1,
        marginTop: 20,
        flexDirection: 'row',
        alignItems: 'center',
        flexWrap: 'wrap'
    },
    fieldName: {
        fontSize: 16,
        fontWeight: 'bold',
        marginRight: 10
    },
    fieldVal: {
        fontSize: 16
    },
    characterContainer: {
        width: '100%',
    },
    character: {
        paddingVertical: 10,
        flexDirection: 'row',
        alignItems: 'center'
    },
    characterImage: {
        height: 30,
        width: 30,
        borderRadius: 100,
        marginRight: 10,
    },
    characterName: {
        flex: 1,
        fontSize: 16
    }
});

export default SingleEpisodeViewStyles;