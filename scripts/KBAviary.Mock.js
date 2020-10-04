'use strict';

/**
 * Adds a set of mock birds to the Cloud Firestore.
 */
KBAviary.prototype.addMockbirds = function () {
  var promises = [];

  for (var i = 0; i < 20; i++) {
    var name =
      this.getRandomItem(this.data.words) +
      ' ' +
      this.getRandomItem(this.data.words);
    var category = this.getRandomItem(this.data.categories);
    var city = this.getRandomItem(this.data.cities);
    var price = Math.floor(Math.random() * 4) + 1;
    var photoID = Math.floor(Math.random() * 22) + 1;
    var photo =
      'https://storage.googleapis.com/firestorequickstarts.appspot.com/food_' +
      photoID +
      '.png';
    var numRatings = 0;
    var avgRating = 0;

    var promise = this.addbird({
      name: name,
      category: category,
      price: price,
      city: city,
      numRatings: numRatings,
      avgRating: avgRating,
      photo: photo,
    });

    if (!promise) {
      alert('addbird() is not implemented yet!');
      return Promise.reject();
    } else {
      promises.push(promise);
    }
  }

  return Promise.all(promises);
};

/**
 * Adds a set of mock Ratings to the given bird.
 */
KBAviary.prototype.addMockRatings = function (birdID) {
  var ratingPromises = [];
  for (var r = 0; r < 5 * Math.random(); r++) {
    var rating = this.data.ratings[
      parseInt(this.data.ratings.length * Math.random())
    ];
    rating.userName = 'Bot (Web)';
    rating.timestamp = new Date();
    rating.userId = firebase.auth().currentUser.uid;
    ratingPromises.push(this.addRating(birdID, rating));
  }
  return Promise.all(ratingPromises);
};
