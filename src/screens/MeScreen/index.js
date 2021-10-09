import React from 'react';
import { StyleSheet, View, Text } from 'react-native';

const MeScreen = () => {
    return (
        <View style={styles.container}>
            <Text>Me Screen</Text>
        </View>
    )
}

export default MeScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    }
})