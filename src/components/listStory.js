import React from 'react';
import {
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Text,
  FlatList,
} from 'react-native';
import FastImage from 'react-native-fast-image';
import {Story} from '../../data';

const SStory = ({item}) => {
  return (
    <TouchableOpacity>
      <FastImage
        source={{
          uri: item.image,
          priority: FastImage.priority.high,
        }}
        style={{...story.item}}>
        <Text style={{...story.title}}>{item.name}</Text>
      </FastImage>
    </TouchableOpacity>
  );
};
const ListStory = () => {
  return (
    <ScrollView
      showsHorizontalScrollIndicator={false}
      horizontal
      style={story.container}>
      <FlatList
        data={Story}
        renderItem={({item}) => <SStory item={item} />}
        keyExtractor={item => item.id}
        horizontal={true}
      />
    </ScrollView>
  );
};
export default ListStory;
const story = StyleSheet.create({
  container: {
    marginBottom: 10,
  },
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
