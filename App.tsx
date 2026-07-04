import { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';

const CHARACTERS = [
  {
    id: 'kira',
    name: 'Kira',
    type: 'Chica Anime',
    personality: 'Amigable y energética',
    uri: 'https://ubnjxkqgdbdrqgbihwuf.supabase.co/storage/v1/object/public/themeforge-images/images/avatars/anime-girl.png',
    color: '#a78bfa',
    accent: '#fbbf24',
  },
  {
    id: 'ryo',
    name: 'Ryo',
    type: 'Chico Anime',
    personality: 'Serio y confiable',
    uri: 'https://ubnjxkqgdbdrqgbihwuf.supabase.co/storage/v1/object/public/themeforge-images/images/avatars/anime-boy.png',
    color: '#3b82f6',
    accent: '#fbbf24',
  },
  {
    id: 'mochi',
    name: 'Mochi',
    type: 'Animal',
    personality: 'Juguetón y curioso',
    uri: 'https://ubnjxkqgdbdrqgbihwuf.supabase.co/storage/v1/object/public/themeforge-images/images/avatars/funko-girl.png',
    color: '#10b981',
    accent: '#fbbf24',
  },
];

export default function App() {
  const [selectedChar, setSelectedChar] = useState(CHARACTERS[0]);

  return (
    <View style={styles.container}>
      <StatusBar style="light" />

      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>✨ Animi</Text>
        <Text style={styles.subtitle}>Tu asistente personal con IA</Text>
      </View>

      {/* Character Display */}
      <View style={[styles.charDisplay, { borderColor: selectedChar.color }]}>
        <Image
          source={{ uri: selectedChar.uri }}
          style={styles.charImage}
          resizeMode="contain"
        />
        <View style={styles.charInfo}>
          <Text style={[styles.charName, { color: selectedChar.color }]}>{selectedChar.name}</Text>
          <Text style={styles.charType}>{selectedChar.type}</Text>
          <Text style={styles.charPersonality}>{selectedChar.personality}</Text>
        </View>
      </View>

      {/* Character Selector */}
      <Text style={styles.sectionTitle}>Elige tu compañero</Text>
      <View style={styles.charSelector}>
        {CHARACTERS.map((char) => (
          <TouchableOpacity
            key={char.id}
            style={[styles.charCard, selectedChar.id === char.id && { borderColor: char.color, backgroundColor: char.color + '22' }]}
            onPress={() => setSelectedChar(char)}
          >
            <Image source={{ uri: char.uri }} style={styles.charThumb} resizeMode="contain" />
            <Text style={[styles.charCardName, selectedChar.id === char.id && { color: char.color }]}>{char.name}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Start Button */}
      <TouchableOpacity style={[styles.startButton, { backgroundColor: selectedChar.color }]}>
        <Text style={styles.startText}>Comenzar con {selectedChar.name} ✨</Text>
      </TouchableOpacity>

      <Text style={styles.freeText}>Gratis • Premium $3.99/mes</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0a0010',
    paddingHorizontal: 20,
    paddingTop: 60,
  },
  header: {
    alignItems: 'center',
    marginBottom: 24,
  },
  title: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#fff',
    letterSpacing: 2,
  },
  subtitle: {
    fontSize: 14,
    color: '#9ca3af',
    marginTop: 4,
  },
  charDisplay: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1a1a2e',
    borderRadius: 20,
    borderWidth: 1,
    padding: 16,
    marginBottom: 24,
  },
  charImage: {
    width: 100,
    height: 160,
    marginRight: 16,
  },
  charInfo: {
    flex: 1,
  },
  charName: {
    fontSize: 28,
    fontWeight: 'bold',
  },
  charType: {
    fontSize: 14,
    color: '#9ca3af',
    marginTop: 4,
  },
  charPersonality: {
    fontSize: 13,
    color: '#6b7280',
    marginTop: 8,
    fontStyle: 'italic',
  },
  sectionTitle: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  charSelector: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 24,
  },
  charCard: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#1a1a2e',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#374151',
    padding: 8,
  },
  charThumb: {
    width: 60,
    height: 90,
  },
  charCardName: {
    color: '#9ca3af',
    fontSize: 12,
    marginTop: 4,
    fontWeight: 'bold',
  },
  startButton: {
    paddingVertical: 16,
    borderRadius: 16,
    alignItems: 'center',
    marginBottom: 12,
  },
  startText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  freeText: {
    color: '#6b7280',
    fontSize: 12,
    textAlign: 'center',
  },
});