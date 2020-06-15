import React from 'react';
import { View, StyleSheet, Text, ActivityIndicator, BackHandler } from 'react-native';
import { useSelector } from 'react-redux';
import AppTextInput from '../uicomponents/AppTextInput';
import AppButtonLight from '../uicomponents/AppButtonLight';
import Constants from '../reducers/Constants';

const AddUser = ({ route, navigation, props }) => {

    const [visible, setVisible] = React.useState(false);
    const [email, setEmail] = React.useState('');
    const [mac_address, setmac_address] = React.useState('');
    const [name, setName] = React.useState('');
    const [message, setMessage] = React.useState('');
    const [isError, setError] = React.useState(false);
    const [valueUpdated, setValueUpdated] = React.useState(false);


    const token = useSelector((state) => state.token);
    const useraddress = useSelector((state) => state.useraddress);
    const emailAddress = useSelector((state) => state.emailAddress);

    const isNative = useSelector((state) => state.isNative);


    const addUser = async (email, mac_address, Name) => {

        const pattern = /[a-zA-Z0-9]+[\.]?([a-zA-Z0-9]+)?[\@][a-z]{3,9}[\.][a-z]{2,5}/g;
        const result = pattern.test(email);
        setMessage('');
        //console.log(mac_address.replace(/:/g,''));


        if (result === true) {
            setVisible(true);

            let url ='addbuyousermac';
            if(isNative){
                url = Constants.BASE_URL + 'addbuyousermac';
            }
             
            try {
                let response = await fetch(url, {
                    method: 'POST',
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                        'Authorization': token,
                        'useraddress': useraddress,
                    },
                    body: JSON.stringify({
                        name:Name,
                        username: email,
                        macaddress: mac_address.replace(/:/g, ''),
                        lastmodifiedby: emailAddress

                    })
                });

                let json = await response.json();

                if (json.status) {
                    setValueUpdated(true);
                    clearInput(json.message);
                } else {
                    console.log(json.message)
                    setError(true);
                    setMessage(json.message);
                }

            } catch (e) {
                console.log('Exception ' + e);
                setError(true);
                setMessage('Exception ' + e);
            }


        } else {
            console.log('Invalid Email');
            setError(true);
            setMessage('Invalid Email');
        }
    };


    function backButtonHandler() {
        console.log('system backButtonHandler');
        navigation.navigate('Home', {
            updated: valueUpdated,
        });
        return true;
    }


    React.useEffect(() => {
        BackHandler.addEventListener("hardwareBackPress", backButtonHandler);

        return () => {
            BackHandler.removeEventListener("hardwareBackPress", backButtonHandler);
        };
    }, [backButtonHandler])




    const clearInput = msg => {
        setError(false);
        setMessage(msg);
        setVisible(false);
        setEmail('');
        setmac_address('');
        setName('');
    };


    return (
        <View style={styles.mainContainer}>
            <AppTextInput
                onChangeText={setName}
                value={name}
                keyboardType='email-address'
                blurOnSubmit={true}
                style={styles.input}
                placeholder='Name'
            />
            <AppTextInput
                onChangeText={setEmail}
                value={email}
                keyboardType='email-address'
                blurOnSubmit={true}
                style={styles.input}
                placeholder='Email'
            />
            <AppTextInput
                onChangeText={setmac_address}
                value={mac_address}
                blurOnSubmit={true}
                style={styles.input}
                placeholder='Mac Address'
            />
            <View style={styles.buttonmain}>
                <AppButtonLight
                    onPress={addUser.bind(this, email, mac_address,name)}
                    title='Add' />
            </View>
            {message !== '' ? <Text style={[styles.message, isError ? { backgroundColor: 'red' } : { backgroundColor: 'green' }]}>{message}</Text> : null}

            <ActivityIndicator size='large' color='white' animating={visible} />
        </View>
    );
};


const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        padding: 10,
        backgroundColor: 'white',
    },
    input: {
        color: '#282c34',
        borderColor: '#282c34',
    },
    buttonmain: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'flex-end',
        height: 50,
        maxHeight: 50,
        marginHorizontal: 10,
        marginVertical: 10,

    },
    message: {
        backgroundColor: 'green',
        color: 'white',
        borderRadius: 5,
        padding: 10,
        textAlign: 'center',

    },

});

export default AddUser;