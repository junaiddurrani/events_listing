import React, { useState, useEffect } from 'react';
import { View, StyleSheet, TouchableOpacity, Text, FlatList } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Colors } from 'react-native/Libraries/NewAppScreen';

import RenderItem from '../../components/event_single_item';


export default function EventsList({ navigation }) {

    const [events, setEvents] = useState([]);

    const getEvents = () => {

        AsyncStorage.getAllKeys()
            .then((keys) => AsyncStorage.multiGet(keys)
                .then((data) => {
                    if (data) {
                        setEvents(
                            data.
                                sort(function (a, b) {
                                    if (JSON.parse(a[1]).dateStart < JSON.parse(b[1]).dateStart) {
                                        return 1;
                                    }
                                    if (JSON.parse(a[1]).dateStart > JSON.parse(b[1]).dateStart) {
                                        return -1;
                                    }
                                })
                        );
                        // console.log(events);
                    }
                })
                .catch((error) => console.log(error))
            )
            .catch((err) => console.log(err));
    }

    useEffect(() => {
        getEvents();

        return navigation.addListener('focus', () => {
            getEvents();
        });
    }, []);

    const renderItem = ({ item }) => {
        return <RenderItem item={item} navigation={navigation} />;
    }

    return (
        <View style={styles.bottomSection}>
            {
                events.length > 0 ?
                    <FlatList
                        data={events}
                        renderItem={renderItem}
                        keyExtractor={item => item[0]}
                    />
                    : <Text style={styles.textStyleBlack}>No events to show yet.</Text>
            }
        </View>
    );
}

const styles = StyleSheet.create({
    bottomSection: {
        flex: 1,
        width: '100%',
        marginTop: 30,
        marginHorizontal: 10,
    },
    textStyleBlack: {
        color: 'black',
        textAlign: 'center',
        fontSize: 18,
        textAlignVertical: 'center',
        flex: 1,
    }
});