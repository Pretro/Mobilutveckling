import { ColorPropType, ScrollView, StyleSheet, Text, View, Alert } from 'react-native';
import React,  {useState} from 'react';
/* import { useHeaderHeight } from '@react-navigation/stack'; */
import colors from '../models/colors';
import RoundIconButton from'./RoundIconButton'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNotes } from '../contexts/NoteProvider';
import NoteInputModal from './NoteInputModal';

const formatDate = ms => {
  const date = new Date(ms);
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();
  const hrs = date.getHours();
  const min = date.getMinutes();
  const sec = date.getSeconds();

  return `${day}/${month}/${year} - ${hrs}:${min}:${sec}`;
};

const NoteDetail = props => {
    const [note, setNote] = useState(props.route.params.note);
    /* const headerHeight = useHeaderHeight();  */
    const {setNotes} = useNotes()
    const [showModal, setShowModal] = useState(false);
    const [isEdit, setIsEdit] = useState(false);

    const deleteNote = async () => {
      const result = await AsyncStorage.getItem('notes')
      let notes = [];
      if (result !== null) notes = JSON.parse(result);

      const newNotes = notes.filter(n => n.id !== note.id);
      setNotes(newNotes);
      await AsyncStorage.setItem('notes', JSON.stringify(newNotes))
      props.navigation.goBack()
    };

    const displayDeleteAlert = () => {
      Alert.alert(
        'Är du säker!',
        'Den här åtgärd kommer att rader din anteckning permanent!',
        [
          {
            text: 'Radera',
            onPress: deleteNote,
          },
          {
            text: 'Nej, tack!',
            onPress: () => console.log('no thanks'),
          },
        ],
        {
          cancelable: true,
        }
      );
    };

    const handleUpdate = async (title, desc, time) => {
      const result = await AsyncStorage.getItem('notes');
      let notes = [];
      if (result !== null) notes = JSON.parse(result);
      const newNotes = notes.filter(n => {
        if (n.id === note.id) {
          n.title = title;
          n.desc = desc;
          n.isUpdated = true;
          n.time = time;

          setNote(n);
    }
    return n;
  })
  setNotes(newNotes);
  await AsyncStorage.setItem('notes', JSON.stringify(newNotes))
};
    const handleOnClose = () => setShowModal(false);

    const openEditModal = () => {
      setIsEdit(true);
      setShowModal(true);
    };
  
  return (
    <>
    <ScrollView contentContainerStyle={[styles.container ]}>
    	<Text style={styles.time}>{note.isUpdated ? `Uppdaterad ${formatDate(note.time)}` : `Skapad ${formatDate(note.time)}`}</Text>
      <Text style={styles.title}>{note.title}</Text>
      <Text style={styles.description}>{note.description}</Text>
    </ScrollView>
     <View style={styles.btnContainer}>
     <RoundIconButton antIconName='delete' style={{ backgroundColor: colors.ERROR, marginBottom: 15 }}
      onPress={displayDeleteAlert}/>
     <RoundIconButton antIconName='edit' onPress={openEditModal}/>
   </View>
   <NoteInputModal isEdit={isEdit} note={note} onClose={handleOnClose} onSubmit={handleUpdate} visible={showModal}/>
   </>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 55,
    paddingVertical: 55
  },
  title: {
    fontSize: 20,
    color: colors.PRIMARY,
    fontWeight: 'bold',
  },
  description: {
    fontSize: 12,
    opacity: 0.6,
  },
  time: {
    textAlign: 'right',
    fontSize: 12,
    opacity: 0.5,
  },
  btnContainer: {
    position: 'absolute',
    right: 15,
    bottom: 50,
  },
})

export default NoteDetail;