'use strict';

KBAviary.prototype.addBird = function(data) {
  var collection = firebase.firestore().collection('inventory');
  return collection.add(data);
};

KBAviary.prototype.getAllBirds = function(renderer) {
  var query = firebase
    .firestore()
    .collection('inventory')
    .orderBy('type', 'desc')
    .limit(50);
  this.getDocumentsInQuery(query, renderer);
};

KBAviary.prototype.getDocumentsInQuery = function(query, renderer) {
  query.onSnapshot(function(snapshot) {
    if (!snapshot.size) return renderer.empty();

    snapshot.docChanges().forEach(function(change) {
      if (change.type === 'removed') {
        renderer.remove(change.doc);
      } else {
        renderer.display(change.doc);
      }
    });
  });
};

KBAviary.prototype.getBird = function(id) {
  return firebase
    .firestore()
    .collection('inventory')
    .doc(id)
    .get();
};

KBAviary.prototype.getFilteredBirds = function(filters, renderer) {
  var query = firebase.firestore().collection('inventory');

  if (filters.type !== 'Any') {
    query = query.where('type', '==', filter.type);
  }

  this.getDocumentsInQuery(query, renderer);
};
