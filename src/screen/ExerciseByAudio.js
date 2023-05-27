import {StyleSheet, Text, View, Pressable} from 'react-native';
import Radio from '../components/Radio';
import Video from 'react-native-video';

import React from 'react';

const ExerciseByAudio = () => {
  return (
    <View style={styles.container}>
      <Text style={{...styles.title1}}>Exercise BY Audio</Text>

      {/* <Video
        source={require('C:/react-native-projects/KidsDictionary/src/Plant.mp3')}
        paused={true} // Set to false if you want the audio to play automatically
        style={styles.audioPlayer}
        controls={true}
      /> */}

      <Radio></Radio>

      <View style={styles.buttonContainer}>
        <Pressable style={styles.button}>
          <Text style={styles.buttonText}>NEXT</Text>
        </Pressable>
      </View>
    </View>
  );
};

export default ExerciseByAudio;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  title1: {
    fontSize: 30,
    fontWeight: 'bold',
    marginTop: 5,
    marginBottom: 50,
    color: 'seagreen',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 5,
    marginBottom: 20,
    color: 'seagreen',
  },
  buttonContainer: {
    alignItems: 'center',
    marginTop: '15%',
  },
  button: {
    width: '90%',
    paddingVertical: 15,
    paddingHorizontal: '20%',
    borderRadius: 10,
    backgroundColor: 'seagreen',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
  },
  audioPlayer: {
    width: '80%',
    height: '20%',
  },
});
