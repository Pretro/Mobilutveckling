import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import colors from '../models/colors';
import {AntDesign} from '@expo/vector-icons';

const RoundIconButton = ({antIconName, onPress}) => {
  return (
  <AntDesign style={styles.icon} name={antIconName} size={24}  onPress={onPress}
  /> 
  );
};

const styles = StyleSheet.create({
    icon: {
        backgroundColor: colors.PRIMARY,
        padding: 15,
        borderRadius: 50,
        elevation: 5,
        color: colors.DARK
    },
});

export default RoundIconButton;