
import { View, StyleSheet, TouchableOpacity, TextInput, Text, } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useState, useRef, useEffect } from 'react';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import moment from 'moment';
import { Picker } from '@react-native-picker/picker';


export default function EditEventScreen({ route, navigation }) {

    const { item } = route.params;

    var data = JSON.parse(item[1]);
    var key = item[0];

    const ref_title = useRef();
    const ref_description = useRef();


    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
    const [isDatePickerVisibleEnd, setDatePickerVisibilityEnd] = useState(false);
    const [title, setTitle] = useState('');
    const [dateStart, setDateStart] = useState();
    const [dateEnd, setDateEnd] = useState();
    const [description, setDescription] = useState('');
    const [selectedType, setSelectedType] = useState('one');

    const showDatePicker = () => {
        setDatePickerVisibility(true);
    };

    const showDatePickerEnd = () => {
        setDatePickerVisibilityEnd(true);
    };

    const hideDatePicker = () => {
        setDatePickerVisibility(false);
    };

    const hideDatePickerEnd = () => {
        setDatePickerVisibilityEnd(false);
    };

    const handleConfirm = date => {
        setDateStart(date);
        hideDatePicker();
    };

    const handleConfirmEnd = date => {
        setDateEnd(date);
        hideDatePickerEnd();
    };

    const updateEvent = () => {
        let data = { title, description, dateStart, dateEnd, selectedType };
        AsyncStorage.mergeItem(key, JSON.stringify(data))
            .then(() => {
                console.log('Event updated');
                navigation.navigate('Home');
            })
            .catch((err) => console.log(err));

    }

    useEffect(() => {
        setCredentials();

        navigation.addListener('focus', () => {
            setCredentials();
        });
    }, [])


    const setCredentials = () => {
        setTitle(data.title);
        setDescription(data.description);
        setDateStart(data.dateStart);
        setDateEnd(data.dateEnd);
        setSelectedType(data.selectedType);
    }

    return (
        <View style={styles.modalStyle}>

            <Text style={styles.textStyleBlack}>Edit Event</Text>
            <View style={styles.marginFromTop} />

            <TextInput
                style={styles.textStyleInput}
                placeholder="Name"
                onChangeText={newText => setTitle(newText)}
                defaultValue={title}
                selectionColor='tomato'
                returnKeyType='next'
                underlineColorAndroid='tomato'
                ref={ref_title}
                onSubmitEditing={() => ref_description.current.focus()}
            />

            <TextInput
                style={styles.textStyleInput}
                placeholder="Description"
                onChangeText={newText => setDescription(newText)}
                defaultValue={description}
                selectionColor='tomato'
                underlineColorAndroid='tomato'
                ref={ref_description}
            />

            <View style={styles.datePickerSection}>

                <TouchableOpacity
                    activeOpacity={.5}
                    onPress={showDatePicker}
                    style={styles.buttonStyleInput}>
                    <Text style={styles.buttonTextStyle}>Start Time</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    activeOpacity={.5}
                    onPress={showDatePickerEnd}
                    style={styles.buttonStyleInput}>
                    <Text style={styles.buttonTextStyle}>End Time</Text>
                </TouchableOpacity>

                <DateTimePickerModal
                    isVisible={isDatePickerVisible}
                    mode="datetime"
                    minimumDate={moment().toDate()}
                    onConfirm={handleConfirm}
                    onCancel={hideDatePicker}
                />

                <DateTimePickerModal
                    isVisible={isDatePickerVisibleEnd}
                    mode="datetime"
                    minimumDate={moment().toDate()}
                    onConfirm={handleConfirmEnd}
                    onCancel={hideDatePickerEnd}
                />

            </View>

            <Picker
                style={styles.pickerStyleInput}
                selectedValue={selectedType}
                dropdownIconColor='white'
                onValueChange={(itemValue, itemIndex) =>
                    setSelectedType(itemValue)
                }>
                <Picker.Item label="Event" value="one" />
                <Picker.Item label="Task" value="two" />
                <Picker.Item label="Out of office" value="three" />
            </Picker>

            <TouchableOpacity
                activeOpacity={.5}
                onPress={updateEvent}
                style={styles.buttonStyleBottom}>
                <Text style={styles.buttonTextStyle}>Update Event</Text>
            </TouchableOpacity>


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
    buttonStyleInput: {
        backgroundColor: 'tomato',
        flex: 1,
        height: 45,
        justifyContent: 'center',
        marginHorizontal: 5
    },
    buttonTextStyle: {
        color: 'white',
        textAlign: 'center',
        fontSize: 16,
    },
});
