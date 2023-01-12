import React from 'react';
import Image from '../Images/message.jpeg'
const Message = (props) => {
  return <img src={Image} alt="Logo" {...props} />;
};

export default Message;