import React from 'react';
import { StyleSheet, View, Text } from 'react-native';

const ActivityScreen = () => {
    return (
        <View style={styles.container}>
            <Text>Me Screen</Text>
        </View>
    )
}

export default ActivityScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    }
})