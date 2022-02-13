import React from 'react';
import {StyleSheet, View, FlatList, Text, Image} from 'react-native';


const ActivityScreen = props => {
  const listItem = props.route.params.listResult.data;
  const renderTraffic = ({item}, index) => {
    return (
      <View style={styles.flashTraffic} key={index}>
        <View style={{padding: 10}}>
          <Image
            source={{uri: `data:image/png;base64,${item.image}`}}
            style={{width: 50, height: 50}}
            resizeMode="contain"
          />
        </View>
        <View style={{flex: 1, padding: 5}}>
          <Text style={{fontWeight: 'bold', color: 'black'}}>
            {item.signInfo.name}
          </Text>
          <Text style={{textAlign: 'justify', color: 'black'}}>
            {item.signInfo.desc}
          </Text>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.textHeader}>Kết quả</Text>
      </View>
      <View style={styles.content}>
        {listItem.length ? (
          <View>
            <View>
              <Text style={{fontWeight: 'bold', color: 'black'}}>
                {`Có ${listItem.length} biển báo trong ảnh`}
              </Text>
            </View>
            <FlatList
              data={listItem}
              renderItem={renderTraffic}
              keyExtractor={item => item.id}
            />
          </View>
        ) : (
          <Text
            style={{
              color: 'black',
            }}>{`Không có biển báo giao thông ${listItem.length}`}</Text>
        )}
      </View>
    </View>
  );
};

export default ActivityScreen;

const styles = StyleSheet.create({
  flashTraffic: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: 'white',
    borderBottomColor: 'black',
    borderWidth: 1,
  },
  textHeader: {
    color: '#fffffe',
    fontSize: 20,
  },
  content: {
    flex: 1,
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
