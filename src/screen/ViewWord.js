import {StyleSheet, Text, View, Image} from 'react-native';
import React, {useEffect, useState} from 'react';
import Video from 'react-native-video';
import {openDatabase} from 'react-native-sqlite-storage';
import {AudioPlayer} from 'react-native-simple-audio-player';

const db = openDatabase({name: 'kidsdictionary'});

const ViewWord = ({route, navigation}) => {
  const name = route.params.paramkey.wordname;
  const meaning = route.params.paramkey.meaning;
  const image = route.params.paramkey.image;
  const audio = route.params.paramkey.audio;
  const grade = route.params.paramkey.grade;

  console.log(name, 'this is wordname');
  return (
    <View style={styles.container}>
      <Text>{name}</Text>
      <Text>{meaning}</Text>

      <Image
        source={{
          uri: image,
        }}
        style={styles.image1}
      />
      <AudioPlayer url={audio} />
      <Text>{grade}</Text>
    </View>
  );
};

export default ViewWord;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 50,
    marginBottom: 20,
    color: 'seagreen',
  },
  title1: {
    fontSize: 50,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 0,
    color: 'seagreen',
  },
  meaning: {
    fontSize: 20,
    marginTop: 20,
    color: 'seagreen',
  },

  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },

  image1: {
    width: '80%',
    height: '50%',
  },
  image2: {
    marginTop: 35,
    width: '70%',
    height: '10%',
  },
  audioPlayer: {
    width: '80%',
    height: '20%',
  },
});
