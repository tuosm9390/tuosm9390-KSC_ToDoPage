export const saveToStorage = (key: string, data: unknown) => {
  // 클라이언트 측에서만 실행되도록 보장
  // 서버 측에서는 localStorage가 없기 때문에 오류가 발생할 수 있음
  if (typeof window !== "undefined") {
    localStorage.setItem(key, JSON.stringify(data));
  }
};

export const loadFromStorage = (key: string) => {
  if (typeof window !== "undefined") {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : null;
  }
  return null;
};
