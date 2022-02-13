import React, {useState} from 'react';
import {
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import BG1 from '../../assets/bg1.jpg';
import BG2 from '../../assets/bg2.jpg';
import ImagePicker from 'react-native-image-crop-picker';
import {URL} from '../../constants';
import axios from 'axios';
import AwesomeLoading from 'react-native-awesome-loading';

const Home = ({navigation}) => {
  const [loading, setLoading] = useState(false);

  const takeAPicture = () => {
    ImagePicker.openPicker({
      width: 300,
      height: 400,
    }).then(image => {
      setLoading(true);
      const data = new FormData();
      const file = {
        uri: image.path,
        name: 'test1.png',
        type: 'image/*',
      };
      data.append('file', file);
      axios
        .post(`${URL}/traffic_sign/predict`, data, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        })
        .then(req => {
          const data = req.data || [];
          navigation.navigate('InfoTraffic', {listResult: data});
        })
        .catch(err => {
          console.log('err', err);
        })
        .finally(() => setLoading(false));
    });
  };

  return loading ? (
    <AwesomeLoading indicatorId={8} size={50} isActive={true} text="loading" />
  ) : (
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
          <TouchableOpacity style={styles.btn} onPress={takeAPicture}>
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
    alignItems: 'center',
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
