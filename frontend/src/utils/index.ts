export const utils = {
  getLocalToken: (): string | null => localStorage.getItem("token"),
  saveLocalToken: (token: string): void => localStorage.setItem("token", token),
  removeLocalToken: (): void => localStorage.removeItem("token"),
};
