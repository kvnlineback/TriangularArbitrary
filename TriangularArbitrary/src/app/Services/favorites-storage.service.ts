import { Injectable } from '@angular/core';
import * as firebase from 'firebase/app';
import { Stock } from '../Models/Stock';

@Injectable({
  providedIn: 'root',
})
export class FavoritesStorageService {

  lastStock: Stock;


  constructor() {

  }

  async getAllFavorites(email: string): Promise<string[]> {
    let favs = [];
    let docRef = firebase.firestore().collection('favorites').doc(email);
    await docRef.get().then(function (doc) {
        if (doc.exists) {
          let document = doc.data();
          favs = document['symbols'] as string[]
        } else {
          firebase.firestore().collection('favorites').doc(email).set({
              symbols: []
            });
        }
      })
      .catch(function (error) {
        throw new Error('Error getting ' + email + 'favorites');
      });
      return favs;
  }

  saveFavorite(fav: string, email: string) {
    try {
      return firebase.firestore().collection('favorites')
      .doc(email).update({
        symbols: firebase.firestore.FieldValue.arrayUnion(fav),
      });
    } catch (e) {
      throw new Error('Error ocurred attempting to add favorite');
    }
  }


  deleteFavorite(fav: string, email: string) {
    try {
      return firebase.firestore().collection('favorites')
      .doc(email).update({
        symbols: firebase.firestore.FieldValue.arrayRemove(fav),
      });
    } catch (e) {
      throw new Error('Error ocurred attempting to delete favorite');
    }
  }

}
