import productsData from "./productsData";
import { ref, set, get } from "firebase/database";
import { db } from "@/scripts/firebase-config";

export async function syncProductsWithFirebase() {
  try {
    // Referência do nó "products" no Firebase
    const productsRef = ref(db, "products");

    // Buscar produtos já existentes no Firebase
    const snapshot = await get(productsRef);
    const firebaseProducts = snapshot.exists() ? snapshot.val() : {};

    // Contadores para log
    let updatedCount = 0;
    let alreadySyncedCount = 0;

    // Iterar sobre os produtos no productsData
    for (const product of productsData) {
      const { id, name, price, description, image } = product;

      // Verificar se o produto já existe no Firebase
      if (
        firebaseProducts[id] &&
        firebaseProducts[id].name === name &&
        firebaseProducts[id].price === price &&
        firebaseProducts[id].description === description &&
        firebaseProducts[id].image === image
      ) {
        // Produto já está sincronizado
        alreadySyncedCount++;
        console.log(`Produto ID ${id} já está atualizado.`);
        continue;
      }

      // Produto não está sincronizado ou precisa ser atualizado
      await set(ref(db, `products/${id}`), product);
      updatedCount++;
      console.log(`Produto ID ${id} atualizado no Firebase.`);
    }

    console.log(`Sincronização concluída: ${updatedCount} produtos atualizados, ${alreadySyncedCount} já estavam sincronizados.`);
  } catch (error) {
    console.error("Erro ao sincronizar produtos com Firebase:", error);
  }
}
