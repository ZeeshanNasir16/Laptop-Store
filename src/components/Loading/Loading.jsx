import React from 'react';
import './loadingStyles.css';

function Loading() {
   return (
      <div className='loading'>
         <img
            src='https://i.ibb.co/Kb5hMC7/ezgif-com-gif-maker-small.gif'
            alt='loader'
            className='loadingImg'
         />
      </div>
   );
}

export default Loading;
