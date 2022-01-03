import React, {useState, useEffect, useCallback, useMemo} from 'react';
import {
  View,
  TextInput,
  StyleSheet,
  FlatList,
  Text,
  Image,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import axios from 'axios';
import {removeVietnameseTones} from '../../utils';
import AwesomeLoading from 'react-native-awesome-loading';
import { CATEGORY, URL } from '../../constants';

const HomeScreen = () => {
  const [textSearch, setTextSearch] = useState('');
  const [dataTraffic, setData] = useState([]);
  const [dataTmp, setDataTmp] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getData();
  }, []);

  const getData = useCallback(async () => {
    try {
      setLoading(true);
      const { data: respData } = await axios.get(`${URL}/traffic_sign/${CATEGORY.HIEULENH}`);
      setData(respData.data);
      setDataTmp(respData.data);
    } finally {
      setLoading(false);
    }
  }, []);

  const handleSearch = text => {
    setTextSearch(text);
    if (text === '') {
      setData(dataTmp);
    } else {
      const filter = dataTmp.filter(sign =>
        removeVietnameseTones(sign.name)
          .toLowerCase()
          .includes(removeVietnameseTones(text).toLowerCase()),
      );
      setData(filter);
    }
  };

  const renderTraffic = ({item}) => {
    return (
      <View style={styles.flashTraffic} key={item._id}>
        <View style={{padding: 10}}>
          <Image
            source={{uri: item.image_url}}
            style={{width: 50, height: 50}}
            resizeMode="contain"
          />
        </View>
        <View style={{flex: 1, padding: 5}}>
          <Text style={{fontWeight: 'bold', color: 'black'}}>{item.name}</Text>
          <Text style={{textAlign: 'justify', color: 'black'}}>
            {item.desc}
          </Text>
        </View>
      </View>
    );
  };

  return loading ? (
    <AwesomeLoading indicatorId={8} size={50} isActive={true} text="loading" />
  ) : (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}>
      <View style={styles.header}>
        <View style={styles.searchContainer}>
          <View style={styles.inputSearch}>
            <Icon
              name="search"
              size={20}
              color="black"
              solid
              style={styles.iconSearch}
            />
            <TextInput
              placeholder="Tìm kiếm"
              placeholderTextColor="#a9a9a9"
              numberOfLines={1}
              onChangeText={text => handleSearch(text)}
              value={textSearch}
              style={styles.textInput}
            />
          </View>
        </View>
        <View>
          <Text style={{fontWeight: 'bold', color: 'black'}}>
            {`Có ${dataTraffic.length} biển báo trong `}
            <Text style={{color: '#001e1d'}}>"Biển báo hiệu lệnh"</Text>
          </Text>
        </View>
      </View>

      <SafeAreaView style={{flex: 1}}>
        <FlatList data={dataTraffic} renderItem={renderTraffic} />
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  flashTraffic: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: 'white',
    borderBottomColor: 'black',
    borderWidth: 1,
  },
  textInput: {
    flex: 1,
    color: 'black',
  },
  iconSearch: {
    width: 24,
    height: 24,
  },
  inputSearch: {
    flex: 1,
    height: 50,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    backgroundColor: 'white',
    paddingHorizontal: 10,
  },
  searchContainer: {
    width: '100%',
    marginBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  header: {
    padding: 16,
  },
  container: {
    flex: 1,
  },
});
 