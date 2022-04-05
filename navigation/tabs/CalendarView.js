import * as React from 'react';
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { Calendar } from 'react-native-calendars';
import EventsList from './EventsList';

export default function CalendarViewTab({ navigation }) {
    return (
        <View style={styles.container}>
            <TouchableOpacity
                activeOpacity={.5}
                onPress={() => navigation.navigate('AddEventScreen')}
                style={styles.buttonStyle}>
                <Text style={styles.textStyle}>+ Create Event</Text>
            </TouchableOpacity>
            <Calendar
                onDayPress={day => {
                    console.log('selected day', day);
                }}
                enableSwipeMonths={true}
            />
            <View style={styles.bottomSection}>
                <EventsList navigation={navigation} />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'column',
        flex: 1,
        justifyContent: 'flex-start',
    },
    bottomSection: {
        flex: 1,
        justifyContent: 'flex-start',
        right: 5,
    },
    textStyle: {
        color: 'white',
        textAlign: 'center',
        fontSize: 16,
    },
    buttonStyle: {
        backgroundColor: 'tomato',
        justifyContent: 'center',
        marginHorizontal: 5,
        height: 45,
        marginTop: 10,
        width: '50%',
        alignSelf: 'flex-end',
        marginBottom: 10,
    },
    textStyleBlack: {
        color: 'black',
        textAlign: 'center',
        fontSize: 18,
        textAlignVertical: 'center',
        flex: 1,
    }
});