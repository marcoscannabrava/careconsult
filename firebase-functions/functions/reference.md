# Reference for some material on working with Firebase

- [React + Firebase App: Calling Firebase Database](https://www.codementor.io/@yurio/all-you-need-is-react-firebase-4v7g9p4kf)

..............................................................................................

[Return List of Faker Products](https://invertase.io/oss/react-native-firebase/guides/getting-started-with-cloud-functions)

```js
// functions/index.js
const functions = require('firebase-functions');
const faker = require('faker');
 
// Initialize products array
const products = [];
 
// Max number of products
const LIMIT = 100;
 
// Push a new product to the array
for (let i = 0; i < LIMIT; i++) {
  products.push({
    name: faker.commerce.productName(),
    price: faker.commerce.price(),
  });
}
 
exports.products = functions.https.onRequest((request, response) => {
  return response.json(products);
});
```
..............................................................................................

[Tracking the number of elements in a list](https://github.com/firebase/functions-samples/tree/master/child-count)

```js
'use strict';

const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp();

// Keeps track of the length of the 'likes' child list in a separate property.
exports.countlikechange = functions.database.ref('/posts/{postid}/likes/{likeid}').onWrite(
    async (change) => {
      const collectionRef = change.after.ref.parent;
      const countRef = collectionRef.parent.child('likes_count');

      let increment;
      if (change.after.exists() && !change.before.exists()) {
        increment = 1;
      } else if (!change.after.exists() && change.before.exists()) {
        increment = -1;
      } else {
        return null;
      }

      // Return the promise from countRef.transaction() so our function
      // waits for this async event to complete before it exits.
      await countRef.transaction((current) => {
        return (current || 0) + increment;
      });
      console.log('Counter updated.');
      return null;
    });

// If the number of likes gets deleted, recount the number of likes
exports.recountlikes = functions.database.ref('/posts/{postid}/likes_count').onDelete(async (snap) => {
  const counterRef = snap.ref;
  const collectionRef = counterRef.parent.child('likes');

  // Return the promise from counterRef.set() so our function
  // waits for this async event to complete before it exits.
  const messagesData = await collectionRef.once('value');
  return await counterRef.set(messagesData.numChildren());
});
```


