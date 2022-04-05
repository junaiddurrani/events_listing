
import { View, StyleSheet, TouchableOpacity, TextInput, Text, Alert, Button } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useState, useRef, useEffect } from 'react';
import Icon from 'react-native-vector-icons/AntDesign';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import { dismiss } from 'react-native/Libraries/LogBox/Data/LogBoxData';



export default function RenderItem({ item, navigation }) {

    var data = JSON.parse(item[1]);

    const deleteEvent = () => {
        AsyncStorage.removeItem(item[0])
            .then(() => {
                console.log('Event deleted');
                navigation.replace('Home');
            })
            .catch((err) => console.log(err));
    }

    return (
        <View style={styles.cardView}>

            <View style={styles.firstSection}>

                <View style={styles.topTitleStyle}>
                    <Text>{data.title}</Text>
                </View>

                <View style={styles.topButtonsStyle}>
                    <TouchableOpacity
                        onPress={() => {
                            Alert.alert(
                                "Delete Event",
                                "Are you sure you want to delete this event ? This action cannot be undone.",
                                [
                                    {
                                        text: "Cancel",
                                        onPress: () => dismiss(),
                                        style: "cancel"
                                    },
                                    {
                                        text: "OK", onPress: () => deleteEvent()
                                    }
                                ]
                            );
                        }}
                    >
                        <Icon name="delete" size={20} color="grey" />
                    </TouchableOpacity>
                    <View style={{ marginLeft: 20 }} />
                    <TouchableOpacity
                        onPress={() => {
                            Alert.alert(
                                "Edit Event",
                                "Are you sure you want to edit this event ?",
                                [
                                    {
                                        text: "Cancel",
                                        onPress: () => {
                                            dismiss();
                                        },
                                        style: "cancel"
                                    },
                                    {
                                        text: "OK", onPress: () => {
                                            dismiss();
                                            navigation.navigate('EditEventScreen', { item: item });
                                        }
                                    }
                                ]
                            );
                        }}
                    >
                        <Icon name="edit" size={20} color="grey" />
                    </TouchableOpacity>
                </View>

            </View>

            <View style={styles.marginFromTop}>
                <Text>{Date(data.dateStart.replace('T', ' ').replace('Z', ''))}</Text>
            </View>

            <View style={styles.marginFromTop}>
                <Text>{data.description}</Text>
            </View>

        </View>
    );
}

const styles = StyleSheet.create({

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
    buttonStyleBottom: {
        backgroundColor: 'tomato',
        height: 45,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        bottom: 30,
        left: 10,
        width: '100%',
        marginHorizontal: 5,
    },
    datePickerSection: {
        marginTop: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        justifyContent: 'center',
    },
    modalStyle: {
        backgroundColor: 'white',
        padding: 20,
        flex: 1
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
    pickerStyleInput: {
        marginTop: 10,
        justifyContent: 'center',
        backgroundColor: 'tomato',
        color: 'white',
        marginTop: 15,
        height: 45,
        left: 5,
        width: '97%'
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
    },
    textStyleInput: {
        width: '100%',
        height: 45,
        fontSize: 16,
        paddingBottom: 10,
        paddingHorizontal: 10,
        marginBottom: 15,
        marginHorizontal: 10,
        borderColor: 'tomato'
    },
    buttonStyle: {
        backgroundColor: 'tomato',
        flex: 1,
        justifyContent: 'center',
        marginHorizontal: 5
    },
    buttonStyleInput: {
        backgroundColor: 'tomato',
        flex: 1,
        height: 45,
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
    buttonTextStyle: {
        color: 'white',
        textAlign: 'center',
        fontSize: 16,
    },
});
