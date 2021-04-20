import { StyleSheet } from "react-native";

const EpisodesItemStyle = StyleSheet.create({
    container: {
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        backgroundColor: 'whitesmoke',
    },
    item: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignItems: 'center',
        padding: 5,
        paddingVertical: 10,
    },
    itemNumber: {
        fontSize: 16,
        fontWeight: "bold",
        marginRight: 10
    },
    itemName: {
        flex: 1,
        fontSize: 16,
    }
});

export default EpisodesItemStyle;