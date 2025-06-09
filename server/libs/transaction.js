var mongojs = require("mongojs");
var Promise = require("promise");
var Data = require("./data");
var Transaction = new Data('transactions');
var utils = require("utils-pkg");
var util = require("../utils");

var ApiContracts = require('authorizenet').APIContracts;
var ApiControllers = require('authorizenet').APIControllers;
var SDKConstants = require('authorizenet').Constants;

const auth_name = global.settings.gateway.authorized_net_name; //'55gFuTwGr5J';
const transaction_key = global.settings.gateway.authorized_net_transaction_key; //'6QMc734V3e6QDzVN';
const testing = global.settings.gateway.authorized_net_testing; //true

Transaction.gets = function(opts){
    //Get the data
    opts = opts||{};
    opts.join = [
        {$lookup:{from:'companies', localField:'company_id', foreignField:'_id', as:'company'}},
        {$unwind:{path:'$company', preserveNullAndEmptyArrays:true}},
        {$lookup:{from:'facilities', localField:'facility_id', foreignField:'_id', as:'facility'}},
        {$unwind:{path:'$facility', preserveNullAndEmptyArrays:true}},
    ];

    if (opts && opts.sSearch) opts.join.push({$match: {'facility.name': {$regex: new RegExp(util.escapeRegex(opts.sSearch), 'gi')}}});

    opts.orderby = {created_ts: -1}

    return this.__proto__.gets.apply(this, [opts]);
};

Transaction.createCustomerChargeRequest = function(cart, profile){
    var auth_name = global.settings.gateway.authorized_net_name;
    var transaction_key = global.settings.gateway.authorized_net_transaction_key;

    if(global.settings.gateway.authorized_net_testing == 'yes'){
      auth_name = '55gFuTwGr5J';
      transaction_key = '6QMc734V3e6QDzVN';
    }
    var merchantAuthenticationType = new ApiContracts.MerchantAuthenticationType();
    merchantAuthenticationType.setName(auth_name);
    merchantAuthenticationType.setTransactionKey(transaction_key);

    var profileToCharge = new ApiContracts.CustomerProfilePaymentType();
    profileToCharge.setCustomerProfileId(profile.profile_id);

    var paymentProfile = new ApiContracts.PaymentProfile();
    paymentProfile.setPaymentProfileId(profile.payment_id);
    profileToCharge.setPaymentProfile(paymentProfile);

    var orderDetails = new ApiContracts.OrderType();
    orderDetails.setDescription(cart.description);

    var transactionRequestType = new ApiContracts.TransactionRequestType();
    transactionRequestType.setTransactionType(ApiContracts.TransactionTypeEnum.AUTHCAPTURETRANSACTION);
    transactionRequestType.setProfile(profileToCharge);
    transactionRequestType.setAmount(cart.total);
    transactionRequestType.setLineItems(cart.lineItems);
    transactionRequestType.setOrder(orderDetails);

    var createRequest = new ApiContracts.CreateTransactionRequest();
    createRequest.setMerchantAuthentication(merchantAuthenticationType);
    createRequest.setTransactionRequest(transactionRequestType);

    //pretty print request
    console.log(JSON.stringify(createRequest.getJSON(), null, 2));
    return createRequest
};

Transaction.getLineItems = function(items) {
    var lineItemList = [];
    var lineItems = new ApiContracts.ArrayOfLineItem();

    return new Promise(function(resolve, reject) {
        utils.each(items, function (index, item, next) {
            var lineItem = new ApiContracts.LineItemType();
            lineItem.setItemId(item.id);
            lineItem.setName(item.name);
            lineItem.setDescription(item.description);
            lineItem.setQuantity(1);
            lineItem.setUnitPrice(Number(item.total));
            lineItemList.push(lineItem);
            next()
        }, function () {
            lineItems.setLineItem(lineItemList);
            resolve(lineItems)
        });
    });
};

Transaction.deleteCustomerProfile = function(customerProfileId) {

  var merchantAuthenticationType = new ApiContracts.MerchantAuthenticationType();
  merchantAuthenticationType.setName(global.settings.gateway.authorized_net_name);
  merchantAuthenticationType.setTransactionKey(global.settings.gateway.authorized_net_transaction_key);

  var deleteRequest = new ApiContracts.DeleteCustomerProfileRequest();
  deleteRequest.setMerchantAuthentication(merchantAuthenticationType);
  deleteRequest.setCustomerProfileId(customerProfileId);

  console.log(JSON.stringify(deleteRequest.getJSON(), null, 2));

  return deleteRequest
};

Transaction.updateCustomerPaymentProfileRequest = function(customerProfileId, customerPaymentProfileId, card) {

  var auth_name = global.settings.gateway.authorized_net_name;
  var transaction_key = global.settings.gateway.authorized_net_transaction_key;

  if(global.settings.gateway.authorized_net_testing == 'yes'){
    auth_name = '55gFuTwGr5J';
    transaction_key = '6QMc734V3e6QDzVN';
  }

  var merchantAuthenticationType = new ApiContracts.MerchantAuthenticationType();
  merchantAuthenticationType.setName(auth_name);
  merchantAuthenticationType.setTransactionKey(transaction_key);

  var creditCardForUpdate = new ApiContracts.CreditCardType();
  creditCardForUpdate.setCardNumber(card.number);
  creditCardForUpdate.setExpirationDate(card.exp);
  creditCardForUpdate.setCardCode(card.cvv);

  var paymentType = new ApiContracts.PaymentType();
  paymentType.setCreditCard(creditCardForUpdate);

  var billTo = new ApiContracts.CustomerAddressType();
  billTo.setFirstName(card.firstName);
  billTo.setLastName(card.lastname);
  billTo.setCompany(card.company);
  billTo.setAddress(card.address);
  billTo.setCity(card.city);
  billTo.setState(card.state);
  billTo.setZip(card.zip);
  billTo.setCountry(card.country);
  billTo.setPhoneNumber(card.phone);

  var customerForUpdate = new ApiContracts.CustomerPaymentProfileExType();
  customerForUpdate.setPayment(paymentType);
  //customerForUpdate.setDefaultPaymentProfile(true);

  customerForUpdate.setCustomerPaymentProfileId(customerPaymentProfileId);
  customerForUpdate.setBillTo(customerAddressType);

  var updateRequest = new ApiContracts.UpdateCustomerPaymentProfileRequest();
  updateRequest.setMerchantAuthentication(merchantAuthenticationType);
  updateRequest.setCustomerProfileId(customerProfileId);
  updateRequest.setPaymentProfile(customerForUpdate);
  updateRequest.setValidationMode(ApiContracts.ValidationModeEnum.LIVEMODE);

  return updateRequest
}

Transaction.createRequest = function(cart, card) {
    var auth_name = global.settings.gateway.authorized_net_name;
    var transaction_key = global.settings.gateway.authorized_net_transaction_key;

    if(global.settings.gateway.authorized_net_testing == 'yes'){
      auth_name = '55gFuTwGr5J';
      transaction_key = '6QMc734V3e6QDzVN';
    }

    var merchantAuthenticationType = new ApiContracts.MerchantAuthenticationType();
    merchantAuthenticationType.setName(auth_name);
    merchantAuthenticationType.setTransactionKey(transaction_key);

    var creditCard = new ApiContracts.CreditCardType();
    creditCard.setCardNumber(card.number);
    creditCard.setExpirationDate(card.exp);
    creditCard.setCardCode(card.cvv);

    var paymentType = new ApiContracts.PaymentType();
    paymentType.setCreditCard(creditCard);

    var orderDetails = new ApiContracts.OrderType();
    orderDetails.setInvoiceNumber(cart.invoiceNumber);
    orderDetails.setDescription(cart.description);

    var profile = new ApiContracts.CustomerProfilePaymentType();
    profile.setCreateProfile(true);

    var tax = new ApiContracts.ExtendedAmountType();
    tax.setAmount(Number(cart.tax));
    tax.setName('GCT');
    tax.setDescription('General Consumption Tax');

    var nid = card.facility_id.toString(), ctr = 0;
    var customer_id = parseInt(nid.slice(ctr, (ctr += 6)), 16);

    var customerData = new ApiContracts.CustomerDataType()
    customerData.type = "business"
    customerData.id = "cust_" + new Date().getTime();
    customerData.email = card.company_email;

    var billTo = new ApiContracts.CustomerAddressType();
    billTo.setFirstName(card.firstName);
    billTo.setLastName(card.lastname);
    billTo.setCompany(card.company);
    billTo.setAddress(card.address);
    billTo.setCity(card.city);
    billTo.setState(card.state);
    billTo.setZip(card.zip);
    billTo.setCountry(card.country);

    var transactionSetting1 = new ApiContracts.SettingType();
    transactionSetting1.setSettingName('duplicateWindow');
    transactionSetting1.setSettingValue('120');

    var transactionSetting2 = new ApiContracts.SettingType();
    transactionSetting2.setSettingName('recurringBilling');
    transactionSetting2.setSettingValue('false');

    var transactionSettingList = [];
    transactionSettingList.push(transactionSetting1);
    transactionSettingList.push(transactionSetting2);

    var transactionSettings = new ApiContracts.ArrayOfSetting();
    transactionSettings.setSetting(transactionSettingList);


    var transactionRequestType = new ApiContracts.TransactionRequestType();
    transactionRequestType.setTransactionType(ApiContracts.TransactionTypeEnum.AUTHCAPTURETRANSACTION);
    transactionRequestType.setPayment(paymentType);
    transactionRequestType.setAmount(Number(cart.total.toFixed(2)));
    transactionRequestType.setLineItems(cart.lineItems);
    transactionRequestType.setOrder(orderDetails);
    transactionRequestType.setTax(tax);
    transactionRequestType.setBillTo(billTo);
    transactionRequestType.setTransactionSettings(transactionSettings);
    transactionRequestType.setCustomer(customerData);
    transactionRequestType.setProfile(profile);

    var createRequest = new ApiContracts.CreateTransactionRequest();
    createRequest.setMerchantAuthentication(merchantAuthenticationType);
    createRequest.setTransactionRequest(transactionRequestType);

    //pretty print request
    console.log(JSON.stringify(createRequest.getJSON(), null, 2));
    return createRequest;
};

Transaction.createPayPalRequest = function(cart) {
    var merchantAuthenticationType = new ApiContracts.MerchantAuthenticationType();

    merchantAuthenticationType.setName(global.settings.gateway.authorized_net_name);
    merchantAuthenticationType.setTransactionKey(global.settings.gateway.authorized_net_transaction_key);

    var payPalType = new ApiContracts.PayPalType();
    payPalType.setCancelUrl('http://www.merchanteCommerceSite.com/Success/TC25262');
    payPalType.setSuccessUrl('http://www.merchanteCommerceSite.com/Success/TC25262');
    payPalType.setPayerID('B2LA5T27DMX7G');

    var paymentType = new ApiContracts.PaymentType();
    paymentType.setPayPal(payPalType);

    var transactionRequestType = new ApiContracts.TransactionRequestType();
    transactionRequestType.setTransactionType(ApiContracts.TransactionTypeEnum.AUTHCAPTURETRANSACTION);
    transactionRequestType.setPayment(paymentType);
    transactionRequestType.setAmount(cart.total);

    var createRequest = new ApiContracts.CreateTransactionRequest();
    createRequest.setMerchantAuthentication(merchantAuthenticationType);
    createRequest.setTransactionRequest(transactionRequestType);
    return createRequest;
};

Transaction.sendRequest = function(request, callback) {
    var ctrl = new ApiControllers.CreateTransactionController(request.getJSON());
    //Defaults to sandbox
    if(global.settings.gateway.authorized_net_testing != 'yes') {
        ctrl.setEnvironment(SDKConstants.endpoint.production);
    }

    ctrl.execute(function(){

        var apiResponse = ctrl.getResponse();

        var response = new ApiContracts.CreateTransactionResponse(apiResponse);

        //pretty print response
        console.log(JSON.stringify(response, null, 2));

        if(response != null){
            if(response.getMessages().getResultCode() == ApiContracts.MessageTypeEnum.OK){
                if(response.getTransactionResponse()) {
                  if(response.getTransactionResponse().getMessages() != null){
                    var payment_id, profile_id;
                    if (response.getProfileResponse()) {
                      if (response.getProfileResponse().getCustomerPaymentProfileIdList()) {
                        payment_id = response.getProfileResponse().getCustomerPaymentProfileIdList().getNumericString().toString()
                      }
                      profile_id = response.getProfileResponse().getCustomerProfileId()
                    }
                    callback(null, {transactionId: response.getTransactionResponse().getTransId(),
                      code: response.getTransactionResponse().getResponseCode(),
                      accountNumber: response.getTransactionResponse().getAccountNumber(),
                      accountType: response.getTransactionResponse().getAccountType(),
                      code: response.getTransactionResponse().getResponseCode(),
                      profile_id: profile_id,
                      payment_id: payment_id,
                      message: response.getTransactionResponse().getMessages().getMessage()[0].getDescription()})
                  } else {
                    if(response.getTransactionResponse().getErrors() != null){
                      return callback({code: response.getTransactionResponse().getErrors().getError()[0].getErrorCode(),
                        message: response.getTransactionResponse().getErrors().getError()[0].getErrorText()}, null)
                    }
                    callback({message: "Transaction Failed"}, null)
                  }
                } else {
                  callback(null, true)
                }
            } else {
                if(response.getTransactionResponse() != null && response.getTransactionResponse().getErrors() != null){

                    callback({code: response.getTransactionResponse().getErrors().getError()[0].getErrorCode(),
                        message: response.getTransactionResponse().getErrors().getError()[0].getErrorText()}, null)
                } else {
                    callback({code: response.getMessages().getMessage()[0].getCode(),
                        message: response.getMessages().getMessage()[0].getText()}, null)
                }
            }
        } else {
            callback({message: 'Null Response.'}, null);
        }
    });
};

module.exports = Transaction;
