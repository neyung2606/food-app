import React, {useEffect, useState} from 'react';
import {StyleSheet, View, FlatList, Text, AsyncStorage} from 'react-native';

const ActivityScreen = () => {
  const [dataHistory, setDataHistory] = useState([]);

  useEffect(() => {
    async () => {
      const data = await AsyncStorage.getItem('history');
      if (data.length) {
        setDataHistory(data);
      }
    };
  }, []);

  const renderTraffic = ({item}) => (
    <View style={styles.flashTraffic}>
      <View style={{padding: 10}}>
        <Image
          source={{uri: item.image_url}}
          style={{width: 50, height: 50}}
          resizeMode="contain"
        />
      </View>
      <View style={{flex: 1, padding: 5}}>
        <Text style={{fontWeight: 'bold'}}>{item.name}</Text>
        {/* <Text style={{ textAlign: 'justify'}}>{item.desc}</Text> */}
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.textHeader}>Lịch sử</Text>
      </View>
      <View style={styles.content}>
        {dataHistory.length ? (
          <FlatList
            data={dataHistory}
            renderItem={renderTraffic}
            keyExtractor={item => item._id.$oid}
          />
        ) : (
          <Text>Không có lịch sử tìm kiếm</Text>
        )}
      </View>
    </View>
  );
};

export default ActivityScreen;

const styles = StyleSheet.create({
  textHeader: {
    color: '#fffffe',
    fontSize: 20,
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  header: {
    flex: 0.1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#004643',
  },
  container: {
    flex: 1,
  },
});
