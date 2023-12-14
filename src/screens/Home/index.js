import React, {useState, useCallback} from 'react';
import {
  ScrollView,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  RefreshControl,
  ActivityIndicator,
} from 'react-native';
import {Header, ListStory, ListPost} from '../../components';
import {ElementPlus} from 'iconsax-react-native';
import {useNavigation, useFocusEffect} from '@react-navigation/native';
import axios from 'axios';

export default function Home() {
  const [loading, setLoading] = useState(true);
  const [postData, setPostData] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const getDataPost = async () => {
    try {
      const response = await axios.get(
        'https://6571c060d61ba6fcc013725b.mockapi.io/healthshare/postingan',
      );
      setPostData(response.data);
      setLoading(false);
    } catch (error) {
      console.error(error);
    }
  };

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      getDataPost();
      setRefreshing(false);
    }, 1500);
  }, []);

  useFocusEffect(
    useCallback(() => {
      getDataPost();
    }, []),
  );
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <Header />
      <ScrollView
        showsVerticalScrollIndicator={false}
        vertical
        style={styles.content}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }>
        {loading ? (
          <ActivityIndicator size={'large'} color="#0078d4" />
        ) : (
          <View>
            <ListStory />
            <View style={styles.header}>
              <Text style={{fontSize: 16, fontWeight: 'bold'}}>POSTINGAN</Text>
            </View>
            <ListPost item={postData} />
          </View>
        )}
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
