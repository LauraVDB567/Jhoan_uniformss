import React, { useState } from "react";
import { Button, View, StyleSheet, TextInput, ScrollView, } from "react-native";
import axios from 'axios';
import { Persona } from '../type/typePersona';

const URL = 'http://192.168.20.26:3000';

const AddUserScreen = () => {

const [personaSeleccionada, setPersonaSeleccionada] = useState<Persona>({
    id: 0,
    name: "",
    email: "",
    phone: 0,
  });

  async function Agregar  () {
  
  (await axios.post(URL + '/crudUsuarios/CrearUsuario', personaSeleccionada).then(response => {
    console.log('Persona agregada:', response.data);
  }).catch(error =>{
    console.error('Error al agregar persona:', error);
  }))

}

  return (
    <ScrollView style={styles.container}>

      {/* Name Input */}
      <View style={styles.inputGroup}>
        <TextInput
          placeholder="Id"
          onChangeText={(text) => setPersonaSeleccionada({ ...personaSeleccionada, id: parseInt(text)})}
        />
      </View>

      {/* Name Input */}
      <View style={styles.inputGroup}>
        <TextInput
          placeholder="Name"
          onChangeText={(text) => setPersonaSeleccionada({ ...personaSeleccionada, name: text })}
        />
      </View>

      {/* Email Input */}
      <View style={styles.inputGroup}>
        <TextInput
          placeholder="Email"
          multiline={true}
          numberOfLines={4}
          onChangeText={(texto) => setPersonaSeleccionada({ ...personaSeleccionada, email: texto })}
        />
      </View>

      {/* Input */}
      <View style={styles.inputGroup}>
        <TextInput
          placeholder="phone"
          onChangeText={(texto) => setPersonaSeleccionada({ ...personaSeleccionada, phone: parseInt(texto) })}
        />
      </View>

      <View style={styles.button}>
        <Button title="Save User" onPress={Agregar} />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  button: {
    marginBottom: 7,
  },
  container: {
    flex: 1,
    padding: 35,
  },
  inputGroup: {
    flex: 1,
    padding: 0,
    marginBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#cccccc",
  },
  loader: {
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    position: "absolute",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default AddUserScreen;