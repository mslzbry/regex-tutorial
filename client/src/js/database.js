import { openDB } from 'idb';

const initdb = async () =>
  openDB('jate', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });

export const putDb = async (content) => {
  console.log('putting to db');
  
  // create connection
  const db = await openDB('jate', 1);

  // create transaction
  const transaction = db.transaction('jate', 'readwrite');
  const store = transaction.objectStore('jate');
  const req = store.put({ id: 1, value: content });
  const res = await req;
  console.log(res, + " ; saved to db");
}


export const getDb = async () => {
  console.log("getting from db");

  // create connection
	const db = await openDB("jate", 1);
	const transaction = db.transaction("jate", "readonly");
	const store = transaction.objectStore("jate");
	const req = store.getAll();
	const res = await req;

  if (res) {
    console.log('got data from db ', res.value);
    return res.value;
  } else {
    console.log('not found in db');
  }
}

initdb();
