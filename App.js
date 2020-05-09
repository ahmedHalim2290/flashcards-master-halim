import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import DeckView from "./components/DeckView";
import DeckList from "./components/DeckList";
import AddDeck from "./components/AddDeck";
import { Provider } from "react-redux";
import reducer from "./reducers";
import { createStore } from "redux";
import AddCard from "./components/AddCard";
import { View, StatusBar } from "react-native";
import Constants from "expo-constants";
import { purple } from "./utils/colors";
import Quiz from './components/Quiz'
import { ScrollView } from "react-native-gesture-handler";

function MyStatusBar({ backgroundColor, ...props }) {
  return (
    <View style={{ backgroundColor, height: Constants.statusBarHeight }}>
      <StatusBar
        translucent
        backgroundColor={backgroundColor}
        {...props}
        
      ></StatusBar>
    </View>
  );
}

const HomeStack = createStackNavigator();
function HomeStackScreen() {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen name="Home" component={DeckList} />
      <HomeStack.Screen name="Deck View" component={DeckView} />
      <HomeStack.Screen name="Add Card" component={AddCard} />
      <HomeStack.Screen name="Quiz" component={Quiz} />
      <HomeStack.Screen name="DeckList" component={DeckList} />


    </HomeStack.Navigator>
  );
}

const HomeTab = createBottomTabNavigator();
function HomeTabScreen() {
  return (
    <HomeTab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          if (route.name === "AddDeck") {
            iconName = focused ? "ios-add-circle" : "ios-add";
          } else if (route.name === "Decks") {
            iconName = focused ? "ios-list-box" : "ios-list";
          }
          return <Ionicons name={iconName} size={size} color={color} />;
        }
      })}
      tabBarOptions={{
        activeTintColor: "tomato",
        inactiveTintColor: "gray",
        keyboardHidesTabBar: false
      }}
    >
      <HomeTab.Screen name="Decks" component={HomeStackScreen} />
      <HomeTab.Screen name="AddDeck" component={AddDeck} />
    </HomeTab.Navigator>
  );
}

export default class App extends React.Component {
  render() {
    return (
      <Provider store={createStore(reducer)}>
        <NavigationContainer>
          <MyStatusBar backgroundColor={purple} barStyle='light-content' />
          <HomeTabScreen />
        </NavigationContainer>
      </Provider>
    );
  }
}
