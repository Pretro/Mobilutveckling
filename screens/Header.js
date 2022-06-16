import { StyleSheet, Text, TextInput, View, Dimensions } from 'react-native'
import React, { useState } from 'react';
import colors from '../models/colors';
import AsyncStorage from '@react-native-async-storage/async-storage';
import RoundIconButton from '../components/RoundIconButton';

const Header = ({onFinish}) => {
    const [name, setName] = useState('');
    const handleOnChangeText = (text) => setName(text);    
    
    const handleSubmit = async () => {
        const user = { name: name};
        await AsyncStorage.setItem('user', JSON.stringify(user));
        if(onFinish) onFinish();
    }; 
    
  return (
    <View style={styles.container}>
        <Text style={styles.textTitle}>Skriv ditt namn...</Text>
        <TextInput value={name} onChangeText={handleOnChangeText} placeholder='Namn...' style={styles.inputText}/> 
        { name.trim().length >= 3 ? (<RoundIconButton antIconName='arrowright' onPress={handleSubmit}/>) : null} 
    </View>
  );
};

const styles = StyleSheet.create({
    textTitle: {
      alignSelf: 'flex-start', 
       paddingLeft: 25,
       marginBottom: 5,
       opacity: 0.5,
       fontSize: 15,
    },
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    inputText: {
        marginHorizontal: 20,
        paddingHorizontal: 10,
        width: Dimensions.get('window').width -100 ,
        borderWidth: 2,
        borderColor: colors.PRIMARY,
        height:30,
        borderRadius: 10,
        paddingLeft: 15,
        fontSize: 20,
        color:'blue',
        marginBottom:15
    },
})

export default Header;