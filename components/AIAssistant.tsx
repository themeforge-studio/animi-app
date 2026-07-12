import { useState } from 'react';
import Constants from 'expo-constants';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
} from 'react-native';

type Message = {
  role: 'user' | 'assistant';
  content: string;
};

type Props = {
  characterName?: string;
  characterPersonality?: string;
};

export default function AIAssistant({ 
  characterName = 'Kira',
  characterPersonality = 'Amigable y energética'
}: Props) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage: Message = { role: 'user', content: input };
    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    setInput('');
    setLoading(true);

    console.log('API Key:', process.env.EXPO_PUBLIC_GROQ_API_KEY ? 'Existe' : 'NO EXISTE');
console.log('Enviando mensaje a Groq...');

    try {
      const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${Constants.expoConfig?.extra?.groqApiKey}`,
            },
            body: JSON.stringify({
                model: 'llama-3.1-8b-instant',
                max_tokens: 500,
                messages: [
                {
                    role: 'system',
                    content: `Eres ${characterName}, un asistente personal virtual con personalidad: ${characterPersonality}. 
                    Respondes en español, eres útil, amigable y conciso. 
                    Cuando el usuario pide abrir apps o reproducir música, respondes que lo harás y describes la acción.
                    Tus respuestas son cortas (máximo 2-3 oraciones).`
                },
                ...newMessages.map(m => ({
                    role: m.role,
                    content: m.content,
                }))
                ],
            }),
            });

      const data = await response.json();
      console.log('Respuesta Groq:', JSON.stringify(data));
      const assistantMessage: Message = {
        role: 'assistant',
        content: data.choices?.[0]?.message?.content || '¡Hola! ¿En qué puedo ayudarte?',
      };

      setMessages([...newMessages, assistantMessage]);
    } catch (e) {
      console.log('Error:', e);
      setMessages([...newMessages, {
        role: 'assistant',
        content: '¡Ups! Tuve un problema. ¿Puedes repetir?',
      }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>💬 Habla con {characterName}</Text>
      
      <ScrollView style={styles.messages} showsVerticalScrollIndicator={false}>
        {messages.length === 0 && (
          <Text style={styles.emptyText}>
            Escríbeme algo, estoy aquí para ayudarte ✨
          </Text>
        )}
        {messages.map((msg, i) => (
          <View key={i} style={[styles.bubble, msg.role === 'user' ? styles.userBubble : styles.aiBubble]}>
            <Text style={styles.bubbleText}>{msg.content}</Text>
          </View>
        ))}
        {loading && (
          <View style={styles.aiBubble}>
            <ActivityIndicator size="small" color="#a78bfa" />
          </View>
        )}
      </ScrollView>

      <View style={styles.inputRow}>
        <TextInput
          style={styles.input}
          value={input}
          onChangeText={setInput}
          placeholder={`Pregúntale a ${characterName}...`}
          placeholderTextColor="#6b7280"
          onSubmitEditing={sendMessage}
        />
        <TouchableOpacity style={styles.sendBtn} onPress={sendMessage}>
          <Text style={styles.sendText}>→</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#1a1a2e',
    borderRadius: 16,
    padding: 12,
    marginTop: 12,
    maxHeight: 300,
  },
  title: {
    color: '#a78bfa',
    fontSize: 13,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  messages: {
    maxHeight: 180,
    marginBottom: 8,
  },
  emptyText: {
    color: '#6b7280',
    fontSize: 12,
    textAlign: 'center',
    fontStyle: 'italic',
    marginTop: 20,
  },
  bubble: {
    padding: 8,
    borderRadius: 12,
    marginBottom: 6,
    maxWidth: '85%',
  },
  userBubble: {
    backgroundColor: '#2d1b69',
    alignSelf: 'flex-end',
  },
  aiBubble: {
    backgroundColor: '#1e3a5f',
    alignSelf: 'flex-start',
  },
  bubbleText: {
    color: '#fff',
    fontSize: 12,
  },
  inputRow: {
    flexDirection: 'row',
    gap: 8,
  },
  input: {
    flex: 1,
    backgroundColor: '#0a0010',
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 8,
    color: '#fff',
    fontSize: 13,
    borderWidth: 1,
    borderColor: '#374151',
  },
  sendBtn: {
    backgroundColor: '#a78bfa',
    borderRadius: 10,
    paddingHorizontal: 14,
    justifyContent: 'center',
  },
  sendText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});