import React, { useState } from 'react';
import { View, Text, ScrollView, Button, Image, TouchableOpacity, StyleSheet, } from 'react-native';
import { Persona } from '../type/typePersona';
import axios from "axios";
/* import img1 from '../assets/masculino.png'; */

const URL = 'http://192.168.20.26:3000';

const UserScreen = (props) => {
  const [persona, setPersona] = useState<Persona[]>([]);

  const cargarPersona = () => {
    axios.get(URL + '/crudUsuarios/ConseguirUsuarios')
      .then(response => {
        setPersona(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  }

  cargarPersona();

  return (
    <ScrollView>
      <Button
        onPress={() => props.navigation.navigate('CreateUserScreen')}
        title="Crear Usuario"
      />

      {persona.length === 0 ? (
        <View style={styles.item}>
          <Text style={styles.title}>No hay usuarios disponibles</Text>
        </View>
      ) : (
        persona.map((user) => (
          <TouchableOpacity
            key={user.id}
            onPress={() =>
              props.navigation.navigate('UserDetailScreen', {
                userId: user.id,
              })
            }
            style={styles.item}
          >
            <Image
              source={{
                uri: "https://img.icons8.com/?size=100&id=BPc8vlw14Jj8&format=png&color=000000",
              }}
              style={styles.avatar}
            />
            <View style={styles.textContainer}>
              <Text style={styles.title}>{user.name}</Text>
              <Text style={styles.subtitle}>{user.email}</Text>
            </View>
          </TouchableOpacity>
        ))
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    marginHorizontal: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    marginRight: 12,
  },
  textContainer: {
    flex: 1,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  subtitle: {
    color: '#555',
    fontSize: 14,
  },
});

export default UserScreen;
