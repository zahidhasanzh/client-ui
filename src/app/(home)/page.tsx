import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Image from "next/image";
import ProductCard, { Product } from "./components/product-card";
import { Category } from "@/lib/types";

const products: Product[] = [
  {
    id: "1",
    name: "Margrita Pizza",
    description: "This is a very tasty pizza",
    image: "/pizza-main.png",
    price: 50,
  },
  {
    id: "2",
    name: "Margrita Pizza",
    description: "This is a very tasty pizza",
    image: "/pizza-main.png",
    price: 50,
  },
  {
    id: "3",
    name: "Margrita Pizza",
    description: "This is a very tasty pizza",
    image: "/pizza-main.png",
    price: 50,
  },
  {
    id: "4",
    name: "Margrita Pizza",
    description: "This is a very tasty pizza",
    image: "/pizza-main.png",
    price: 50,
  },
  {
    id: "5",
    name: "Margrita Pizza",
    description: "This is a very tasty pizza",
    image: "/pizza-main.png",
    price: 50,
  },
];

export default async function Home() {
  const categoryResponse = await fetch(
    `${process.env.BACKEND_URL}/api/catalog/categories`,
    {
      next: {
        revalidate: 3600, // 1 hour
      },
    }
  );

  if (!categoryResponse.ok) {
    throw new Error("Faield to fetch categories");
  }

  const categories: Category[] = await categoryResponse.json();
  console.log(categories);
  return (
    <>
      <section className="bg-white">
        <div className="container flex items-center justify-between py-24">
          <div>
            <h1 className="text-7xl font-black font-sans leading-20">
              Super Delicious Pizza in <br />
              <span className="text-primary">Only 45 Minutes!</span>
            </h1>
            <p className="text-2xl mt-8 max-w-lg leading-snug">
              Enjoy a Free Meal if Your Order Takes More Than 45 Minutes!
            </p>
            <Button className="mt-8 text-lg rounded-full py-7 px-6 font-bold">
              Get your pizza now
            </Button>
          </div>
          <div>
            <Image
              alt="pizza-main"
              src={"/pizza-main.png"}
              width={400}
              height={400}
            />
          </div>
        </div>
      </section>

      <section>
        <div className="container py-12">
          <Tabs defaultValue="pizza">
            <TabsList>
              {categories.map((category) => (
                <TabsTrigger key={category._id} value={category._id} className="text-md">
                   {category.name}
                </TabsTrigger>
              ))}

              {/* <TabsTrigger value="beverages" className="text-md">
                Beverages
              </TabsTrigger> */}
            </TabsList>
            <TabsContent value="pizza">
              <div className="grid xl:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-6 mt-6">
                {products.map((product) => (
                  <ProductCard product={product} key={product.id} />
                ))}
              </div>
            </TabsContent>
            <TabsContent value="beverages">
              <div className="grid xl:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-6 mt-6">
                {products.map((product) => (
                  <ProductCard product={product} key={product.id} />
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>
    </>
  );
}
