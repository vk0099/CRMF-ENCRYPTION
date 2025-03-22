import React from 'react';
import EncryptionUtils from './encryption';
import JSONPretty from 'react-json-pretty';
import './styles.css';
import 'react-json-pretty/themes/monikai.css';

export default function App() {
  const [history, setHistory] = React.useState([]);
  const [code, setCode] = React.useState('');
  const [result, setResult] = React.useState('');
  const handleDecryption = React.useCallback(() => {
    const str = new EncryptionUtils();
    const newCode = str.decrypt(code);
    try {
      setResult(JSON.parse(newCode));
    } catch (e) {
      alert('Could not decrypt' + e.message);
    }
  }, [code]);
  return (
    <div className="App" style={{ paddingLeft: '20px' }}>
      <h6>Decrypt AES</h6>
      <div>
        <textarea
          style={{ width: 'calc(100% - 40px)' }}
          value={code}
          onChange={(event) => setCode(event.target.value)}
          rows={4}
        />
        <button onClick={handleDecryption}>Decrypt</button>
      </div>
      <br />
      <JSONPretty data={result} />
    </div>
  );
}
