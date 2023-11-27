import React from 'react';
import {
  ScrollView,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
} from 'react-native';
import {Header, ListStory, ListPost} from '../../components';
import {Post} from '../../../data';
import {ElementPlus} from 'iconsax-react-native';
import {useNavigation} from '@react-navigation/native';

export default function Home() {
  const navigation = useNavigation();
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
      <TouchableOpacity
        style={styles.add}
        onPress={() => navigation.navigate('AddPost')}>
        <ElementPlus color="white" variant="Bold" size={24} />
      </TouchableOpacity>
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
  add: {
    backgroundColor: '#000000',
    padding: 10,
    bottom: '20%',
    right: 0,
    position: 'absolute',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
  },
});
