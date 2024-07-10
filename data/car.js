class Car {
  #brand;
  #model;
  isTrunkOpen = false;
  speed = 0;


  constructor(carDetails) {
    this.#brand = carDetails.brand;
    this.#model = carDetails.model;
  }

  displayInfo() {
    const trunkStatus = this.isTrunkOpen ? 'open' : 'close';

    return `${this.#brand} ${this.#model}, Speed: ${this.speed} km/h, Trunk: ${trunkStatus}`;
  }

  go() {
    if (!this.isTrunkOpen) {
      this.speed += 5;
    }

    if (this.speed >= 200) {
      this.speed = 200;
    }
  }

  brake() {
    this.speed -= 5;

    if (this.speed <= 0) {
      this.speed = 0;
    }
  }

  openTrunk() {
    if(this.speed === 0) {
      this.isTrunkOpen = true;
    } else {
      console.log('car running, cant open trunk')
    }
  }

  closeTrunk() {
    this.isTrunkOpen = false;
  }
};

class RaceCar extends Car{
  acceleration;

  constructor(carDetails) {
    super(carDetails);
    this.acceleration = carDetails.acceleration;
  }

  go() {
    this.speed += this.acceleration;

    if (this.speed >= 300) {
      this.speed = 300;
    }
  }

  openTrunk() {
    console.log('racecars do not have a trunk')
  }

  closeTrunk() {
    console.log('racecars do not have a trunk')
  }
};

const cars = [
  {
    brand: "Toyota",
    model: "Corolla",
  },
  {
    brand: "Tesla",
    model: "Model 3",
  },
  {
    brand: "McLaren",
    model: "F1",
    acceleration: 20,
  },
].map((carDetails) => {
  if(carDetails.acceleration) {
    return new RaceCar(carDetails)
  }
  return new Car(carDetails);
});

// cars.forEach((car) => {
//   console.log(car.go());
// });
console.log(cars[0].displayInfo());
cars[0].go();
cars[0].go();
cars[0].go();
cars[0].go();
cars[0].go();
console.log(cars[0].displayInfo());



console.log('');
console.log(cars[1].displayInfo());
cars[1].closeTrunk();
cars[1].go();
console.log(cars[1].displayInfo());

console.log('');
console.log(cars[2].displayInfo());
cars[2].openTrunk();
cars[2].go();
cars[2].go();
cars[2].closeTrunk();
cars[2].go();
cars[2].go();
cars[2].go();
cars[2].go();
cars[2].go();
cars[2].go();
cars[2].go();
cars[2].go();
cars[2].go();
cars[2].go();
cars[2].go();
cars[2].go();
cars[2].go();
console.log(cars[2].displayInfo());

