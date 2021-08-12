import React from 'react';

import Cell from './Cell';

const Row = ({ row, nextKey, leftClick, rightClick }) => {

   const cells = row.map((cell, i) => <Cell key={`${nextKey}${i}`} rowIndex={nextKey} cellIndex={i} cell={cell} leftClick={leftClick} rightClick={rightClick} />);

   return(
      <div className="row">
         {cells}
      </div>
   );
}

export default Row;