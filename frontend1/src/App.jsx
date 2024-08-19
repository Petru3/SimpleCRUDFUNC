import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createName, setNames, deleteName, updateName } from './features/namesSlice';
import { handleGetAllNames, handlePostName, handleDeleteName, handleUpdateName } from './utils/ApiNames';

function generateUniqueId() {
  return (Math.random() + 1).toString(36).substring(2);
}

function App() {
  const dispatch = useDispatch();
  const names = useSelector((state) => state.names);
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const [editId, setEditId] = useState(null);

  async function handleSubmit(e) {
    e.preventDefault();

    if (editId !== null) {
      const updatedName = { id: editId, name };

      try {
        await handleUpdateName(updatedName);
        dispatch(updateName(updatedName));
        setName('');
        setEditId(null);
        setError('');
      } catch (error) {
        setError('Failed to update name');
        console.log(error);
      }
    } else {
      const newName = { id: generateUniqueId(), name };

      if(!name) return;

      try {
        const data = await handlePostName(newName);
        dispatch(createName(data));
        setName('');
        setError('');
      } catch (error) {
        setError('Failed to add name');
        console.log(error);
      }
    }
  }

  async function handleDelete(id) {
    try {
      console.log(`Attempting to delete name with id: ${id}`);
      await handleDeleteName(id);
      dispatch(deleteName(id));
      setError('');
      console.log(`Successfully deleted name with id: ${id}`);
    } catch (error) {
      setError('Failed to delete name');
      console.log(error);
    }
  }

  function handleEdit(index) {
    setName(names[index].name);
    setEditId(names[index].id);
  }

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await handleGetAllNames();
        dispatch(setNames(data));
      } catch (error) {
        setError('Failed to fetch names');
        console.log(error);
      }
    }
    fetchData();
  }, [dispatch]);

  return (
    <div className="app">
      <h1>Name List</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter a name"
        />
        <button type="submit">
          {editId !== null ? 'Update Name' : 'Create Name'}
        </button>
      </form>

      {error && <p>Error: {error}</p>}

      <ul>
        {names.map((name, index) => (
          <li key={name.id}>
            {name.name}
            <button onClick={() => handleEdit(index)}>Edit</button>
            <button onClick={() => handleDelete(name.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
