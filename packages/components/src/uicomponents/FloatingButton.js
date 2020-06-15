import React from 'react';
import { View, StyleSheet, Button } from 'react-native';

const FloatingButton = props => {
    return (
        <View style={styles.TouchableOpacityStyle}>
            <Button>FAB</Button>
        </View>
    );
};

const styles = StyleSheet.create({
    TouchableOpacityStyle: {
        //Here is the trick
        position: 'absolute',
        width: 50,
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        right: 30,
        bottom: 30,
    },
});

export default FloatingButton;