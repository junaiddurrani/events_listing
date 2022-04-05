import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AddEventScreen from '../screens/AddEventScreen';
import { createStackNavigator } from '@react-navigation/stack';
const Stack = createStackNavigator();
import EditEventScreen from '../screens/EditEventScreen';


// Screens
import ListViewTab from './tabs/ListViewTab';
import CalendarViewTab from './tabs/CalendarView';


//Screen names
const listViewName = "ListView";
const calendarViewName = "CalendarView";

const Tab = createBottomTabNavigator();


function EventTypeTabs() {
    return (
        <Tab.Navigator
            initialRouteName={listViewName}
            screenOptions={({ route }) => ({
                tabBarActiveTintColor: 'tomato',
                tabBarInactiveTintColor: 'grey',
                tabBarLabelStyle: { paddingBottom: 10, fontSize: 10 },
                tabBarStyle: { padding: 10, height: 70 },
                tabBarIcon: ({ focused, color, size }) => {
                    let iconName;
                    let rn = route.name;

                    if (rn === listViewName) {
                        iconName = 'list';

                    } else if (rn === calendarViewName) {
                        iconName = 'calendar';

                    }

                    // You can return any component that you like here!
                    return <Ionicons name={iconName} size={size} color={color} />;
                },
            })}>

            <Tab.Screen name={listViewName} component={ListViewTab} options={{ title: 'My Events Listing', headerTitleAlign: 'center' }} />
            <Tab.Screen name={calendarViewName} component={CalendarViewTab} options={{ title: 'My Events Listing', headerTitleAlign: 'center' }} />

        </Tab.Navigator>
    );
}

function MainContainer() {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name="Home" component={EventTypeTabs} options={{ headerShown: false }} />
                <Stack.Screen name="AddEventScreen" component={AddEventScreen} options={{ title: 'Create Event' }} />
                <Stack.Screen name="EditEventScreen" component={EditEventScreen} options={{ title: 'Edit Event', headerShown: false }} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}

export default MainContainer;