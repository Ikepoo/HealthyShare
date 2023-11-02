import React from 'react';
import {
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {Home2, People, Message2, Book1} from 'iconsax-react-native';

const Header = () => {
  return (
    <View style={styles.header}>
      <Text style={styles.title}>Healty Share</Text>
      <View>
        <View style={styles.listCategory}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <TouchableOpacity style={{...category.item}}>
              <Home2 variant="Bold" size={24} style={{color: '#9dc69d'}} />
              {/* <Text style={{...category.title}}>Home</Text> */}
            </TouchableOpacity>
            <TouchableOpacity style={category.item}>
              <People variant="Bold" size={24} style={{color: '#9dc69d'}} />
              {/* <Text style={category.title}>People</Text> */}
            </TouchableOpacity>
            <TouchableOpacity style={category.item}>
              <Message2 variant="Bold" size={24} style={{color: '#9dc69d'}} />
              {/* <Text style={category.title}>Chat</Text> */}
            </TouchableOpacity>
            <TouchableOpacity style={category.item}>
              <Book1 variant="Bold" size={24} style={{color: '#9dc69d'}} />
              {/* <Text style={category.title}>Library</Text> */}
            </TouchableOpacity>
          </ScrollView>
        </View>
      </View>
    </View>
  );
};
export default Header;
const styles = StyleSheet.create({
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
    paddingHorizontal: 20,
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
