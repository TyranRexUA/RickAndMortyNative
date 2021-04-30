import { episodesColor } from './../../../constants/themes';
import { StyleSheet } from "react-native";

const CharactersListStyle = StyleSheet.create({
  episodesHeader: {
    backgroundColor: episodesColor,
  },
  headerTitle: {
    flex: 1,
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
    textAlignVertical: 'center'
  },
  backButton: {
    height: 50,
    width: 50,
    tintColor: 'white',
    alignSelf: 'center'
  }
});

export default CharactersListStyle;