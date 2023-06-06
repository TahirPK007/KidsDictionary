import {View, Text, Image, TouchableOpacity} from 'react-native';
import React, {useEffect, useState} from 'react';
import {openDatabase} from 'react-native-sqlite-storage';
import Video from 'react-native-video';

const db = openDatabase({name: 'kidsdictionary'});

const Quiz = ({route, navigation}) => {
  const childid = route.params.paramkey.id;
  const kidname = route.params.paramkey.name;

  const [kidsdata, setkidsdata] = useState([]);

  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [options, setOptions] = useState([]);
  const [selectedOption, setSelectedOption] = useState('');
  const [isAnswered, setIsAnswered] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);

  const handleOptionPress = option => {
    setSelectedOption(option);
    setIsAnswered(true);

    if (option === questions[currentQuestionIndex].meaning) {
      setIsCorrect(true);
    } else {
      setIsCorrect(false);
    }

    // Delay moving to the next question for better user experience
    setTimeout(() => {
      moveToNextQuestion();
    }, 1000);
  };

  const moveToNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedOption('');
      setIsAnswered(false);
      setIsCorrect(false);
      generateOptions();
    } else {
      // Quiz is finished
      // Do something, like showing the final score
    }
  };

  const generateOptions = () => {
    const currentQuestion = questions[currentQuestionIndex];
    const allOptions = [currentQuestion.meaning];

    // Generate two random incorrect options
    while (allOptions.length < 3) {
      const randomQuestion = questions[randomNumber(0, questions.length - 1)];
      const randomOption = randomQuestion.meaning;

      if (!allOptions.includes(randomOption)) {
        allOptions.push(randomOption);
      }
    }

    // Shuffle the options
    const shuffledOptions = allOptions.sort(() => 0.5 - Math.random());
    setOptions(shuffledOptions);
  };

  const randomNumber = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  if (questions.length === 0) {
    return (
      <View style={{}}>
        <Text>Loading questions...</Text>
      </View>
    );
  }

  const currentQuestion = questions[currentQuestionIndex];

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
    <View style={{flex: 1}}>
      <Image
        source={{uri: currentQuestion.image}}
        style={{height: 100, width: 100}}
      />

      <Text style={{}}>{currentQuestion.wordname}</Text>

      <View style={{}}>
        {kidsdata.map((option, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.optionButton,
              selectedOption === option && isAnswered && isCorrect
                ? styles.correctOption
                : selectedOption === option && isAnswered && !isCorrect
                ? styles.incorrectOption
                : null,
            ]}
            disabled={isAnswered}
            onPress={() => handleOptionPress(option)}>
            <Text style={styles.optionText}>{option}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

export default Quiz;
