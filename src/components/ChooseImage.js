// import CameraRoll from '@react-native-community/cameraroll';
import axios from 'axios';
import React, {useEffect, useState} from 'react';
import {
  FlatList,
  Image,
  StyleSheet,
  View,
  ActivityIndicator,
  Dimensions,
  TouchableOpacity,
  Text,
} from 'react-native';
// import Spinner from 'react-native-spinkit';

const ChooseImage = ({navigation}) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [uri, setUri] = useState('');
  const [spinner, setSpinner] = useState(false);

  useEffect(() => {
    // getAllImage();
  }, []);

  // const getAllImage = async () => {
  //   setLoading(true);
  //   const images = await CameraRoll.getPhotos({
  //     first: 100,
  //     assetType: 'Photos',
  //   });
  //   setData(images.edges);
  //   setLoading(false);
  // };

  const handleChoose = async () => {
    setSpinner(true);
    const data = new FormData();
    console.log(uri)
    const file = {
      uri: uri,
      name: 'test1.png',
      type: 'image/*',
    };
    data.append('file', file);
    axios
      .post('http://7e558da3acb9.ngrok.io/predict/image', data, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      .then(req => {
        navigation.navigate('Thông tin CMND');
        setSpinner(false);
      })
      .catch(err => {
        console.log('err', err);
        setSpinner(false);
      });
  };

  const renderItem = ({item}) => {
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
    <View style={styles.container}>
      <ActivityIndicator size="large" color="#0000ff" />
    </View>
  ) : (
    <View style={styles.container}>
      {spinner && (
        <View
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: 999,
            backgroundColor: 'rgba(0,0,0,0.5)',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          {/* <Spinner
            isVisible={spinner}
            size={100}
            color="#0000ff"
            type="Circle"
          /> */}
        </View>
      )}
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
