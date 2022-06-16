import { Modal, StatusBar, StyleSheet, TextInput, TouchableWithoutFeedback, View, Keyboard } from 'react-native';
import colors from '../models/colors';
import RoundIconBtn from './RoundIconButton';
import React, { useEffect, useState } from 'react';

const NoteInputModal = ({ visible, onClose, onSubmit, note, isEdit }) => {
    const [title, setTitle] = useState('');
    const [description, setDesc] = useState('');

    const handleModalClose = () => {
      Keyboard.dismiss();
    };
  
    useEffect(() => {
      if (isEdit) {
        setTitle(note.title);
        setDesc(note.description);
      }
    }, [isEdit]);
  
    const handleOnChangeText = (text, valueFor) => {
      if (valueFor === 'titeln') setTitle(text);
      if (valueFor === 'beskrivning') setDesc(text);
    };
  
    const handleSubmit = () => {
      if (!title.trim() && !description.trim()) return onClose();
  
      if (isEdit) {
        onSubmit(title, description, Date.now());
      } else {
        onSubmit(title, description);
        setTitle('');
        setDesc('');
      }
      onClose();
    };
  
    const closeModal = () => {
      if (!isEdit) {
        setTitle('');
        setDesc('');
      }
      onClose();
    };
  
    return (
      <>
        <StatusBar hidden />
        <Modal visible={visible} animationType='fade'>
          <View style={styles.container}>
            <TextInput
              value={title}
              onChangeText={text => handleOnChangeText(text, 'titeln')}
              placeholder='Titeln'
              style={[styles.input, styles.title]}
            />
            <TextInput
              value={description}
              multiline
              placeholder='Beskrivning'
              style={[styles.input, styles.description]}
              onChangeText={text => handleOnChangeText(text, 'beskrivning')}
            />
            <View style={styles.btnContainer}>
              <RoundIconBtn
                size={15}
                antIconName='check'
                onPress={handleSubmit}
              />
              {title.trim() || description.trim() ? (
                <RoundIconBtn
                  size={15}
                  style={{ marginLeft: 15 }}
                  antIconName='close'
                  onPress={closeModal}
                />
              ) : null}
            </View>
          </View>
          <TouchableWithoutFeedback onPress={handleModalClose}>
            <View style={[styles.modalBG, StyleSheet.absoluteFillObject]} />
          </TouchableWithoutFeedback>
        </Modal>
      </>
    );
  };
  
  const styles = StyleSheet.create({
    container: {
      paddingHorizontal: 20,
      paddingTop: 15,
    },
    input: {
      borderBottomWidth: 2,
      borderBottomColor: colors.PRIMARY,
      fontSize: 20,
      color: colors.DARK,
    },
    title: {
      height: 40,
      marginBottom: 15,
      fontWeight: 'bold',
    },
    description: {
      height: 100,
      fontWeight: 'bold',
    },
    modalBG: {
      flex: 1,
      zIndex: -1,
    },
    btnContainer: {
      flexDirection: 'row',
      justifyContent: 'center',
      paddingVertical: 15,
    },
  });

  export default NoteInputModal;