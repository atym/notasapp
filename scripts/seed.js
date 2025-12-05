import { initializeApp, cert } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';
import { createRequire } from 'module';
import { ALPHABET_DATA } from './data/alphabet.js';

const require = createRequire(import.meta.url);
const serviceAccount = require('../serviceAccountKey.json');

console.log(`🔑 Service account loaded. Targeting project: ${serviceAccount.project_id}`);
if (serviceAccount.project_id !== 'notas-1f37f') {
    console.error("🚨 CRITICAL: Service account project_id does not match 'notas-1f37f'.");
    process.exit(1);
}
console.log("✅ Project ID matches.");

initializeApp({
  credential: cert(serviceAccount)
});

const db = getFirestore();

const seedDatabase = async () => {
  try {
    const alphabetCollection = db.collection('alphabet');

    console.log("\n🗑️  Deleting existing alphabet data...");
    const snapshot = await alphabetCollection.get();
    
    if (snapshot.empty) {
      console.log("-> No existing documents found in 'alphabet' collection. Nothing to delete.");
    } else {
      console.log(`-> Found ${snapshot.size} documents to delete.`);
      const writer = db.bulkWriter();
      snapshot.docs.forEach(doc => writer.delete(doc.ref));
      await writer.close();
      console.log(`✅  All existing documents deleted.`);
    }

    console.log("\n🌱  Planting new alphabet data...");
    const writer = db.bulkWriter();
    ALPHABET_DATA.forEach(item => {
        const docRef = alphabetCollection.doc();
        writer.create(docRef, item);
    });
    await writer.close();
    console.log(`✅  Successfully seeded ${ALPHABET_DATA.length} alphabet items.`);
    
    console.log("\n🎉  Seeding complete! Your 'alphabet' collection is now up to date.");

  } catch (error) {
    console.error("❌  Error during seeding process:", error);
    // Log the entire error object for more detail
    console.error(error);
  }
};

seedDatabase();
