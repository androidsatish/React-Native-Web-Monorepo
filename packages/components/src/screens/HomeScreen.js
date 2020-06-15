import React from 'react';
import { View, ActivityIndicator, StyleSheet, Button, FlatList, TextInput } from 'react-native';
import { useSelector } from 'react-redux';
import UserListItem from '../uicomponents/UserListItem';
import AppSearchInput from '../uicomponents/AppSearchInput';
import Constants from '../reducers/Constants';


const HomeScreen = ({ route, navigation, props }) => {

    // local state
    const [userData, setUserData] = React.useState([]);
    const [userTempData, setUserTempData] = React.useState([]);
    const [isLoading, setLoading] = React.useState(false);
    const [searchText, setSearchText] = React.useState('');

    // redux state
    const token = useSelector((state) => state.token);
    const useraddress = useSelector((state) => state.useraddress);

    const macAddress = useSelector((state) => state.macAddress);
    const isNative = useSelector((state) => state.isNative);


    const goToAddUser = () => {
        navigation.navigate('AddUser');
    };

    const loadUsers = async () => {
        setLoading(true);

        let url = 'getbuyouserwithmaclist';
        if (isNative) {
            url = Constants.BASE_URL + 'getbuyouserwithmaclist';
        }
        //const url = Constants.BASE_URL + 'getbuyouserwithmaclist';
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
                    pagesize: 1000,
                    pageno: 1,
                    isactive: 1

                })
            });

            let json = await response.json();

            if (json.status) {
                mapData(json.data);
            } else {
                setLoading(false);
                console.log(json.message)
            }

        } catch (e) {
            setLoading(false);
            console.log('Exception ' + e);
        }

    };


    const sortData = () => {
        let temp = [...userData];
        console.log('array before sort ' + temp.length + ' 1st item ' + temp[0].emailid);
        temp.sort((a, b) => { return a.emailid > b.emailid });
        console.log('array after sort ' + temp.length + ' 1st item ' + temp[0].emailid);
        setUserData(temp);
    };

    const mapData = (data) => {

        // setUserData(data);
        setUserTempData(data);
        setLoading(false);




        let temp = [...data];
        // temp.sort((a, b) => { return a.emailid > b.emailid });
        temp.sort(function (a, b) {
            var nameA = a.emailid.toUpperCase(); // ignore upper and lowercase
            var nameB = b.emailid.toUpperCase(); // ignore upper and lowercase
            if (nameA < nameB) {
                return -1;
            }
            if (nameA > nameB) {
                return 1;
            }

            // names must be equal
            return 0;
        });
        setUserData(temp);
    };


    const updateSearchResults = searchText => {
        setSearchText(searchText);
        if (searchText == '') {
            setUserData(userTempData);
            return;
        }
        setUserData(userTempData.filter(function (item) {
            return item.emailid.toLowerCase().includes(searchText.toLowerCase());
        }).map(function (item) { return item; }));

    };


    React.useEffect(() => {
        if (route.params.updated) {
            console.log('data updating');
            loadUsers();
        } else {
            console.log('not updating');
        }
    }, [route.params]);


    React.useEffect(() => {
        loadUsers();

    }, []);

    React.useLayoutEffect(() => {
        navigation.setOptions({
            headerRight: () => (
                <View style={{ marginRight: 10 }}>
                    <Button
                        color={Constants.THEME_COLOR}
                        onPress={goToAddUser} title="Add User" />
                </View>
            ),
        });
    }, [navigation]);

    return (
        <View style={[styles.rootContainer]}>
            <View style={styles.searchContainer}>
                <View style={isNative ? styles.searchContainerMobile : styles.searchContainerWeb}>
                    <AppSearchInput
                        placeholder="Search Here"
                        lightTheme
                        round
                        editable={true}
                        value={searchText}
                        blurOnSubmit={true}
                        onChangeText={updateSearchResults}
                    />
                </View>
            </View>
            <FlatList
                style={styles.listContainer}
                numColumns={isNative ? 1 : 3}
                data={userData}
                keyExtractor={item => item.id}
                renderItem={({ item }) => <UserListItem {...item} navigation={navigation} />}

            />
            <ActivityIndicator style={{ flex: 1, alignItems: 'center', justifyContent: 'center', }} size="large" color="blue" animating={isLoading} />
        </View>
    );

};


const styles = StyleSheet.create({
    rootContainer: {
        flex: 1,
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'stretch',
    },
    listContainer: {
        width: '100%',
    },
    searchContainerWeb: {
        justifyContent: 'center',

    },
    searchContainer: {
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'center',
    },
    searchContainerMobile: {
        width: '100%',
    },
});

export default HomeScreen;