import React from "react";
import { View, StyleSheet, Text } from "react-native";
import { getData } from "../utils/api";
import { connect } from "react-redux";
import ActionButton from "./ActionButton";
import { purple, red } from "../utils/colors";
import AddCard from "./AddCard";
import Quiz from './Quiz'

class DeckView extends React.Component {
  render() {
    const deck = this.props.route.params.entryId;
    const { decks } = this.props;
    return (
      <View style={styles.container}>
        <View style={styles.card}>
          <Text style={styles.cardText}>{decks[deck].title}</Text>
          <Text style={styles.cardText}>{decks[deck].questions.length} Cards</Text>
          <ActionButton
            styles={styles}
            text={"Add Card"}
            onPress={() => {
              this.props.navigation.navigate("Add Card", { entryId: deck });
            }}
            color={purple}
          ></ActionButton>
          <ActionButton
            styles={styles}
            text={"Start Quiz"}
            onPress={() => {
              this.props.navigation.navigate("Quiz", { entryId: deck });
            }}
            color={red}
          ></ActionButton>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
   alignSelf:'stretch',
    justifyContent: "center"
  },
  iosBtn: {
    padding: 10,
    borderRadius: 5,
    height: 40,
    margin: 5,
    width: 150,
    justifyContent:'center'
  },
  submitBtnText: {
    color: "white",
    fontSize: 20,
    textAlign: "center"
  },
  card: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FF9600",
    margin: 50,
    height: 20,
    borderRadius: 10
  },
  cardText: {
    marginTop: 16,
    fontSize: 40,
    color: "black",
    margin: 5,
  }
});

function mapStateToProps(decks) {
  return { decks };
}

export default connect(mapStateToProps)(DeckView);
