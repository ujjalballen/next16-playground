import { Roboto, Poppins, Oswald } from "next/font/google";

// const roboto = Roboto({
//   weight: ["100", "200", "300", "400", "500", "600", "700"],
//   subsets: ["latin"],
// });

// const poppins = Poppins({
//   weight: ["100", "200", "300", "400", "500", "600", "700"],
//   subsets: ["latin"],
// });

// const oswald = Oswald({
//   weight: ["200", "300", "400", "500", "600", "700"],
//   subsets: ["latin"],
// });

export default async function ExampleFront(params) {
  return (
    <div>
      <h1 className={`text-4xl`}>
        Amet consectetur adipisicing elit
      </h1>
      <p className={``}>
        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Dicta, a
        dignissimos in molestias nihil fuga nulla vel quidem perferendis
        accusamus? Voluptas maiores error veritatis possimus eligendi ex magnam
        delectus aspernatur.
      </p>
    </div>
  );
}
