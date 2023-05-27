import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {View, StatusBar} from 'react-native';
import {colors} from './src/styles/Color';
import HomeScreen from './src/screen/HomeScreen';
import AddChlidScreen from './src/screen/AddChlidScreen';
import AddWordScreen from './src/screen/AddWordScreen';
import ViewChildScreen from './src/screen/ViewChildScreen';
import ViewWordScreen from './src/screen/ViewWordScreen';
import AssignWordsScreen from './src/screen/AssignWordsScreen';
import ExerciseScreen from './src/screen/ExerciseScreen';
import ExerciseByImage from './src/screen/ExerciseByImage';
import ExerciseByAudio from './src/screen/ExerciseByAudio';
import ViewWord from './src/screen/ViewWord';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <View style={{flex: 1}}>
      <StatusBar
        animated={true}
        barStyle="light-content"
        backgroundColor={colors.gs}
      />
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="home"
            component={HomeScreen}
            options={{headerShown: false}}
          />

          <Stack.Screen
            name="addChlid"
            component={AddChlidScreen}
            options={{headerShown: true}}
          />

          <Stack.Screen
            name="viewChild"
            component={ViewChildScreen}
            options={{headerShown: true}}
          />

          <Stack.Screen
            name="addWord"
            component={AddWordScreen}
            options={{headerShown: true}}
          />
          <Stack.Screen
            name="viewWords"
            component={ViewWordScreen}
            options={{headerShown: true}}
          />
          <Stack.Screen
            name="ViewWordScreen"
            component={ViewWord}
            options={{headerShown: true}}
          />
          <Stack.Screen
            name="AssignWordsScreen"
            component={AssignWordsScreen}
            options={{headerShown: true}}
          />
          <Stack.Screen
            name="exercise"
            component={ExerciseScreen}
            options={{headerShown: true}}
          />

          <Stack.Screen
            name="exerciseImage"
            component={ExerciseByImage}
            options={{headerShown: true}}
          />

          <Stack.Screen
            name="exerciseAudio"
            component={ExerciseByAudio}
            options={{headerShown: true}}
          />
          <Stack.Screen
            name="ViewWord"
            component={ViewWord}
            options={{headerShown: true}}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </View>
  );
}
