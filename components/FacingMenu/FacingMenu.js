import React from 'react';
import {FlatList, Text} from 'react-native';
import ListItem from './ListItem';

const FacingMenu = ({List, setTarget}) => {
  return (
    <FlatList
      data={List}
      renderItem={({item, index}) => {
        return (
          <ListItem Item={item} key={index} setTarget={val => setTarget(val)} />
        );
      }}
    />
  );
};

export default FacingMenu;
