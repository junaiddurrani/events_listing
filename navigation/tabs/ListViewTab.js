import React, { useState, useEffect } from 'react';
import { View, StyleSheet, TouchableOpacity, Text, FlatList } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Colors } from 'react-native/Libraries/NewAppScreen';

import RenderItem from '../../components/event_single_item';
import EventsList from './EventsList';

export default function ListViewTab({ navigation }) {

    const [selectedType, setSelectedType] = useState('one');


    return (
        <View style={styles.container}>
            <View style={styles.firstSection}>

                <Picker
                    style={styles.pickerStyle}
                    selectedValue={selectedType}
                    dropdownIconColor='white'
                    onValueChange={(itemValue, itemIndex) => {
                        setSelectedType(itemValue);
                    }
                    }>
                    <Picker.Item label="All" value="one" />
                    <Picker.Item label="Event" value="two" />
                    <Picker.Item label="Task" value="three" />
                    <Picker.Item label="Out of office" value="four" />
                </Picker>

                <TouchableOpacity
                    activeOpacity={.5}
                    onPress={() => navigation.navigate('AddEventScreen')}
                    style={styles.buttonStyle}>
                    <Text style={styles.textStyle}>+ Create Event</Text>
                </TouchableOpacity>

            </View>

            <EventsList navigation={navigation} />

        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 15,
        flexDirection: 'column',
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center'
    },
    marginFromTop: {
        marginTop: 15,
    },
    firstSection: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        justifyContent: 'center',
    },
    topButtonsStyle: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        justifyContent: 'center',
        flex: 0.2
    },
    topTitleStyle: {
        flex: 0.8
    },
    modalStyle: {
        flex: 0.5,
        backgroundColor: 'white',
        padding: 20,
    },
    bottomSection: {
        flex: 1,
        width: '100%',
        marginTop: 30,
        marginHorizontal: 10,
    },
    pickerStyle: {
        backgroundColor: 'tomato',
        color: 'white',
        flex: 1,
    },
    textStyle: {
        color: 'white',
        textAlign: 'center',
        fontSize: 16,
    },
    textStyleBlack: {
        color: 'black',
        textAlign: 'center',
        fontSize: 18,
        textAlignVertical: 'center',
        flex: 1,
    },
    buttonStyle: {
        backgroundColor: 'tomato',
        flex: 1,
        justifyContent: 'center',
        marginHorizontal: 5
    },
    cardView: {
        alignItems: 'flex-start',
        justifyContent: 'center',
        backgroundColor: Colors.white,
        borderRadius: 5,
        flexDirection: 'column',
        shadowColor: Colors.shadow,
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 1,
        width: '100%',
        shadowRadius: 2,
        elevation: 1,
        padding: 15,
        marginVertical: 10,
    },
});