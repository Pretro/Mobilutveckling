import { StyleSheet, Text, View, Dimensions, TouchableOpacity } from 'react-native'
import React from 'react'
import colors from '../models/colors';

const Note = ({item, onPress}) => {
    const {title, description} = item;
  return (
    <TouchableOpacity onPress={onPress} style={styles.container}>
      <Text style={styles.title} numberOfLines={2}>{title}</Text>
      <Text numberOfLines={3}>{description}</Text>
    </TouchableOpacity>
  )
}

const width = Dimensions.get('window').width - 40;

const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.PRIMARY,
        width: width / 2 - 10,
        padding: 8,
        borderRadius: 10,
      },
    title: {
        fontWeight: 'bold',
        fontSize: 16,
        color: colors.LIGHT,
    },
});

export default Note;