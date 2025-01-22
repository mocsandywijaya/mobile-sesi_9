import auth from '@react-native-firebase/auth';

export const login = async (email: string, password: string) => {
    try {
      const userCredential = await auth().signInWithEmailAndPassword(email, password);
      console.log('User logged in:', userCredential.user);
      return userCredential.user;
    } catch (error) {
      if (error instanceof Error) {
        console.error('Login error:', error.message);
        throw error; // Lempar ulang error jika diperlukan
      } else {
        console.error('Unknown error occurred during login:', error);
        throw new Error('An unknown error occurred during login.');
      }
    }
  };

export const register = async (email: string, password: string) => {
    try {
      const userCredential = await auth().createUserWithEmailAndPassword(email, password);
      console.log('User registered:', userCredential.user);
      return userCredential.user;
    } catch (error) {
      if (error instanceof Error) {
        console.error('Registration error:', error.message);
        throw error;
      } else {
        console.error('Unknown error occurred:', error);
        throw new Error('An unknown error occurred.');
      }
    }
  };
