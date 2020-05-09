import React from "react";
import { StyleSheet, Text, View, TouchableHighlight } from "react-native";
import { getData } from "../utils/api";
import DeckView from "./DeckView";
import { connect } from "react-redux";
import { getDecks } from "../utils/api";

import { receiveDecks } from "../actions";
import { orange } from "../utils/colors";

class DeckList extends React.Component {
  componentDidMount() {
    getDecks()
    .then(decks => { this.props.receiveAllDecks(decks)});
  }


  render() {
    const { decks } = this.props
    
    return (
      <View style={styles.container}>
        {Object.keys(decks).map(deck => {
          const { title, questions } = decks[deck];
          return (
            <TouchableHighlight
              key={title}
              style={styles.card}
              onPress={() => {
                this.props.navigation.navigate("Deck View", { entryId: deck });
              }}
            >
              <View style={styles.card}>
                <Text style={styles.cardText} >{title}</Text>
                <Text style={styles.cardText}>{questions.length} Cards</Text>
              </View>
            </TouchableHighlight>
          );
        })}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignSelf: "stretch",
    justifyContent: "center"
  },
  button: {
    alignItems: "center",
    backgroundColor: "#DDDDDD",
    padding: 10
  },
  card:{
    flex:1,
    justifyContent:'center',
    alignItems:'center',
    backgroundColor:'#FF9600',
    margin:8,
    height:20,
    borderRadius:10,
     
  },
  cardText: {
    marginTop: 16,
    fontSize: 40,
    color: 'black',
   

  }
}); 

function mapDispatchToProps(dispatch) {
  return {
    receiveAllDecks: (decks )=> {
      dispatch(receiveDecks(decks));
    }
  }
}

function mapStateToProps(decks) {
  return { decks };
}
export default connect(mapStateToProps,mapDispatchToProps)(DeckList);
