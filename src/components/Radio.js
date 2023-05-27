import { StyleSheet, Text, View,Pressable } from 'react-native'
import React, { useState } from 'react';
import { RadioButton } from 'react-native-paper';

const Radio = () => {
    const [checked, setChecked] = useState('first');
  
    const handleRadioButtonChange = (value) => {
      setChecked(value);
    };
  
    return (
      <View>
        <RadioButton.Group
          onValueChange={handleRadioButtonChange}
          value={checked}
        >
          <View>
            <RadioButton.Item
              label="First"
              value="first"
              color="seagreen" // Customize the color if desired
            />
          </View>
          <View>
            <RadioButton.Item
              label="Second"
              value="second"
              color="seagreen" // Customize the color if desired
            />
            <RadioButton.Item
              label="Third"
              value="third"
              color="seagreen" // Customize the color if desired
            />
          </View>
        </RadioButton.Group>
      </View>
    );
  };
  
  export default Radio;
  