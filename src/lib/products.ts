import { collection, getDocs, query, where, getDoc, doc } from 'firebase/firestore';
import { initializeFirebaseAdmin } from '@/firebase/admin';
import type { Product, Category } from './types';

// This function now fetches products from Firestore.
// It's async because database operations are.
export async function getProducts(category?: Category): Promise<Product[]> {
  const { firestore } = initializeFirebaseAdmin();
  
  const productsRef = collection(firestore, 'products');
  let productsQuery;

  if (category && category !== 'all') {
    productsQuery = query(productsRef, where('category', '==', category));
  } else {
    productsQuery = query(productsRef);
  }

  const querySnapshot = await getDocs(productsQuery);
  const products: Product[] = [];
  querySnapshot.forEach((doc) => {
    // Note: We're casting here. For production, you'd want robust validation (e.g., with Zod).
    products.push({ id: doc.id, ...doc.data() } as Product);
  });
  
  return products;
}

// This function now fetches a single product by its slug from Firestore.
export async function getProductBySlug(slug: string): Promise<Product | undefined> {
  const { firestore } = initializeFirebaseAdmin();
  const productsRef = collection(firestore, 'products');
  const q = query(productsRef, where('slug', '==', slug));

  const querySnapshot = await getDocs(q);

  if (querySnapshot.empty) {
    return undefined;
  }

  const productDoc = querySnapshot.docs[0];
  return { id: productDoc.id, ...productDoc.data() } as Product;
}

// This function fetches a single product by its ID from Firestore.
export async function getProductById(id: string): Promise<Product | undefined> {
  const { firestore } = initializeFirebaseAdmin();
  const productRef = doc(firestore, 'products', id);
  const docSnap = await getDoc(productRef);

  if (!docSnap.exists()) {
    return undefined;
  }

  return { id: docSnap.id, ...docSnap.data() } as Product;
}
