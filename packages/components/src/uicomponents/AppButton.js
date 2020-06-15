import React from 'react';
import { View, TouchableOpacity, StyleSheet, Text } from 'react-native';

const AppButton = props => {
    return (
        <View style={styles.buttonmain}>
        <TouchableOpacity
            onPress={props.onPress}
            style={styles.btnStyle}>
            <View>
                <Text style={styles.textStyle}>{props.title}</Text>
            </View>
        </TouchableOpacity>
        </View>

    );
};

const styles = StyleSheet.create({
    btnStyle: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
       
        borderColor: "#282c34",
    },
    textStyle: {
        textAlign: 'center',
        color: '#282c34',
        fontSize: 20,
    },
    buttonmain: {
        
        borderRadius: 20,
        minWidth:100,
        height:50,
        marginHorizontal: 10,
        marginVertical: 10,
        backgroundColor:'white',
    },
});

export default AppButton;