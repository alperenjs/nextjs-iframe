import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";
import styles from "@/styles/Home.module.css";
import { useRef, useState } from "react";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const [currentFRAME, setCurrentFRAME] = useState("parasut");
  const [src, setSRC] = useState("http://localhost:3001");
  const [alperenSRC, setAlperenSRC] = useState("http://alperensozen.com");

  const parasutURL = "http://localhost:3001";
  const contentRef = useRef(null);
  const alperensozenREF = useRef(null);

  const changeInnerPage = (path) => {
    const newData = { path: parasutURL + path };
    contentRef.current.contentWindow.postMessage(newData, "*");
  };

  const showNova = (path) => {
    setAlperenSRC(path);
  };

  const handleIframePageChange = (app, path) => {
    setCurrentFRAME(app);

    if (app === "parasut") {
      changeInnerPage(path);
    } else if (app === "nova") {
      showNova(path);
    }
  };

  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <div className={styles.sideBar}>
          <h3>Wake up neo...</h3>
          <div className={styles.menuContent}>
            <ul>
              <li>
                <button
                  onClick={() => handleIframePageChange("parasut", "/contact")}
                >
                  Contact Page
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleIframePageChange("parasut", "/about-us")}
                >
                  About Us
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleIframePageChange("parasut", "/clients")}
                >
                  Clients Page
                </button>
              </li>

              <hr />
              <li>
                <button
                  onClick={() =>
                    handleIframePageChange(
                      "nova",
                      "http://alperensozen.com/onedose"
                    )
                  }
                >
                  Change Nova's Path
                </button>
              </li>
              <li>
                <button
                  onClick={() =>
                    handleIframePageChange("nova", "http://alperensozen.com/")
                  }
                >
                  Change Nova's 2
                </button>
              </li>
            </ul>
          </div>
        </div>

        <div className={styles.iframeContainer}>
          <iframe
            style={{
              visibility: currentFRAME != "nova" ? "visible" : "hidden",
            }}
            name="iaps"
            ref={contentRef}
            className={styles.iframeClass}
            height={"50%"}
            width={"100%"}
            src={src}
          ></iframe>

          <iframe
            style={{
              visibility: currentFRAME != "parasut" ? "visible" : "hidden",
            }}
            name="alperensozen"
            ref={alperensozenREF}
            className={styles.iframeClass}
            height={"50%"}
            width={"100%"}
            src={alperenSRC}
          ></iframe>
        </div>
      </main>
    </>
  );
}
