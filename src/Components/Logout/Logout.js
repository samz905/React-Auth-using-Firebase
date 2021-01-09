import firebase from 'firebase';

export const Logout = () => {
    return firebase.auth().signOut();
};