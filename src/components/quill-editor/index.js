import React, { Component } from 'react';
//https://github.com/zenoamaro/react-quill/issues/122
const ReactQuill = typeof window === 'object' ? require('react-quill') : () => false;
import 'react-quill/dist/quill.snow.css';
import { Box } from '@chakra-ui/react';

class QuillEditor extends Component {
  constructor(props) {
    super(props);
  }

  modules = {
    toolbar: [
      [{ header: [1, 2, false] }],
      ['bold', 'italic', 'underline', 'strike', 'blockquote'],
      [{ list: 'ordered' }, { list: 'bullet' }, { indent: '-1' }, { indent: '+1' }],
      ['link', 'image'],
      ['clean']
    ]
  };

  formats = [
    'header',
    'bold',
    'italic',
    'underline',
    'strike',
    'blockquote',
    'list',
    'bullet',
    'indent',
    'link',
    'image'
  ];

  render() {
    return (
      <Box className="text-editor">
        <ReactQuill
          theme="snow"
          value={this.props.value}
          onChange={(value) => this.props.onChange(value)}
          modules={this.modules}
          formats={this.formats}></ReactQuill>
      </Box>
    );
  }
}

export default QuillEditor;
