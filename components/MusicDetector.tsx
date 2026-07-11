import { useEffect, useRef, useState } from 'react';
import { View, Text, StyleSheet, Animated, TouchableOpacity } from 'react-native';

type Props = {
  onMusicPlaying: (isPlaying: boolean) => void;
  characterName?: string;
};

export default function MusicDetector({ onMusicPlaying, characterName = 'Kira' }: Props) {
  const [isPlaying, setIsPlaying] = useState(false);
  const danceAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const danceLoop = useRef<Animated.CompositeAnimation | null>(null);

  const startDancing = () => {
    setIsPlaying(true);
    onMusicPlaying(true);

    danceLoop.current = Animated.loop(
      Animated.sequence([
        Animated.timing(danceAnim, { toValue: 1, duration: 300, useNativeDriver: true }),
        Animated.timing(danceAnim, { toValue: -1, duration: 300, useNativeDriver: true }),
        Animated.timing(danceAnim, { toValue: 0, duration: 300, useNativeDriver: true }),
      ])
    );
    danceLoop.current.start();

    Animated.loop(
      Animated.sequence([
        Animated.timing(scaleAnim, { toValue: 1.1, duration: 400, useNativeDriver: true }),
        Animated.timing(scaleAnim, { toValue: 1, duration: 400, useNativeDriver: true }),
      ])
    ).start();
  };

  const stopDancing = () => {
    setIsPlaying(false);
    onMusicPlaying(false);
    danceLoop.current?.stop();
    Animated.timing(danceAnim, { toValue: 0, duration: 200, useNativeDriver: true }).start();
    Animated.timing(scaleAnim, { toValue: 1, duration: 200, useNativeDriver: true }).start();
  };

  const rotate = danceAnim.interpolate({
    inputRange: [-1, 0, 1],
    outputRange: ['-10deg', '0deg', '10deg'],
  });

  return (
    <View style={styles.container}>
      {isPlaying && (
        <Animated.View style={[styles.musicBadge, {
          transform: [{ rotate }, { scale: scaleAnim }]
        }]}>
          <Text style={styles.musicText}>💃 {characterName} está bailando</Text>
          <Text style={styles.musicNote}>🎵 🎵 🎵</Text>
        </Animated.View>
      )}

      <View style={styles.testButtons}>
        <TouchableOpacity style={styles.testBtn} onPress={startDancing}>
          <Text style={styles.testBtnText}>▶️ Música</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.testBtn} onPress={stopDancing}>
          <Text style={styles.testBtnText}>⏹️ Parar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginTop: 8,
  },
  musicBadge: {
    backgroundColor: '#1db954',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    marginBottom: 8,
    alignItems: 'center',
  },
  musicText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  musicNote: {
    fontSize: 14,
    marginTop: 2,
  },
  testButtons: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 4,
  },
  testBtn: {
    padding: 6,
    borderWidth: 1,
    borderColor: '#374151',
    borderRadius: 8,
  },
  testBtnText: {
    color: '#9ca3af',
    fontSize: 12,
  },
});