QuickFirestore
==============

This project is not yet ready for NPM. You are welcome to use it.

```
const QuickFs =  = new QuickFirestore({
    firestore: {
        projectName:'mockProjectYx',
        jwt: {
            clientEmail:'',
            privateKeyId:'',
            privateKey:'',
        }
    }
})

const result = await QuickFs.query(QuickQuery.collection('mockCollectionUwe').select( 'email', 'name' ).limit(2).prepare())
```

It is broken into 3 libraries of value:

## QuickQuery

Build queries that can be communicated to the firebase REST api.

Documentation incomplete.

## QuickFirestore

Communicate with Firestore over Rest API's with a little defensive protection.

Documentation incomplete.

## FirestoreOverRest

Communicate with Firestore over Rest API's with no protection at all.

Documentation incomplete.
