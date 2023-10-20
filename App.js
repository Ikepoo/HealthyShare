import React from 'react';
import {
  Button,
  ScrollView,
  StyleSheet,
  Text,
  View,
  Image,
  ImageBackground,
  Alert,
} from 'react-native';
import {Like1, Send, MessageText1, ProfileCircle} from 'iconsax-react-native';
import {getUriFromSource} from 'react-native-svg/lib/typescript/LocalSvg';

export default function App() {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Healthy Share</Text>

        <View style={styles.listCategory}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <View style={{...category.item}}>
              <Text style={{...category.title}}>Home</Text>
            </View>
            <View style={category.item}>
              <Text style={category.title}>People</Text>
            </View>
            <View style={category.item}>
              <Text style={category.title}>Chat</Text>
            </View>
            <View style={category.item}>
              <Text style={category.title}>Library</Text>
            </View>
          </ScrollView>
        </View>
      </View>
      <ScrollView vertical showsVerticalScrollIndicator={false}>
        <View style={styles.listCategory}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <View style={{...story.item, marginLeft: 20}}>
              <Text style={{...story.title}}>zainul</Text>
            </View>
            <View style={story.item}>
              <Text style={story.title}>zain</Text>
            </View>
            <View style={story.item}>
              <Text style={story.title}>aria</Text>
            </View>
            <View style={story.item}>
              <Text style={story.title}>difa</Text>
            </View>
            <View style={story.item}>
              <Text style={story.title}>aria</Text>
            </View>
            <View style={{...story.item, marginRight: 20}}>
              <Text style={story.title}>gatau</Text>
            </View>
          </ScrollView>
        </View>
        <View style={konten.container}>
          <View style={konten.header}>
            <Text style={{fontSize: 16, fontWeight: 'bold'}}>POSTINGAN</Text>
          </View>
          <View style={konten.postingan}>
            <View style={inside.header}>
              <ProfileCircle
                variant="Bold"
                size={30}
                style={{color: '#9dc69d', marginRight: 10}}
              />
              <Text style={{fontWeight: 'bold'}}>
                Mukhammad Zainul Musyafa'
              </Text>
            </View>
            <View style={inside.isi}>
              <Text>
                Gaya hidup sehat mencakup serangkaian kebiasaan baik yang dapat
                meningkatkan kesejahteraan fisik dan mental. Memilih makanan
                yang seimbang, kaya akan nutrisi, serta menghindari makanan
                berlemak dan berkalori tinggi adalah langkah awal yang penting.
              </Text>
            </View>
            <View style={inside.tombol}>
              <View style={inside.jumlah}>
                <Like1 variant="Bold" size={24} style={{color: '#9dc69d'}} />
                <Text style={{marginLeft: 5}}>325</Text>
              </View>
              <MessageText1
                variant="Bold"
                size={24}
                style={{color: '#9dc69d'}}
              />
              <Send variant="Bold" size={24} style={{color: '#9dc69d'}} />
            </View>
          </View>
          <View style={konten.postingan}>
            <View style={inside.header}>
              <ProfileCircle
                variant="Bold"
                size={30}
                style={{color: '#9dc69d', marginRight: 10}}
              />
              <Text style={{fontWeight: 'bold'}}>Nur Aria</Text>
            </View>
            <View style={inside.isi}>
              <Text>
                "Gaya hidup sehat adalah investasi terbaik yang dapat Anda
                lakukan untuk masa depan Anda."
              </Text>
              <Image
                style={{width: '100%'}}
                source={{
                  uri: 'https://plus.unsplash.com/premium_photo-1679938885972-180ed418f466?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
                }}
              />
            </View>
            <View style={inside.tombol}>
              <View style={inside.jumlah}>
                <Like1 variant="Bold" size={24} style={{color: '#9dc69d'}} />
                <Text style={{marginLeft: 5}}>798</Text>
              </View>

              <MessageText1
                variant="Bold"
                size={24}
                style={{color: '#9dc69d'}}
              />
              <Send variant="Bold" size={24} style={{color: '#9dc69d'}} />
            </View>
          </View>
          <View style={konten.postingan}>
            <View style={inside.header}>
              <ProfileCircle
                variant="Bold"
                size={30}
                style={{color: '#9dc69d', marginRight: 10}}
              />
              <Text style={{fontWeight: 'bold'}}>Anonymus</Text>
            </View>
            <View style={inside.isi}>
              <Text>
                Dengan menjaga keseimbangan ini, seseorang dapat meningkatkan
                energi, mengurangi risiko penyakit, dan merasakan manfaat
                positif dalam jangka panjang terhadap kualitas hidup mereka.
              </Text>
            </View>
            <View style={inside.tombol}>
              <Like1 variant="Bold" size={24} style={{color: '#9dc69d'}} />
              <MessageText1
                variant="Bold"
                size={24}
                style={{color: '#9dc69d'}}
              />
              <Send variant="Bold" size={24} style={{color: '#9dc69d'}} />
            </View>
          </View>
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
  header: {
    paddingHorizontal: 24,
    //justifyContent: 'space-between',
    backgroundColor: '#e3ffe3',
    //flexDirection: 'row',
    alignItems: 'center',

    height: 90,
    elevation: 8,
    paddingTop: 8,
    paddingBottom: 4,
  },
  title: {
    fontSize: 20,
    //fontFamily: fontType['Pjs-ExtraBold'],
    color: '#454c5a',
    fontWeight: 'bold',
  },
  listCategory: {
    paddingVertical: 10,
  },
});

const category = StyleSheet.create({
  item: {
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 25,
    alignItems: 'center',
    //backgroundColor: '#e5eaff',
    marginHorizontal: 3,
  },
  title: {
    //fontFamily: fontType['Pjs-SemiBold'],
    fontSize: 14,
    lineHeight: 18,
    color: '#454c5a',
  },
});

const story = StyleSheet.create({
  item: {
    paddingHorizontal: 14,
    paddingVertical: 20,
    borderRadius: 25,
    alignItems: 'center',
    height: 150,
    width: 90,
    backgroundColor: '#ffffff',
    marginVertical: 6,
    marginHorizontal: 6,
    borderRadius: 8,
  },
  title: {
    marginTop: 80,
    fontSize: 14,
    lineHeight: 18,
    color: '#454c5a',
  },
});

const konten = StyleSheet.create({
  container: {
    marginHorizontal: 20,
  },
  header: {
    marginVertical: 10,
  },
  postingan: {
    borderRadius: 10,
    padding: 6,
    backgroundColor: '#ffffff',
    marginBottom: 20,
  },
});

const inside = StyleSheet.create({
  header: {
    marginVertical: 10,
    justifyContent: 'flex-start',
    flexDirection: 'row',
    alignItems: 'center',
  },
  isi: {
    marginVertical: 10,
    marginBottom: 20,
    marginHorizontal: 10,
  },
  tombol: {
    justifyContent: 'space-around',
    flexDirection: 'row',
    top: 8,
    paddingVertical: 15,
  },
  jumlah: {
    justifyContent: 'space-around',
    flexDirection: 'row',
    alignItems: 'center',
  },
});
