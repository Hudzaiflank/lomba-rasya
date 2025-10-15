import Swal from "sweetalert2";
import { brandColors } from "../store/useAppStore";

const palette = brandColors();

const base = Swal.mixin({
  customClass: {
    confirmButton: "bg-primary text-white px-4 py-2 rounded-md",
    cancelButton: "bg-gray-200 text-gray-800 px-4 py-2 rounded-md ml-2",
    popup: "rounded-xl",
  },
  buttonsStyling: false,
});

export function alertSuccess(title, text) {
  return base.fire({
    icon: "success",
    title,
    text,
    iconColor: palette.primary,
    confirmButtonColor: palette.primary,
  });
}

export function alertError(title, text) {
  return base.fire({
    icon: "error",
    title,
    text,
    iconColor: palette.pink,
    confirmButtonColor: palette.pink,
  });
}

export function confirmDialog({
  title,
  text,
  confirmText = "Ya",
  cancelText = "Batal",
}) {
  return base.fire({
    title,
    text,
    icon: "question",
    showCancelButton: true,
    confirmButtonText: confirmText,
    cancelButtonText: cancelText,
    iconColor: palette.primary,
    confirmButtonColor: palette.primary,
  });
}
