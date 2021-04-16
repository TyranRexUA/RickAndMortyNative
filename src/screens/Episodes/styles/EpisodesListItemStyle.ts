import { StyleSheet } from "react-native";

const EpisodesListItemStyles = StyleSheet.create({
    container: {
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
        fontSize: 16,
    }
});

export default EpisodesListItemStyles;