import {
  StyleSheet,
  Text,
  TextInput,
  Pressable,
  View,
  Image,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import SelectDropdown from 'react-native-select-dropdown';
import DocumentPicker, {
  DirectoryPickerResponse,
  DocumentPickerResponse,
  isCancel,
  isInProgress,
  types,
} from 'react-native-document-picker';
import AudioPlayer from '../components/AudioPlayer';
import {openDatabase} from 'react-native-sqlite-storage';
import Video from 'react-native-video';

const db = openDatabase({name: 'kidsdictionary'});

const AddWordScreen = () => {
  const grades = ['1', '2', '3', '4', '5', '6', '7'];

  const [wordname, setwordname] = useState('');
  const [meaning, setmeaning] = useState('');
  const [image, setimage] = useState('');
  const [audio, setaudio] = useState('');
  const [grade, setgrade] = useState('');

  console.log(wordname, 'this is wordname');
  console.log(meaning, 'this is meaning');
  console.log(image, 'this is image path');
  console.log(audio, 'this is auido path');
  console.log(grade, 'this is grade');

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

  const createtable = () => {
    db.transaction(txn => {
      txn.executeSql(
        `create table if not exists words (id integer primary key autoincrement,wordname varchar(50),meaning varchar(500),image BLOB,audio TEXT,grade varchar(50))`,
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
        `insert into words(wordname, meaning, image, audio, grade) values(?,?,?,?,?)`,
        [wordname, meaning, image, audio, grade],
        (sqltxn, res) => {
          Alert.alert('data added succesfully');
        },
        error => {
          Alert.alert('error occured while adding data');
        },
      );
    });
  };

  useEffect(() => {
    createtable();
  }, []);

  return (
    <ScrollView style={{flex: 1}}>
      <View style={styles.container}>
        <Text style={{...styles.title, marginTop: '2%', color: 'green'}}>
          Add Word Screen
        </Text>
        <Text
          style={{
            ...styles.title,
            marginTop: '5%',
            marginRight: '70%',
            color: 'green',
          }}>
          Word :
        </Text>
        <TextInput
          style={{
            color: 'black',
            borderWidth: 1,
            width: 200,
            height: 50,
            paddingLeft: 10,
          }}
          placeholder="enter word"
          value={wordname}
          onChangeText={txt => setwordname(txt)}
        />

        <Text
          style={{
            ...styles.title,
            marginTop: '0%',
            marginRight: '65%',
            color: 'green',
          }}>
          Meaning :
        </Text>
        <TextInput
          style={{
            color: 'black',
            borderWidth: 1,
            width: 200,
            height: 50,
            paddingLeft: 10,
          }}
          placeholder="enter word"
          value={meaning}
          onChangeText={txt => setmeaning(txt)}
        />

        <Text
          style={{
            ...styles.title,
            marginTop: '2%',
            marginRight: '70%',
            color: 'green',
          }}>
          Image :
        </Text>
        <Pressable
          style={styles.button}
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
          <Text style={styles.buttonText}>Select Image</Text>
        </Pressable>

        <Image
          style={{height: 50, width: 50}}
          source={{
            uri: image,
          }}
        />

        <Text
          style={{
            ...styles.title,
            marginTop: '2%',
            marginRight: '70%',
            color: 'green',
          }}>
          Audio :
        </Text>
        <Pressable
          style={styles.button}
          onPress={() => {
            DocumentPicker.pick({
              allowMultiSelection: false,
              type: [types.audio],
            })
              .then(value => {
                console.log(value, 'value for audiooooooooooooooooo');
                setaudio(value[0].uri + value[0].type);
              })
              .catch(handleError);
          }}>
          <Text style={styles.buttonText}>Select Audio</Text>
        </Pressable>

        {/* <Video
          source={require({audio})}
          paused={true} // Set to false if you want the audio to play automatically
          style={styles.audioPlayer}
          controls={true}
        /> */}

        <Text
          style={{
            ...styles.title,
            marginTop: '2%',
            marginRight: '70%',
            color: 'green',
          }}>
          Grade :{' '}
        </Text>
        <SelectDropdown
          data={grades}
          onSelect={(selectedItem, index) => {
            console.log(selectedItem, index);
            setgrade(selectedItem);
          }}
        />

        <View style={styles.buttonContainer}>
          <TouchableOpacity
            onPress={() => {
              insertword();
            }}>
            <Text style={{color: 'black', fontSize: 50}}>Save Word</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

export default AddWordScreen;

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
