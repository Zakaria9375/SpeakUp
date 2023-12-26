import { ref } from 'vue';

export function useToggle() {
  const refValue = ref(false);

  function toggle() {
    refValue.value = !refValue.value;
  }

  function close() {
    refValue.value = false;
  }

  function open() {
    refValue.value = true;
  }

  return {
    toggle,
    close,
    open,
    refValue
  };
}
