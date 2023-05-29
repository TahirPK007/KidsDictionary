import {
  TextInput,
  StyleSheet,
  Text,
  View,
  Pressable,
  TouchableOpacity,
  Alert,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import SelectDropdown from 'react-native-select-dropdown';
import {openDatabase} from 'react-native-sqlite-storage';

const db = openDatabase({name: 'kidsdictionary'});

const AddChlidScreen = () => {
  const grades = ['1', '2', '3', '4', '5', '6', '7'];
  const [name, setname] = useState('');
  const [grade, setgrade] = useState('');

  console.log(name, 'this is name');
  console.log(grade, 'this is grade');

  const createtable = () => {
    db.transaction(txn => {
      txn.executeSql(
        `create table if not exists kids (id integer primary key autoincrement,name varchar(50),grade varchar(50))`,
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

  const insert = () => {
    db.transaction(txn => {
      txn.executeSql(
        `insert into kids(name,grade) values(?,?)`,
        [name, grade],
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
    <View style={styles.container}>
      <Text style={{...styles.title, marginTop: '2%', color: 'green'}}>
        Add Child Screen
      </Text>

      <Text
        style={{
          ...styles.title,
          marginTop: '12%',
          marginRight: '70%',
          color: 'green',
        }}>
        Name:
      </Text>
      <TextInput
        style={{
          borderWidth: 1,
          width: 300,
          paddingLeft: 10,
          borderRadius: 10,
          color: 'black',
        }}
        placeholder="enter your name"
        placeholderTextColor={'black'}
        value={name}
        onChangeText={txt => setname(txt)}
      />

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
            insert();
          }}>
          <Text style={{color: 'black', fontSize: 50}}>Save Child</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default AddChlidScreen;

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
    marginTop: '16%',
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
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: 'gray',
    color: 'black',
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingVertical: 5,
    fontSize: 20,
    width: 280,
    marginLeft: 50,
    marginBottom: 30,
  },
});
