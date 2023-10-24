import React, {useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Like1, Send, MessageText1, ProfileCircle} from 'iconsax-react-native';

const ListPost = ({data}) => {
  const [likeCount, setLikeCount] = useState(data.like);

  const increaseLikeCount = () => {
    setLikeCount(likeCount + 1);
  };
  return (
    <View style={konten.postingan}>
      <View style={inside.header}>
        <ProfileCircle
          variant="Bold"
          size={30}
          style={{color: '#9dc69d', marginRight: 10}}
        />
        <Text style={{fontWeight: 'bold'}}>{data.name}</Text>
      </View>
      <View style={inside.isi}>
        <Text>{data.text}</Text>
      </View>
      <View style={inside.tombol}>
        <View style={inside.jumlah}>
          <TouchableOpacity onPress={increaseLikeCount}>
            <Like1 variant="Bold" size={24} style={{color: '#9dc69d'}} />
          </TouchableOpacity>
          <Text style={{marginLeft: 5}}>{likeCount}</Text>
        </View>
        <MessageText1 variant="Bold" size={24} style={{color: '#9dc69d'}} />
        <Send variant="Bold" size={24} style={{color: '#9dc69d'}} />
      </View>
    </View>
  );
};

export default ListPost;
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
