import React, {useRef, useEffect, useState} from 'react';
import {
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {Profile} from 'iconsax-react-native';
import auth from '@react-native-firebase/auth';
import ActionSheet from 'react-native-actions-sheet';
import firestore from '@react-native-firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/native';
const Header = () => {
  const [profileData, setProfileData] = useState(null);
  const navigation = useNavigation();
  const actionSheetRef = useRef(null);
  const openActionSheet = () => {
    actionSheetRef.current?.show();
  };
  const closeActionSheet = () => {
    actionSheetRef.current?.hide();
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
  const handleLogout = async () => {
    try {
      closeActionSheet();
      await auth().signOut();
      await AsyncStorage.removeItem('userData');
      navigation.navigate('Login');
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <View
      style={{
        ...styles.header,
        flexDirection: 'row',
        justifyContent: 'flex-end',
      }}>
      <View style={{right: '100%'}}>
        <Text style={styles.title}>Healty Share</Text>
      </View>
      <TouchableOpacity>
        <Profile
          variant="Bold"
          size={30}
          style={{color: '#9dc69d'}}
          onPress={openActionSheet}
        />
      </TouchableOpacity>
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
        <View
          style={{
            justifyContent: 'flex-end',
            alignItems: 'center',
            paddingVertical: 15,
            flexDirection: 'row',
            right: 20,
            gap: 10,
          }}>
          <Text
            style={{
              color: 'white',
              fontSize: 20,
              textTransform: 'uppercase',
              backgroundColor: 'green',
              padding: 10,
              borderRadius: 10,
            }}>
            {profileData.fullName}
          </Text>
          <Profile variant="Bold" size={30} style={{color: '#9dc69d'}} />
        </View>
        <TouchableOpacity
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            paddingVertical: 15,
          }}
          onPress={handleLogout}>
          <Text
            style={{
              color: 'black',
              fontSize: 18,
            }}>
            Log out
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
export default Header;
const styles = StyleSheet.create({
  header: {
    paddingHorizontal: 24,
    backgroundColor: '#e3ffe3',
    alignItems: 'center',
    height: 80,
    elevation: 8,
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    color: '#454c5a',
    fontWeight: 'bold',
  },
});
