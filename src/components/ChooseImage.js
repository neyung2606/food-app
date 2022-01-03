import CameraRoll from '@react-native-community/cameraroll';
import axios from 'axios';
import React, {useEffect, useState} from 'react';
import {
  FlatList,
  Image,
  StyleSheet,
  View,
  Dimensions,
  TouchableOpacity,
  Text,
  PermissionsAndroid
} from 'react-native';
import AwesomeLoading from 'react-native-awesome-loading';

const ChooseImage = ({navigation}) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [uri, setUri] = useState('');

  useEffect(() => {
    requestStoragePermission()
  }, []);

  const requestStoragePermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
        {
          title: "Permission title",
          message:
            "Permission message",
          buttonNeutral: "Ask Me Later",
          buttonNegative: "Cancel",
          buttonPositive: "OK",
        }
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        getAllImage()
      } else {
        console.log("EXTERNAL_STORAGE permission denied");
      }
    } catch (err) {
      console.warn(err);
    }
  };

  const getAllImage = async () => {
    try {
      setLoading(true);
      const images = await CameraRoll.getPhotos({
        first: 1000,
        assetType: 'Photos',
      });
      setData(images.edges);
    } finally {
      setLoading(false);
    }
  };

  const handleChoose = async () => {
    const data = new FormData();
    const file = {
      uri: uri,
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
        navigation.navigate('Thông tin CMND');
      })
      .catch(err => {
        console.log('err', err);
      });
  };

  const renderItem = ({item}) => {
    console.log(`item.node.image.uri`, item.node.image.uri)
    return (
      <TouchableOpacity
        onPress={() => setUri(item.node.image.uri)}
        style={{flex: 1}}>
        <Image source={{uri: item.node.image.uri}} style={styles.img} />
        {item.node.image.uri == uri && (
          <View style={{position: 'absolute', top: 0}}>
            <Text>✅</Text>
          </View>
        )}
      </TouchableOpacity>
    );
  };

  return loading ? (
    <AwesomeLoading indicatorId={9} size={50} isActive={true} text="loading" />
  ) : (
    <View style={styles.container}>
      <FlatList
        data={data}
        renderItem={renderItem}
        numColumns={3}
        keyExtractor={item => item.node.timestamp}
      />

      {uri !== '' && (
        <View style={styles.btnGroup}>
          <TouchableOpacity
            style={[styles.btn, {backgroundColor: 'white'}]}
            onPress={() => setUri('')}>
            <Text
              style={{fontSize: 16, fontWeight: 'bold', textAlign: 'center'}}>
              Hủy
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.btn, {backgroundColor: '#0080FF'}]}
            onPress={handleChoose}>
            <Text
              style={{
                fontSize: 16,
                fontWeight: 'bold',
                color: 'white',
                textAlign: 'center',
              }}>
              Chọn
            </Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  img: {
    width: Dimensions.get('screen').width / 3,
    height: 150,
    resizeMode: 'cover',
  },
  btnGroup: {
    position: 'absolute',
    width: Dimensions.get('screen').width,
    bottom: 0,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
  },
  btn: {
    width: Dimensions.get('screen').width * 0.45,
    padding: 20,
    borderRadius: 30,
  },
});

export default ChooseImage;
