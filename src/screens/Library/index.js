import React from 'react';
import {StyleSheet, Text, View, ScrollView} from 'react-native';
import {Header, ListMark} from '../../components';
import {listLibrary} from '../../../data_library';

export default function Library() {
  return (
    <View style={styles.container}>
      <Header />
      <ScrollView
        showsVerticalScrollIndicator={false}
        vertical
        style={styles.content}>
        <View style={styles.header}>
          <Text style={{fontSize: 16, fontWeight: 'bold'}}>Library</Text>
        </View>
        <ListMark item={listLibrary} />
        <View style={{marginBottom: 20}}></View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e3ffe3',
  },
  content: {
    padding: 15,
  },
  header: {
    marginVertical: 10,
  },
});
