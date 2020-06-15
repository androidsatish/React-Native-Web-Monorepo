import React from 'react';
import { View, StyleSheet, Text, ActivityIndicator, Switch, BackHandler } from 'react-native';
import { useSelector } from 'react-redux';
import AppTextInput from '../uicomponents/AppTextInput';
import AppButtonLight from '../uicomponents/AppButtonLight';
import Constants from '../reducers/Constants';

const UpdateUser = ({ route, navigation, props }) => {

    const [visible, setVisible] = React.useState(false);
    const [name, setName] = React.useState(route.params.name);
    const [email, setEmail] = React.useState(route.params.email);
    const [userId, setUserId] = React.useState(route.params.id);
    const [mac_address, setmac_address] = React.useState(route.params.mac_address);
    const [message, setMessage] = React.useState('');
    const [isError, setError] = React.useState(false);
    const [toggleCheckBox, setToggleCheckBox] = React.useState(route.params.isactive);
    const [valueUpdated, setValueUpdated] = React.useState(false);

    const token = useSelector((state) => state.token);
    const useraddress = useSelector((state) => state.useraddress);
    const emailAddress = useSelector((state) => state.emailAddress);
    const isNative = useSelector((state) => state.isNative);

    const updateUser = async () => {

        const pattern = /[a-zA-Z0-9]+[\.]?([a-zA-Z0-9]+)?[\@][a-z]{3,9}[\.][a-z]{2,5}/g;
        const result = pattern.test(email);
        setMessage('');
        //console.log(mac_address.replace(/:/g,''));

        if (result === true) {
            setVisible(true);

            let url = '/updatebuyousermac';
            if (isNative) {
                url = Constants.BASE_URL + '/updatebuyousermac';
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
                        isactive: 1,
                        id: userId,
                        name: name,
                        username: email,
                        macaddress: mac_address.replace(/:/g, ''),
                        lastmodifiedby: emailAddress

                    })
                });

                let json = await response.json();

                if (json.status) {
                    //   updateExistingUser(userId);
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
        setToggleCheckBox(true);
        // setEmail('');
        // setmac_address('');
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
                editable={!toggleCheckBox}
            />


            <AppTextInput
                onChangeText={setEmail}
                value={email}
                keyboardType='email-address'
                blurOnSubmit={true}
                style={styles.input}
                placeholder='Email'
                editable={!toggleCheckBox}
            />
            <AppTextInput
                onChangeText={setmac_address}
                value={mac_address}
                blurOnSubmit={true}
                style={styles.input}
                placeholder='Mac Address'
                editable={!toggleCheckBox}
            />
            <View style={{ flex: 1, flexDirection: 'row', maxHeight: 50 }}>
                <View style={[styles.buttonmain, { flexDirection: 'row' }]}>
                    <Switch
                        // trackColor={{ false: "#767577", true: "#81b0ff" }}
                        // thumbColor={toggleCheckBox ? "#f5dd4b" : "#f4f3f4"}
                        // ios_backgroundColor="#3e3e3e"
                        onValueChange={setToggleCheckBox}
                        value={toggleCheckBox}
                    />
                    <Text style={{ margin: 8, fontSize: 18 }}>isActive</Text>
                </View>

                <View style={styles.buttonmain}>
                    <AppButtonLight
                        onPress={updateUser}
                        title='Add'

                    />
                </View>
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
        justifyContent: 'center',
        height: 50,
        maxHeight: 50,
        marginHorizontal: 10,
        marginVertical: 10,
        width: '50%',
    },
    message: {
        backgroundColor: 'green',
        color: 'white',
        borderRadius: 5,
        padding: 10,
        marginHorizontal: 10,
        marginVertical: 30,
        textAlign: 'center',

    },

});

export default UpdateUser;