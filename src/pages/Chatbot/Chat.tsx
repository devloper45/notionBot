// adding chatcomponent

import { useEffect, useState } from "react";
import ChatComponent from "./ChatComponent";
import toast from "react-hot-toast";

interface Message {
  id: string;
  text: string;
  sender: "user" | "bot";
}

export default function Chat() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [chatHistory, setChatHistory] = useState("");
  const [loading, setLoading] = useState(false);
  const [screenloading, setScreenLoading] = useState(false);

  const [welcomeMessage, setWelcomeMessage] = useState(
    "How can I help you today "
  );
  const handleKnowledgeBaseReload = async () => {
    setScreenLoading(true);
    try {
      const response = await fetch(
        "http://64.225.5.175:8000/load-knowledge-base/",
        { method: "POST" }
      );
      if (response.status === 200) {
        setScreenLoading(false);
      } else {
        setScreenLoading(false);
        toast("Unable to load Knowledge Base ");
      }
    } catch {
      setScreenLoading(false);
      toast("Unable to load Knowledge Base ");
    }
  };

  useEffect(() => {
    handleKnowledgeBaseReload();
  }, []);


  const handleSendMessage = async () => {
    if (inputValue.trim() !== "") {
      setLoading(true);
      const userMessage = { sender: "user", text: inputValue };
      const updatedChatHistory = `${chatHistory} user: ${inputValue}\n`;
      setMessages((prevMessages: any) => [...prevMessages, userMessage]);
      setChatHistory(updatedChatHistory);
      setInputValue("");
      sendMessageToBot(userMessage.text);
    }
  };

  async function sendMessageToBot(userMessage: string) {
    try {
      const formData = new FormData();
      formData.append("question", userMessage);

      const response = await fetch("http://64.225.5.175:8000/ask-question/", {
        method: "POST",
        body: formData,
      });

      const result = await response.json();
      console.log("API Response:", result);
      setWelcomeMessage("");

      const botResponseText = result?.payload?.answer;
      const botQuestions = result?.payload?.questions || [];

      const botMessage = {
        text: botResponseText,
        sender: "bot",
        questions: botQuestions,
      };

      setMessages((prevMessages: any) => [...prevMessages, botMessage]);
      setChatHistory(
        (prevChatHistory) => `${prevChatHistory}bot: ${botResponseText}\n`
      );

      setLoading(false);
    } catch (error) {
      console.error("Error while sending message to bot:", error);
      setLoading(false);
    }
  }

 

  const sample1 = "Add Any text";
  const sample2 = "Add any question .";
  const sample3 = "Generate a Report";


  return (
    <div className="flex w-full h-full flex-col relative  bg-gradient-to-b from-[#CDC7F1] to-[#FEF3F7]  ">
      {screenloading && (
        <div className=" bg-black/60 w-full h-screen absolute flex justify-center items-center ">
          <div className=" flex text-white ">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-8 animate-spin text-white"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99"
              />
            </svg>
            <span className=" ml-2 mt-1 animate-pulse">Loading ...</span>
          </div>
        </div>
      )}
      <header className="flex justify-between items-center px-2 md:px-4 py-2 md:py-3 border-b border-gray-200">
        <div className="px-6 pt-2 pb-1 text-xl md:text-3xl flex justify-center items-center">
          <h3 className="text-White text-center  mb-1 font-bold">SciRAG</h3>
        </div>

        <button
          className="px-4 py-2 bg-white border shadow-lg border-gray-200 rounded-md hover:bg-gray-50 flex items-center gap-2 text-sm"
          onClick={() => handleKnowledgeBaseReload()}
        >
          <div>
            <svg
              width="25"
              height="25"
              viewBox="0 0 25 25"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              href="http://www.w3.org/1999/xlink"
            >
              <rect width="25" height="25" fill="url(#pattern0_2_206)" />
              <defs>
                <pattern
                  id="pattern0_2_206"
                  patternContentUnits="objectBoundingBox"
                  width="1"
                  height="1"
                >
                  <use href="#image0_2_206" transform="scale(0.00195312)" />
                </pattern>
                <image
                  id="image0_2_206"
                  width="512"
                  height="512"
                  href="data:image/png;base64,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"
                />
              </defs>
            </svg>
          </div>
          <span className="font-semibold">Reload </span>
        </button>
      </header>
      <div className="flex  justify-center top-9 items-center w-full h-[calc(100vh-6rem)]  bg-secondaryGrey300  ">
        <div className={`flex  overflow-hidden w-full h-[calc(100vh-6rem)]  `}>
          <div
            className={`flex overflow-auto w-full justify-center transition-all duration-300 `}
          >
            <div className="   w-full h-[calc(100vh-6rem)] ">
              <div
                className={`  flex h-[calc(100vh-6rem)]  flex-col overflow-hidden z-10  `}
              >
                <ChatComponent
                  sample1={sample1}
                  sample3={sample3}
                  sample2={sample2}
                  welcomeMessage={welcomeMessage}
                  messages={messages}     
                  loading={loading}
                  setLoading={setLoading}
                  setInputValue={setInputValue}             
                />

                <div className="flex   mt-1 w-full  justify-center  ">
                  <div
                    className={`flex bg-white mt-2 ${
                      messages?.length === 0
                        ? "md:w-3/6 w-5/6 "
                        : "md:w-3/5 w-5/6"
                    } justify-center mb-8 py-2 rounded-2xl border border-secondaryGrey500 shadow-md`}
                  >
                    <input
                      type="text"
                      value={inputValue}
                      onChange={(e) => setInputValue(e.target.value)}
                      placeholder="Write Query to Chat ..."
                      className="w-full ml-2 pl-2 py-1 sm:py-2 bg-White border-none rounded-l-3xl focus:outline-none  text-sm !outline-none text-wrap"
                      onKeyDown={(e) =>
                        e.key === "Enter" && handleSendMessage()
                      }
                    />

                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 23 23"
                      fill=""
                      xmlns="http://www.w3.org/2000/svg"
                      onClick={handleSendMessage}
                      className="w-8 cursor-pointer m-1 h-8 mx-2 p-1 bg-black rounded-full "
                    >
                      <path
                        d="M21.8718 0.816529C21.7117 0.656463 21.5087 0.546086 21.2874 0.498685C21.066 0.451285 20.8356 0.468882 20.624 0.549359L1.04968 7.95818H1.04577C0.820072 8.04499 0.626676 8.19935 0.491992 8.40018C0.357308 8.60101 0.287903 8.83852 0.293257 9.08028C0.29861 9.32203 0.37846 9.55624 0.521902 9.75091C0.665344 9.94558 0.865383 10.0912 1.0947 10.168L1.11476 10.1743L7.83315 13.0432C7.96419 13.083 8.10337 13.0877 8.2368 13.0569C8.37023 13.0261 8.49325 12.9608 8.59356 12.8676L19.3763 2.8203C19.4084 2.78817 19.4465 2.76269 19.4885 2.7453C19.5305 2.72791 19.5755 2.71896 19.6209 2.71896C19.6664 2.71896 19.7114 2.72791 19.7533 2.7453C19.7953 2.76269 19.8335 2.78817 19.8656 2.8203C19.8977 2.85243 19.9232 2.89057 19.9406 2.93255C19.958 2.97453 19.9669 3.01953 19.9669 3.06496C19.9669 3.1104 19.958 3.15539 19.9406 3.19737C19.9232 3.23935 19.8977 3.27749 19.8656 3.30962L9.81784 14.0874C9.72462 14.1877 9.65933 14.3108 9.62851 14.4442C9.59768 14.5776 9.6024 14.7168 9.64218 14.8478L12.512 21.5701C12.515 21.5799 12.5179 21.5887 12.5213 21.598C12.6779 22.0516 13.0743 22.3717 13.5533 22.3932C13.5744 22.3932 13.5817 22.3932 13.6023 22.3932C13.8441 22.3946 14.0808 22.3232 14.2815 22.1882C14.4822 22.0533 14.6377 21.8612 14.7277 21.6367L22.1355 2.06773C22.2172 1.85599 22.2357 1.62513 22.1889 1.40308C22.1421 1.18104 22.0319 0.977304 21.8718 0.816529Z"
                        fill="#ffffff"
                      />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
