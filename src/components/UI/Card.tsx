import { usePathname, useRouter } from "next/navigation";
import React from "react";

function Card({
  children,
  title,
  task,
  completed,
}: Readonly<{
  children: React.ReactNode;
  title: string;
  task?: number;
  completed?: number;
}>) {
  const router = useRouter();
  const pathname = usePathname();

  return (
    <div>
      <div className="bg-[#0D0D0D] h-52">
        <div className="max-w-7xl ml-auto mr-auto pr-9 pl-9 w-full h-full">
          <div className="flex flex-col items-center pt-[75px] gap-[59px]">
            <img src="/svgs/rocket.svg" alt="" width={226} height={48} />
            {!pathname.includes("/tasks/edit") &&
              !pathname.includes("/tasks/create") && (
                <>
                  <button
                    onClick={() => router.push("/tasks/create")}
                    className="w-[736px]  gap-[8px] rounded-[8px] bg-[#1E6F9F] h-[52px]"
                  >
                    {title}
                  </button>
                  <div className="flex justify-between w-[65%]">
                    <div className="flex gap-[4px]">
                      Tasks
                      <div className="w-[25px] p-[2px_8px] rounded-full bg-[#333333]">
                        {task}
                      </div>
                    </div>
                    <div className="flex gap-[4px]">
                      Completed
                      <div className="w-[25px] p-[2px_8px] rounded-full bg-[#333333]">
                        {completed}
                      </div>
                    </div>
                  </div>
                </>
              )}
          </div>
          {children}
        </div>
      </div>
    </div>
  );
}

export default Card;
