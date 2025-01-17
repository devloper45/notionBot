import React, { useRef, useEffect, FC } from "react";
import { FaRobot } from "react-icons/fa";
import ReactMarkdown from "react-markdown";
interface Message {
  id: string;
  text: string;
  sender: "user" | "bot";
}

interface ChatComponentProps {
  sample1: string;
  sample2: string;
  sample3: string;
   welcomeMessage: string;
  messages: Message[];
  loading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;

  setInputValue: React.Dispatch<React.SetStateAction<string>>;
}



const ChatComponent: FC<ChatComponentProps> = ({
  sample1,
  sample2,
  sample3,
  welcomeMessage,
  messages,
  loading,
  setInputValue,
}) => {
  const messagesContainerRef: any = useRef(null);

  const handlebottemplate = (svalue: string) => {
    setInputValue(svalue);
  };

  const scrollToBottom = () => {
    if (messagesContainerRef.current) {
      messagesContainerRef.current.scrollTop =
        messagesContainerRef.current.scrollHeight;
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);
  return (
    <>
      <div
        className="flex-1 p-3 overflow-y-auto hide-scrollbar h-[calc(100vh-16rem)]  border "
        ref={messagesContainerRef}
      >
        {messages?.length === 0 && welcomeMessage && (
          <div className=" w-full flex justify-center ">
            <div className="flex flex-col  sm:mx-20 md:w-3/4  w-11/12  top-20 justify-center items-center h-[calc(100vh-16rem)]">
              <div className=" m-3 mb-5">
                <span>Hi , there 👋</span>
                
              </div>
              <p className="text-White font-bold  text-[1rem] mb-1 text-center sm:text-2xl">
                {welcomeMessage}?
              </p>
              <p className=" text-xs sm:text-[1rem] leading-relaxed md:w-4/6 w-10/12  m-4 text-gray-500 text-center">
                This code will display a prompt asking the user for their name,
                and then it will display a greeting message with the name
                entered by the user.
              </p>
              <div className=" grid sm:grid-cols-2 md:grid-cols-3 text-gray-600 justify-around text-2xl mt-2 md:mt-11 w-11/12 md:w-4/6 gap-2 text-gray ">
                <div
                  onClick={() => handlebottemplate(sample1)}
                  className="flex flex-col text-xs sm:text-sm items-center border bg-white border-[#C1C1C1]  rounded-2xl hover:bg-[#e9e8e8] md:py-4  p-2  md:m-2 md:my-4 bg-opacity-50 text-White text-center cursor-pointer"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="size-6 sm:size-7 m-1"
                  >
                    <path
                      stroke-linecap="round"
                      strokeLinejoin="round"
                      d="M12 18v-5.25m0 0a6.01 6.01 0 0 0 1.5-.189m-1.5.189a6.01 6.01 0 0 1-1.5-.189m3.75 7.478a12.06 12.06 0 0 1-4.5 0m3.75 2.383a14.406 14.406 0 0 1-3 0M14.25 18v-.192c0-.983.658-1.823 1.508-2.316a7.5 7.5 0 1 0-7.517 0c.85.493 1.509 1.333 1.509 2.316V18"
                    />
                  </svg>
                  <h1 className=" m-1">{sample1}</h1>
                </div>
                <div className=" hidden sm:block">
                  <div
                    onClick={() => handlebottemplate(sample2)}
                    className="flex flex-col items-center border text-sm  bg-white border-[#C1C1C1] py-4  rounded-2xl hover:bg-secondaryGrey500  p-2 m-2 my-4 bg-opacity-50 text-White  cursor-pointer"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      className="size-8 m-1"
                    >
                      <path
                        stroke-linecap="round"
                        strokeLinejoin="round"
                        d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
                      />
                    </svg>

                    <h1 className=" m-1">{sample2}</h1>
                  </div>
                </div>
                <div
                  onClick={() => handlebottemplate(sample3)}
                  className="flex border flex-col items-center   bg-white border-[#C1C1C1]  rounded-2xl hover:bg-secondaryGrey500  text-sm    md:py-4  p-2  md:m-2 md:my-4 bg-opacity-50 text-White text-center cursor-pointer"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="size-6 md:size-8 m-1"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z"
                    />
                  </svg>

                  <h1 className=" m-1">{sample3}</h1>
                </div>
              </div>
            </div>
          </div>
        )}
        <div className="   w-full flex justify-center">
          <div className="w-11/12 md:w-4/5">
            {messages.map((msg: any, index: any) => (
              <>
                <div key={index} className="flex">
                  {msg.sender !== "user" && (
                    <div className=" mr-2">
                      <div className="rounded-full mt-2 bg-white bg-opacity-85 mr-0.5 h-7 w-7 sm:h-10 sm:w-10 flex justify-center items-center">
                        <FaRobot size={30} />
                      </div>
                    </div>
                  )}
                  <div
                    className={` p-2  rounded-lg whitespace-pre-wrap text-[#111C36] text-xs sm:text-sm  ${
                      msg.sender === "user"
                        ? " !text-white   ml-auto"
                        : "  mr-auto ml-1"
                    }`}
                  >
                    {msg.sender !== "user" && msg.questions?.length > 0 && (
                      <ul className="list-disc list-inside text-gray-600 mb-2 flex  flex-wrap  text-sm">
                       
                        {msg.questions.map(
                          (question: string, qIndex: number) => {
                            const formattedQuestion = question.startsWith("-")
                              ? question.slice(1).trim()
                              : question;

                            return (
                              <li
                                className="flex border cursor-pointer rounded-md border-gray-400 px-2 m-1"
                                key={qIndex}
                              >
                                {formattedQuestion}
                              </li>
                            );
                          }
                        )}
                      </ul>
                    )}

                    <div
                      key={index}
                      className={`mb-2 p-2  rounded-lg whitespace-pre-wrap text-[#111C36] text-xs sm:text-sm  ${
                        msg.sender === "user"
                          ? "bg-[#1A231E] !text-white outline outline-[#608673] outline-1  ml-auto"
                          : "bg-white border-slate-300  mr-auto ml-1"
                      }`}
                    >
                      <div>
                        <div className="flex flex-col justify-center  ">
                          <ReactMarkdown
                            components={{
                              // Custom rendering for headings
                              h1: ({ node, ...props }) => (
                                <h1
                                  className="text-lg sm:text-2xl font-bold my-4"
                                  {...props}
                                />
                              ),
                              h2: ({ node, ...props }) => (
                                <h2
                                  className="text-[16px] sm:text-xl font-bold "
                                  {...props}
                                />
                              ),
                              h3: ({ node, ...props }) => (
                                <h3
                                  className=" text-base sm:text-lg font-semibold "
                                  {...props}
                                />
                              ),
                              // Custom rendering for lists
                              ul: ({ node, ...props }) => (
                                <ul
                                  className="list-disc list-inside ml-1 sm:ml-3"
                                  {...props}
                                />
                              ),
                              li: ({ node, ...props }) => (
                                <li className="mb-1" {...props} />
                              ),
                              // Custom rendering for paragraphs
                              p: ({ node, ...props }) => (
                                <p
                                  className=" text-sm sm:text-base"
                                  {...props}
                                />
                              ),
                            }}
                          >
                            {msg.text}
                          </ReactMarkdown>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            ))}
          </div>
        </div>
        {loading && (
          <div className="animate-pulse w-full flex justify-center space-x-4">
            <div className="w-11/12 md:w-4/5 flex space-x-4">
              {" "}
              <div className="rounded-full mt-1 bg-slate-100 h-10 w-10"></div>
              <div className="flex-1 space-y-6 py-1">
                <div className="h-2 bg-slate-100 rounded"></div>
                <div className="space-y-3">
                  <div className="grid grid-cols-3 gap-4">
                    <div className="h-2 bg-slate-100 rounded col-span-2"></div>
                    <div className="h-2 bg-slate-100 rounded col-span-1"></div>
                  </div>
                  <div className="h-2 bg-slate-100 rounded"></div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      <div className="ml-5">
        {loading && <div className="pulse-loader"></div>}
      </div>
    </>
  );
};
export default ChatComponent;
