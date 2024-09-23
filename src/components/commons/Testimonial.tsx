import Image from "next/image";
import React from "react";

const defaultTestimonial = `BeeHaiv is our go-to platform for business banking. They provide
            incredible support and an easy-to-navigate UI which lets us
            consolidate our checking accounts and other treasury management
            accounts into one dashboard`;
export default function Testimonial({
  image = "/home/footprint.svg",
  testimonial = defaultTestimonial,
  name = "Eli Wachs, CEO of Footprint",
  ceo = "/home/ceo-footprint.png",
}: {
  image?: string;
  testimonial?: string;
  name?: string;
  ceo?: string;
}) {
  return (
    <section className="w-screen bg-gray-100 py-16">
      <div className="container grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="order-2 lg:order-1 flex flex-col space-y-6 justify-center">
          {image.length > 1 && (
            <Image
              src={image}
              alt="footprint"
              width={240}
              height={74}
              className="h-6 object-fit w-fit mb-8"
            />
          )}
          <strong className="text-4xl font-semibold">{testimonial}</strong>
          <span className="text-base block">{name}</span>
          <p className="text-xs">
            Testimonials on this website/app reflect individual experiences and
            opinions. Results may vary and are not guaranteed for all users. The
            case studies discussed herein were selected based on objective
            non-performance based criteria and are provided for illustrative
            purposes. There is no guarantee that your experience on BeeHaiv will
            be the same.
          </p>
        </div>
        <div className="order-1 lg:order-2 w-full">
          <Image
            src={ceo}
            alt="footprint-ceo"
            width={620}
            height={620}
            className="object-fill md:object-cover lg:object-fill w-full lg:w-fit h-full"
          />
        </div>
      </div>
    </section>
  );
}
