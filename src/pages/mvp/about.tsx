import Layout from "@/components/Layout";
import { LINKS, SUB_MENU_LINKS } from "@/config/constants";
import Link from "next/link";
import React from "react";

type Props = {};

function about({}: Props) {
  return (
    <Layout>
      <section className="flex flex-col gap-8 w-full h-full px-8 lg:px-24 lg:py-14">
        <div className="flex flex-col gap-8 w-full max-w-[1024px] h-full mx-auto justify-center items-start">
          <div className="flex flex-col w-full gap-5">
            <h1 className="text-colors-pink-dot text-xl font-bold font-unbounded">
              About us
            </h1>
            <div className=" w-full md:w-[80%] flex flex-col gap-3">
              <p className="">
                Welcome to the first version (MVP) of{" "}
                <span className="font-bold">AssetPortal</span>! We truly
                appreciate your interest in the project!
              </p>
              <p className="">
                <span className="font-bold">
                  AssetPortal aims to be the gateway to the ecosystem
                </span>
                {
                  ". Leveraging the structure of Asset Hub, we are in the process of creating an open-source platform that allows interaction with the ecosystem in a simple and intuitive way, simplifying and unifying processes into a single portal."
                }
              </p>
              <p className="">
                {
                  "We are aware of the importance of Asset Hub, the idea of transferring token holding from the Polkadot relay chain, and the limitations it currently faces due to a lack of UX/UI. That is why we decided to create this portal and aim to increase the number of Asset Hub users and the ecosystem as a whole. "
                }
              </p>
              <p className="">
                {
                  "Our goal is to create a portal where users can send their tokens from a CEX to Asset Hub (to the wallet of their choice), view their assets, and from there provide the corresponding facilities to enable them to transfer those tokens to the parachain of their choice or interact with Asset Hub."
                }
              </p>{" "}
              <p className="">{"In AssetPortal, users will be able to:"}</p>
              {
                //TODO:
              }
              <ul className="flex flex-col gap-1 list-disc list-inside pl-10 font-bold">
                <li>
                  View their wallet balances
                  <span className="font-normal">
                    {" "}
                    (either in read-only mode or by connecting an installed
                    wallet).
                  </span>
                </li>
                <li>Transfer their tokens.</li>
                <li>Use XCM to redirect their tokens to a parachain.</li>
                <li>Discover the DEFI ecosystem of Polkadot.</li>
                <li>Swap assets on the Asset Hub pallet.</li>
                <li>Use the Polkadot-Kusama bridge.</li>
                <li>Create and mint new assets.</li>
                <li>{"Manage the assets they've created."}</li>
                <li>Interact with their NFTs.</li>
                <li>And more.</li>
              </ul>
              <p className="">
                {"Additionally, we plan to connect "}
                <span className="font-bold">Kusama Asset Hub</span>
                {" and bring those functionalities as well."}
              </p>
              <p className="">
                {
                  "The idea is to concentrate the most important interactions of Asset Hub in one place, with a good UX/UI for the end user (and focused on the new ecosystem users). And also all the transaction/pool benefits will go to the treasury, we are not receiving any monetary reward here."
                }
              </p>
              <p className="">
                <span className="font-bold">
                  We are not looking to compete with any parachain;
                </span>
                {
                  " on the contrary, our idea is to collaborate with various projects to introduce them to the users, and provide ease of discovery for new projects within the ecosystem (which can often be overwhelming, especially for new Polkadot users), and help the ecosystem grow. We are completely open to dialogue with any project and willing to prepare something together (whether it be functionalities, information, or anything) as long as it benefits the ecosystem."
                }
              </p>
              <p className="">
                {
                  "Moreover, it is worth mentioning that the project is completely "
                }
                <span className="font-bold">open-source</span>
                {" (you can see all the code "}
                <Link
                  href={SUB_MENU_LINKS[0].link}
                  target="_blank"
                  className="text-colors-pink-dot underline hover:text-colors-pink-secondary transition-all"
                >
                  here
                </Link>
                {")"}
                {
                  ', with deployment on centralized servers, a future deployment on IPFS, and encouraging more experienced users to check the JS that runs, perform their own deploys if they want more "anonymity" or security, and even fork and modify it. The idea is to build a public good where anyone can use it (from the newest user to the most veteran) and customize it to their liking.'
                }
              </p>
              <p className="">
                {"Having said all this, let us introduce ourselves: we are "}
                <Link
                  href={LINKS.socialMedia.twitter_nachito}
                  target="_blank"
                  className="text-colors-pink-dot underline hover:text-colors-pink-secondary transition-all"
                >
                  Nachito
                </Link>
                {
                  ", Polkadot agent, co-founder of Dotcast, (author of the book) “Sin miedo a construir” PBA book, and "
                }
                <Link
                  href={LINKS.socialMedia.twitter_nicolas}
                  target="_blank"
                  className="text-colors-pink-dot underline hover:text-colors-pink-secondary transition-all"
                >
                  Nicolás
                </Link>
                {
                  ", PBA graduate from the UC Berkeley edition in the engineering track. Feel free to contact us, give us feedback, etc. We really want this project to help users, so everything adds up!"
                }
              </p>
              <p className="">
                {"We invite you to follow us on the official Twitter "}{" "}
                <Link
                  href={SUB_MENU_LINKS[1].link}
                  target="_blank"
                  className="text-colors-pink-dot underline hover:text-colors-pink-secondary transition-all"
                >
                  @AssetPortal
                </Link>
                {" and thank you in advance for taking the time to read this!"}
              </p>
            </div>
          </div>
          <div className="flex flex-col w-full h-[80%] items-center justify-start mt-auto  "></div>
        </div>
      </section>
    </Layout>
  );
}

export default about;
