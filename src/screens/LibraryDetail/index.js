import React from 'react';
import {useNavigation} from '@react-navigation/native';
import {Text, View, TouchableOpacity, StyleSheet, image} from 'react-native';
import FastImage from 'react-native-fast-image';
import {listLibrary} from '../../../data_library';
import {ArrowLeft} from 'iconsax-react-native';

const LibraryDetail = ({route}) => {
  const {detailId} = route.params;
  const selectedList = listLibrary.find(detail => detail.id === detailId);
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <ArrowLeft color="#000000" variant="Linear" size={24} />
        </TouchableOpacity>
        <Text style={{textTransform: 'uppercase', fontWeight: 'bold'}}>
          {selectedList.title}
        </Text>
      </View>

      <View style={styles.content}>
        <FastImage
          style={{...styles.image}}
          source={{
            uri: selectedList.image,
            priority: FastImage.priority.high,
          }}
        />
        <Text style={{textAlign: 'justify'}}>{selectedList.text}</Text>
      </View>
    </View>
  );
};
export default LibraryDetail;

const styles = StyleSheet.create({
  container: {
    padding: 15,
    flex: 1,
    backgroundColor: '#e3ffe3',
  },
  content: {
    marginTop: 20,
  },
  header: {
    marginVertical: 10,
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
  },
  image: {
    gambar: {
      width: '100%',
      height: 200,
      marginTop: 20,
      borderRadius: 10,
    },
  },
});
