import {
  StyleSheet,
  Text,
  View,
  Pressable,
  FlatList,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import {openDatabase} from 'react-native-sqlite-storage';

const db = openDatabase({name: 'kidsdictionary'});

const ViewChildScreen = ({navigation}) => {
  const [kidsdata, setkidsdata] = useState([]);
  console.log(kidsdata, 'this is all the kdis data');

  const fetchkids = () => {
    db.transaction(txn => {
      txn.executeSql(
        `select * from kids`,
        [],
        (sqltxn, res) => {
          let resultset = [];
          let len = res.rows.length;
          for (let i = 0; i < len; i++) {
            let record = res.rows.item(i);
            resultset.push({
              id: record.id,
              name: record.name,
              grade: record.grade,
            });
          }
          setkidsdata(resultset);
          console.log('all emps are fetched');
        },
        error => {
          console.log('error occured while fetching employees');
        },
      );
    });
  };

  useEffect(() => {
    fetchkids();
  }, []);

  return (
    <ScrollView style={{flex: 1}}>
      <View style={styles.container}>
        <Text style={{...styles.title, marginTop: '2%', color: 'green'}}>
          View Child Screen
        </Text>
        <View style={{width: '100%'}}>
          <FlatList
            data={kidsdata}
            keyExtractor={item => item.id}
            renderItem={({item, index}) => {
              return (
                <View
                  style={{
                    width: '90%',
                    height: 80,
                    borderWidth: 1,
                    margin: 5,
                    padding: 5,
                    alignSelf: 'center',
                  }}>
                  <Text
                    style={{
                      color: 'black',
                    }}>{`${item.name} : ${item.grade}`}</Text>
                  <View style={{flexDirection: 'row'}}>
                    <TouchableOpacity
                      style={{
                        borderWidth: 1,
                        marginLeft: 10,
                        width: 50,
                        height: 25,
                        justifyContent: 'center',
                        alignItems: 'center',
                        marginLeft: 200,
                      }}
                      onPress={() => {
                        navigation.navigate('ViewKidWords', {
                          paramkey: item,
                        });
                      }}>
                      <Text style={{color: 'black'}}>Display</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={{
                        borderWidth: 1,
                        marginLeft: 10,
                        width: 50,
                        height: 25,
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}
                      onPress={() => {
                        navigation.navigate('AssignWordsScreen', {
                          paramkey: item,
                        });
                      }}>
                      <Text style={{color: 'black'}}>Add</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={{
                        borderWidth: 1,
                        marginLeft: 10,
                        width: 50,
                        height: 25,
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}
                      onPress={() => {
                        navigation.navigate('Quiz', {
                          paramkey: item,
                        });
                      }}>
                      <Text style={{color: 'black'}}>Quiz</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              );
            }}
          />
        </View>
      </View>
    </ScrollView>
  );
};

export default ViewChildScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  container1: {
    // This ensures the container takes up the available space
    borderWidth: 1, // Border width
    borderColor: 'black', // Border color
    padding: 5, // Padding around the container
    marginTop: '5%',
    borderStyle: 'solid', //
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: '1%',
    marginBottom: 30,
    color: 'seagreen',
  },
  buttonContainer: {
    alignItems: 'center',
    marginTop: '25%',
  },
  button: {
    width: '90%',
    paddingVertical: '4%',
    paddingHorizontal: '6%',
    borderRadius: 100,
    backgroundColor: 'seagreen',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: '38%',
  },
  button1: {
    width: '90%',
    paddingVertical: '4%',
    paddingHorizontal: '6%',
    borderRadius: 100,
    backgroundColor: 'seagreen',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: '75%',
    marginTop: '-15%',
  },
  buttonText: {
    fontSize: 25,
    fontWeight: 'bold',
    color: 'white',
  },
});
