export interface Offer {
  materialConfigurationId : string;
  price : {
    net : number;
    state : string;
    hasPrice : boolean;
    errorMsg : string;
    currency : string;
    shipping : number;
    total : number;
    tax : number;
  }
}
export interface MaterialConfiguration extends Array<{
  printingService : string;
  color : string;
  material : {
    name : string;
    description : string;
  }
  finish : {
    name : string;
    description : string;
  }
  materialConfigurationId : string;
  finishGroup : {
    name : string;
    description : string;
  }
  materialGroup : {
    name : string;
    description : string;
  }
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
    }
    volume : number;
  }
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
export interface FetchModelParameters {
  modelLocation : string;
  unit : string;
  sessionToken : string;
}
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
export interface CreateOrderWithStripeParameters {
  configurations : {
    totalPrice : number;
    address : {
      lastName : string;
      firstName : string;
      countryCode : string;
    }
    currency : string;
    cartItems : {
      amount : number;
      modelId : string;
      scale : number;
      materialConfigurationId : string;
    }[];
    stripeToken : string;
    promotionCode : string;
  }
}
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
export interface GetOrderStatusParameters {
  orderId : string;
}
export interface GetAllModelsParameters {
  sessionToken : string;
}
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
export interface SubscribeToNewOffersParameters {
  modelId : string;
  scale : number;
  currency : string;
  countryCode : string;
  promotionCode : string;
}
export interface CreateOrderWithPaypalParameters {
  configurations : {
    totalPrice : number;
    address : {
      lastName : string;
      firstName : string;
      countryCode : string;
    }
    currency : string;
    cartItems : {
      amount : number;
      modelId : string;
      scale : number;
      materialConfigurationId : string;
    }[];
    promotionCode : string;
  }
}
export interface OrderParameters {
  configurations : {
    apiKey : string;
    totalPrice : number;
    address : {
      lastName : string;
      firstName : string;
      countryCode : string;
    }
    secretKey : string;
    currency : string;
    cartItems : {
      amount : number;
      modelId : string;
      scale : number;
      materialConfigurationId : string;
    }[];
    promotionCode : string;
  }
}
export interface GetMaterialConfigurationsParameters {
  materialGroupFilter : string;
  materialFilter : string;
  finishGroupFilter : string;
  printingServiceFiler : string;
  colorFilter : string;
}
export interface UploadModelParameters {
  file : File;
  unit : string;
  sessionToken : string;
}
export interface GetCartParameters {
  configurations : {
    address : {
      lastName : string;
      firstName : string;
      countryCode : string;
    }
    currency : string;
    countryCode : string;
    configuration : {
      amount : number;
      modelId : string;
      scale : number;
      materialConfigurationId : string;
    }[];
    promotionCode : string;
  }
}
export interface GetModelParameters {
  modelId : string;
  sessionToken : string;
}
export interface DeleteModelParameters {
  sessionToken : string;
  modelId : string;
}
export interface ChangeModelParameters {
  modelId : string;
  model : {
    sessionToken : string;
    commissonCurrency : string;
    commisson : number;
  }
}
