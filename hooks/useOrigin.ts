export function useOrigin() {
  if (typeof window === 'undefined') {
    return '';
  }

  return window.location.origin;
}
