import { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity, Image, Dimensions } from 'react-native';
import CharacterViewer from './components/CharacterViewer';
import VoiceListener from './components/VoiceListener';
import MusicDetector from './components/MusicDetector';
import AIAssistant from './components/AIAssistant';
import { AppState, AppStateStatus } from 'react-native';
import { showFloatingAvatar, hideFloatingAvatar, showKiraOverlay, hideKiraOverlay } from './modules/FloatingAvatar';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

const CHARACTERS = [
  {
    id: 'kira',
    name: 'Kira',
    type: 'Chica Anime',
    personality: 'Amigable y energética',
    uri: 'https://ubnjxkqgdbdrqgbihwuf.supabase.co/storage/v1/object/public/themeforge-images/images/avatars/anime-girl.png',
    color: '#a78bfa',
  },
  {
    id: 'ryo',
    name: 'Ryo',
    type: 'Chico Anime',
    personality: 'Serio y confiable',
    uri: 'https://ubnjxkqgdbdrqgbihwuf.supabase.co/storage/v1/object/public/themeforge-images/images/avatars/anime-boy.png',
    color: '#3b82f6',
  },
  {
    id: 'mochi',
    name: 'Mochi',
    type: 'Animal',
    personality: 'Juguetón y curioso',
    uri: 'https://ubnjxkqgdbdrqgbihwuf.supabase.co/storage/v1/object/public/themeforge-images/images/avatars/funko-girl.png',
    color: '#10b981',
  },
];

export default function App() {
  const [selectedChar, setSelectedChar] = useState(CHARACTERS[0]);

  useEffect(() => {
    const subscription = AppState.addEventListener('change', (state: AppStateStatus) => {
      if (state === 'background') {
        hideKiraOverlay();
      } else if (state === 'active') {
        showKiraOverlay();
      }
    });
    return () => subscription.remove();
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar style="light" />

      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>✨ Animi</Text>
        <Text style={styles.subtitle}>Tu asistente personal</Text>
      </View>

      {/* Personaje grande */}
      <View style={styles.charContainer}>
        <CharacterViewer
          uri={selectedChar.uri}
          width={SCREEN_WIDTH * 0.75}
          height={SCREEN_HEIGHT * 0.45}
        />
        <View style={[styles.charBadge, { backgroundColor: selectedChar.color + '33', borderColor: selectedChar.color }]}>
          <Text style={[styles.charName, { color: selectedChar.color }]}>{selectedChar.name}</Text>
          <Text style={styles.charPersonality}>{selectedChar.personality}</Text>
        </View>
      </View>

      {/* Selector de personajes */}
      <View style={styles.selectorContainer}>
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
              <Text style={styles.charCardType}>{char.type}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Botón */}
        <TouchableOpacity 
          style={[styles.startButton, { backgroundColor: selectedChar.color }]}
          onPress={async () => {
            console.log('Botón presionado');
            try {
              await showFloatingAvatar(selectedChar.uri);
              console.log('Avatar mostrado');
            } catch (e) {
              console.log('Error en botón:', e);
            }
          }}
        >
          <Text style={styles.startText}>Comenzar con {selectedChar.name} ✨</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={[styles.hideButton]}
          onPress={async () => {
            await hideFloatingAvatar();
          }}
        >
          <Text style={styles.hideText}>Ocultar a Kira</Text>
        </TouchableOpacity>

        <VoiceListener
          onKiraCalled={() => {
            showFloatingAvatar(selectedChar.uri);
          }}
          onCommand={(command) => {
            console.log('Comando recibido:', command);
          }}
        />

        <MusicDetector
          characterName={selectedChar.name}
          onMusicPlaying={(isPlaying) => {
            console.log('Música:', isPlaying ? 'reproduciendo' : 'parada');
          }}
        />
        <AIAssistant
          characterName={selectedChar.name}
          characterPersonality={selectedChar.personality}
        />

        <Text style={styles.freeText}>Gratis • Premium $3.99/mes</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0a0010',
  },
  header: {
    alignItems: 'center',
    paddingTop: 50,
    paddingBottom: 8,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#fff',
    letterSpacing: 2,
  },
  subtitle: {
    fontSize: 13,
    color: '#9ca3af',
    marginTop: 2,
  },
  charContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  charImage: {
    width: SCREEN_WIDTH * 0.75,
    height: SCREEN_HEIGHT * 0.45,
  },
  charBadge: {
    position: 'absolute',
    bottom: 10,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    alignItems: 'center',
  },
  charName: {
    fontSize: 22,
    fontWeight: 'bold',
  },
  charPersonality: {
    fontSize: 12,
    color: '#9ca3af',
    marginTop: 2,
  },
  selectorContainer: {
    backgroundColor: '#0f0f23',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    padding: 20,
    paddingBottom: 30,
  },
  sectionTitle: {
    color: '#fff',
    fontSize: 15,
    fontWeight: 'bold',
    marginBottom: 12,
    textAlign: 'center',
  },
  charSelector: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 16,
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
    width: 55,
    height: 80,
  },
  charCardName: {
    color: '#fff',
    fontSize: 13,
    fontWeight: 'bold',
    marginTop: 4,
  },
  charCardType: {
    color: '#6b7280',
    fontSize: 10,
    marginTop: 2,
  },
  startButton: {
    paddingVertical: 14,
    borderRadius: 16,
    alignItems: 'center',
    marginBottom: 10,
  },
  startText: {
    color: '#fff',
    fontSize: 15,
    fontWeight: 'bold',
  },
  freeText: {
    color: '#6b7280',
    fontSize: 11,
    textAlign: 'center',
  },
  hideButton: {
  paddingVertical: 10,
  borderRadius: 16,
  alignItems: 'center',
  marginBottom: 10,
  borderWidth: 1,
  borderColor: '#6b7280',
},
hideText: {
  color: '#9ca3af',
  fontSize: 14,
},
});