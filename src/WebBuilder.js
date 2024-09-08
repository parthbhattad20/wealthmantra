import React, { useEffect, useRef } from 'react';
import grapesjs from 'grapesjs';

const WebBuilder = () => {
  const editorRef = useRef(null);

  useEffect(() => {
    const editor = grapesjs.init({
      container: editorRef.current,
      plugins: ['grapesjs-blocks-basic'],
      pluginsOpts: {
        'grapesjs-blocks-basic': {}
      },
    });

    // Add blocks
    editor.BlockManager.add('image', {
      label: 'Image',
      category: 'Basic',
      content: '<img src="https://via.placeholder.com/150" alt="Placeholder Image"/>',
    });

    editor.BlockManager.add('text', {
      label: 'Text',
      category: 'Basic',
      content: '<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>',
    });

    editor.BlockManager.add('heading', {
      label: 'Heading',
      category: 'Basic',
      content: '<h2>Your Heading Here</h2>',
    });

    return () => editor.destroy();
  }, []);

  return <div ref={editorRef} />;
};

export default WebBuilder;
