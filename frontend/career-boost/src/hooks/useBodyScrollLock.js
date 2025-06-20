import { useEffect } from 'react';

export const useBodyScrollLock = (isLocked) => {
  useEffect(() => {
    if (isLocked) {
      // Guardar la posición actual del scroll
      const scrollY = window.scrollY;
      
      // Bloquear el scroll del body
      document.body.style.position = 'fixed';
      document.body.style.top = `-${scrollY}px`;
      document.body.style.width = '100%';
      document.body.style.overflow = 'hidden';
      
      // Cleanup: restaurar cuando se cierre el modal
      return () => {
        document.body.style.position = '';
        document.body.style.top = '';
        document.body.style.width = '';
        document.body.style.overflow = '';
        
        // Restaurar la posición del scroll
        window.scrollTo(0, scrollY);
      };
    }
  }, [isLocked]);
};