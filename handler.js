const AWS = require("aws-sdk");
const StepFunction = new AWS.StepFunctions();
const DynamoDB = require("aws-sdk/clients/dynamodb");
const DocumentClient = new DynamoDB.DocumentClient({ region: "us-east-1" });

const isBookAvailable = (book, quantity) => {
  return (book.quantity - quantity) > 0
}

module.exports.checkInventory = async ({ bookId, quantity }) => {
  try {
    let params = {
      TableName: 'bookTable',
      KeyConditionExpression: 'bookId = :bookId',
      ExpressionAttributeValues: {
        ':bookId': bookId
      }
    };
    let result = await DocumentClient.query(params).promise();
    let book = result.Items[0];

    if (isBookAvailable(book, quantity)) {
      return book;
    } else {
      let bookOutOfStockError = new Error("The book is out of stock");
      bookOutOfStockError.name = "BookOutOfStock";
      throw bookOutOfStockError;
    }
  } catch (e) {
    if (e.name === 'BookOutOfStock') {
      throw e;
    } else {
      let bookNotFoundError = new Error(e);
      bookNotFoundError.name = 'BookNotFound';
      throw bookNotFoundError;
    }
  }
};


module.exports.calculateTotal = async ({book, quantity}) => {
  let total = book.price * quantity
  return {total}
};

const deductPoints = async (userId) => {
  let params = {
      TableName: 'userTable',
      Key: { 'userId': userId },
      UpdateExpression: 'set points = :zero',
      ExpressionAttributeValues: {
          ':zero': 0
      }
  };
  await DocumentClient.update(params).promise();
}


module.exports.redeemPoints = async ({userId, total}) => {
  let orderTotal = total.total

  try {
    let params ={
      TableName: 'userTable',
      Key: {
        'userId': userId
      }
    }

    const result = await DocumentClient.get(params).promise()
    let user = result.Item;
    const points = user.points;
    if(orderTotal > points) {
      await deductPoints(userId)
      orderTotal = orderTotal - points;
      return { total: orderTotal, points }
    }else {
      throw new Error('Order total is less than redeem points');
    }
  } catch (error) {
    throw new Error(e);
  }

};


module.exports.billCustomer = async (params) => {
  
  return 'Billing occured successfully'
};

module.exports.restoreRedeemPoints = async ({ userId, total }) => {
  try {
      if (total.points) {
          let params = {
              TableName: 'userTable',
              Key: { userId: userId },
              UpdateExpression: 'set points = :points',
              ExpressionAttributeValues: {
                  ':points': total.points
              }
          };
          await DocumentClient.update(params).promise();
      }
  } catch (e) {
      throw new Error(e);
  }
}
