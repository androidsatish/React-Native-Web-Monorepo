import React from 'react';
import { TextInput, StyleSheet, View } from 'react-native';

const AppSearchInput = props => {
    return (
        <View >
            <TextInput placeholderTextColor='grey'
                {...props} style={[styles.customInput, props.style]} />
        </View>
    );
};

const styles = StyleSheet.create({
    customInput: {
        borderRadius: 20,
        borderWidth: 1,
        borderColor: '#282c34',
        color: '#282c34',
        fontSize: 18,
        margin: 10,
        padding: 10,
    },
});

export default AppSearchInput;

