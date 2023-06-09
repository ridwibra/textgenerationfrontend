import Head from "next/head";
import Image from "next/image";
// import { Inter } from "@next/font/google";
import { useState } from "react";

// const inter = Inter({ subsets: ["latin"] });
const url = process.env.ENDPOINT;
export default function Home() {
  const [word, setWord] = useState("");
  const [number, setNumber] = useState(1);
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  // const url = process.env.ENDPOINT;
  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await fetch(
        `https://text-generation.onrender.com/generate?seed=${word}&length=${number}`
      )
        .then((res) => res.json())
        .then((data) => setText(data))
        .catch((err) => console.log(err));
    } catch (error) {
      setIsError(true);
    }
    setLoading(false);
  };

  // ("https://text-generation.onrender.com/generate?seed=love&length=100");

  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className=" bg-blue-100 h-full">
        <div className="flex flex-col w-full items-center  bg-blue-100 h-full">
          <h1 className="mt-4 mx-auto mb-10 text-2xl font-bold text-gray-900 dark:text-white">
            BE YOUR OWN SHAKESPEARE
          </h1>

          <h3 className=" text-lg font-semibold text-gray-900 dark:text-white">
            STEPS:
          </h3>
          <ul className="max-w-md list-disc space-y-1 text-gray-500 list-inside dark:text-gray-400">
            <li className="">
              Enter a word, preferably from the works of Shakespeare, to start
              with
            </li>
            <li>Enterthe number of characters to generate</li>
            <li>Click on the generate button and wait</li>
            <li>The bigger the number, the longer the wait</li>
            <li>Enjoy your work</li>
          </ul>
          <form onSubmit={onSubmit} className="mt-4">
            <div>
              <div className="mb-4">
                <label
                  htmlFor="word"
                  className="block text-gray-700 text-sm font-bold mb-2"
                >
                  Word:
                </label>
                <input
                  type="text"
                  placeholder="enter only one word"
                  required
                  id="word"
                  autoFocus
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  onChange={(e) => setWord(e.currentTarget.value)}
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="number"
                  className="block text-gray-700 text-sm font-bold mb-2"
                >
                  Number:
                </label>
                <input
                  type="number"
                  min={1}
                  max={500000}
                  placeholder="enter a number"
                  required
                  id="number"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  onChange={(e) => setNumber(e.currentTarget.value)}
                />
              </div>
            </div>
            <button
              className="mb-6 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
              disabled={loading}
            >
              {loading ? "Loading..." : "Generate"}
            </button>
          </form>
          <div>
            <div className=" container w-80 mt-5 mx-auto bg-green-200 rounded-xl shadow  p-8 font-bold mb-5">
              {isError ? (
                <div className="text-lg text-red-600 pb-6">
                  Sorry something went wrong try again later.
                </div>
              ) : (
                text
              )}
            </div>
            {text ? <div className="text-center mb-3">ENDS</div> : ""}
          </div>
        </div>
      </div>
    </>
  );
}
