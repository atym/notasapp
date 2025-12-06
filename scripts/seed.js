import { initializeApp, cert } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';
import { createRequire } from 'module';

// INSTRUCTIONS:
// 1. Update the variable below to the name of the collection you want to seed.
const COLLECTION_TO_SEED = 'your-collection-name-here';

// 2. Make sure your data is correctly formatted in 'scripts/data_template.js'.
// 3. Run the script from your terminal: node scripts/seed.js
import { DATA } from './data_template.js';

// --- Script internals, no need to edit below this line ---

const require = createRequire(import.meta.url);
const serviceAccount = require('../serviceAccountKey.json');

console.log(`🔑 Service account loaded. Targeting project: ${serviceAccount.project_id}`);

// Basic validation
if (!COLLECTION_TO_SEED || COLLECTION_TO_SEED === 'your-collection-name-here') {
    console.error("🚨 Please specify a collection name in `seed.js` before running.");
    process.exit(1);
}
if (!DATA || DATA.length === 0) {
    console.error("🚨 No data found in `data_template.js`. Please add data before seeding.");
    process.exit(1);
}

initializeApp({
  credential: cert(serviceAccount)
});

const db = getFirestore();

const seedDatabase = async () => {
  try {
    const targetCollection = db.collection(COLLECTION_TO_SEED);

    console.log(`\n🗑️  Deleting existing data from '${COLLECTION_TO_SEED}'...`);
    const snapshot = await targetCollection.get();
    
    if (snapshot.empty) {
      console.log(`-> No existing documents found in '${COLLECTION_TO_SEED}'. Nothing to delete.`);
    } else {
      console.log(`-> Found ${snapshot.size} documents to delete.`);
      const writer = db.bulkWriter();
      snapshot.docs.forEach(doc => writer.delete(doc.ref));
      await writer.close();
      console.log(`✅  All existing documents deleted.`);
    }

    console.log(`\n🌱  Planting new data into '${COLLECTION_TO_SEED}'...`);
    const writer = db.bulkWriter();
    DATA.forEach(item => {
        const docRef = targetCollection.doc(); // Firestore will auto-generate an ID
        writer.create(docRef, item);
    });
    await writer.close();
    console.log(`✅  Successfully seeded ${DATA.length} items into '${COLLECTION_TO_SEED}'.`);
    
    console.log("\n🎉  Seeding complete!");

  } catch (error) {
    console.error("❌  Error during seeding process:", error);
  }
};

seedDatabase();
