import { toast as toastify } from "react-toastify";

export function useToast() {
  return {
    toast: ({ title, description, variant }) => {
      const content = `${title}${description ? `: ${description}` : ""}`;

      switch (variant) {
        case "destructive":
          toastify.error(content);
          break;
        case "success":
        default:
          toastify.success(content);
          break;
      }
    },
  };
}
