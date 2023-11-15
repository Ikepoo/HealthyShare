import React from 'react';
import {TouchableOpacity, Text, View, FlatList, StyleSheet} from 'react-native';
import FastImage from 'react-native-fast-image';
import {Bookmark} from 'iconsax-react-native';
import {useNavigation} from '@react-navigation/native';
// import {LibraryDetail} from '../screens';

const LLibrary = ({item}) => {
  const navigation = useNavigation();
  return (
    <FastImage
      style={styles.postingan}
      source={{
        uri: item.image,
        priority: FastImage.priority.high,
      }}
      resizeMode={FastImage.resizeMode.cover}>
      <TouchableOpacity
        onPress={() =>
          navigation.navigate('LibraryDetail', {detailId: item.id})
        }>
        <View>
          <View style={styles.headerText}>
            <Text style={{fontWeight: 'bold', fontSize: 16, color: '#ffffff'}}>
              {item.title}
            </Text>
          </View>
          <View>
            <Text style={{fontSize: 14}}>{item.title}</Text>
          </View>
        </View>
        <View style={{...styles.tombol}}>
          <TouchableOpacity
            style={{
              backgroundColor: '#ffffff',
              padding: 5,
              borderRadius: 10,
            }}>
            <Bookmark
              variant="Outline"
              size={24}
              style={{
                color: '#9dc69d',
              }}
            />
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    </FastImage>
  );
};

const ListMark = ({item}) => {
  return (
    <FlatList
      data={item}
      renderItem={({item}) => <LLibrary item={item} />}
      keyExtractor={item => item.id}
    />
  );
};
export default ListMark;

const styles = StyleSheet.create({
  postingan: {
    borderRadius: 10,
    padding: 8,
    paddingHorizontal: 10,
    marginBottom: 15,
    width: '100%',
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
  },
  headerText: {
    justifyContent: 'flex-start',
    flexDirection: 'row',
    alignItems: 'center',
  },
  isi: {
    marginHorizontal: 10,
  },
  tombol: {
    paddingVertical: 15,
    alignItems: 'flex-end',
  },
  gambar: {
    width: '100%',
    height: 90,
    borderRadius: 10,
    marginBottom: 15,
  },
});
