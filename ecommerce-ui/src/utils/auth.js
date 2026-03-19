export const getLoggedInUser = () => {
  const rawUser = localStorage.getItem('user');
  if (!rawUser) return null;

  try {
    const parsedUser = JSON.parse(rawUser);
    return parsedUser && parsedUser.id ? parsedUser : null;
  } catch {
    localStorage.removeItem('user');
    return null;
  }
};

export const getLoggedInUserId = () => {
  const user = getLoggedInUser();
  return user?.id ?? null;
};
