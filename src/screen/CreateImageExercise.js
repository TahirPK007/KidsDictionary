import {
  View,
  Text,
  Pressable,
  TextInput,
  TouchableOpacity,
  Alert,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import {openDatabase} from 'react-native-sqlite-storage';
import DocumentPicker, {
  DirectoryPickerResponse,
  DocumentPickerResponse,
  isCancel,
  isInProgress,
  types,
} from 'react-native-document-picker';

const db = openDatabase({name: 'kidsdictionary'});

const CreateImageExercise = () => {
  const [image, setimage] = useState('');
  const [option1, setoption1] = useState('');
  const [option2, setoption2] = useState('');
  const [option3, setoption3] = useState('');
  const [correct, setcorrect] = useState('');

  const createtable = () => {
    db.transaction(txn => {
      txn.executeSql(
        `create table if not exists imageexercise (id integer primary key autoincrement,image BLOB,option1 varchar(50),option2 varchar(50),option3 varchar(50),correct varchar(50))`,
        [],
        (sqltxn, res) => {
          console.log('table created successfully');
        },
        error => {
          console.log('error occured while creating table');
        },
      );
    });
  };

  const insertword = () => {
    db.transaction(txn => {
      txn.executeSql(
        `insert into imageexercise(image, option1, option2,option3,correct) values(?,?,?,?,?)`,
        [image, option1, option2, option3, correct],
        (sqltxn, res) => {
          Alert.alert('data added succesfully');
        },
        error => {
          Alert.alert('error occured while adding data');
        },
      );
    });
  };

  const handleError = err => {
    if (isCancel(err)) {
      console.warn('cancelled');
      // User cancelled the picker, exit any dialogs or menus and move on
    } else if (isInProgress(err)) {
      console.warn(
        'multiple pickers were opened, only the last will be considered',
      );
    } else {
      throw err;
    }
  };

  useEffect(() => {
    createtable();
  }, []);

  return (
    <View style={{flex: 1}}>
      <Text>CreateImageExercise</Text>
      <Pressable
        onPress={() => {
          DocumentPicker.pick({
            allowMultiSelection: false,
            type: [types.images],
          })
            .then(value => {
              const imageURI = value[0].uri;
              // Set the selected image state variable
              setimage(imageURI);
              // ...
            })
            .catch(handleError);
        }}>
        <Text style={{fontSize: 20, color: 'black', alignSelf: 'center'}}>
          Select Image
        </Text>
      </Pressable>
      <TextInput
        style={{
          width: 200,
          height: 50,
          borderWidth: 1,
          alignSelf: 'center',
          marginTop: 10,
        }}
        placeholder="enter option-1"
        value={option1}
        onChangeText={txt => setoption1(txt)}
      />
      <TextInput
        style={{
          width: 200,
          height: 50,
          borderWidth: 1,
          alignSelf: 'center',
          marginTop: 10,
        }}
        placeholder="enter option-2"
        value={option2}
        onChangeText={txt => setoption2(txt)}
      />
      <TextInput
        style={{
          width: 200,
          height: 50,
          borderWidth: 1,
          alignSelf: 'center',
          marginTop: 10,
        }}
        placeholder="enter option-3"
        value={option3}
        onChangeText={txt => setoption3(txt)}
      />
      <TextInput
        style={{
          width: 200,
          height: 50,
          borderWidth: 1,
          alignSelf: 'center',
          marginTop: 10,
        }}
        placeholder="enter correct"
        value={correct}
        onChangeText={txt => setcorrect(txt)}
      />
      <TouchableOpacity
        sytle={{
          width: 300,
          height: 40,
          justifyContent: 'center',
          alignSelf: 'center',
          borderWidth: 1,
          alignItems: 'center',
        }}
        onPress={() => {
          insertword();
        }}>
        <Text>Save question</Text>
      </TouchableOpacity>
    </View>
  );
};

export default CreateImageExercise;
