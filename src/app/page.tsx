import Image from "next/image";
import { getAllProducts } from "@/data/products";
import { ProductCard } from "@/components/ProductCard";
import { assetPath } from "@/lib/assetPath";

export default function HomePage() {
  const products = getAllProducts();

  return (
    <div>
      <section className="bg-blue-50 py-16 px-4">
        <div className="mx-auto max-w-5xl">
          <div className="flex flex-col items-center gap-8 lg:flex-row lg:items-stretch lg:justify-between lg:gap-12">
            <div className="flex min-h-[16rem] flex-1 flex-col text-center lg:min-h-[20rem] lg:text-left">
              <h1 className="flex flex-1 items-center justify-center lg:justify-start">
                <Image
                  src={assetPath("/logo.png")}
                  alt="Homebot"
                  width={560}
                  height={180}
                  className="h-full w-auto object-contain"
                  priority
                />
              </h1>
              <p className="mt-4 text-center text-xl text-blue-700 sm:text-2xl">
                Buy & Rest
              </p>
              <p className="mt-4 text-lg text-blue-700">
                Smart home cleaning robots that handle floors, dishes, laundry, and
                more — so you can focus on what matters.
              </p>
              <a
                href="#models"
                className="mt-8 inline-block rounded-md bg-emerald-600 px-6 py-3 text-base font-medium text-white hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2"
              >
                Shop Models
              </a>
            </div>
            <div className="relative h-64 w-full max-w-lg flex-shrink-0 lg:h-80">
              <Image
                src={assetPath("/models.png")}
                alt="Homebot X1, X2, and X3 cleaning robots"
                fill
                className="object-contain object-center"
                sizes="(max-width: 1024px) 100vw, 512px"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      <section id="models" className="mx-auto max-w-6xl px-4 py-12">
        <h2 className="text-2xl font-semibold text-blue-900">Our Models</h2>
        <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((product) => (
            <ProductCard key={product.slug} product={product} />
          ))}
        </div>
      </section>
    </div>
  );
}
