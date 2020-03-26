import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { Feather } from '@expo/vector-icons'

import styles from './styles'
import logoImg from '../../assets/logo.png'

export default function Details() {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image source={logoImg} />

        <TouchableOpacity onPress={() => {}}>
          <Feather name='arrow-left' size={28} color={'#e02041'} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

