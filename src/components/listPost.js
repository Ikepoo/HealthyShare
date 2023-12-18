import React, {useRef, useEffect, useState} from 'react';
import {TouchableOpacity, StyleSheet, Text, View, FlatList} from 'react-native';
import FastImage from 'react-native-fast-image';
import ActionSheet from 'react-native-actions-sheet';
import {
  ProfileCircle,
  Like1,
  MessageText1,
  Send,
  MessageAdd,
  ProfileDelete,
  More,
} from 'iconsax-react-native';
import axios from 'axios';
import {useNavigation} from '@react-navigation/native';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
const PPost = ({item}) => {
  const navigation = useNavigation();
  const actionSheetRef = useRef(null);
  const [profileData, setProfileData] = useState(null);
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
  const openActionSheet = () => {
    // if (item.user == profileData.fullName) {
    actionSheetRef.current?.show();
    // }
  };
  const closeActionSheet = () => {
    actionSheetRef.current?.hide();
  };

  const navigateEdit = () => {
    closeActionSheet();
    navigation.navigate('EditPost', {postId: item.id});
  };
  const handleDelete = async () => {
    await axios
      .delete(
        `https://6571c060d61ba6fcc013725b.mockapi.io/healthshare/postingan/${item.id}`,
      )
      .then(() => {
        closeActionSheet();
        navigation.navigate('Home');
      })
      .catch(error => {
        console.error(error);
      });
  };
  return (
    <View style={konten.container}>
      <View style={konten.postingan}>
        <View style={inside.header1}>
          <View style={inside.header}>
            <ProfileCircle
              variant="Bold"
              size={30}
              style={{color: '#9dc69d', marginRight: 10}}
            />
            <Text style={{fontWeight: 'bold', fontSize: 16}}>{item.user}</Text>
          </View>
          <TouchableOpacity onPress={openActionSheet}>
            <More
              color="black"
              variant="Linear"
              size={20}
              style={{transform: [{rotate: '90deg'}]}}
            />
          </TouchableOpacity>
        </View>
        {/* postingan */}
        <View style={{display: item.p_active}}>
          <View style={{...inside.isi}}>
            <Text>{item.content}</Text>
            <FastImage
              style={inside.gambar}
              source={{
                uri: item.image,
                priority: FastImage.priority.high,
              }}
            />
          </View>
          <View style={{...inside.tombol}}>
            <View style={inside.jumlah}>
              <TouchableOpacity>
                <Like1 variant="Bold" size={24} style={{color: '#9dc69d'}} />
              </TouchableOpacity>
              <Text style={{marginLeft: 5}}>{item.like}</Text>
            </View>
            <TouchableOpacity>
              <MessageText1
                variant="Bold"
                size={24}
                style={{color: '#9dc69d'}}
              />
            </TouchableOpacity>
            <TouchableOpacity>
              <Send variant="Bold" size={24} style={{color: '#9dc69d'}} />
            </TouchableOpacity>
          </View>
        </View>
        {/* friend */}
        <View style={{display: item.f_active}}>
          <View style={{...inside.isi}}>
            <Text>{item.text}</Text>
            <View style={inside.tombol2}>
              <TouchableOpacity
                style={{
                  ...inside.friend,
                  display: item.isDelete,
                  backgroundColor: '#c8cede',
                }}>
                <Text>Add Friend</Text>
                <MessageAdd
                  variant="Bold"
                  size={24}
                  style={{color: '#486ac6'}}
                />
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  ...inside.friend,
                  display: item.isFriend,
                  backgroundColor: '#e3c1c1',
                }}>
                <Text>Unfriend</Text>
                <ProfileDelete
                  variant="Bold"
                  size={24}
                  style={{color: '#c64949'}}
                />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
      <ActionSheet
        ref={actionSheetRef}
        containerStyle={{
          borderTopLeftRadius: 25,
          borderTopRightRadius: 25,
        }}
        indicatorStyle={{
          width: 100,
        }}
        gestureEnabled={true}
        defaultOverlayOpacity={0.3}>
        <TouchableOpacity
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            paddingVertical: 15,
          }}
          onPress={navigateEdit}>
          <Text
            style={{
              color: 'black',
              fontSize: 18,
            }}>
            Edit
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            paddingVertical: 15,
          }}
          onPress={handleDelete}>
          <Text
            style={{
              color: 'black',
              fontSize: 18,
            }}>
            Delete
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            paddingVertical: 15,
          }}
          onPress={closeActionSheet}>
          <Text
            style={{
              color: 'red',
              fontSize: 18,
            }}>
            Cancel
          </Text>
        </TouchableOpacity>
      </ActionSheet>
    </View>
  );
};
const ListPost = ({item}) => {
  return (
    <FlatList
      data={item}
      renderItem={({item}) => <PPost item={item} />}
      keyExtractor={item => item.id}
    />
  );
};
export default ListPost;

const konten = StyleSheet.create({
  postingan: {
    borderRadius: 10,
    padding: 6,
    backgroundColor: '#ffffff',
    marginBottom: 30,
  },
});

const inside = StyleSheet.create({
  header: {
    justifyContent: 'flex-start',
    flexDirection: 'row',
    alignItems: 'center',
  },
  header1: {
    marginVertical: 10,
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 5,
  },
  isi: {
    marginHorizontal: 10,
  },
  gambar: {
    width: '100%',
    height: 200,
    marginTop: 20,
    borderRadius: 10,
  },
  tombol: {
    justifyContent: 'space-around',
    flexDirection: 'row',
    top: 8,
    paddingVertical: 15,
  },
  tombol2: {
    justifyContent: 'flex-end',
    flexDirection: 'row',
    top: 8,
    paddingBottom: 10,
  },
  jumlah: {
    justifyContent: 'space-around',
    flexDirection: 'row',
    alignItems: 'center',
  },
  friend: {
    justifyContent: 'center',
    gap: 15,
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    width: 300,
  },
});
