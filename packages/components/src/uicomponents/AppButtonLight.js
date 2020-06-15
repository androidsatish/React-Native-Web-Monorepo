import React from 'react';
import { View, TouchableOpacity, StyleSheet, Text } from 'react-native';

const AppButtonLight = props => {
    return (
        <TouchableOpacity
            onPress={props.onPress}
            style={styles.btnStyle}>
            <View>
                <Text style={styles.textStyle}>{props.title}</Text>
            </View>
        </TouchableOpacity>

    );
};

const styles = StyleSheet.create({
    btnStyle: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        width: '50%',
        borderRadius: 4,
        borderWidth:1,
        borderColor: '#282c34',
        backgroundColor: 'white',
    },
    textStyle: {
        textAlign: 'center',
        color: '#282c34',
        fontSize: 20,
        
    },
});

export default AppButtonLight;