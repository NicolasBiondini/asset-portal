import Layout from "@/components/Layout";
import TransferPanel from "@/components/pages/transfer/TransferPanel";
import React from "react";

type Props = {};

function Transfer({}: Props) {
  return (
    <Layout>
      <section className="flex flex-col gap-8 w-full h-full px-8 lg:px-24 lg:py-14">
        <div className="flex flex-col gap-8 w-full max-w-[1024px] h-full mx-auto justify-center items-start">
          <div className="flex flex-col">
            <h1 className="text-colors-pink-dot text-xl font-bold font-unbounded">
              Transfer
            </h1>
            <p className="text-xs">
              Here you can send different assets within AssetHub.
            </p>
            <p className="text-xs">
              Please ensure to verify the assetId before transferring. AssetHub
              is permissionless, allowing anyone to create new assets.
            </p>
          </div>
          <TransferPanel />
        </div>
      </section>
    </Layout>
  );
}

export default Transfer;
