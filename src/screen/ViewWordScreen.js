import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import Video from 'react-native-video';
import {openDatabase} from 'react-native-sqlite-storage';
import {useNavigation} from '@react-navigation/native';

const db = openDatabase({name: 'kidsdictionary'});

const ViewWordScreen = ({}) => {
  const navigation = useNavigation();
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

  return (
    <ScrollView style={styles.container1}>
      <View style={styles.container}>
        <Text style={{...styles.title, marginTop: '2%', color: 'green'}}>
          Display Word'S Screen
        </Text>

        <View>
          <FlatList
            data={wordsdata}
            renderItem={({item, index}) => {
              return (
                <TouchableOpacity
                  style={{flexDirection: 'row'}}
                  onPress={() => {
                    navigation.navigate('ViewWord', {
                      paramkey: item,
                    });
                  }}>
                  <Text>{item.wordname}</Text>
                  <Text>{item.grade}</Text>
                </TouchableOpacity>
              );
            }}
          />
        </View>
      </View>
    </ScrollView>
  );
};

export default ViewWordScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    marginBottom: '5%',
  },
  container1: {
    flexGrow: 1,
    padding: 16,
    marginBottom: '5%',
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    marginTop: 50,
    marginBottom: '15%',
    color: 'seagreen',
  },
  title1: {
    fontSize: 25,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 0,
    color: 'seagreen',
    marginTop: '2%',
    marginRight: '60%',
  },
  meaning: {
    fontSize: 20,
    marginTop: 20,
    color: 'seagreen',
  },

  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },

  image1: {
    width: '80%',
    height: '50%',
  },
  image2: {
    marginTop: 35,
    width: '70%',
    height: '10%',
  },
  audioPlayer: {
    width: '80%',
    height: '20%',
  },
});
