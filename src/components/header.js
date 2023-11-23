import React, {useRef} from 'react';
import {
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {Home2, People, Message2, Book1, BoxSearch} from 'iconsax-react-native';
// navigation
import {createStackNavigator, TransitionPresets} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Home, FriendList, Library} from '../screens';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();
// navigation

const Header = () => {
  return (
    <View style={styles.header}>
      <Text style={styles.title}>Healty Share</Text>
    </View>
  );
};
export default Header;
const styles = StyleSheet.create({
  header: {
    paddingHorizontal: 24,
    backgroundColor: '#e3ffe3',
    alignItems: 'center',
    height: 80,
    elevation: 8,
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    color: '#454c5a',
    fontWeight: 'bold',
  },
});
