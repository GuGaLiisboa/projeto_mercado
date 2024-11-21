import React, { createContext, useContext, useState, ReactNode } from "react";
import productsData from "../components/productsData"; // Importando os dados dos produtos

// Definição do tipo do Produto
export interface Product {
  id: number;
  name: string;
  price: number;
  description: string;
  image: string;
}

// Definição do contexto
interface ProductContextProps {
  products: Product[]; // Lista de produtos
}

// Criando o contexto
const ProductContext = createContext<ProductContextProps | undefined>(undefined);

// Provedor do contexto
export const ProductProvider = ({ children }: { children: ReactNode }) => {
  // Estado inicial com os dados do arquivo productsData
  const [products] = useState<Product[]>(productsData);

  return (
    <ProductContext.Provider value={{ products }}>
      {children}
    </ProductContext.Provider>
  );
};

// Hook para usar o contexto
export const useProducts = (): ProductContextProps => {
  const context = useContext(ProductContext);
  if (!context) {
    throw new Error("useProducts must be used within a ProductProvider");
  }
  return context;
};
