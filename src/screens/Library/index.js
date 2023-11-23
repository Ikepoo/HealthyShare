import React, {useRef} from 'react';
import {StyleSheet, Text, View, ScrollView, Animated} from 'react-native';
import {Header, ListMark} from '../../components';
import {listLibrary} from '../../../data_library';

export default function Library() {
  const scrollY = useRef(new Animated.Value(0)).current;
  const diffClampY = Animated.diffClamp(scrollY, 0, 80);
  const recentY = diffClampY.interpolate({
    inputRange: [0, 80],
    outputRange: [0, -80],
    extrapolate: 'clamp',
  });
  return (
    <View style={styles.container}>
      <Animated.View
        style={[styles.container1, {transform: [{translateY: recentY}]}]}>
        <Header />
      </Animated.View>
      <Animated.ScrollView
        showsVerticalScrollIndicator={false}
        vertical
        style={styles.content}
        onScroll={Animated.event(
          [{nativeEvent: {contentOffset: {y: scrollY}}}],
          {useNativeDriver: true},
        )}
        contentContainerStyle={{paddingTop: 70}}>
        <View style={styles.header}>
          <Text style={{fontSize: 16, fontWeight: 'bold'}}>Library</Text>
        </View>
        <ListMark item={listLibrary} />
        <View style={{marginBottom: 20}}></View>
      </Animated.ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e3ffe3',
  },
  container1: {
    position: 'absolute',
    backgroundColor: '#e3ffe3',
    zIndex: 999,
    top: 0,
    left: 0,
    right: 0,
    elevation: 1000,
  },
  content: {
    padding: 15,
  },
  header: {
    marginVertical: 10,
  },
});
