import React, {useRef, useEffect} from 'react';
import {useState} from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  View,
  Alert,
  PermissionsAndroid,
} from 'react-native';
// import CameraRoll from '@react-native-community/cameraroll';
import {RNCamera} from 'react-native-camera';
// import Spinner from 'react-native-spinkit'
import axios from 'axios';

const CameraShot = ({navigation}) => {
  const cameraRef = useRef(null);
  const [takingPic, setTakingPic] = useState(false);
  const [spinner, setSpinner] = useState(false);

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
        const split = data.uri.split('/');
        // await CameraRoll.save(data.uri);
        // const uri = `file:///storage/emulated/0/DCMI/${
        //   split[split.length - 1]
        // }`;
        // console.log(uri)
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
    setSpinner(true);
    const data = new FormData();
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
        navigation.navigate('InfoTraffic');
        setSpinner(false);
      })
      .catch(err => {
        console.log('err', err);
        setSpinner(false);
      });
  };

  return (
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
