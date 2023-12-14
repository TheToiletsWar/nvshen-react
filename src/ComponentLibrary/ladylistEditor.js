import React, { useState, useEffect } from 'react';

function LadyListEditor({ onRefresh }) {
  const [ladyList, setLadyList] = useState([]);
  const [newLady, setNewLady] = useState('');

  // 获取女神列表
  useEffect(() => {
    fetch('api/getladylist')
      .then(response => response.json())
      .then(data => setLadyList(data))
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  // 更新女神列表
  const updateLadyList = () => {
    const updatedList = [...ladyList, newLady];
    fetch('api/setladylist', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedList),
    })
      .then(() => {
        setLadyList(updatedList);
        setNewLady(''); // 清空输入框
        onRefresh();
      })
      .catch(error => console.error('Error updating list:', error));
  };

  return (
    <div>
      <h2>合成列表</h2>
      <input
        type="text"
        value={newLady}
        onChange={(e) => setNewLady(e.target.value)}
        placeholder="添加新宝物"
      />
      <button onClick={updateLadyList}>更新列表</button>
    </div>
  );
}

export default LadyListEditor;
