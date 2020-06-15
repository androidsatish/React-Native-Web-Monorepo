import React from 'react';
import { TextInput, StyleSheet } from 'react-native';

const AppTextInput = props => {
    return (
        <TextInput placeholderTextColor='white'
        {...props} style={[styles.customInput, props.style]} />
       
    );
};

const styles = StyleSheet.create({
    customInput: {
        minWidth: 200,
        borderRadius: 4,
        borderWidth: 2,
        borderColor: 'white',
        color: 'white',
        fontSize: 18,
        margin: 10,
        padding:10,
    },
});

export default AppTextInput;

