import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

const ListStory = ({data}) => {
  return (
    <View style={story.item}>
      <Text style={story.title}>{data.name}</Text>
    </View>
  );
};
export default ListStory;
const story = StyleSheet.create({
  item: {
    paddingHorizontal: 14,
    paddingVertical: 20,
    borderRadius: 25,
    alignItems: 'center',
    height: 150,
    width: 90,
    backgroundColor: '#ffffff',
    marginVertical: 6,
    marginHorizontal: 6,
    borderRadius: 8,
  },
  title: {
    marginTop: 80,
    fontSize: 14,
    lineHeight: 18,
    color: '#454c5a',
  },
});
