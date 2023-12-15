import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import {ArrowLeft, Image, Add} from 'iconsax-react-native';
import {useNavigation} from '@react-navigation/native';
import axios from 'axios';
import ImagePicker from 'react-native-image-crop-picker';
import storage from '@react-native-firebase/storage';
import firestore from '@react-native-firebase/firestore';
import FastImage from 'react-native-fast-image';

const EditPost = ({route}) => {
  const navigation = useNavigation();
  const {postId} = route.params;

  const [loading, setLoading] = useState(true);
  const [image, setImage] = useState(null);
  const [oldImage, setOldImage] = useState(null);
  const [postData, setPostData] = useState({
    user: '',
    category: '',
    image: {},
    content: '',
  });

  useEffect(() => {
    const dataset = firestore()
      .collection('post')
      .doc(postId)
      .onSnapshot(documentSnapshot => {
        const dataPost = documentSnapshot.data();
        if (dataPost) {
          console.log('Blog data: ', dataPost);
          setPostData({
            user: dataPost.user,
            category: dataPost.category,
            content: dataPost.content,
          });
          setOldImage(dataPost.image);
          setImage(dataPost.image);
          setLoading(false);
        } else {
          console.log(`Blog with ID ${postId} not found.`);
        }
      });
    setLoading(false);
    return () => dataset();
  }, [postId]);

  const handleImagePick = async () => {
    ImagePicker.openPicker({
      width: 960,
      height: 540,
      cropping: true,
    })
      .then(image => {
        console.log(image);
        setImage(image.path);
      })
      .catch(error => {
        console.log(error);
      });
  };
  const handleChange = (key, value) => {
    setPostData({
      ...postData,
      [key]: value,
    });
  };
  const handleUpdate = async () => {
    setLoading(true);
    let filename = image.substring(image.lastIndexOf('/') + 1);
    const extension = filename.split('.').pop();
    const name = filename.split('.').slice(0, -1).join('.');
    filename = name + Date.now() + '.' + extension;
    const reference = storage().ref(`postimages/${filename}`);
    try {
      if (image !== oldImage && oldImage) {
        const oldImageRef = storage().refFromURL(oldImage);
        await oldImageRef.delete();
      }
      if (image !== oldImage) {
        await reference.putFile(image);
      }
      const url =
        image !== oldImage ? await reference.getDownloadURL() : oldImage;
      await firestore().collection('post').doc(postId).update({
        user: postData.user,
        category: postData.category,
        image: url,
        content: postData.content,
      });
      setLoading(false);
      console.log('Blog Updated!');
      navigation.navigate('Home');
    } catch (error) {
      console.log(error);
    }
  };
  const handleDelete = async () => {
    await axios
      .delete(
        `https://6571c060d61ba6fcc013725b.mockapi.io/healthshare/postingan/${postId}`,
      )
      .then(() => {
        setLoading(false);
        navigation.navigate('Home');
      })
      .catch(error => {
        console.error(error);
      });
  };
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <ArrowLeft color="#000000" variant="Linear" size={24} />
        </TouchableOpacity>
        <Text style={{textTransform: 'uppercase', fontWeight: 'bold'}}>
          Edit Postingan
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
            placeholder="User"
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
        {image ? (
          <View
            style={{
              ...textInput.inptImage,
            }}>
            <FastImage
              style={{width: '100%', height: 120, borderRadius: 5}}
              source={{
                uri: image,
                headers: {Authorization: 'someAuthToken'},
                priority: FastImage.priority.high,
              }}
              resizeMode={FastImage.resizeMode.cover}
            />
            <TouchableOpacity
              style={{
                position: 'absolute',
                top: -5,
                right: -5,
                backgroundColor: '#000000',
                borderRadius: 25,
              }}
              onPress={() => setImage(null)}>
              <Add
                size={20}
                variant="Linear"
                color="#ffffff"
                style={{transform: [{rotate: '45deg'}]}}
              />
            </TouchableOpacity>
          </View>
        ) : (
          <View
            style={{
              ...textInput.inptImage,
            }}>
            <Text>Gambar</Text>
          </View>
        )}
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
        <TouchableOpacity
          style={{...styles.button, backgroundColor: 'red'}}
          onPress={handleDelete}>
          <Text style={styles.buttonLabel}>Delete</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={handleImagePick}
          style={{...item.content, backgroundColor: 'blue'}}>
          <Image color="#ffffff" variant="Bold" size={22} />
          <Text style={{...styles.buttonLabel, fontSize: 10}}>Gambar</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{...styles.button, backgroundColor: 'green'}}
          onPress={handleUpdate}>
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
export default EditPost;

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
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
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
    alignItems: 'center',
  },
});
