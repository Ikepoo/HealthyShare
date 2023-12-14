import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import {ArrowLeft, Image, Sticker, People, Video} from 'iconsax-react-native';
import {useNavigation} from '@react-navigation/native';
import axios from 'axios';

const AddPsot = () => {
  const [loading, setLoading] = useState(false);
  const [postData, setPostData] = useState({
    user: '',
    category: '',
    image: {},
    createAt: 0,
    like: 0,
    content: '',
    p_active: '',
    p_active: '',
  });
  const handleChange = (key, value) => {
    setPostData({
      ...postData,
      [key]: value,
    });
  };
  const [image, setImage] = useState(null);

  const handleUpload = async () => {
    setLoading(true);
    try {
      await axios
        .post(
          'https://6571c060d61ba6fcc013725b.mockapi.io/healthshare/postingan',
          {
            user: postData.user,
            category: postData.category,
            image,
            createAt: new Date(),
            like: postData.like,
            content: postData.content,
            f_active: 'none',
            p_active: '',
          },
        )
        .then(function (response) {
          console.log(response);
        })
        .catch(function (error) {
          console.log(error);
        });
      setLoading(false);
      navigation.navigate('Home');
    } catch (e) {
      console.log(e);
    }
  };

  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <ArrowLeft color="#000000" variant="Linear" size={24} />
        </TouchableOpacity>
        <Text style={{textTransform: 'uppercase', fontWeight: 'bold'}}>
          Buat Postingan
        </Text>
      </View>
      <ScrollView
        contentContainerStyle={{
          paddingHorizontal: 24,
          paddingVertical: 10,
          gap: 10,
        }}>
        <View style={{...textInput.container, borderWidth: 1}}>
          <TextInput
            placeholder="From"
            value={postData.user}
            onChangeText={text => handleChange('user', text)}
            placeholderTextColor="rgba(0,0,0,0.6)"
            multiline
            style={textInput.title}
          />
        </View>
        <View style={[textInput.container, {minHeight: 280}]}>
          <TextInput
            placeholder="Tuliskan cerita anda"
            value={postData.content}
            onChangeText={text => handleChange('content', text)}
            placeholderTextColor="rgba(0,0,0,0.6)"
            multiline
            style={{
              ...textInput.content,
            }}
          />
        </View>
        <View>
          <TextInput
            placeholder="letakkan gambar"
            value={image}
            onChangeText={text => setImage(text)}
            placeholderTextColor="rgba(0,0,0,0.6)"
            multiline
            style={{
              ...textInput.inptImage,
            }}
          />
        </View>
        <View style={[textInput.container, {padding: 10, borderWidth: 1}]}>
          <TextInput
            placeholder="# healthyShare, HealthyHow, ....."
            value={postData.category}
            onChangeText={text => handleChange('category', text)}
            placeholderTextColor="rgba(0,0,0,0.6)"
            multiline
            style={textInput.content}
          />
        </View>
      </ScrollView>

      <View style={styles.bottomBar}>
        <TouchableOpacity style={{...item.content, backgroundColor: 'red'}}>
          <Image color="#ffffff" variant="Bold" size={22} />
        </TouchableOpacity>
        <TouchableOpacity style={{...item.content, backgroundColor: 'gray'}}>
          <Video color="#ffffff" variant="Bold" size={22} />
        </TouchableOpacity>
        <TouchableOpacity style={{...item.content, backgroundColor: 'green'}}>
          <Sticker color="#ffffff" variant="Bold" size={22} />
        </TouchableOpacity>
        <TouchableOpacity style={{...item.content, backgroundColor: 'orange'}}>
          <People color="#ffffff" variant="Bold" size={22} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={handleUpload}>
          <Text style={styles.buttonLabel}>Upload</Text>
        </TouchableOpacity>
      </View>
      {loading && (
        <View style={styles.loadingOverlay}>
          <ActivityIndicator size="large" color="#0078d4" />
        </View>
      )}
    </View>
  );
};
export default AddPsot;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e3ffe3',
  },
  header: {
    marginVertical: 10,
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  title: {
    fontSize: 16,
    color: 'black',
  },
  bottomBar: {
    backgroundColor: 'white',
    justifyContent: 'space-around',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingVertical: 10,
    shadowColor: 'black',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  button: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: 'blue',
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonLabel: {
    fontSize: 14,
    color: 'white',
  },
  loadingOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
const textInput = StyleSheet.create({
  container: {
    backgroundColor: '#f6fff6',
    borderRadius: 5,
    padding: 5,
    borderColor: '#808080',
  },
  title: {
    fontSize: 12,
    color: 'black',
    padding: 5,
  },
  content: {
    fontSize: 12,
    color: 'black',
    padding: 0,
  },
  inptImage: {
    fontSize: 12,
    textAlign: 'center',
    height: 120,
    borderColor: 'rgba(0,0,0,0.2)',
    borderWidth: 1,
    borderRadius: 10,
  },
});
const item = StyleSheet.create({
  container: {
    justifyContent: 'space-around',
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  content: {
    padding: 10,
    borderRadius: 10,
  },
});
