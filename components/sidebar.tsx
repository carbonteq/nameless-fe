"use client";
import { usePathname } from "next/navigation";
import { ThemeColour } from "./primitives";
import Link from "next/link";
import { useState } from "react";
import menuIcon from "../public/images/menu.svg"
import Image from 'next/image';

const Sidebar: React.FC = () => {
    const pathname = usePathname();
    const showSidebar = !pathname.startsWith("/upload") && !pathname.startsWith("/drag-test") && pathname !== "/signin" && pathname !== "/signup" && pathname !== "/test" && pathname !== "/forgot-password" && pathname !== "/upload" ? 1 : 0;

    if (!showSidebar) return <></>;
    const [sidebarWidth, setSidebarWidth] = useState("hidden")
    const [shouldShow, setShouldShow] = useState(true)

    const [show, setShow] = useState(true)

    function handleSidebar() {
        if (!show || (sidebarWidth === "hidden" && window.innerWidth < 640)) {
            setShow(true)
            console.log(window.innerWidth);

            setSidebarWidth("w-[280px]")
        }
        else {
            setShow(false)
            console.log("Hide Sidebar");

        }
    }

    return (
        <>

            <div>
                <button onClick={handleSidebar} className={`pt-1 px-1 absolute top-16 z-40`}>
                    <Image
                        priority
                        src={menuIcon}
                        width={24}
                        height={24}
                        alt="Follow us on Twitter"
                        className="dark:invert"
                    />
                </button>
                {show &&
                    <div
                        className={`font-black relative max-sm:fixed max-sm:w-full p-2 min-h-screen z-10 max-lg:${sidebarWidth} w-[280px] overflow-auto transition-all text-center ${ThemeColour.variants.background.main}`}
                    >
                        <div className="mt-16 pt-6">
                            <div className="mt-6 flex items-center rounded-md px-3 duration-300 text-white">
                                <i className="bi bi-house-door-fill" />
                                <span className="text-[25px] ml-4 text-gray-800 dark:text-white font-bold">
                                    Schemas
                                </span>
                            </div>

                            <div
                                className="text-left mt-2 w-4/5 mx-auto font-bold"
                                id="submenu"
                            >
                                <h1 className="cursor-pointer p-2 text-gray-600 hover:bg-[#969393] dark:text-white dark:hover:bg-[#1a222e] rounded-md mt-1">
                                    <Link href="/drag-test" className="block w-full h-full">
                                        New
                                    </Link>
                                </h1>
                                <h1 className="cursor-pointer p-2 text-gray-600 hover:bg-[#969393] dark:text-white dark:hover:bg-[#1a222e] rounded-md mt-1">
                                    <Link href="/schemas" className="block w-full h-full">
                                        Manage
                                    </Link>
                                </h1>
                            </div>
                            {/* Straight Line */}
                            <div className="my-4 bg-gray-600 h-[1px]" />

                            <div className="mt-3 flex items-center rounded-md px-3 duration-300 text-white">
                                <i className="bi bi-bookmark-fill" />
                                <span className="text-[25px] ml-4 text-gray-800 dark:text-white font-bold">
                                    Data
                                </span>
                            </div>

                            <div
                                className="text-left mt-2 w-4/5 mx-auto text-gray-200 font-bold"
                                id="submenu"
                            >
                                <h1 className="cursor-pointer p-2 text-gray-600 hover:bg-[#969393] dark:text-white dark:hover:bg-[#1a222e] rounded-md mt-1">
                                    <Link href="/books/shelf" className="block w-full h-full">
                                        Shelves
                                    </Link>
                                </h1>
                                <h1 className="cursor-pointer text-gray-600 p-2 hover:bg-[#969393] dark:text-white dark:hover:bg-[#1a222e] rounded-md mt-1">
                                    <Link href="/books/track-books" className="block w-full h-full">
                                        Track Shelf
                                    </Link>
                                </h1>
                            </div>
                        </div>
                    </div>
                }
            </div>
        </>
    );
};

export default Sidebar;
