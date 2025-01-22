// RecipeList.tsx
import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, FlatList } from 'react-native';

type Recipe = {
  id: string;
  title: string;
  image: any; 
  ingredients: string[];
  instructions: string[];
};

type RecipeListProps = {
  recipes: Recipe[];
  onPress: (recipe: Recipe) => void;
  onEdit: (recipe: Recipe) => void;
  onDelete: (id: string) => void;
};

const RecipeList: React.FC<RecipeListProps> = ({ recipes, onPress, onEdit, onDelete }) => {
  return (
    <FlatList
      data={recipes}
      keyExtractor={(item) => item.id}
      numColumns={2}
      renderItem={({ item }) => (
        <View style={styles.card}>
          <TouchableOpacity onPress={() => onPress(item)}>
            <Image source={item.image} style={styles.image} />
          </TouchableOpacity>
          <Text style={styles.title}>{item.title}</Text>
          <TouchableOpacity style={styles.editButton} onPress={() => onEdit(item)}>
            <Text style={styles.editButtonText}>Edit</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.deleteButton} onPress={() => onDelete(item.id)}>
            <Text style={styles.deleteButtonText}>Hapus</Text>
          </TouchableOpacity>
        </View>
      )}
      ListEmptyComponent={<Text style={styles.noResultsText}>Resep tidak ditemukan</Text>}
    />
  );
};

const styles = StyleSheet.create({
  card: {
    width: '45%',
    margin: 10,
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 10,
    elevation: 5,
  },
  image: {
    width: '100%',
    height: 100,
    borderRadius: 8,
    resizeMode: 'cover',
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 10,
  },
  editButton: {
    marginTop: 10,
    backgroundColor: '#4CAF50',
    padding: 5,
    borderRadius: 5,
    alignItems: 'center',
  },
  deleteButton: {
    marginTop: 5,
    backgroundColor: '#F44336',
    padding: 5,
    borderRadius: 5,
    alignItems: 'center',
  },
  editButtonText: {
    color: '#fff',
  },
  deleteButtonText: {
    color: '#fff',
  },
  noResultsText: {
    fontSize: 18,
    color: '#999',
    textAlign: 'center',
  },
});

export default RecipeList;
