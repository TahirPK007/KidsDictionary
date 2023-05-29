import {StyleSheet, Text, View, Pressable, Image} from 'react-native';
import Radio from '../components/Radio';
import {openDatabase} from 'react-native-sqlite-storage';
import React, {useEffect, useState} from 'react';
import DocumentPicker, {
  DirectoryPickerResponse,
  DocumentPickerResponse,
  isCancel,
  isInProgress,
  types,
} from 'react-native-document-picker';

const db = openDatabase({name: 'kidsdictionary'});

const ExerciseByImage = () => {
  const [data, setdata] = useState([]);
  console.log(data, 'quiz image data');
  const fetchimagequiz = () => {
    db.transaction(txn => {
      txn.executeSql(
        `select * from imageexercise`,
        [],
        (sqltxn, res) => {
          let resultset = [];
          let len = res.rows.length;
          for (let i = 0; i < len; i++) {
            let record = res.rows.item(i);
            resultset.push({
              id: record.id,
              image: record.image,
              option1: record.option1,
              option2: record.option2,
              option3: record.option3,
              correct: record.correct,
            });
          }
          setdata(resultset);
          console.log('all words are fetched');
        },
        error => {
          console.log('error occured while fetching employees');
        },
      );
    });
  };

  useEffect(() => {
    fetchimagequiz();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={{...styles.title1}}>Exercise BY Image</Text>
      <Text>{data.length}</Text>
    </View>
  );
};

export default ExerciseByImage;

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
  image1: {
    width: '80%',
    height: '50%',
  },
});
