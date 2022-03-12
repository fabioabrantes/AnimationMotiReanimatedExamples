import React from 'react';
import { View } from 'react-native';
import { Score } from '../Score';

import { styles } from './styles';

type Props = {
  reviewed: number;
  totalOfCards:number;
}

export function Scoreboard({ reviewed, totalOfCards }: Props) {
  return (
    <View style={styles.container}>
      <Score label="Total" value={totalOfCards} />
      <View style={styles.divider} />
      <Score label="Rever" value={totalOfCards - reviewed} />
      <View style={styles.divider} />
      <Score label="Revisto" value={reviewed} />
    </View>
  );
}