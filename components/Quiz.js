import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  KeyboardAvoidingView,
  StyleSheet
} from "react-native";
import { CommonActions } from "@react-navigation/native";
import { connect } from "react-redux";
import SubmitButton from "./SubmitButton";
import ActionButton from "./ActionButton";
import Info from "./Info";
import { green, red, white, blue, purple } from "../utils/colors";
import DeckList from "./DeckList";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignSelf: "stretch",
    justifyContent: "center"
  },
  iosBtn: {
    padding: 10,
    borderRadius: 5,
    height: 40,
    margin: 5,
    width: 150,
    justifyContent: "center"
  },
  submitBtnText: {
    color: "white",
    fontSize: 20,
    textAlign: "center"
  },
  card: {
    flex: 1,
    justifyContent: "space-around",
    alignItems: "center",
    backgroundColor: "yellow",
    margin: 8,
    height: 20,
    borderRadius: 10
  },
  cardText: {
    marginTop: 16,
    fontSize: 40,
    color: "black",
    margin: 5
  },
  mainText: {
    fontSize: 40,
    color: blue,
    margin: 40,
    textAlign: "center"
  },
  answer: {
    color: purple,
    fontSize: 14,
    margin: 20
  },
  question: {
    top: 0,
    alignSelf: "flex-start",
    left: 0,
    color: purple,
    fontSize: 20,
    margin: 6,
    position: "absolute"
  }
});

class Quiz extends React.Component {
  state = {
    questionNumber: 0,
    showQuestion: false,
    correct: 0,
    InCorrect: 0
  };

  showAnswer = () =>
    !this.state.showQuestion
      ? this.setState({ showQuestion: true })
      : this.setState({ showQuestion: false });

  SubmitAnswer = answer => {
    const { questionNumber } = this.state;
    const deck = this.props.route.params.entryId;
    const { decks } = this.props;
    const correct = decks[deck].questions[
      questionNumber
    ].correctAnswer.toLowerCase();

    if (answer === correct) {
      this.setState({
        correct: this.state.correct + 1
      });
    } else {
      this.setState({
        InCorrect: this.state.InCorrect + 1
      });
    }
    this.setState({
      questionNumber: this.state.questionNumber + 1,
      showQuestion: false
    });
  };

  render() {
    const { questionNumber, showQuestion } = this.state;
    const decks = this.props.decks;
    const deck = this.props.route.params.entryId;
    const number = this.state.questionNumber + 1;

    if (questionNumber === decks[deck].questions.length) {
      return (
        <View style={styles.card}>
          <View style={styles.card}>
            <Text style={styles.mainText}>
              you score is {this.state.correct} of{" "}
              {decks[deck].questions.length} !
            </Text>
            {this.state.correct > this.state.InCorrect ? (
              <Text style={{ fontSize: 90 }}>😉</Text>
            ) : (
              <Text style={{ fontSize: 90 }}>😭</Text>
            )}
          
            <ActionButton
              styles={styles}
              text={"Go Back"}
              onPress={() => {
                this.setState({
                  questionNumber: 0,
                  showQuestion: false,
                  correct: 0,
                  InCorrect: 0
                });
                this.props.navigation.navigate("DeckList");
              }}
              color={green}
            ></ActionButton>
          </View>
        </View>
      );
    }
    return (
      <View style={styles.container}>
        <View style={styles.card}>
          <Text style={styles.question}>
            {number}/{decks[deck].questions.length}
          </Text>

          {!showQuestion ? (
            <Text style={styles.mainText}>
              {decks[deck].questions[questionNumber].question}
            </Text>
          ) : (
            <Text style={styles.answer}>
              {decks[deck].questions[questionNumber].answer}
            </Text>
          )}

          {!showQuestion ? (
            <Info
              style={styles.answer}
              text={"Show Answer"}
              onPress={this.showAnswer}
            ></Info>
          ) : (
            <Info
              style={styles.answer}
              text={"Show Question"}
              onPress={this.showAnswer}
            ></Info>
          )}
          <ActionButton
            color={green}
            styles={styles}
            text={"Correct"}
            onPress={() => this.SubmitAnswer("true")}
          ></ActionButton>
          <ActionButton
            color={red}
            styles={styles}
            text={"InCorrect"}
            onPress={() => this.SubmitAnswer("false")}
          ></ActionButton>
        </View>
      </View>
    );
  }
}

function mapStateToProps(decks) {
  return { decks };
}

export default connect(mapStateToProps)(Quiz);
