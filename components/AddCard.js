import React from "react";
import { CommonActions } from "@react-navigation/native";
import { orange, white, blue } from "../utils/colors";
import { addCardToDeck } from "../utils/api";
import { connect } from "react-redux";
import { addCard } from "../actions";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView
} from "react-native";
import SubmitButton from "./SubmitButton";

class AddCard extends React.Component {
  state = { question: "", answer: "", correctAnswer: "" };

  sumbmitCard = deck => {
    const { question, answer, correctAnswer } = this.state;
    this.props.dispatch(addCard({ question, answer, correctAnswer, deck }));
    addCardToDeck(deck, { question, answer, correctAnswer });
    this.setState({ question: "", answer: "", correctAnswer: "" });
    this.props.navigation.dispatch(CommonActions.goBack({ key: null }));
  };

  render() {
    const deckName = this.props.route.params.entryId;
    const { question, answer, correctAnswer } = this.state;
    return (
      <KeyboardAvoidingView behavior="padding" style={styles.container}>
        <View style={styles.container}>
          <Text style={styles.title}>What is the Question?</Text>
          <TextInput
            style={styles.input}
            value={question}
            onChangeText={question => {
              this.setState({ question });
            }}
          ></TextInput>

          <Text style={styles.title}>What is the Answer?</Text>
          <TextInput
            style={styles.input}
            value={answer}
            onChangeText={answer => {
              this.setState({ answer });
            }}
          ></TextInput>

          <Text style={styles.title}>Is it correct?</Text>
          <TextInput
            style={styles.input}
            value={correctAnswer}
            onChangeText={correctAnswer => {
              this.setState({ correctAnswer });
            }}
          ></TextInput>
          <SubmitButton
            onPress={() => this.sumbmitCard(deckName)}
            text="Submit!"
            textStyle={styles.submitBtnText}
            BtnStyle={styles.submitBtn}
          ></SubmitButton>

        </View>
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  submitBtnText: {
    color: white,
    fontSize: 20,
    textAlign: "center"
  },
  title: {
    fontSize: 25,
    color: "#333"
  },
  submitBtn: {
    borderRadius: 4,
    borderWidth: 0.5,
    borderColor: white,
    padding: 10,
    backgroundColor: blue,
    overflow: "hidden"
  },
  input: {
    width: 250,
    height: 40,
    padding: 10,
    borderWidth: 2,
    borderColor: blue,
    margin: 20
  }
});

export default connect()(AddCard);
