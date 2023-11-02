import React from 'react';
import {TouchableOpacity, StyleSheet, Text, View, FlatList} from 'react-native';
import FastImage from 'react-native-fast-image';
import {
  ProfileCircle,
  Like1,
  MessageText1,
  Send,
  MessageAdd,
  ProfileDelete,
} from 'iconsax-react-native';

const PPost = ({item}) => {
  return (
    <View style={konten.container}>
      <View style={konten.postingan}>
        <View style={inside.header}>
          <ProfileCircle
            variant="Bold"
            size={30}
            style={{color: '#9dc69d', marginRight: 10}}
          />
          <Text style={{fontWeight: 'bold', fontSize: 16}}>{item.name}</Text>
        </View>
        {/* postingan */}
        <View style={{display: item.p_active}}>
          <View style={{...inside.isi}}>
            <Text>{item.text}</Text>
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
    marginVertical: 10,
    justifyContent: 'flex-start',
    flexDirection: 'row',
    alignItems: 'center',
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
