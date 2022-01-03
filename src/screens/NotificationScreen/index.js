import React from 'react';
import {
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import BG1 from '../../assets/bg1.jpg';
import BG2 from '../../assets/bg2.jpg';

const Home = ({navigation}) => {
  return (
    <View style={styles.container}>
      <View style={styles.selectionContent}>
        <ImageBackground source={BG2} resizeMode="cover" style={styles.imageBg}>
          <TouchableOpacity
            style={styles.btn}
            onPress={() => navigation.navigate('Camera')}>
            <Text style={styles.text}>Chụp ảnh</Text>
          </TouchableOpacity>
        </ImageBackground>
      </View>
      <View style={styles.selectionContent}>
        <ImageBackground source={BG1} resizeMode="cover" style={styles.imageBg}>
          <TouchableOpacity
            style={styles.btn}
            onPress={() => navigation.navigate('Collections')}>
            <Text style={styles.text}>Chọn ảnh</Text>
          </TouchableOpacity>
        </ImageBackground>
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
  selectionContent: {
    width: '100%',
    flex: 1,
    justifyContent: 'center',
  },
  imageBg: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  btn: {
    width: '30%',
    padding: 15,
    borderRadius: 10,
    backgroundColor: '#f9bc60',
    marginVertical: 15,
  },
  text: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#001e1d',
  },
});

export default Home;
