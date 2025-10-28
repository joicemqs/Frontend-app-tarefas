import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import TaskScreen from '../screens/TaskScreen';

const Stack = createNativeStackNavigator();

export default function AppStack() {
  return (
    <Stack.Navigator id={undefined}>
      <Stack.Screen name="Tasks" component={TaskScreen} options={{
          title: 'Tarefas',
          headerStyle: {
            backgroundColor: '#9A8C98',
          },
          headerTintColor: '#22223B',
          headerTitleStyle: {
            fontWeight: 'bold',
          }
        }}/>
    </Stack.Navigator>
  );
}
