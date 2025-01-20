// adding chatcomponent

import { useEffect, useState } from "react";
import ChatComponent from "./ChatComponent";
import toast from "react-hot-toast";
import { Api } from "../../util/utils";
import ReloadSvg from "../../util/ReloadSvg";
import { ReloadModal } from "./ReloadModal";

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
  const [reloadApiLoading, setReloadApiLoading] = useState<
    "loading" | "success" | "error" | "none" | "updated"
  >("none");
  const [processApiLoading, setProcessApiLoading] = useState<
    "loading" | "success" | "error" | "none"
  >("none");
  const [knowledgeBaseApiLoading, setKnowledgeBaseApiLoading] = useState<
    "loading" | "success" | "error" | "none"
  >("none");

  const [welcomeMessage, setWelcomeMessage] = useState(
    "How can I help you today "
  );
  const handleKnowledgeBaseReload = async () => {
    // setScreenLoading(true);
    setKnowledgeBaseApiLoading("loading");
    try {
      const url = `${Api}/load-knowledge-base/`;
      const response = await fetch(url, { method: "POST" });
      if (response.status === 200) {
        // setScreenLoading(false);
        setKnowledgeBaseApiLoading("success");
      } else {
        // setScreenLoading(false);
        setKnowledgeBaseApiLoading("error");
        toast.error("Unable to load Knowledge Base ");
      }
    } catch {
      // setScreenLoading(false);
      setKnowledgeBaseApiLoading("error");
      toast.error("Unable to load Knowledge Base ");
    }
  };

  // useEffect(() => {
  //   handleReloadAndFetchFiles();
  // }, []);

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

  async function handleReloadAndFetchFiles() {
    setScreenLoading(true);
    setReloadApiLoading("loading");
    try {
      const url = `${Api}/sync-drive/`;
      const response = await fetch(url, { method: "POST" });
      if (response.status === 200) {
        setReloadApiLoading("success");
        handleProcessFile();
      } else if (response.status === 204) {
        toast.success("Already Up TO Date");
        setReloadApiLoading("updated");
        setKnowledgeBaseApiLoading("success");
        //  setScreenLoading(false);
      } else {
        setReloadApiLoading("error");
        toast.error("Unable to load Knowledge Base ");
      }
    } catch {
      setReloadApiLoading("error");
      toast("Unable to load Knowledge Base ");
    }
  }

  const sample1 = "Add Any text";
  const sample2 = "Add any question .";
  const sample3 = "Generate a Report";

  const handleProcessFile = async () => {
    const url = `${Api}/process-files/`;
    setProcessApiLoading("loading");
    try {
      const response = await fetch(url, {
        method: "POST",
      });

      if (response.status === 200) {
        setProcessApiLoading("success");
        handleKnowledgeBaseReload();
      } else {
        setProcessApiLoading("error");
        toast.error("Unable to load Knowledge Base ");
      }
    } catch {
      setProcessApiLoading("error");
      toast("Unable to load Knowledge Base ");
    }
  };

  return (
    <div className="flex w-full h-full flex-col relative  bg-gradient-to-b from-[#CDC7F1] to-[#FEF3F7]  ">
      {screenloading && (
        <ReloadModal
          reloadApiLoading={reloadApiLoading}
          knowledgeBaseApiLoading={knowledgeBaseApiLoading}
          processApiLoading={processApiLoading}
          setKnowledgeBaseApiLoading={setKnowledgeBaseApiLoading}
          setScreenLoading={setScreenLoading}
          handleReloadAndFetchFiles={handleReloadAndFetchFiles}
          setProcessApiLoading={setProcessApiLoading}
          setReloadApiLoading={setReloadApiLoading}
        />
      )}

      <header className="flex justify-between items-center px-2 md:px-4 py-2 md:py-3 border-b border-gray-200">
        <div className="px-6 pt-2 pb-1 text-xl md:text-3xl flex justify-center items-center">
          <h3 className="text-White text-center  mb-1 font-bold">SciRAG</h3>
        </div>

        <button
          className="px-4 py-2 bg-white border shadow-lg border-gray-200 rounded-md hover:bg-gray-50 flex items-center gap-2 text-sm"
          onClick={() => handleReloadAndFetchFiles()}
        >
          <div>
            <ReloadSvg />
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
