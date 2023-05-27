import {
  StyleSheet,
  Text,
  View,
  Pressable,
  ScrollView,
  FlatList,
} from 'react-native';
import {CheckBox} from 'react-native-elements';

import React, {useState, useEffect} from 'react';
import {openDatabase} from 'react-native-sqlite-storage';

const db = openDatabase({name: 'kidsdictionary'});

const AssignWordsScreen = ({route, navigation}) => {
  const [selectedItems, setSelectedItems] = useState([]);

  const childid = route.params.paramkey.id;
  console.log(childid, 'this si child id');
  const [wordsdata, setwordsdata] = useState([]);
  console.log(wordsdata, 'this is wordsssss');

  const fetchwords = () => {
    db.transaction(txn => {
      txn.executeSql(
        `select * from words`,
        [],
        (sqltxn, res) => {
          let resultset = [];
          let len = res.rows.length;
          for (let i = 0; i < len; i++) {
            let record = res.rows.item(i);
            resultset.push({
              id: record.id,
              wordname: record.wordname,
              meaning: record.meaning,
              image: record.image,
              audio: record.audio,
              grade: record.grade,
            });
          }
          setwordsdata(resultset);
          console.log('all words are fetched');
        },
        error => {
          console.log('error occured while fetching employees');
        },
      );
    });
  };

  useEffect(() => {
    fetchwords();
  }, []);

  let anotherArray = [];

  // const [checkboxItems, setCheckboxItems] = useState([
  //   {id: 1, label: 'Random  :  3', checked: false},
  //   {id: 2, label: 'School  :  2', checked: false},
  // ]);

  // const handleCheckboxToggle = itemId => {
  //   const updatedItems = checkboxItems.map(item => {
  //     if (item.id === itemId) {
  //       return {...item, checked: !item.checked};
  //     }
  //     return item;
  //   });
  //   setCheckboxItems(updatedItems);
  // };

  const handleCheckboxPress = item => {
    const modifiedItem = {
      ...item,
      childId: childid,
    };

    if (selectedItems.some(selectedItem => selectedItem.id === item.id)) {
      setSelectedItems(selectedItems.filter(i => i.id !== item.id));
    } else {
      setSelectedItems([...selectedItems, modifiedItem]);
    }
  };

  const existingArray = [];

  anotherArray = existingArray.concat(selectedItems);

  console.log(anotherArray, 'this array contains data');

  return (
    <ScrollView style={styles.container1}>
      <Text style={{...styles.title1}}>Assign Word's Screen</Text>

      <View>
        {wordsdata.map(item => (
          <CheckBox
            key={item.id}
            title={item.wordname}
            checked={selectedItems.some(
              selectedItem => selectedItem.id === item.id,
            )}
            onPress={() => handleCheckboxPress(item)}
          />
        ))}
      </View>

      <View style={styles.buttonContainer}>
        <Pressable style={styles.button}>
          <Text style={styles.buttonText}>Save Word's</Text>
        </Pressable>
      </View>
    </ScrollView>
  );
};

export default AssignWordsScreen;

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  container1: {
    flexGrow: 1,
    padding: 16,
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
    marginTop: '10%',
    marginBottom: '10%',
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
  checkboxContainer: {
    backgroundColor: 'lightgray',
    borderWidth: 1,
    marginRight: '40%',
  },
  checkboxText: {
    fontSize: 25,
    fontWeight: 'bold',
    marginLeft: 8,
  },
});
