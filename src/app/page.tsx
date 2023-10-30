/** @format */

"use client";
import CardLoading, { Card } from "@/components/Card";
import { useQuery } from "react-query";
import { useState } from "react";
import SearchBar from "@/components/SearchBar";
import { Mina } from "next/font/google";

type ShowData = {
  id: number;
  url: string;
  name: string;
  type: string;
  language: string;
  genres: string[];
  status: string;
  runtime: number;
  averageRuntime: number;
  premiered: string;
  ended: string;
  officialSite: string;
  schedule: {
    time: string;
    days: string[];
  };
  rating: {
    average: number;
  };
  weight: number;
  network: {
    id: number;
    name: string;
    country: {
      name: string;
      code: string;
      timezone: string;
    };
    officialSite: string;
  };
  webChannel: null | string;
  dvdCountry: null | string;
  externals: {
    tvrage: number;
    thetvdb: number;
    imdb: string;
  };
  image: {
    medium: string;
    original: string;
  };
  summary: string;
  updated: number;
  _links: {
    self: {
      href: string;
    };
    previousepisode: {
      href: string;
    };
  };
};

export default function Home() {
  const [input, setInput] = useState("");

  const api = "https://api.tvmaze.com/shows";

  const {
    isLoading,
    error,
    data: moviesData
  } = useQuery<ShowData[]>("moviesData", () =>
    fetch(api).then((res) => res.json())
  );

  // if (isLoading) return "Loading...";
  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setInput(e.target.value);
  }

  const data = input
    ? moviesData?.filter((d) =>
        d.name.toLowerCase().includes(input.toLowerCase())
      )
    : moviesData;

  return (
    <main >
      <div className="p-8 max-w-7xl flex flex-col gap-5  mx-auto  ">
        <h2 className="text-4xl font-semibold">Tv Shows </h2>
        {/* searchbar */}
        <section className="flex w-full justify-center ">
          <SearchBar onChange={handleChange} value={input} className="" />
        </section>

        <section className="flex  flex-wrap gap-3 justify-between  ">
          {isLoading
            ? Array(12)
                .fill(null)
                .map((_, i) => <CardLoading key={i} />)
            : data?.map((d, i) => (
                <Card key={i} image={d.image.medium} name={d.name} />
              ))}
        </section>
      </div>
    </main>
  );
}
