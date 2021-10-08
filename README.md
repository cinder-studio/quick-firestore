QuickFirestore
==============

This is a pre-protection release the documentation is not yet complete.  If you would like to contribute please contact us on github.

Background
----------

Google's firestore library is super slow at warming up fresh instances. Up to 5 seconds. As documented here: https://github.com/ryanhornberger/firebase-functions-cold-start-bug .

We needed to be faster. This library takes advantage of Google's Firestore Rest API and requires no additional warmup time.

Implementation
--------------

MIT Licensed,
Typescript,
Minimal Dependencies (Axios is the largest),
Builds to es6,
Jest for unit testing.

How to deploy a new version
---------------------------

Call one of the following - [major/minor/patch]

npm version patch
npm version minor
npm version major

Basic Usage
-----------


```
const QuickFs = new QuickFirestore({
    firestore: {
        projectName:'mockProjectYx',
        jwt: {
            clientEmail:'',
            privateKeyId:'',
            privateKey:'',
        }
    }
})

const result = await QuickFs.query(
    QuickQuery
    .collection('mockCollectionUwe')
    .select( 'email', 'name' )
    .limit(2)
    .prepare()
)
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
