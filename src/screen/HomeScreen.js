import {View, Text, StatusBar, StyleSheet, Pressable} from 'react-native';
import React from 'react';

const HomeScreen = ({navigation}) => {
  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={'white'} barStyle={'light-content'} />
      <Text style={{...styles.title, marginTop: '5%'}}>
        KIDS TALKING DICTIONARTY
      </Text>
      <View style={styles.buttonContainer}>
        <Pressable
          style={styles.button}
          onPress={() => navigation.navigate('addChlid')}>
          <Text style={styles.buttonText}>Add Child</Text>
        </Pressable>
        <Pressable
          style={styles.button}
          onPress={() => navigation.navigate('viewChild')}>
          <Text style={styles.buttonText}>View Child</Text>
        </Pressable>
        <Pressable
          style={styles.button}
          onPress={() => navigation.navigate('addWord')}>
          <Text style={styles.buttonText}>Add a Word</Text>
        </Pressable>
        <Pressable
          style={styles.button}
          onPress={() => navigation.navigate('viewWords')}>
          <Text style={styles.buttonText}>View Words</Text>
        </Pressable>
        <Pressable
          style={styles.button}
          onPress={() => navigation.navigate('AssignWordsScreen')}>
          <Text style={styles.buttonText}>Assign Words</Text>
        </Pressable>
        <Pressable
          style={styles.button}
          onPress={() => navigation.navigate('exercise')}>
          <Text style={styles.buttonText}>Exercise's</Text>
        </Pressable>
      </View>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 30,
    color: 'seagreen',
  },
  buttonContainer: {
    alignItems: 'center',
    marginTop: '25%',
  },
  button: {
    width: '90%',
    paddingVertical: 15,
    paddingHorizontal: '20%',
    borderRadius: 10,
    backgroundColor: 'seagreen',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 10,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
  },
});
