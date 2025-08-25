
async function up(db) {
  // ✅ Step 1: Update all documents in 'products' collection
  await db.collection('products').updateMany(
    {}, // sabhi documents (filter empty = all docs)
    { 
      $set: { discount: 0 } // "discount" field add karo aur default value 0 rakho
    }
  );

  console.log('✅ Discount field added to all products with default value 0');
}


async function down(db) {
  // ✅ Step 2: Undo migration (remove discount field)
  await db.collection('products').updateMany(
    {}, // sabhi documents ko target karo
    { 
      $unset: { discount: "" } // "discount" field hata do
    }
  );

  console.log('❌ Discount field removed from all products');
}

module.exports = { up, down };
