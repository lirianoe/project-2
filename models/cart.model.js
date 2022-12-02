module.exports = function Cart(oldCart) {
  this.items = oldCart.items || {};
  this.totalQty = oldCart.totalQty || 0;
  this.totalPrice = oldCart.totalPrice || 0;

  this.add = function (item, id) {
    let storedItem = this.items[id];
    if (!storedItem) {
      storedItem = this.items[id] = { item: item, qty: 0, price: 0 };
    }
    storedItem.qty++;
    storedItem.price = storedItem.item.price * storedItem.qty;
    this.totalQty++;
    this.totalPrice += storedItem.item.price;
  };


  this.remove = function(id){

    let storedItem = this.items[id];
    console.log(storedItem, this.totalPrice, this.totalQty)
    this.totalPrice -= storedItem.item.price * storedItem.qty;
    
    this.totalQty -= storedItem.qty;
    console.log(storedItem, this.totalPrice, this.totalQty)
    delete this.items[id]
}

//this function is to remove an item from cart
// this.remove = function (item, id) {

//   let storedItem = this.items[id];

//   if(storedItem.qty > 1){
      
//       console.log("stored item qty is ", storedItem.qty)
//       storedItem.qty -= 1;
//       storedItem.price = storedItem.item.price * storedItem.qty;
//       this.totalQty--;
//       this.totalPrice -= storedItem.item.price;
//   } else if (storedItem.qty === 1){
//       this.removeAll(id)
//   }
  
// }

  this.generateArray = () => {
    const arr = [];
    for (let id in this.items) {
      arr.push(this.items[id]);
    }
    return arr;
  };
};
