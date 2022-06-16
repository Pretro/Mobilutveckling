import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import Header from './screens/Header';
import NoteScreens from './screens/NoteScreens';
import NoteDetail from './components/NoteDetail';
import NoteProvider from './contexts/NoteProvider';

const Stack = createStackNavigator();

export default function App() {
  const [user, setUser] = useState({});
  const findUser = async () => {
    const result = await AsyncStorage.getItem('user');
    if (result !== null) { 
    setUser(JSON.parse(result));
    }
  };

  useEffect(() => {

     findUser(); 
  }, []);

  const renderNoteScreen = props => <NoteScreens {...props} user={user} />;

  if (!user.name) return <Header onFinish={findUser}/>

  return (
    <NavigationContainer>
      <NoteProvider>
        <Stack.Navigator
          screenOptions={{ headerTitle: '', headerTransparent: true }}
        >
          <Stack.Screen component={renderNoteScreen} name='NoteScreen' />
          <Stack.Screen component={NoteDetail} name='NoteDetail' />
        </Stack.Navigator>
      </NoteProvider>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});