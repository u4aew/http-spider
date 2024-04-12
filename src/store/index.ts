// store.ts
import { configureStore } from '@reduxjs/toolkit';
// Импорт срезов состояния (slices), если они у вас есть

export const store = configureStore({
  reducer: {
    // здесь будут ваши срезы состояния (slices)
  },
});

// Типы для TypeScript
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
