import React, { useState } from 'react';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient('YOUR_SUPABASE_URL', 'YOUR_SUPABASE_PUBLIC_KEY');

const App = () => {

  const [selectedWebsite, setSelectedWebsite] = useState('');
  const [clientData, setClientData] = useState([]);

  const handleWebsiteSelect = (event) => {
    setSelectedWebsite(event.target.value);
  };

  const handleClientSearch = async (event) => {
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .where('name', 'ilike', `%${event.target.value}%`);

    if (error) {
      console.log(error);
      return;
    }

    setClientData(data);
  };

  const handleClientSelect = async (client) => {
    // TODO: Autofill the relevant form fields with the client's data.
  };

  return (
    <div>
      <h1>Jaza Autofill</h1>
      <select value={selectedWebsite} onChange={handleWebsiteSelect}>
        <option value="">Select a website</option>
        <option value="kra">Kenya Revenue Authority</option>
        <option value="ecitizen">eCitizen</option>
        <option value="nssf">National Social Security Fund</option>
        <option value="nhif">National Hospital Insurance Fund</option>
        <option value="enfs">Environment and Natural Resources Forum</option>
      </select>

      <input type="text" placeholder="Search for client" onChange={handleClientSearch} />

      <ul>
        {clientData.map((client) => (
          <li key={client.id} onClick={() => handleClientSelect(client)}>{client.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default App;
