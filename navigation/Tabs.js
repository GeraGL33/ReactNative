import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Home from '../navigation/screens/Home';
import MiPerfil from '../navigation/screens/MiPerfil';
import ConsultarDrop from '../navigation/screens/ConsultarDrop';
import ReportarDrop from '../navigation/screens/ReportarDrop';
import Login from '../navigation/screens/Login';

const Tab = createBottomTabNavigator();

const CustomTabBar = (props) => {
    return (
        <View style={styles.tabBarContainer}>
            {props.state.routes.map((route, index) => (
                <TouchableOpacity
                    key={index}
                    style={[
                        styles.tabBarItem,
                        props.state.index === index ? styles.activeTabBarItem : null,
                    ]}
                    onPress={() => props.navigation.navigate(route.name)}
                >
                    <View style={styles.tabBarItemContent}>
                        <Ionicons
                            name={
                                route.name === 'Login'
                                    ? 'log-in'
                                    : route.name === 'Inicio'
                                        ? 'home'
                                        : route.name === 'Perfil'
                                            ? 'person'
                                            : route.name === 'Reportar'
                                                ? 'document-text'
                                                : 'search'

                            }
                            size={22}
                            style={[
                                styles.tabBarItemIcon,
                                props.state.index === index ? styles.activeTabBarItemIcon : null,
                            ]}
                            color={props.state.index === index ? '#64FFDA' : '#dcddde'}
                        />
                        <Text
                            style={[
                                styles.tabBarItemText,
                                props.state.index === index ? styles.activeTabBarItemText : null,
                            ]}
                        >
                            {route.name}
                        </Text>
                    </View>
                </TouchableOpacity>
            ))}
        </View>
    );
};

const Tabs = () => {
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <Tab.Navigator
                tabBar={(props) => <CustomTabBar {...props} />}
                screenOptions={{
                    headerShown: false,
                }}
            >
                <Tab.Screen name="Login" component={Login} />
                <Tab.Screen name="Perfil" component={MiPerfil} />
                <Tab.Screen name="Inicio" component={Home} />
                <Tab.Screen name="Consultar" component={ConsultarDrop} />
                <Tab.Screen name="Reportar" component={ReportarDrop} />
            </Tab.Navigator>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    tabBarContainer: {
        flexDirection: 'row',
        backgroundColor: '#4d4f4d',
        paddingVertical: 10,
        shadowColor: '#dcddde',
        shadowOffset: {
            width: 0,
            height: -8,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    tabBarItem: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 4,
    },
    activeTabBarItem: {
        backgroundColor: '#102745',
        borderRadius: 10,
    },
    tabBarItemContent: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    tabBarItemIcon: {
        fontSize: 25,
    },
    activeTabBarItemIcon: {
        color: '#64FFDA',
    },
    tabBarItemText: {
        fontSize: 12,
        color: '#dcddde',
        marginTop: 4,
        fontWeight: 'bold',
    },
    activeTabBarItemText: {
        color: '#64FFDA',
    },
});

export default Tabs;