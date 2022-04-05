import React, { useState, useRef } from 'react'
import { View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native'
import DateTimePickerModal from "react-native-modal-datetime-picker";
import moment from 'moment';
import AsyncStorage from '@react-native-async-storage/async-storage';
import uuid from 'react-native-uuid';
import { Picker } from '@react-native-picker/picker';

const AddEventScreen = ({ navigation }) => {

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

    const createEvent = () => {
        if (!title) {
            alert('Please provide title');
        } else if (!description) {
            alert('Please provide description');
        } else if (!dateStart) {
            alert('Please select start time');
        } else if (!dateEnd) {
            alert('Please select end time');
        } else {
            let data = { title, description, dateStart, dateEnd, selectedType };
            AsyncStorage.setItem(uuid.v4(), JSON.stringify(data))
                .then(() => {
                    console.log('Event created');
                    navigation.navigate('Home');
                })
                .catch((err) => console.log(err));
        }
    }

    return (
        <View style={styles.container}>

            <TextInput
                style={styles.textStyle}
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
                style={styles.textStyle}
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
                    style={styles.buttonStyle}>
                    <Text style={styles.buttonTextStyle}>Start Time</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    activeOpacity={.5}
                    onPress={showDatePickerEnd}
                    style={styles.buttonStyle}>
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
                style={styles.pickerStyle}
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
                onPress={createEvent}
                style={styles.buttonStyleBottom}>
                <Text style={styles.buttonTextStyle}>Create Event</Text>
            </TouchableOpacity>

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        padding: 15,
        marginHorizontal: 10,
        flexDirection: 'column',
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center'
    },
    textStyle: {
        width: '100%',
        height: 45,
        fontSize: 16,
        paddingBottom: 10,
        paddingHorizontal: 10,
        marginBottom: 15,
        marginHorizontal: 10,
        borderColor: 'tomato'
    },
    datePickerSection: {
        marginTop: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        justifyContent: 'center',
    },
    buttonStyle: {
        backgroundColor: 'tomato',
        flex: 1,
        height: 45,
        justifyContent: 'center',
        marginHorizontal: 5
    },
    pickerStyle: {
        marginTop: 10,
        justifyContent: 'center',
        backgroundColor: 'tomato',
        color: 'white',
        marginTop: 15,
        height: 45,
        width: '98%'

    },
    buttonStyleBottom: {
        backgroundColor: 'tomato',
        height: 45,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        bottom: 30,
        width: '100%',
        marginHorizontal: 5,
    },
    buttonTextStyle: {
        color: 'white',
        textAlign: 'center',
        fontSize: 16,
    },
});

export default AddEventScreen