import {View, Text, Image} from 'react-native';
import React, {useEffect, useState} from 'react';
import {openDatabase} from 'react-native-sqlite-storage';
import {FlatList} from 'react-native';
import {ScrollView} from 'react-native';

const db = openDatabase({name: 'kidsdictionary'});

const ViewKidWords = ({route, navigation}) => {
  const childid = route.params.paramkey.id;
  const kidname = route.params.paramkey.name;

  const [kidsdata, setkidsdata] = useState([]);

  const fetchkidwords = childid => {
    db.transaction(txn => {
      txn.executeSql(
        `select * from kidwords where childid=?`,
        [childid],
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
          setkidsdata(resultset);
          console.log('all words are fetched');
        },
        error => {
          console.log('error occured while fetching employees');
        },
      );
    });
  };

  useEffect(() => {
    fetchkidwords(childid);
  }, []);

  console.log(kidsdata, 'its kids words');

  return (
    <ScrollView style={{flex: 1}}>
      <View style={{flex: 1}}>
        <Text style={{color: 'black', alignSelf: 'center', fontSize: 40}}>
          {kidname}
        </Text>
        <View>
          <FlatList
            data={kidsdata}
            renderItem={({item, index}) => {
              return (
                <View>
                  <Text
                    style={{
                      color: 'seagreen',
                      fontWeight: 'bold',
                      fontSize: 40,
                    }}>
                    {item.wordname}
                  </Text>
                  <Text
                    style={{
                      color: 'seagreen',
                      fontWeight: 'bold',
                      fontSize: 40,
                    }}>
                    {item.meaning}
                  </Text>
                  <Image
                    style={{
                      height: 400,
                      width: 400,
                      resizeMode: 'contain',
                      marginTop: 40,
                    }}
                    source={{
                      uri: item.image,
                    }}
                  />
                </View>
              );
            }}
          />
        </View>
      </View>
    </ScrollView>
  );
};

export default ViewKidWords;
