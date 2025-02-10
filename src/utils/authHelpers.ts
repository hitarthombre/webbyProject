import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
} from '@react-native-google-signin/google-signin';


// configure Google Sign In
export const configureGoogleSignIn = async () => {
  try {
    await GoogleSignin.configure({
      webClientId: '124701486426-6mskub3p65nb3cbm3tblbltuuga27lrv.apps.googleusercontent.com', // Firebase Web Client ID
    });
    console.log('Google Sign-In configured successfully');
  } catch (error) {
    console.error('Google Sign-In configuration error:', error);
  }
};

// Sign In with Google
export const signUpWithGoogle = async () => {
  try {
    await GoogleSignin.hasPlayServices(); // Ensure Google Play Services are available
    const response = await GoogleSignin.signIn();
    return response; // Return user data
  } catch (error: any) {
    if (error.code === statusCodes.SIGN_IN_CANCELLED) {
      console.log('Sign-in canceled');
    } else if (error.code === statusCodes.IN_PROGRESS) {
      console.log('Sign-in in progress');
    } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
      console.log('Play Services not available');
    } else {
      console.error('Google Sign-In Error:', error);
    }
    throw error; // Propagate error for further handling
  }
};


// Sign Out from Google
export const signOutFromGoogle = async () => {
  try {
    await GoogleSignin.signOut();// Sign out from Google
    console.log('User signed out');
  } catch (error) {
    console.error('Error signing out:', error);
    throw error;
  }
};

export const  validateEmail= (email:string)=> {

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailPattern.test(email);
  }
export const  validatePass = (password:string)=> {

  const passwordPattern = /^.{8,}$/;
  return passwordPattern.test(password);
  }
export const  validateOtp = (otp:string)=> {

  const regex = /^\d{6}$/;
  return regex.test(otp);
  }

  export const hasPreviousSignIn = async () => {
    try {
      const currentUser = await GoogleSignin.getCurrentUser();// Avoid variable name conflicts
      if (currentUser) {
        return currentUser;
      } else {
        return null;
      }
    } catch (error) {
      console.error("Error checking previous sign-in:", error);
      return null; // Handle errors gracefully
    }
  };

  export const getCurrentUser = async () => {
    const currentUser = GoogleSignin.getCurrentUser();
    return  currentUser ;
  };