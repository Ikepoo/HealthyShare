import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  KeyboardAvoidingView,
} from 'react-native';
import {ArrowLeft, Image, Add} from 'iconsax-react-native';
import {useNavigation} from '@react-navigation/native';
import ImagePicker from 'react-native-image-crop-picker';
import storage from '@react-native-firebase/storage';
import firestore from '@react-native-firebase/firestore';
import FastImage from 'react-native-fast-image';
import auth from '@react-native-firebase/auth';

const AddPsot = () => {
  const [loading, setLoading] = useState(false);
  const [profileData, setProfileData] = useState(null);
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
    let filename = image.substring(image.lastIndexOf('/') + 1);
    const extension = filename.split('.').pop();
    const name = filename.split('.').slice(0, -1).join('.');
    filename = name + Date.now() + '.' + extension;
    const reference = storage().ref(`postimages/${filename}`);

    setLoading(true);
    try {
      const authorId = auth().currentUser.uid;
      await reference.putFile(image);
      const url = await reference.getDownloadURL();
      await firestore().collection('post').add({
        user: postData.user,
        category: postData.category,
        image: url,
        createAt: new Date(),
        like: postData.like,
        content: postData.content,
        f_active: 'none',
        p_active: '',
        authorId,
      });

      setLoading(false);
      console.log('Post added!');
      navigation.navigate('Home');
    } catch (error) {
      console.log(error);
    }
  };
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
  useEffect(() => {
    const fetchProfileData = () => {
      try {
        const user = auth().currentUser;
        if (user) {
          const userId = user.uid;
          const userRef = firestore().collection('users').doc(userId);

          const unsubscribeProfile = userRef.onSnapshot(doc => {
            if (doc.exists) {
              const userData = doc.data();
              setProfileData(userData);
            } else {
              console.error('Dokumen pengguna tidak ditemukan.');
            }
          });

          return () => {
            unsubscribeProfile();
          };
        }
      } catch (error) {
        console.error('Error fetching profile data:', error);
      }
    };
    fetchProfileData();
  }, []);
  const navigation = useNavigation();

  return (
    <KeyboardAvoidingView
      style={{flex: 1}}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      enabled>
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
              value={profileData.fullName}
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
            onPress={handleImagePick}
            style={{
              ...item.content,
              backgroundColor: 'green',
              justifyContent: 'space-evenly',
              flexDirection: 'row',
            }}>
            <Image color="#ffffff" variant="Bold" size={22} />
            <Text style={{color: 'white'}}>Gambar</Text>
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
    </KeyboardAvoidingView>
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
    borderRadius: 5,
    width: 150,
  },
});
