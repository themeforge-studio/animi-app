import { View, StyleSheet, Image } from 'react-native';

type Props = {
  uri: string;
  width?: number;
  height?: number;
  fallbackUri?: string;
};

export default function CharacterViewer({ uri, width = 300, height = 400, fallbackUri }: Props) {
  return (
    <View style={[styles.container, { width, height }]}>
      <Image
        source={{ uri: fallbackUri || uri }}
        style={{ width, height }}
        resizeMode="contain"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    overflow: 'hidden',
  },
});