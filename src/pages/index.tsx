import Head from "next/head";
import Image from "next/image";
import example_image from "../../public/images/template_example.png";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import MaxWidthWrapper from "@/components/max-width-wrapper";

export default function Home() {
  return (
    <>
      <MaxWidthWrapper className="space-y-24">
        <h1 className="px-12 text-center text-8xl font-bold tracking-wide">
          unleash your{" "}
          <span className="bg-gradient-to-r from-pink-500 to-violet-500 bg-clip-text text-transparent">
            spark
          </span>
          , illuminate your{" "}
          <span className="underline decoration-violet-500/50 underline-offset-2">
            journey
          </span>
          !
        </h1>
        <div>
          <Button asChild>
            <Link href="/register">Get Started</Link>
          </Button>
        </div>
        <div className="shadow-xl">
          <Image src={example_image} alt="example" />
        </div>
      </MaxWidthWrapper>
    </>
  );
}
