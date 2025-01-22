import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Button, FlatList, Image, Alert, StyleSheet, ScrollView } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { StackParamList } from './router'; 
import { getFeedback, addFeedback } from '../database/Sqlite'; 

type RecipeDetailProps = NativeStackScreenProps<StackParamList, 'RecipeDetail'>;

const RecipeDetail: React.FC<RecipeDetailProps> = ({ route }) => {
  const { id, title, image, ingredients, instructions } = route.params;
  const [feedbacks, setFeedbacks] = useState<any[]>([]);
  const [feedbackText, setFeedbackText] = useState<string>('');

  useEffect(() => {
    loadFeedbacks();
  }, [id]);

  // Fungsi untuk mengambil feedback berdasarkan id
  const loadFeedbacks = async () => {
    try {
      const result = await getFeedback(id);
      setFeedbacks(result);
    } catch (error) {
      console.error('Error loading feedback:', error);
    }
  };

  // Fungsi untuk menambah feedback
  const handleAddFeedback = async () => {
    try {
      await addFeedback(id, feedbackText);
      setFeedbackText('');
      loadFeedbacks(); 
    } catch (error) {
      console.error('Error adding feedback:', error);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Menampilkan gambar resep */}
      {image && <Image source={{ uri: image }} style={styles.image} />}
      <Text style={styles.title}>{title}</Text>
      
      <Text style={styles.sectionTitle}>Bahan-Bahan</Text>
      {ingredients.map((ingredient, index) => (
        <Text key={index} style={styles.content}>- {ingredient}</Text>
      ))}
      
      <Text style={styles.sectionTitle}>Cara Membuat</Text>
      {instructions.map((instruction, index) => (
        <Text key={index} style={styles.content}>{index + 1}. {instruction}</Text>
      ))}

      {/* Feedback Section */}
      <Text style={styles.sectionTitle}>Feedback</Text>
      <TextInput
        placeholder="Tambah feedback"
        value={feedbackText}
        onChangeText={setFeedbackText}
        style={styles.input}
      />
      <Button title="Kirim Feedback" onPress={handleAddFeedback} />
      
      <FlatList
        data={feedbacks}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.feedbackItem}>
            <Text>{item.feedbackText}</Text>
          </View>
        )}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { padding: 15 },
  image: {
    width: '100%',
    height: 200,
    borderRadius: 10,
    marginBottom: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 10,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 20,
  },
  content: {
    fontSize: 16,
    lineHeight: 24,
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    paddingLeft: 8,
    marginTop: 10,
  },
  feedbackItem: {
    padding: 10,
    borderBottomColor: '#ddd',
    borderBottomWidth: 1,
    marginTop: 5,
  },
});

export default RecipeDetail;
