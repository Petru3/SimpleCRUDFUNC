const API_PATH = 'http://localhost:3000/api/data/';

export async function handleGetAllNames() {
  const response = await fetch(API_PATH);
  if (!response.ok) {
    throw new Error('Failed to fetch names');
  }
  return response.json();
}

export async function handlePostName(newName) {
  const response = await fetch(API_PATH, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(newName),
  });
  if (!response.ok) {
    throw new Error('Failed to post name');
  }
  return response.json();
}

export async function handleDeleteName(id) {
  console.log(`Attempting to delete name with id: ${id}`);
  const response = await fetch(`${API_PATH}${id}`, {
    method: 'DELETE',
  });
  if (!response.ok) {
    const errorMessage = await response.text();
    console.error(`Failed to delete name: ${errorMessage}`);
    throw new Error('Failed to delete name');
  }
  console.log(`Successfully deleted name with id: ${id}`);
}

export async function handleUpdateName(updatedName) {
  const response = await fetch(`${API_PATH}${updatedName.id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(updatedName),
  });
  if (!response.ok) {
    throw new Error('Failed to update name');
  }
  return response.json();
}
