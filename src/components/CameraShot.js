import React, {useRef, useEffect} from 'react';
import {useState} from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  View,
  Alert,
  PermissionsAndroid,
} from 'react-native';
import CameraRoll from '@react-native-community/cameraroll';
import {RNCamera} from 'react-native-camera';
import axios from 'axios';
import { URL } from '../constants';
import AwesomeLoading from 'react-native-awesome-loading';

const CameraShot = ({navigation}) => {
  const cameraRef = useRef(null);
  const [takingPic, setTakingPic] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    checkPermission();
  }, []);

  const checkPermission = async () => {
    const permissionWrite =
      PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE;
    const permissionCamera = PermissionsAndroid.PERMISSIONS.CAMERA;
    const hasPermission1 = await PermissionsAndroid.check(permissionWrite);
    const hasPermission2 = await PermissionsAndroid.check(permissionCamera);

    if (!hasPermission1) {
      const status = PermissionsAndroid.request(permissionWrite);
    }
    if (!hasPermission2) {
      const status = PermissionsAndroid.request(permissionCamera);
    }
  };

  const takePicture = async () => {
    if (cameraRef.current && !takingPic) {
      let options = {
        quality: 0.85,
        fixOrientation: true,
        forceUpOrientation: true,
        base64: true,
        exif: true,
      };

      setTakingPic(true);

      try {
        const data = await cameraRef.current.takePictureAsync(options);
        // await CameraRoll.save(data.uri);
        // console.log('1', 1)
        handleImage(data.uri);
      } catch (err) {
        Alert.alert('Error', 'Failed to take picture: ' + (err.message || err));
        return;
      } finally {
        setTakingPic(false);
      }
    }
  };

  const handleImage = uri => {
    setLoading(true);
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
        const data = req.data || [];
          navigation.navigate('InfoTraffic', {listResult: data});
      })
      .catch(err => {
      }).finally(() => {
        setLoading(false);
      });
  };

  return (
    <View style={styles.container}>
      {loading && (
        <AwesomeLoading indicatorId={9} size={50} isActive={true} text="loading" />
      )}
      <RNCamera
        ref={cameraRef}
        style={styles.preview}
        type={RNCamera.Constants.Type.back}
        androidCameraPermissionOptions={{
          title: 'Permission to use camera',
          message: 'We need your permission to use your camera',
          buttonPositive: 'Ok',
          buttonNegative: 'Cancel',
        }}
        captureAudio={false}
        autoFocus
        maxZoom={4}>
        <View style={{flex: 0, flexDirection: 'row', justifyContent: 'center'}}>
          <TouchableOpacity onPress={takePicture} style={styles.capture}>
            <View style={styles.btnTakePic}></View>
          </TouchableOpacity>
        </View>
      </RNCamera>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'black',
  },
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  capture: {
    flex: 0,
    alignSelf: 'center',
    margin: 20,
    padding: 10,
    borderWidth: 5,
    borderColor: '#c4c4c4',
    borderRadius: 50,
  },
  btnTakePic: {
    borderRadius: 50,
    width: 70,
    height: 70,
    backgroundColor: '#c4c4c4',
  },
});

export default CameraShot;
