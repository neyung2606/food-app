import axios from 'axios';
import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
// import Spinner from 'react-native-spinkit';

const ReadTraffic = () => {
  const [data, setData] = useState();
  const [spinner, setSpinner] = useState(false);
  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    setSpinner(true);
    const data = await axios.get('http://7e558da3acb9.ngrok.io/result');
    setData(data.data);
    setSpinner(false);
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
      <View style={styles.row}>
        <Text style={styles.col}>Số chứng minh</Text>
        <Text style={styles.col}>{data?.id}</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.col}>Tên</Text>
        <Text style={styles.col}>{data?.name}</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.col}>Sinh ngày</Text>
        <Text style={styles.col}>{data?.birth}</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.col}>Nguyên quán</Text>
        <Text style={styles.col}>{data?.home}</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.col}>HKTT</Text>
        <Text style={styles.col}>{data?.add}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  col: {
    width: '50%',
    justifyContent: 'flex-start',
    paddingVertical: 30,
  },
});

export default ReadTraffic;
