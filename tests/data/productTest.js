import {Product, Appliance, Clothing} from "../../data/products.js";

describe('test suite: Product', () => {
  let product;

beforeEach(() => {
  // Setup code for all tests
  product = new Product(
    {
    id: "id1",
    image: "images/products/umbrella.jpg",
    name: "Umbrella",
    rating: {
      stars: 2.5,
      count: 23,
    },
    priceCents: 590,
  }
);
});

  it('has the correct properties', () => {
    expect(product.id).toEqual("id1");
  })
});

describe('test suite: Appliance', () => {
  let appliance;

beforeEach(() => {
  // Setup code for all tests

  appliance = new Appliance(
    {
    id: "54e0eccd-8f36-462b-b68a-8182611d9add",
    image: "images/products/black-2-slot-toaster.jpg",
    name: "2 Slot Toaster - Black",
    rating: {
      stars: 5,
      count: 2197,
    },
    priceCents: 1899,
    type: 'appliance',
    instructionsLink: 'images/appliance-instructions.png',
    warrantyLink:  'images/appliance-warranty.png',
    keywords: ["toaster", "kitchen", "appliances"],
  }
);
});

  it('has the correct properties', () => {
    expect(appliance.warrantyLink).toEqual('images/appliance-warranty.png');
  })
});

describe('test suite: Clothing', () => {
  let clothing;

beforeEach(() => {
  // Setup code for all tests
  clothing = new Clothing({
    id: "5968897c-4d27-4872-89f6-5bcb052746d7",
    image: "images/products/women-chiffon-beachwear-coverup-black.jpg",
    name: "Women's Chiffon Beachwear Cover Up - Black",
    rating: {
      stars: 4.5,
      count: 235,
    },
    priceCents: 2070,
    keywords: ["robe", "swimsuit", "swimming", "bathing", "apparel"],
    type: "clothing",
    sizeChartLink: "images/clothing-size-chart.png",
  }
);
});

  it('has the correct properties', () => {
    expect(clothing.priceCents).toEqual(2070);
  })
});
