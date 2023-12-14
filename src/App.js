import React, { useState, useCallback, useEffect } from 'react';
import './App.css';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Clock from './ComponentLibrary/clock'; // 假设 Clock 组件和 App 组件在同一目录下
import DataFetcher from './ComponentLibrary/dataFetcher';
import LadyListEditor from './ComponentLibrary/ladylistEditor';

function App() {
  const [open, setOpen,] = useState(false);
  const [message, setMessage] = useState('');
  const [data, setData] = useState([]);

  const handleDataFetched = useCallback((fetchedData) => {
    setData(fetchedData);
  }, []); // 确保这个函数不会在每次渲染时都改变

  const copyToClipboard = (str) => {
    navigator.clipboard.writeText(str).then(function () {
      setMessage('复制成功!');
      setOpen(true);
    }, function (err) {
      setMessage('复制失败');
      setOpen(true);
    });
  }

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };
  const fetchData = useCallback(() => {
    fetch('api/getladylist')
      .then(response => response.json())
      .then(data => setData(data))
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);
  const action = (
    <React.Fragment>
      <Button color="secondary" size="small" onClick={handleClose}>
        关闭
      </Button>
      <IconButton size="small" aria-label="close" color="inherit" onClick={handleClose}>
        <CloseIcon fontSize="small" />
      </IconButton>
    </React.Fragment>
  );

  return (
    <div className="App">
      <h1>芜湖</h1>
      <Clock /> {/* 这里渲染时钟 */}
      <DataFetcher onDataFetched={handleDataFetched} />
      <div className="flex-container">
        {data.map((item, index) => (
          <div key={index} className="flex-item">
            <Button variant="contained" onClick={() => copyToClipboard(item)}>{item}</Button>
          </div>
        ))}
      </div>
      <LadyListEditor onRefresh={fetchData} /> {/* 使用新组件 */}

      <Snackbar
        open={open}
        autoHideDuration={3000}
        onClose={handleClose}
        message={message}
        action={action}
      />
      <footer className="footer">

        <h3>友情链接</h3>
        <ul>
          <li><a href="https://example.com/link1" target="_blank" rel="noopener noreferrer">链接1</a></li>
          <li><a href="https://example.com/link2" target="_blank" rel="noopener noreferrer">链接2</a></li>
          {/* 更多链接 */}
        </ul>
      </footer>
    </div>
  );
}

export default App;
