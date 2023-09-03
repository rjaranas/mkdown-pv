import React, { useState, useRef } from 'react';
import { Rnd } from 'react-rnd';
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import rehypeHighlight from 'rehype-highlight/lib';

const Previewer = () => {
  const [inputText, setInputText] = useState('')
  const [txtSize, setTxtSize] = useState({ width: 370, height: 400 });
  const [position, setPosition] = useState({ x: -20, y: 550})
  const textareaRef = useRef();

  const handleChange = (event) => {
    const newText = event.target.value
     
    // const lineBreakText = newText.replace(/\n/g, ' \n')

    // setInputText(lineBreakText)
    setInputText(newText)
  }

  const handleResize = (ref) => {
    setTxtSize({
      width: ref.style.width,
      height: ref.style.height,
    });

    if (textareaRef.current) {
      textareaRef.current.style.width = ref.style.width;
      textareaRef.current.style.height = ref.style.height;
    }
  
  };

  const handleDragStop = (data) => {
    setPosition({x: data.x, y: data.y })
  }

  const textareaStyle = {
    width: '99.9%',
    height: '100%',
    margin: '0',
    resize: 'none',
  };

  return (
    <>
      <Rnd
        default={{
          ...position,
          ...txtSize,
        }}
        onResize={handleResize}
        onDragStop={handleDragStop}
        className='border border-rounded bg-dark border-1 z-index-n1 shadow-lg'
        bounds="window">

        <textarea id='editor' 
        style={textareaStyle} 
        ref={textareaRef} 
        className='rounded-end' 
        placeholder='This is the text editor, you can resize it, and move it around' 
        value={inputText} 
        onChange={handleChange}></textarea>

      </Rnd>

        <div className='border border-1 z-index-1 bg-dark vh-100 w-100 shadow-lg pleaseMove'>
          <div 
          className='bg-dark w-90'>
            <h3 
            className='text-start ms-2 text-warning'>
              Preview
              </h3>
          </div>
          <div 
          className='text-warning text-start ms-3' 
          id='preview'>
            <ReactMarkdown rehypePlugins={[rehypeHighlight]} remarkPlugins={[remarkGfm]}>{inputText}</ReactMarkdown>
          </div>
        </div>
    </>
  );
}
export default Previewer;