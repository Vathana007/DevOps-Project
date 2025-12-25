// Main export file for mock data
export * from "./products";
export * from "./orders";
export * from "./api-responses";

// Usage instructions:
// 1. Import the mock API functions:
//    import { mockProductsAPI, mockOrdersAPI } from '@/lib/mock-data';
//
// 2. Use in your components:
//    const products = await mockProductsAPI.getAll();
//    const order = await mockOrdersAPI.getById(1);
//
// 3. All responses match the Laravel backend API structure exactly
// 4. All functions include simulated network delay for realistic testing
// 5. Products are sorted by ID DESC (newest first) like the backend
// 6. Orders include automatic receipt generation
// 7. Order numbers follow backend format: ORD-YYYYMMDD-HHmmss-XXXX
