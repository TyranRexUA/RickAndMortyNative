import { StyleSheet } from "react-native";

const CharactersItemStyle = StyleSheet.create({
    container: {
        width: '100%',
    },
    item: {
        paddingVertical: 10,
        flexDirection: 'row',
        alignItems: 'center'
    },
    itemImage: {
        height: 30,
        width: 30,
        borderRadius: 100,
        marginRight: 10,
    },
    itemName: {
        flex: 1,
        fontSize: 16
    }
});

export default CharactersItemStyle;