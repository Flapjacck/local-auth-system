export const signup = async (username: string, password: string) => {
  try {
    const res = await fetch('http://localhost:4000/api/signup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password })
    });
    
    if (res.status === 429) {
      return { error: 'Too many signup attempts. Please try again later.' };
    }
    
    return await res.json();
  } catch (error) {
    return { error: 'Network error. Please try again.' };
  }
};

export const login = async (username: string, password: string) => {
  try {
    const res = await fetch('http://localhost:4000/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password })
    });
    
    if (res.status === 429) {
      return { error: 'Too many login attempts. Please try again later.' };
    }
    
    return await res.json();
  } catch (error) {
    return { error: 'Network error. Please try again.' };
  }
};