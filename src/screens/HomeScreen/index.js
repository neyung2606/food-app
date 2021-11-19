import React, {useState, useEffect, useCallback} from 'react';
import {
  View,
  TextInput,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Text,
  Image,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import axios from 'axios';
import debounce from 'lodash/debounce';
import {removeVietnameseTones} from '../../utils';

const URL = 'http://192.168.1.7:8000';

const data = [
  {
    name: 'Tất cả',
    id: 0,
  },
  {
    name: 'Biển báo cấm',
    id: 1,
  },
  {
    name: 'Biển báo nguy hiểm',
    id: 2,
  },
  {
    name: 'Biển báo hiệu lệnh',
    id: 3,
  },
  {
    name: 'Biển phụ',
    id: 4,
  },
  {
    name: 'Vạch kẻ đường',
    id: 5,
  },
];

const HomeScreen = () => {
  const [textSearch, setTextSearch] = useState('');
  const [dataTraffic, setData] = useState([]);
  const [dataTmp, setDataTmp] = useState([]);
  const [category, setCategory] = useState([]);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    const res = await axios.get(`${URL}/traffic_sign?keyword`);
    const resCategory = await axios.get(`${URL}/category`);
    setData(res.data);
    setDataTmp(res.data);
    setCategory(resCategory.data);
  };

  const getCategory = async category => {
    // const res = await axios.get(`${URL}/traffic_sign?keyword=${category}`);
    if (category === 'Tất cả') {
      setData(dataTmp);
    }
    else {
      const filter = dataTmp.filter(sign => sign.category.name === category);
      setData(filter);
    }
  };

  const searchAPI = useCallback(
    debounce(async text => {
      const res = await axios.get(`${URL}/traffic_sign?keyword=${text}`);
      setData(res.data);
    }, 1000),
    [],
  );

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
    // searchAPI(text);
  };

  const renderItem = ({item}) => (
    <View
      style={{
        marginVertical: 20,
        flex: 1,
        justifyContent: 'space-between',
        alignContent: 'space-between',
      }}>
      <TouchableOpacity
        style={styles.btnCategory}
        onPress={() => getCategory(item.name)}
        activeOpacity={0.8}>
        <Text>{item.name}</Text>
      </TouchableOpacity>
    </View>
  );

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

  return (
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
              numberOfLines={1}
              onChangeText={text => handleSearch(text)}
              value={textSearch}
              style={styles.textInput}
            />
          </View>
        </View>
        <View>
          <FlatList
            data={data}
            renderItem={renderItem}
            keyExtractor={item => item.id}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
          />
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
  btnCategory: {
    borderRadius: 5,
    marginHorizontal: 10,
    padding: 5,
    backgroundColor: '#f9bc60',
    color: '#001e1d',
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
    height: '50%',
    flexDirection: 'row',
    alignItems: 'center',
  },
  header: {
    height: '20%',
    padding: 16,
    backgroundColor: '#004643',
  },
  container: {
    flex: 1,
  },
});
