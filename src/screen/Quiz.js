import React, {useEffect, useState} from 'react';
import {View, Text, Image, TouchableOpacity, Alert} from 'react-native';
import {openDatabase} from 'react-native-sqlite-storage';

const db = openDatabase({name: 'kidsdictionary'});

const Quiz = ({route, navigation}) => {
  const childid = route.params.paramkey.id;
  const kidname = route.params.paramkey.name;

  const [kidsdata, setKidsData] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [selectedOption, setSelectedOption] = useState(null);

  const randomNumber = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  const fetchKidWords = childid => {
    db.transaction(txn => {
      txn.executeSql(
        `SELECT * FROM kidwords WHERE childid=?`,
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
              options: [], // Add an empty options array
            });
          }
          setKidsData(resultset);
          console.log('All quiz words are fetched');
        },
        error => {
          console.log('Error occurred while fetching kid words');
        },
      );
    });
  };

  useEffect(() => {
    fetchKidWords(childid);
  }, []);

  useEffect(() => {
    if (kidsdata.length > 0) {
      generateOptionsForCurrentQuestion();
    }
  }, [kidsdata]);

  const generateOptionsForCurrentQuestion = () => {
    if (kidsdata.length === 0) {
      setCurrentQuestion(null);
      return;
    }

    const randomIndex = randomNumber(0, kidsdata.length - 1);
    const question = kidsdata[randomIndex];

    const options = kidsdata
      .filter(data => data.id !== question.id)
      .slice(0, 3); // Select three random options

    const randomOptions = [question, ...options];

    randomOptions.sort(() => Math.random() - 0.5); // Shuffle the options

    setCurrentQuestion(prevQuestion => ({
      ...prevQuestion,
      ...question,
      options: randomOptions,
    }));
  };

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
            const remainingQuestions = kidsdata.filter(
              data => data.id !== currentQuestion.id,
            );

            if (remainingQuestions.length === 0) {
              // End of quiz
              setCurrentQuestion(null);
              setKidsData([]);
              console.log('Quiz completed!');
              return;
            }

            // Fetch a new random question
            const randomIndex = randomNumber(0, remainingQuestions.length - 1);
            setCurrentQuestion(remainingQuestions[randomIndex]);

            // Generate options for the new question
            generateOptionsForCurrentQuestion();

            // Reset selected option
            setSelectedOption(null);
          },
        },
      ],
      {cancelable: false},
    );
  };

  // Add a useEffect hook to generate options for the new question
  useEffect(() => {
    if (currentQuestion === null && kidsdata.length > 0) {
      generateOptionsForCurrentQuestion();
    }
  }, [currentQuestion, kidsdata]);

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
          {currentQuestion.options.slice(0, 3).map(option => (
            <TouchableOpacity
              key={option.id}
              onPress={() => handleOptionSelect(option.wordname)}>
              <Text>{option.wordname}</Text>
            </TouchableOpacity>
          ))}
        </View>
      )}
    </View>
  );
};

export default Quiz;
