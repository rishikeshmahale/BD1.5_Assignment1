const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
const port = 3000;

// Server Side values
let taxRate = 5; // 5%
let discountedPercentage = 10; // 10 %
let loyaltyRate = 2;

// Endpoint 1: Calculate the total price of items in the cart
app.get('/cart-total', (req, res) => {
  let newItemPrice = parseFloat(req.query.newItemPrice);
  let cartTotal = parseFloat(req.query.cartTotal);

  cartTotal = cartTotal + newItemPrice;

  res.send(cartTotal.toString());
});

// /cart-total?newItemPrice=1200&cartTotal=0

// Endpoint 2 : Apply a discount based on membership status

function discountOnMembershipStatus(cartTotal, isMember) {
  let finalCartTotal = 0;

  if (isMember === true) {
    finalCartTotal = cartTotal - (cartTotal * 10) / 100;
  } else {
    finalCartTotal = cartTotal;
  }

  return `The final cart total after checking membership status is : ${finalCartTotal.toString()}`;
}

app.get('/membership-discount', (req, res) => {
  let cartTotal = parseFloat(req.query.cartTotal);

  let isMember = req.query.isMember === 'true';

  res.send(
    discountOnMembershipStatus(cartTotal, isMember, discountedPercentage)
  );
});

// /membership-discount?cartTotal=3600&isMember=true

// Endpoint 3 : Calculate tax on the cart total

function calculatetaxOnCartTotal(cartTotal, taxRate) {
  let taxDeduction = (cartTotal * taxRate) / 100;

  return `Tax dedution on total cart amount : ${taxDeduction.toString()}`;
}

app.get('/calculate-tax', (req, res) => {
  let cartTotal = parseFloat(req.query.cartTotal);

  res.send(calculatetaxOnCartTotal(cartTotal, taxRate));
});

// /calculate-tax?cartTotal=3600

// Endpoint 4 : Estimate delivery time based on shipping method

function estimeDaysToDeliver(shippingMethod, distance) {
  let days;
  let standardDeliveryDistancePerDay = 50;
  let expressDeliveryDistancePerDay = 100;

  if (shippingMethod === 'standard') {
    days = distance / standardDeliveryDistancePerDay;
  }

  if (shippingMethod === 'express') {
    days = distance / expressDeliveryDistancePerDay;
  }

  // could have done if-else instead of if-if but thought of elaborating and simplifying the code

  return `Estimated delivery Time in ${shippingMethod} is ${days.toString()} days `;
}

app.get('/estimate-delivery', (req, res) => {
  let shippingMethod = req.query.shippingMethod;

  let distance = parseFloat(req.query.distance);

  let days = estimeDaysToDeliver(shippingMethod, distance);

  res.send(days);
});

// /estimate-delivery?shippingMethod=express&distance=600

// Endpoint 5 : Calculate the shipping cost based on weight and distance

function calculateShippingCost(weight, distance) {
  let shippingCost = weight * distance * 0.1;

  return shippingCost;
}

app.get('/shipping-cost', (req, res) => {
  let weight = parseFloat(req.query.weight);

  let distance = parseFloat(req.query.distance);

  let result = calculateShippingCost(weight, distance);

  res.send(
    'The total shipping cost based on weight and distance is : ' +
      result.toString()
  );
});

// /shipping-cost?weight=2&distance=600

// Endpoint 6 : Calculate loyalty points earned from a purchase

function calculateLoyaltyPoints(purchaseAmount) {
  let loyaltyPoints = purchaseAmount * loyaltyRate;

  return 'The loyalty points earned : ' + loyaltyPoints.toString();
}

app.get('/loyalty-points', (req, res) => {
  let purchaseAmount = parseFloat(req.query.purchaseAmount);

  res.send(calculateLoyaltyPoints(purchaseAmount));
});

// /loyalty-points?purchaseAmount=3600

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
