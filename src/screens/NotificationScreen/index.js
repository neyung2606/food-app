import React from 'react';
import { StyleSheet, View, Text } from 'react-native';

const NotificationScreen = () => {
    return (
        <View style={styles.container}>
            <Text>Notification Screen</Text>
        </View>
    )
}

export default NotificationScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    }
})