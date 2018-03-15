import React from 'react';
import styles from './styles.css';
import { Tooltip } from 'antd';

function getAlphabetPosition(text) {
  let result = "";

  for (let i = 0; i < text.length; i += 1) {
    const code = text.toUpperCase().charCodeAt(i)
    if (code > 64 && code < 91) {
      result += (code - 64) + " ";
    }
  }

  return result.slice(0, result.length - 1);
}

const Avatar = (props) => {
  const colors = ['#add170', '#7570d1', '#70d17c', '#d17070'];
  const position = getAlphabetPosition(props.children);
  const randomColor = colors[position % 2];

  return (
    <Tooltip title="prompt text">
      <span {...props} style={{ backgroundColor: randomColor }} className={styles.avatar}>{props.children}</span>
    </Tooltip>
  );
};

export default Avatar;
