import { useState, useEffect } from 'react';
import './App.css';

function useIntervalUpdater(refreshTime, otherResetData) {
  const [ timeToRefresh, setTTR ] = useState(Date.now());

  useEffect(() => {
    if (refreshTime <= 0) return;
    const timer = setTimeout(() => setTTR(Date.now()), refreshTime * 1000);
    return () => clearTimeout(timer);
  }, [timeToRefresh, refreshTime, otherResetData]);

  return timeToRefresh;
}

function useContentFetcher(url, otherResetData) {
  const [ content, setContent ] = useState({ path: 'N/A', time: 'N/A'});

  useEffect(() => {
    console.log(`loading... ${url}`);
    async function fetchData() {
      const response = await fetch(`http://localhost:3020${url}`, {
        method: 'POST',
        mode: 'cors'
      });
      const body = await response.json();
      setContent(body);
    }
    fetchData();
  }, [url, otherResetData]);

  return content;
} 

function ContentFetcher({ prefix, setPrefix })  {
  const timeToRefresh = useIntervalUpdater(prefix.refresh, prefix);
  const content = useContentFetcher(prefix.url, timeToRefresh);

  return (
    <main>
      <div>Path:</div><div>{content.path}</div>
      <div>Time:</div><div>{content.time}</div>
      <div>Also see:</div>
      <div><button onClick={() => setPrefix({ ...prefix, url: content.nextUrl })}>{content.nextUrl}</button></div>
    </main>
  );
}

function SettingsForm({ onChange, prefix }) {
  const [ fieldPrefix, setFieldPrefix ] = useState(prefix.url);
  const [ fieldRefresh, setFieldRefresh ]  = useState(prefix.refresh);

  useEffect(() => {
    setFieldPrefix(prefix.url);
    setFieldRefresh(prefix.refresh);
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
      onChange({ url: fieldPrefix, refresh: fieldRefresh });
    }}>Go!</button>
  </form>;
}

function App() {

  const [ prefix, setPrefix ] = useState({ url: "/initial", refresh: 5 });

  return (
    <div className="App">
      <SettingsForm onChange={(newVal) => setPrefix(newVal)} prefix={prefix} />
      <ContentFetcher prefix={prefix} setPrefix={(newPre) => setPrefix(newPre)} />
    </div>
  );
}

export default App;
