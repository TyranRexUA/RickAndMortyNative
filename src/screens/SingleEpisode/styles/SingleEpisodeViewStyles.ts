import { StyleSheet } from "react-native";

const SingleEpisodeViewStyles = StyleSheet.create({
    screenContainer: {
        flex: 1,
        paddingHorizontal: 10,
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
    }
});

export default SingleEpisodeViewStyles;