class Car {
  brand;
  model;
  speed = 0;

  constructor(carDetails) {
    this.brand = carDetails.brand;
    this.model = carDetails.model;
  }

  displayInfo() {
    return `${this.brand} ${this.model}, Speed: ${this.speed} km/h`;
  }

  go() {
    this.speed += 5;

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
}

const cars = [
  {
    brand: "Toyota",
    model: "Corolla",
  },
  {
    brand: "Tesla",
    model: "Model 3",
  },
].map((carDetails) => {
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
cars[0].brake();
cars[0].go();
console.log(cars[0].displayInfo());

console.log(cars[1].displayInfo());
cars[1].go();
cars[1].go();
cars[1].go();
cars[1].go();
cars[1].go();
cars[1].go();
cars[1].go();
cars[1].go();
cars[1].brake();
cars[1].go();
cars[1].brake();
cars[1].brake();
cars[1].brake();
cars[1].brake();
cars[1].brake();
cars[1].brake();
cars[1].brake();
cars[1].brake();
cars[1].brake();
cars[1].brake();
cars[1].brake();
cars[1].brake();
cars[1].brake();
cars[1].brake();
cars[1].brake();
cars[1].brake();
cars[1].brake();
cars[1].brake();
cars[1].brake();
cars[1].brake();
cars[1].brake();
cars[1].brake();

console.log(cars[1].displayInfo());
