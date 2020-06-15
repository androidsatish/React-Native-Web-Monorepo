import React from 'react';
import { useSelector } from 'react-redux';
import { View, Text, StyleSheet, TouchableWithoutFeedback } from 'react-native';

const UserListItem = props => {

    const isNative = useSelector((state) => state.isNative);
    
    return (
        <TouchableWithoutFeedback
            onPress={() => {
                props.navigation.navigate('UpdateUser',
                    {
                        name:props.name,
                        email: props.emailid,
                        mac_address: props.macaddress,
                        id: props.id,
                        isactive: props.isactive === '0' ? false : true,
                    })
            }}
        >
            <View style={[styles.itemCard, props.isactive === '0' ? { backgroundColor: '#f9eaea' } : { backgroundColor: '#e1f4e7' }]}>

                <View style={styles.horizantalView}>
                    {/* <Text style={[styles.item, styles.itemEmail, styles.label]}>User Email : </Text> */}
                    {/* <Text style={[styles.item, styles.itemEmail]}>{props.name}</Text> */}
        <Text style={[styles.item, styles.itemEmail, isNative?{color:'red'}:{color:'blue'}]}>{props.name===undefined?"NA":props.name}</Text>

                </View>

                <View style={styles.horizantalView}>
                    {/* <Text style={[styles.item, styles.itemEmail, styles.label]}>User Email : </Text> */}
                    <Text style={[styles.item, styles.itemEmail]}>{props.emailid}</Text>
                </View>

                <View style={styles.horizantalView}>
                    <Text style={[styles.item, styles.itemMac, styles.label]}>Mac Address : </Text>
                    <Text style={[styles.item, styles.itemMac, { fontFamily: 'monospace', }]}>{props.macaddress}</Text>
                </View>

                <View style={styles.horizantalView}>
                    <Text style={[styles.item, styles.itemExtras, styles.label]}>Last Modified on </Text>
                    <Text style={[styles.item, styles.itemExtras]}>{props.lastmodifieddate}</Text>
                </View>

            </View>
        </TouchableWithoutFeedback>
    )
};

const styles = StyleSheet.create({
    itemCard: {
        shadowColor: 'grey',
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 5,
        shadowOpacity: 0.26,
        backgroundColor: 'white',
        elevation: 4,
        padding: 10,
        borderRadius: 10,
        flex: 1,
        margin: 5,

    },
    horizantalView: {
        flex: 1,
        flexDirection: 'row',
    },
    label: {
        color: 'grey',
    },
    item: {
        fontFamily: 'serif',
        padding: 5,
    },
    itemEmail: {
        fontSize: 18,

    },
    itemMac: {
        fontSize: 14,
    },
    itemExtras: {
        fontSize: 10,
    },

});

export default UserListItem;