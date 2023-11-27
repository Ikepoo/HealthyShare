import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native';
import {ArrowLeft, Image, Sticker, People, Video} from 'iconsax-react-native';
import {useNavigation} from '@react-navigation/native';

const AddPsot = () => {
  const [PostData, setPostData] = useState({
    title: '',
    content: '',
    totalLikes: 0,
    totalComments: 0,
  });
  const handleChange = (key, value) => {
    setPostData({
      ...PostData,
      [key]: value,
    });
  };
  const [image, setImage] = useState(null);
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
            placeholder="Judul"
            value={PostData.title}
            onChangeText={text => handleChange('title', text)}
            placeholderTextColor="rgba(0,0,0,0.6)"
            multiline
            style={textInput.title}
          />
        </View>
        <View style={[textInput.container, {minHeight: 430}]}>
          <TextInput
            placeholder="Tuliskan cerita anda"
            value={PostData.content}
            onChangeText={text => handleChange('content', text)}
            placeholderTextColor="rgba(0,0,0,0.6)"
            multiline
            style={textInput.content}
          />
        </View>
        <View style={[textInput.container, {padding: 10, borderWidth: 1}]}>
          <TextInput
            placeholder="# healthyShare, HealthyHow, ....."
            value={PostData.content}
            onChangeText={text => handleChange('content', text)}
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
        <TouchableOpacity style={styles.button} onPress={() => {}}>
          <Text style={styles.buttonLabel}>Upload</Text>
        </TouchableOpacity>
      </View>
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
});
const textInput = StyleSheet.create({
  container: {
    backgroundColor: '#f6fff6',
    borderRadius: 5,
    padding: 10,
    borderColor: '#808080',
  },
  title: {
    fontSize: 16,
    color: 'black',
    padding: 5,
  },
  content: {
    fontSize: 12,
    color: 'black',
    padding: 0,
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
