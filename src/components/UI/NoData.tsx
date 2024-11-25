import React from "react";

function NoData() {
  return (
    <div className="flex justify-center w-full mt-3 ">
      <div className="border-t border-gray-500 justify-items-center rounded-none w-[736px] h-[266px] p-[64px_24px] gap-[16px] ">
        <img src="/svgs/clipboard.svg" alt="" />
        <p>You don't have any tasks registered yet</p>
        <p> Create tasks and organize your to-do items.</p>
      </div>
    </div>
  );
}

export default NoData;
