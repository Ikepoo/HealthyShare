import React from 'react';
import {ScrollView, StyleSheet, View, Text} from 'react-native';
import {Header, ListPost} from '../../components';
import {Friend} from '../../../data';

export default function Profile() {
  return (
    <View style={styles.container}>
      <Header item />
      <ScrollView
        showsVerticalScrollIndicator={false}
        vertical
        style={styles.content}>
        <View style={styles.header}>
          <Text style={{fontSize: 16, fontWeight: 'bold'}}>Profile</Text>
        </View>
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
