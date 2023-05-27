import { StyleSheet, Text, View,Pressable } from 'react-native'
import React from 'react'

const ExerciseScreen = ({navigation}) => {
  return (
    <View style={styles.container}>
    <Text style={{...styles.title,marginTop:'2%',color:'green'}}>Exercise  Screen</Text>

      <View style={styles.buttonContainer}>
       <Pressable style={styles.button}  onPress={()=>navigation.navigate('exerciseImage')}>
          <Text style={styles.buttonText}>Exercise by Image</Text>
        </Pressable>
        </View>
        <View style={styles.buttonContainer}>
       <Pressable style={styles.button}  onPress={()=>navigation.navigate('exerciseAudio')}>
          <Text style={styles.buttonText}>Exercise by Audio</Text>
        </Pressable>
        </View>

    </View>
  )
}

export default ExerciseScreen

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems:'center'
    },
    title: {
      fontSize: 30,
      fontWeight: 'bold',
      marginTop: 20,
      marginBottom: 20,
      color: 'seagreen',
    },
    buttonContainer: {
      alignItems:'center',
      marginTop:'15%'
    },
    button: {
      width:'90%',
      paddingVertical: 15,
      paddingHorizontal:'20%',
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
    label: {
      fontSize: 16,
      fontWeight: 'bold',
      marginBottom: 5,
    },
    input: {
      borderWidth: 2,
      borderColor: 'gray',
      color: 'black',
      borderRadius: 5,
      paddingHorizontal: 10,
      paddingVertical: 5,
      fontSize: 20,
      width: 280,
      marginLeft: 50,
      marginBottom: 0,
    },
    image: {
        width: '40%',
        height: '8%',
        
      },
    
  });