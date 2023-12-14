import React, { useState } from 'react';
import './App.css';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Clock from './ComponentLibrary/clock'; // 假设 Clock 组件和 App 组件在同一目录下

function App() {
  const data = [
    "Ssis-743",
    "Stars-734",
    "Stars-804",
    "Stars-759",
    "Mide-875",
    "ipx-741",
    "Ipx-580",
    "Ipx-811",
    "ipx-641",
    "sdmt-155",
    "DLDSS-232",
    "jjda-016",
    "stars-368",
    "snis-499",
    "ipx-691",
    "mide-128",
    "ssis-858",
    "MIMK-138"
  ];
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState('');

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
      <h1>我的内容</h1>
      <Clock /> {/* 这里渲染时钟 */}
      <div className="flex-container">
        {data.map((item, index) => (
          <div key={index} className="flex-item">
            <Button variant="contained" onClick={() => copyToClipboard(item)}>{item}</Button>
          </div>
        ))}
      </div>
      <Snackbar
        open={open}
        autoHideDuration={6000}
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
