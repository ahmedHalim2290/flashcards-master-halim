import React from "react";
import { TouchableOpacity, Text } from "react-native";

export default function Info({ onPress, BtnStyle, text,textStyle }) {
  return (
    <TouchableOpacity onPress={onPress} style={BtnStyle}>
      <Text style={textStyle}>{text}</Text>
    </TouchableOpacity>
  );
}
