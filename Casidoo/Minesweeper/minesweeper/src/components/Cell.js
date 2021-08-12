import React from 'react';

const Cell = ({ rowIndex, cellIndex, cell, leftClick, rightClick }) => {

   const textColor = `${cell[1]}-${cell[0]}`

   const onClickRight = (e) => {
      e.preventDefault();
      rightClick(rowIndex, cellIndex, cell);
   }

   return(
      <div 
         className={`cell ${cell[1]} ${textColor === 'discovered-*' ? 'boom' : textColor}`} 
         onClick={() => leftClick(rowIndex, cellIndex, cell)}
         onContextMenu={(e) => onClickRight(e)}>
            <span>
               {cell[1] === 'discovered' && cell[0] !== 0 ? cell[0] : ''}
               {cell[1] === 'flagged' ? '?' : ''}
            </span>
      </div>
   );
}

export default Cell;