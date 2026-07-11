import { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import {
  ExpoSpeechRecognitionModule,
  useSpeechRecognitionEvent,
} from 'expo-speech-recognition';

type Props = {
  onKiraCalled: () => void;
  onCommand: (command: string) => void;
};

export default function VoiceListener({ onKiraCalled, onCommand }: Props) {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');

  useSpeechRecognitionEvent('result', (event) => {
    const text = event.results[0]?.transcript?.toLowerCase() || '';
    setTranscript(text);

    // Detectar si llaman a Kira
    if (text.includes('kira')) {
      onKiraCalled();

      // Detectar comandos
      if (text.includes('reproduce') || text.includes('música') || text.includes('canción')) {
        onCommand('music:' + text);
      } else if (text.includes('respóndele') || text.includes('responde') || text.includes('mensaje')) {
        onCommand('message:' + text);
      } else if (text.includes('calendario') || text.includes('recordatorio') || text.includes('agenda')) {
        onCommand('calendar:' + text);
      } else if (text.includes('abre') || text.includes('abrir')) {
        onCommand('open:' + text);
      } else {
        onCommand('chat:' + text);
      }
    }
  });

  useSpeechRecognitionEvent('end', () => {
    setIsListening(false);
    // Reiniciar automáticamente para escuchar siempre
    setTimeout(() => startListening(), 1000);
  });

  useSpeechRecognitionEvent('error', (event) => {
    console.log('Error de voz:', event.error);
    setIsListening(false);
    setTimeout(() => startListening(), 2000);
  });

  const startListening = async () => {
    try {
      const permission = await ExpoSpeechRecognitionModule.requestPermissionsAsync();
      if (!permission.granted) return;

      await ExpoSpeechRecognitionModule.start({
        lang: 'es-PE',
        continuous: false,
        interimResults: false,
      });
      setIsListening(true);
    } catch (e) {
      console.log('Error iniciando reconocimiento:', e);
    }
  };

  useEffect(() => {
    startListening();
    return () => {
      ExpoSpeechRecognitionModule.stop();
    };
  }, []);

  return (
    <View style={styles.container}>
      <TouchableOpacity style={[styles.micButton, isListening && styles.micActive]} onPress={startListening}>
        <Text style={styles.micIcon}>{isListening ? '🎤' : '🔇'}</Text>
      </TouchableOpacity>
      {transcript ? (
        <Text style={styles.transcript}>"{transcript}"</Text>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginTop: 8,
  },
  micButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#1a1a2e',
    borderWidth: 1,
    borderColor: '#374151',
    alignItems: 'center',
    justifyContent: 'center',
  },
  micActive: {
    borderColor: '#a78bfa',
    backgroundColor: '#2d1b69',
  },
  micIcon: {
    fontSize: 22,
  },
  transcript: {
    color: '#9ca3af',
    fontSize: 11,
    marginTop: 4,
    fontStyle: 'italic',
    textAlign: 'center',
  },
});