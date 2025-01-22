import SQLite from 'react-native-sqlite-storage';

// Mengaktifkan promise untuk SQLite
SQLite.enablePromise(true);

// Fungsi untuk membuka database
export const openDatabase = async () => {
  try {
    const db = await SQLite.openDatabase(
      { name: 'mydatabase.db', location: 'default' },
      () => console.log('Database opened successfully'),
      (error) => console.error('Error opening database:', error)
    );
    return db;
  } catch (error) {
    console.error('Error opening database:', error);
    throw error;
  }
};

// Fungsi untuk membuat tabel feedback
export const createFeedbackTable = async () => {
  try {
    const db = await openDatabase();
    await db.executeSql(`  
      CREATE TABLE IF NOT EXISTS feedback (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        recipeId INTEGER,
        userId INTEGER,
        feedbackText TEXT
      );
    `);
    console.log('Feedback table created successfully');
  } catch (error) {
    console.error('Error creating feedback table:', error);
  }
};

// Fungsi untuk menginisialisasi database (membuat tabel)
export const initDatabase = async () => {
  try {
    await createFeedbackTable();
    console.log('Database initialized successfully');
  } catch (error) {
    console.error('Error initializing database:', error);
  }
};

// Fungsi untuk mengambil feedback berdasarkan recipeId
export const getFeedback = async (recipeId: number) => {
  try {
    const db = await openDatabase();
    const results = await db.executeSql(
      'SELECT * FROM feedback WHERE recipeId = ?',
      [recipeId]
    );
    return results[0].rows.raw(); // Mengambil data dari hasil query
  } catch (error) {
    console.error('Error getting feedback:', error);
    throw error;
  }
};

// Fungsi untuk menambahkan feedback ke database
export const addFeedback = async (recipeId: number, feedbackText: string) => {
  try {
    const db = await openDatabase();
    await db.executeSql(
      'INSERT INTO feedback (recipeId, feedbackText) VALUES (?, ?)',
      [recipeId, feedbackText]
    );
    console.log('Feedback added successfully');
  } catch (error) {
    console.error('Error adding feedback:', error);
    throw error;
  }
};
