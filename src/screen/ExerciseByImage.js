import { StyleSheet, Text, View ,Pressable,Image} from 'react-native'
import Radio from '../components/Radio'

import React from 'react'

const ExerciseByImage = () => {
  return (
    <View style={styles.container}>
    <Text style={{...styles.title1}}>Exercise  BY  Image</Text>

    <Image
        source={{ uri: 'https://www.collinsdictionary.com/images/full/plant_108417266.jpg' }}
        style={styles.image1}
      /> 
    


    <Radio></Radio>

    <View style={styles.buttonContainer}>
       <Pressable style={styles.button}>
          <Text style={styles.buttonText}>NEXT</Text>
        </Pressable>
    </View>

    

    </View>
  )
}

export default ExerciseByImage


const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems:'center'
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
      image1: {
        width: '80%',
        height: '50%',
      },




  });
  