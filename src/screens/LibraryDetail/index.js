import React, {useRef} from 'react';
import {useNavigation} from '@react-navigation/native';
import {
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Animated,
} from 'react-native';
import FastImage from 'react-native-fast-image';
import {listLibrary} from '../../../data_library';
import {ArrowLeft, Like1, Send, MessageText1} from 'iconsax-react-native';

const LibraryDetail = ({route}) => {
  const {detailId} = route.params;
  const selectedList = listLibrary.find(detail => detail.id === detailId);
  const navigation = useNavigation();

  const scrollY = useRef(new Animated.Value(0)).current;
  const diffClampY = Animated.diffClamp(scrollY, 0, 52);
  const headerY = diffClampY.interpolate({
    inputRange: [0, 52],
    outputRange: [0, -52],
  });
  const bottomBarY = diffClampY.interpolate({
    inputRange: [0, 52],
    outputRange: [0, 52],
  });

  return (
    <View style={styles.container}>
      <Animated.View
        style={[styles.header, {transform: [{translateY: headerY}]}]}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <ArrowLeft color="#000000" variant="Linear" size={24} />
        </TouchableOpacity>
        <Text style={{textTransform: 'uppercase', fontWeight: 'bold'}}>
          {selectedList.title}
        </Text>
      </Animated.View>

      <Animated.ScrollView
        style={styles.content}
        showsVerticalScrollIndicator={false}
        vertical
        onScroll={Animated.event(
          [{nativeEvent: {contentOffset: {y: scrollY}}}],
          {useNativeDriver: true},
        )}>
        <FastImage
          style={{...styles.image}}
          source={{
            uri: selectedList.image,
            priority: FastImage.priority.high,
          }}
        />
        <Text style={{textAlign: 'justify'}}>{selectedList.text}</Text>
      </Animated.ScrollView>

      <Animated.View
        style={[styles.tombol, {transform: [{translateY: bottomBarY}]}]}>
        <View style={styles.jumlah}>
          <TouchableOpacity>
            <Like1 variant="Bold" size={24} style={{color: '#9dc69d'}} />
          </TouchableOpacity>
          <Text style={{marginLeft: 5}}>200</Text>
        </View>
        <TouchableOpacity>
          <MessageText1 variant="Bold" size={24} style={{color: '#9dc69d'}} />
        </TouchableOpacity>
        <TouchableOpacity>
          <Send variant="Bold" size={24} style={{color: '#9dc69d'}} />
        </TouchableOpacity>
      </Animated.View>
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
  tombol: {
    justifyContent: 'space-around',
    flexDirection: 'row',
    top: 8,
    paddingVertical: 10,
  },

  jumlah: {
    justifyContent: 'space-around',
    flexDirection: 'row',
    alignItems: 'center',
  },
});
