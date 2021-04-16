import { StyleSheet } from "react-native";

const SingleEpisodeViewStyles = StyleSheet.create({
    screenContainer: {
        flex: 1,
        paddingHorizontal: 10,
    },
    title: {
        marginVertical: 10,
        flexDirection: 'row',
    },
    titleId: {
        fontSize: 20,
        marginRight: 10,
        fontWeight: 'bold'
    },
    titleName: {
        fontSize: 20,
        fontWeight: 'bold'
    },
    field: {
        marginVertical: 10
    },
    character: {
        paddingVertical: 10,
        flexDirection: 'row',
        alignItems: 'center'
    },
    characterImage: {
        height: 36,
        width: 36,
        borderRadius: 50
    },
    characterName: {
        fontSize: 16
    }
});

export default SingleEpisodeViewStyles;