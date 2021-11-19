import React from 'react';
import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

const Home = ({navigation}) => {
  return (
    <View style={styles.container}>
      <View>
        <TouchableOpacity
          style={styles.btn}
          onPress={() => navigation.navigate('Camera')}>
          <Text style={styles.text}>Chụp ảnh</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.btn}
          onPress={() => navigation.navigate('Collections')}>
          <Text style={styles.text}>Chọn ảnh</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  btn: {
    width: Dimensions.get('screen').width * 0.8,
    padding: 20,
    borderRadius: 20,
    backgroundColor: '#c4c4c4',
    marginVertical: 15,
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#fff',
  },
});

export default Home;
