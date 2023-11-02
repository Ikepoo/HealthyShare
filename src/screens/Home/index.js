import React from 'react';
import {ScrollView, StyleSheet, View, Text} from 'react-native';
import {Header, ListStory, ListPost} from '../../components';
import {Post} from '../../../data';

export default function Home() {
  return (
    <View style={styles.container}>
      <Header />
      <ScrollView
        showsVerticalScrollIndicator={false}
        vertical
        style={styles.content}>
        <ListStory />
        <View style={styles.header}>
          <Text style={{fontSize: 16, fontWeight: 'bold'}}>POSTINGAN</Text>
        </View>
        <ListPost item={Post} />
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
