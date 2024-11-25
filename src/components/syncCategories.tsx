import categoriesData from "./categoriesData";
import { ref, set, get } from "firebase/database";
import { db } from "@/scripts/firebase-config";

export async function syncCategoriesWithFirebase() {
  try {
    // Referência do nó "categories" no Firebase
    const categoriesRef = ref(db, "categories");

    // Buscar categorias já existentes no Firebase
    const snapshot = await get(categoriesRef);
    const firebaseCategories = snapshot.exists() ? snapshot.val() : {};

    // Contadores para log
    let updatedCount = 0;
    let alreadySyncedCount = 0;

    // Iterar sobre as categorias no categoriesData
    for (const category of categoriesData) {
      const { id, name, icon } = category;

      // Verificar se a categoria já existe no Firebase
      if (
        firebaseCategories[id] &&
        firebaseCategories[id].name === name &&
        firebaseCategories[id].icon === icon
      ) {
        // Categoria já está sincronizada
        alreadySyncedCount++;
        console.log(`Categoria ID ${id} já está atualizada.`);
        continue;
      }

      // Categoria não está sincronizada ou precisa ser atualizada
      await set(ref(db, `categories/${id}`), category);
      updatedCount++;
      console.log(`Categoria ID ${id} atualizada no Firebase.`);
    }

    console.log(
      `Sincronização de categorias concluída: ${updatedCount} categorias atualizadas, ${alreadySyncedCount} já estavam sincronizadas.`
    );
  } catch (error) {
    console.error("Erro ao sincronizar categorias com Firebase:", error);
  }
}
