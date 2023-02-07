import { useState } from 'react';
import './App.css';

function App() {
  
  const [ input, setInput ] = useState( '' );
  const [ tobuys, setTobuys ] = useState( [] );
  const [ totalCount, setTotalCount ] = useState(0)

  const addTobuys = () => {

    if (input == '' ) {
      return;
    }

    const newTobuy = {
      id: Math.floor( Math.random() * 1000 ),
      value: input,
      quantity: 1,
      selected: false
    };

    const newTobuys = [ ...tobuys, newTobuy];
    setTobuys(newTobuys);

    setInput('');

    console.log(tobuys);
    calculateTotal();
  };

  const plusItem = (index) => {
    const newTobuys = [ ...tobuys ];
    if (newTobuys[index].selected) {
      return;
    }
    newTobuys[index].quantity++;

    setTobuys(newTobuys)
    calculateTotal();
  };

  const minusItem = (index) => {
    const newTobuys = [ ...tobuys ];
    const quantity = newTobuys[index].quantity;
    if (quantity === 1 || newTobuys[index].selected) {
      return;
    } else {
      newTobuys[index].quantity--;
    }

    setTobuys(newTobuys);
    calculateTotal();
  };

  const calculateTotal = () => {
    
    const totalCount = tobuys.reduce( (total, newTobuy) => {
      // return total + newTobuy.quantity;
      return newTobuy.selected ? total : total + newTobuy.quantity;
    }, 0);

    setTotalCount(totalCount)
  };

  const toggleCompleted = ( index, event ) => {
    const newTobuys = [ ...tobuys ];

    if (event.target.checked) {
      newTobuys[index].selected = true;

    } else {
      newTobuys[index].selected = false;
    }
    setTobuys(newTobuys);
  };

  const deleteItem = (id) => {
    const newTobuys = tobuys.filter( tobuy => tobuy.id !== id );
    setTobuys(newTobuys);
    calculateTotal();
  };

  return (
    <div className="App">
      <h2>Grocery List</h2>
      <div className='add-item'>
        
        <input onChange={ (event) => setInput( event.target.value ) } value={ input } type="text" name="item" id="inputItem" placeholder='Add an item..'/>
        <button onClick={ () => addTobuys() } className='add-item-btn'><i class="bi bi-plus-lg"></i></button>
      </div>
      <hr />
      <ul className='item-list'>
        { tobuys.map(( tobuy, index ) => {
              return (
                <li key={ tobuy.id } >
                  <span className='value'>
                    <div className='checkbox-container'>
                      <input type="checkbox" onClick={ (event) => toggleCompleted( index, event )}/>
                    </div>
                    { 
                      tobuy.selected ? (
                        <span className='completed span-value'>
                        { tobuy.value + ' - ' + tobuy.quantity }
                        </span>
                      ) : ( 
                        <span className='span-value'>
                        { tobuy.value }
                        </span>
                      )
                    }
                  </span>
                  
                  <div className='buttons'>
                    {
                      tobuy.selected ? (
                        <>
                          <button className='minusItem' onClick={ () => minusItem( index ) }> - </button>
                            <span className='count quantity'>{ tobuy.quantity }</span>
                          <button className='plusItem' onClick={ () => plusItem( index ) }> + </button>
                        </>
                        
                      ) : (
                        <>
                        <button onClick={ () => minusItem( index ) }> - </button>
                          <span className='count '>{ tobuy.quantity }</span>
                        <button onClick={ () => plusItem( index ) }> + </button>
                      </>
                      )

                    }
                    
                    {
                      tobuy.selected ? (
                        <button className='delete' onClick={ () => deleteItem( tobuy.id ) }> <i className="bi bi-x-lg"></i> </button>
                      ) : (
                        <div></div>
                      )
                    }
                    
                  </div>
                </li>
              )
            }
          )}
      </ul>
      <div className='total'>
          <span className='total-item'>
            Total Item Quantity: <p>{totalCount }</p>
          </span>
      </div>
    </div>
  )

};


export default App;
