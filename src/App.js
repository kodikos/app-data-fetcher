import { useState, useEffect } from 'react';
import './App.css';

function ContentFetcher({ prefix, setPrefix })  {
  const [ content, setContent ] = useState({ path: 'N/A', time: 'N/A'});

  useEffect(() => {
    async function fetchData() {
      const response = await fetch(`http://localhost:3020${prefix}`, {
        method: 'POST',
        mode: 'cors'
      });
      const body = await response.json();
      setContent(body);
    }
    fetchData();
  }, [prefix]);

  return (
    <main>
      <div>Path:</div><div>{content.path}</div>
      <div>Time:</div><div>{content.time}</div>
      <div>Also see:</div>
      <div><button onClick={() => setPrefix(content.nextUrl)}>{content.nextUrl}</button></div>
    </main>
  );
}

function SettingsForm({ onChange, prefix }) {
  const [ fieldPrefix, setFieldPrefix ] = useState(prefix);
  const [ fieldRefresh, setFieldRefresh ]  = useState(30);

  useEffect(() => {
    setFieldPrefix(prefix);
  }, [prefix]);

  return <form onSubmit={(e) => e.preventDefault()}>
    <div>
      <div className="prefixField">
        <label>Prefix 
          <input 
            type="text" 
            value={fieldPrefix} 
            onChange={(e) => setFieldPrefix(e.target.value)}
          />
        </label>
      </div>
      <div>
        <label>Refresh every
          <input
            className="refresh"
            type="text" 
            value={fieldRefresh} 
            onChange={(e) => setFieldRefresh(e.target.value)}
          />
          seconds
        </label>
      </div>
    </div>
    <button onClick={() => {
      onChange(fieldPrefix, fieldRefresh);
    }}>Go!</button>
  </form>;
}

function App() {

  const [ prefix, setPrefix ] = useState("/initial");

  return (
    <div className="App">
      <SettingsForm onChange={(newVal) => setPrefix(newVal)} prefix={prefix} />
      <ContentFetcher prefix={prefix} setPrefix={(newPre) => setPrefix(newPre)} />
    </div>
  );
}

export default App;
