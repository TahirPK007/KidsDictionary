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

  const [checked1, setchecked1] = useState([]);

  const [checkboxItems, setCheckboxItems] = useState([
    {id: 1, label: 'Random  :  3', checked: false},
    {id: 2, label: 'School  :  2', checked: false},
    {id: 3, label: 'Market  :  3', checked: false},
    {id: 4, label: 'Tennis  :  1', checked: false},
    {id: 5, label: 'Nation  :  5', checked: false},
    {id: 6, label: 'Reason  :  3', checked: false},
    {id: 7, label: 'Appear  :  6', checked: false},
    {id: 8, label: 'Change  :  1', checked: false},
    {id: 9, label: 'Fabric  :  5', checked: false},
    {id: 10, label: 'Packed  :  7', checked: false},
    {id: 11, label: 'Almost  :  6', checked: false},
    {id: 12, label: 'Branch  :  2', checked: false},
    {id: 13, label: 'Qiblah  :  4', checked: false},
    {id: 14, label: 'Vacuum  :  6', checked: false},
    {id: 15, label: 'Zagged  :  7', checked: false},
    {id: 16, label: 'Earbud  :  5', checked: false},
    {id: 17, label: 'Fabric  :  3', checked: false},
    {id: 18, label: 'Belief  :  7', checked: false},
    {id: 19, label: 'Choose  :  4', checked: false},
    {id: 20, label: 'Flower  :  1', checked: false},
    {id: 21, label: 'Hammer  :  3', checked: false},
    {id: 22, label: 'Hacked  :  7', checked: false},
    {id: 23, label: 'Energy  :  2', checked: false},
    {id: 24, label: 'Labour  :  4', checked: false},
    {id: 25, label: 'Define  :  6', checked: false},
    {id: 26, label: 'Joker  :  1', checked: false},
    {id: 27, label: 'Macros  :  7', checked: false},
    {id: 28, label: 'Insect  :  2', checked: false},
    {id: 29, label: 'Noodle  :  1', checked: false},
    {id: 30, label: 'Kittie  :  2', checked: false},
    {id: 31, label: 'Sneaks  :  4', checked: false},
    {id: 32, label: 'Eraser  :  5', checked: false},
    {id: 33, label: 'Punish  :  4', checked: false},
    {id: 34, label: 'Elegant  :  6', checked: false},
    {id: 35, label: 'Oxygen  :  5', checked: false},
  ]);

  const handleCheckboxToggle = itemId => {
    const updatedItems = checkboxItems.map(item => {
      if (item.id === itemId) {
        return {...item, checked: !item.checked};
      }
      return item;
    });
    setCheckboxItems(updatedItems);
  };

  return (
    <ScrollView style={styles.container1}>
      <Text style={{...styles.title1}}>Assign Word's Screen</Text>

      <View>
        <FlatList
          data={wordsdata}
          renderItem={({item, index}) => {
            return (
              <View>
                <CheckBox
                  key={item.id}
                  checked={item.checked}
                  onPress={() => handleCheckboxToggle(item.id)}
                  title={item.wordname}
                  checkedColor="seagreen"
                />
              </View>
            );
          }}
        />
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
