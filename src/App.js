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
    <>
      <div>Path: {content.path}</div>
      <div>Time: {content.time}</div>
      <div>Also see: <button onClick={() => setPrefix(content.nextUrl)}>{content.nextUrl}</button></div>
    </>
  );
}

function SettingsForm({ onChange, prefix }) {
  const [ fieldPrefix, setFieldPrefix ] = useState(prefix);

  useEffect(() => {
    setFieldPrefix(prefix);
  }, [prefix]);

  return <form onSubmit={(e) => e.preventDefault()}>
    <label>Prefix <input type="text" value={fieldPrefix} onChange={(e) => setFieldPrefix(e.target.value)} /></label>
    <button onClick={() => {
      onChange(fieldPrefix);
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
