import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect} from 'react';
import {useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SplashScreen = () => {
  const navigation = useNavigation();
  useEffect(() => {
    checkToken();
  }, []);
  const checkToken = async () => {
    try {
      const userDataJSON = await AsyncStorage.getItem('userData');

      if (userDataJSON) {
        const userData = JSON.parse(userDataJSON);
        const {userToken, expirationTime} = userData;

        if (userToken && expirationTime) {
          const currentTime = new Date().getTime();

          if (currentTime <= expirationTime) {
            setTimeout(() => {
              navigation.navigate('MainApp');
            }, 1500);
          } else {
            setTimeout(() => {
              navigation.navigate('Login');
            }, 1500);
          }
        } else {
          setTimeout(() => {
            navigation.navigate('Login');
          }, 1500);
        }
      } else {
        setTimeout(() => {
          navigation.navigate('Login');
        }, 1500);
      }
    } catch (error) {
      console.error('Error retrieving token data:', error);
      setTimeout(() => {
        navigation.navigate('Login');
      }, 1500);
    }
  };
  return (
    <View style={styles.container}>
      <Text style={styles.logo}>HealthyShare</Text>
      <Text style={[styles.info, {textAlign: 'center', fontSize: 16}]}>
        share your story your healthy life
      </Text>
      <View style={styles.infoContainer}>
        <Text style={[styles.info, {textAlign: 'center'}]}>
          Mukhammad Zainul Musyafa
        </Text>
        <Text style={[styles.info, {textAlign: 'center'}]}>'2118050'</Text>
      </View>
    </View>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e3ffe3',
    justifyContent: 'center',
  },
  logo: {
    fontSize: 48,
    color: 'black',
    alignSelf: 'center',
  },
  infoContainer: {
    alignItems: 'center',
    position: 'absolute',
    bottom: 24,
    left: 0,
    right: 0,
  },
  info: {
    fontSize: 12,
    color: 'rgba(0,0,0,0.6)',
  },
});
