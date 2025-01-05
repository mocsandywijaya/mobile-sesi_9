// src/components/ButtonComponent.js
import React from 'react';
import { TouchableOpacity, Text } from 'react-native';

const ButtonComponent = ({ label, onPress }) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <Text>{label}</Text>
    </TouchableOpacity>
  );
};

export default ButtonComponent;
