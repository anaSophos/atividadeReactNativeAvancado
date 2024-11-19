import React, {useState, useRef} from 'react';
import { StyleSheet, Text, View, TouchableOpacity, TextInput, SafeAreaView,Keyboard } from 'react-native';
import { climaLatLog } from '../ativAvacado/src/services/api'

export default function App() {
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');
  const [climaUser, setClimaUser] = useState(null);

  async function buscar(){
    console.log("entrou nessa função")
    if(latitude == '' || longitude == ''){
       alert('Preencha todos os campos');
       setLatitude('');
       setLongitude('');
       return 
    }
    try{
      const response = await climaLatLog(latitude, longitude);
      console.log(response.data);
      setClimaUser(response.data);
      console.log("temp< ", setClimaUser.main.humidity)
      Keyboard.dismiss();
    } catch(error){
     console.log('Erro ao buscar o clima: '+error);
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Consulta de clima</Text>
      <TextInput
          style={styles.input}
          placeholder="Latitude"
          value={latitude}
          onChangeText={(texto)=>setLatitude(texto)}
          keyboardType='numeric'
        />
        <TextInput
          style={styles.input}
          placeholder="Longitude"
          value={longitude}
          onChangeText={(texto)=>setLongitude(texto)}
          keyboardType='numeric'
        />
        <TouchableOpacity style={styles.btn} onPress={buscar}>
              <Text style={styles.btnText}>Buscar Clima</Text>
        </TouchableOpacity>
        { climaUser && (     
        <View style={styles.resultado}>
          <Text style={styles.itemText}>Temperatura: {climaUser.main.temp}</Text>
          <Text style={styles.itemText}>Umidade: {climaUser.main.humidity}</Text>
          <Text style={styles.itemText}>Descrição: {climaUser.weather.description}</Text>
        </View>)
      }
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'cinza',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title:{
    fontSize: 30,
  },
  input: {
    width: '90%',
    height: 50,
    borderWidth: 1,
    borderColor: '#DDD',
    borderRadius: 5,
    padding: 10,
    fontSize: 18,
  },
  btn:{
    width: '90%',
    height: 50,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 15,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#0782F9',
  },
  btnText: {
    color: '#FFF',
    fontSize: 22,
  },
});
