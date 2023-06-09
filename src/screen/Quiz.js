import {
  View,
  Text,
  Image,
  TouchableOpacity,
  FlatList,
  Alert,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {openDatabase} from 'react-native-sqlite-storage';
import Video from 'react-native-video';

const db = openDatabase({name: 'kidsdictionary'});

const Quiz = ({route, navigation}) => {
  const childid = route.params.paramkey.id;
  const kidname = route.params.paramkey.name;

  const [kidsdata, setkidsdata] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [selectedOption, setSelectedOption] = useState(null);

  const [RandomOptions, setRandomOptions] = useState([]);

  const randomNumber = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

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

          console.log('all quiz wordsss are fetched');
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

  useEffect(() => {
    if (kidsdata.length > 0) {
      const randomIndex = randomNumber(0, kidsdata.length - 1);
      const question = kidsdata[randomIndex];
      setCurrentQuestion(question);

      const options = kidsdata.filter(
        data => data.wordname !== question.wordname,
      );

      const randomOptions = [];

      randomOptions.push(question); // Include the correct answer as one of the options

      while (randomOptions.length < 3) {
        const randomOptionIndex = randomNumber(0, options.length - 1);
        const randomOption = options[randomOptionIndex];
        randomOptions.push(randomOption);
        options.splice(randomOptionIndex, 1);
      }

      randomOptions.sort(() => Math.random() - 0.5); // Shuffle the options
      setRandomOptions(randomOptions);
    }
  }, [kidsdata]);

  const handleOptionSelect = option => {
    setSelectedOption(option);

    // Check if the selected option is correct
    const isCorrect = option === currentQuestion.wordname;

    // Display an alert with the result
    const alertTitle = isCorrect ? 'Correct Answer!' : 'Incorrect Answer!';
    const alertMessage = isCorrect
      ? 'Congratulations, you selected the correct answer.'
      : `Oops, the selected answer is incorrect. The correct answer is ${currentQuestion.wordname}.`;

    Alert.alert(
      alertTitle,
      alertMessage,
      [
        {
          text: 'Next',
          onPress: () => {
            // Fetch a new random question
            if (kidsdata.length > 1) {
              const remainingQuestions = kidsdata.filter(
                data => data.id !== currentQuestion.id,
              );
              const randomIndex = randomNumber(
                0,
                remainingQuestions.length - 1,
              );
              setCurrentQuestion(remainingQuestions[randomIndex]);
              setkidsdata(remainingQuestions);
            } else {
              setCurrentQuestion(null);
              setkidsdata([]);
              console.log('Quiz completed!');
            }
          },
        },
      ],
      {cancelable: false},
    );
  };

  console.log(kidsdata, 'its quizz kids words');
  return (
    <View style={{flex: 1}}>
      <Text>quiz screen</Text>
      {currentQuestion && (
        <View>
          <Image
            source={{uri: currentQuestion.image}}
            style={{width: 200, height: 200}}
          />
          <Text>Options:</Text>
          {kidsdata.map(data => (
            <TouchableOpacity
              key={data.id}
              onPress={() => handleOptionSelect(data.wordname)}>
              <Text>{data.wordname}</Text>
            </TouchableOpacity>
          ))}
        </View>
      )}
    </View>
  );
};

export default Quiz;
