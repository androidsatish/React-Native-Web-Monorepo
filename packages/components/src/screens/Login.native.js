import React, { useState } from 'react';
import { View, StyleSheet, Text, ActivityIndicator, Image, StatusBar, Platform } from 'react-native';
import AppTextInput from '../uicomponents/AppTextInput';
import AppButton from '../uicomponents/AppButton';
import { useDispatch } from 'react-redux';
import { updateAuth, updateUtils } from '../actions';

import Constants from '../reducers/Constants';
import DeviceInfo from 'react-native-device-info';

const LoginScreen = props => {
    const [useremail, setUseremail] = useState('buyou1@firstcry.com');
    const [password, setPassword] = useState('Firstcry@123');
    const [visible, setVisible] = useState(false);
    const [macAddress, setMacAddress] = useState('');
    const [native, setIsNative] = useState(true);

    const dispatch = useDispatch();


    React.useEffect(() => {
        DeviceInfo.getMacAddress().then(mac => {
            // "E5:12:D8:E5:69:97"
            console.log('mac address: ' + mac);
            setMacAddress(mac);
        });

        let uniqueId = DeviceInfo.getUniqueId();
        console.log('uniqueId id : ' + uniqueId);

        let platform = '';
        if (Platform.OS === 'android') {
            platform = 'android';
        } else if (Platform.OS === 'ios') {
            platform = 'ios';
        } else if (Platform.OS === 'web') {
            platform = 'web';
            setIsNative(false);
        }
    }, []);

    React.useEffect(() => {
        if (!native) {
            console.log('native @login : ' + native);
            dispatch(updateUtils(macAddress, native));
        }
    }, [native]);

    const checkLogin = async (email, pass) => {
        //console.log(email + ' : ' + pass);
        setVisible(true);
        let url = 'loginauth';
        if (native) {
            url = Constants.BASE_URL + 'loginauth';
        }
        //const url = Constants.BASE_URL + 'loginauth';
        try {
            let response = await fetch(url, {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    username: email,
                    password: pass,
                    macaddress: '20320M80124553649'
                    // macaddress: macAddress.replace(/:/g, ''),

                })
            });

            let json = await response.json();

            if (json.status) {
                console.log(json.useraddress);
                console.log(json.systemtoken);
                goToHome(json);
            } else {
                console.log(json.message)
                setVisible(false);
            }

        } catch (e) {
            setVisible(false);
            console.log('Exception ' + e);
        }

    };

    const goToHome = (json) => {

        setVisible(false);
        dispatch(updateAuth(json));

        props.navigation.navigate('Home', {
            name: json.data.lastname,
        });
    };

    const handleInputEmail = email => {
        setUseremail(email);
    };
    const handleInputPass = pass => {
        setPassword(pass);
    };




    return (
        <View style={styles.loginContainer}>
            <StatusBar hidden={true} />
            <Text style={styles.signup}>The HandBook Master</Text>
            <Image source={require('../react_icon.png')}
                style={{ height: 200, width: 200 }}
            />
            <View style={styles.loginInputContainer}>
                <AppTextInput style={styles.loginInput}
                    onChangeText={handleInputEmail}
                    value={useremail}
                    keyboardType='email-address'
                    placeholder='email address' />
                <AppTextInput style={styles.loginInput}
                    onChangeText={handleInputPass}
                    value={password}
                    secureTextEntry={true}
                    placeholder='password' />


            </View>
            <View style={{ alignItems: 'flex-end', width: '100%', paddingHorizontal: 45 }}>
                <AppButton
                    onPress={checkLogin.bind(this, useremail, password)}
                    title='Sign In' />
            </View>
            <ActivityIndicator size='large' color='white' animating={visible} />

        </View>
    );
}

const styles = StyleSheet.create({
    loginContainer: {
        flex: 1,
        paddingVertical: 20,
        alignItems: 'center',
        backgroundColor: '#282c34',
    },
    signup: {
        color: 'white',
        fontSize: 30,
        fontWeight: '400',
        marginVertical: 10,
        marginHorizontal: 10,

    },
    loginInputContainer: {

        alignItems: 'center',
        marginHorizontal: 10,
        padding: 10,
    },
    loginInput: {
        width: 300,
    },
});

export default LoginScreen;
