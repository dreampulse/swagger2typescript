export interface Offer {
  materialConfigurationId : string;
  price : Price;
}

export interface MaterialConfiguration extends Array<{
  printingService : string;
  color : string;
  material : {
    name : string;
    description : string;
  };
  finish : {
    name : string;
    description : string;
  };
  materialConfigurationId : string;
  finishGroup : {
    name : string;
    description : string;
  };
  materialGroup : {
    name : string;
    description : string;
  };
}> {
}

export interface Address {
  lastName : string;
  firstName : string;
  countryCode : string;
}

export interface Model {
  modelId : string;
  designerCommissonCurrency : string;
  designerCommisson : number;
  downloadUrl : string;
  mesh : {
    area : number;
    boundingBox : {
      z : number;
      x : number;
      y : number;
    };
    volume : number;
  };
  unit : string;
  filename : string;
}

export interface Price {
  net : number;
  state : string;
  hasPrice : boolean;
  errorMsg : string;
  currency : string;
  shipping : number;
  total : number;
  tax : number;
}

export interface CartItem {
  amount : number;
  modelId : string;
  scale : number;
  materialConfigurationId : string;
}
// The printing engine will download a 3d-model from any location (url)
export interface FetchModelParameters {
  modelLocation : string;
  unit : string;
  sessionToken : string;
}

// undefined
export interface GetOffersParameters {
  modelId : string;
  queryMode : string;
  scale : number;
  currency : string;
  countryCode : string;
  promotionCode : string;
  materialGroupFilter : string;
  materialFilter : string;
  finishGroupFilter : string;
  printingServiceFiler : string;
  colorFilter : string;
  sessionToken : string;
}

// Order
export interface CreateOrderWithStripeParameters {
  configurations : {
    totalPrice : number;
    address : Address;
    currency : string;
    cartItems : CartItem[];
    stripeToken : string;
    promotionCode : string;
  };
}

// Estimate prices based on basic 3d-model properties
export interface EstimateOffersParameters {
  volume : number;
  surface : number;
  bboxX : number;
  bboxY : number;
  bboxZ : number;
  currency : string;
  materialGroupFilter : string;
  materialFilter : string;
  finishGroupFilter : string;
  printingServiceFiler : string;
  colorFilter : string;
}

// undefined
export interface GetOrderStatusParameters {
  orderId : string;
}

// Get 3d-model properties about all the models you have uploaded
export interface GetAllModelsParameters {
  sessionToken : string;
}

// Get an offer (price) for a modell and a configuration
export interface GetOfferParameters {
  modelId : string;
  materialConfigurationId : string;
  queryMode : string;
  scale : number;
  countryCode : string;
  currency : string;
  promotionCode : string;
  sessionToken : string;
}

// Websocket api (private)
export interface SubscribeToNewOffersParameters {
  modelId : string;
  scale : number;
  currency : string;
  countryCode : string;
  promotionCode : string;
}

// Order
export interface CreateOrderWithPaypalParameters {
  configurations : {
    totalPrice : number;
    address : Address;
    currency : string;
    cartItems : CartItem[];
    promotionCode : string;
  };
}

// Executes an Order
export interface OrderParameters {
  configurations : {
    apiKey : string;
    totalPrice : number;
    address : Address;
    secretKey : string;
    currency : string;
    cartItems : CartItem[];
    promotionCode : string;
  };
}

// Get the structure of the materials
export interface GetMaterialConfigurationsParameters {
  materialGroupFilter : string;
  materialFilter : string;
  finishGroupFilter : string;
  printingServiceFiler : string;
  colorFilter : string;
}

// Upload a new 3d model to the prining engine
export interface UploadModelParameters {
  file : File;
  unit : string;
  sessionToken : string;
}

// Get the prices for a shopping cart
export interface GetCartParameters {
  configurations : {
    address : Address;
    currency : string;
    countryCode : string;
    configuration : CartItem[];
    promotionCode : string;
  };
}

// Get basic informations about a model
export interface GetModelParameters {
  modelId : string;
  sessionToken : string;
}

// Deletes a model
export interface DeleteModelParameters {
  sessionToken : string;
  modelId : string;
}

// Change the commisson for the model
export interface ChangeModelParameters {
  modelId : string;
  model : {
    sessionToken : string;
    commissonCurrency : string;
    commisson : number;
  };
}
