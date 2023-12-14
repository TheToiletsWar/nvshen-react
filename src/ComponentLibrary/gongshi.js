import React, { useState } from 'react';

function GongShiGenerator() {
  const [inputText, setInputText] = useState('');
  const [generatedText, setGeneratedText] = useState('');

  const handleInputChange = (e) => {
    setInputText(e.target.value);
  };

  const handleGenerate = () => {
    // 这里添加您的生成规则
    const newText = generateText(inputText);
    setGeneratedText(newText);
  };

  // 示例生成规则函数
  const generateText = (text) => {
    // 这里是一个简单的示例规则：重复输入的文本两次
    return text.repeat(2);
  };

  return (
    <div>
      <input type="text" value={inputText} onChange={handleInputChange} />
      <button onClick={handleGenerate}>生成</button>
      <p>生成的文本：{generatedText}</p>
    </div>
  );
}

export default GongShiGenerator;
