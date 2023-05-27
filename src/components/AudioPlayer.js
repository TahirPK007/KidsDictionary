import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Sound from 'react-native-sound';

const AudioPlayer = ({selectedFile,setSelectedFile}) => {
    const [isPlaying, setIsPlaying] = useState(false);
    const [isPaused, setIsPaused] = useState(false);
    const sound = new Sound('https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3', Sound.MAIN_BUNDLE, (error) => {
      if (error) {
        console.log('Error loading sound: ', error);
      }
    });

const playAudio = () => {
    console.log(selectedFile)
  if (selectedFile && !isPlaying) {
    sound.play((success) => {
      if (success) {
        console.log('Audio playback finished');
        setIsPlaying(false);
      } else {
        console.log('Audio playback failed');
      }
    });
    setIsPlaying(true);
    setIsPaused(false);
  }
};


  const pauseAudio = () => {
    if (isPlaying) {
      sound.pause();
      setIsPlaying(false);
      setIsPaused(true);
    }
  };

  const stopAudio = () => {
    if (isPlaying || isPaused) {
      sound.stop();
      sound.setCurrentTime(0);
      setIsPlaying(false);
      setIsPaused(false);
      //setSelectedFile(null);
    }
  };
  

  useEffect(() => {
    return () => {
      sound.release();
    };
  }, []);

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={playAudio} disabled={isPlaying}>
        <Text style={styles.buttonText}>{isPlaying ? 'Playing...' : 'Play'}</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={pauseAudio} disabled={!isPlaying}>
        <Text style={styles.buttonText}>{isPaused ? 'Paused' : 'Pause'}</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={stopAudio} disabled={!isPlaying && !isPaused}>
        <Text style={styles.buttonText}>Stop</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#3498db',
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginHorizontal: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
});

export default AudioPlayer;