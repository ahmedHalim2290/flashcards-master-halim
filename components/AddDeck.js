import React from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacityBase,
  TextInput,
  Button
} from "react-native";
import { saveDeck } from "../utils/api";
import { addDeck } from "../actions/index";
import { connect } from "react-redux";
import { white, orange, blue } from "../utils/colors";
import SubmitButton from "./SubmitButton";

class AddDeck extends React.Component {
  state = {
    text: ""
  };

  onChangeText = text => {
    this.setState({
      text: text
    });
  };

  submitName = () => {
    const { text } = this.state;
    saveDeck(text);
    this.props.dispatch(addDeck(text));
    this.props.navigation.navigate("Deck View", { entryId: text });
    this.setState({ text: "" });
  };

  render() {
    const { text } = this.state;
    return (
      <View style={styles.container}>
        <Text style={styles.title}> What is deck name? </Text>
        <TextInput
          style={styles.input}
          onChangeText={text => this.setState({ text: text })}
          value={text}
        ></TextInput>

        <SubmitButton
          onPress={this.submitName}
          text="Submit!"
          textStyle={styles.submitBtnText}
          BtnStyle={styles.submitBtn}
        ></SubmitButton>
        {/* <Button
          style={styles.submitBtn}
          onPress={this.submitName}
          title="Submit"
        ></Button> */}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  input: {
    width: 200,
    height: 44,
    padding: 8,
    borderWidth: 1,
    borderColor: "black",
    margin: 50,
    borderRadius: 6
  },
  title: {
    fontSize: 30,
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
  submitBtnText: {
    color: white,
    fontSize: 20,
    textAlign: "center"
  }
});

export default connect()(AddDeck);
