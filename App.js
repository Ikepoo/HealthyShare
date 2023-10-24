import React from 'react';
import {
  Button,
  ScrollView,
  StyleSheet,
  Text,
  View,
  Image,
  ImageBackground,
} from 'react-native';
import {Like1, Send, MessageText1, ProfileCircle} from 'iconsax-react-native';
import {Story} from './data';
import {ListPost, ListStory} from './src/components';
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
        <StoryList />
        <PostList />
      </ScrollView>
    </View>
  );
}

const StoryList = () => {
  return (
    <View style={styles.listCategory}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {Story.map(nilai => {
          <ListStory key={nilai.id} data={nilai} />;
        })}
      </ScrollView>
    </View>
  );
};

const PostList = ({data}) => {
  return (
    <View style={konten.container}>
      <View style={konten.header}>
        <Text style={{fontSize: 16, fontWeight: 'bold'}}>POSTINGAN</Text>
      </View>
      <ListPost data={data} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e3ffe3',
  },
  header: {
    paddingHorizontal: 24,
    backgroundColor: '#e3ffe3',
    alignItems: 'center',

    height: 90,
    elevation: 8,
    paddingTop: 8,
    paddingBottom: 4,
  },
  title: {
    fontSize: 20,
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
