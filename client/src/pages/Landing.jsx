import React from 'react'
import { Link } from "react-router-dom"
import cloud2 from "../assets/cloud.svg"
import share from "../assets/share.svg"
import cloud4 from "../assets/cloud4.svg"
import encryption from "../assets/encryption.svg"
import cross from "../assets/cross.svg"
import Navbar from "../components/Navbar"
import FooterDetailed from "../components/FooterDetailed"

function Landing() {
    return (<>
        <Navbar />

        <div className="flex flex-col min-h-[100dvh]" >
            <main className="flex-1 bg-indigo-100">
                <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48">
                    <div className="container px-4 md:px-6">
                        <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
                            <div className="flex flex-col justify-center space-y-4">
                                <div className="space-y-2">
                                    <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none text-indigo-900">
                                        Secure and Reliable File Storage
                                    </h1>
                                    <p className="max-w-[600px] text-gray-500 md:text-xl dark:text-gray-400">
                                        Store, share, and access your files from anywhere with our user-friendly file storage app.
                                    </p>
                                </div>
                                
                                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                                    <Link
                                        className="inline-flex h-10 items-center justify-center rounded-md bg-indigo-600 px-8 text-sm font-medium text-gray-50 shadow transition-colors hover:bg-indigo-500 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 dark:bg-gray-50 dark:text-gray-900 dark:hover:bg-gray-50/90 dark:focus-visible:ring-gray-300"
                                        to={"/auth"}
                                    >
                                        Get Started
                                    </Link>
                                </div>

                            </div>
                            <img
                                alt="main"
                                className="mx-auto overflow-hidden rounded-sm rounded-bl-3xl rounded-tr-3xl object-bottom sm:w-full lg:order-last shadow-lg"
                                height="550"
                                src={cloud4}
                                width="550"
                            />
                        </div>
                    </div>
                </section>


                <section className="w-full py-12 md:py-24 lg:py-32 bg-violet-200 dark:bg-gray-800 ">
                    <div className="container px-4 md:px-6">
                        <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12 lg:mb-16 ">
                            <div className="space-y-2">
                                <div className="inline-block rounded-lg bg-gray-100 px-3 py-1 text-sm dark:bg-gray-800">
                                    Key Features
                                </div>
                                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-indigo-900">Why Choose Our File Storage App?</h2>
                                <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                                    Our file storage app offers a range of features to keep your data secure and accessible.
                                </p>
                            </div>
                        </div>


                        <div className="*:bg-slate-100 grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 *:shadow-lg">
                            <div className="grid gap-1 rounded-lg border border-gray-200 p-6 shadow-sm dark:border-gray-800">
                                <img src={cloud2} alt="Encryption" className="w-[76%] m-[12%]" />
                                <h3 className="text-lg font-bold">Unlimited Storage</h3>
                                <p className="text-gray-500 dark:text-gray-400">
                                    Store as many files as you need with our unlimited storage plans.
                                </p>
                            </div>

                            <div className="grid gap-1 rounded-lg border border-gray-200 p-6 shadow-sm dark:border-gray-800">
                                <img src={encryption} alt="Encryption" />
                                <h3 className="text-lg font-bold">Secure Encryption</h3>
                                <p className="text-gray-500 dark:text-gray-400">
                                    Your files are encrypted with the latest security protocols to keep them safe.
                                </p>
                            </div>

                            <div className="grid gap-1 rounded-lg border border-gray-200 p-6 shadow-sm dark:border-gray-800">
                                <img src={share} alt="Encryption" className="w-[76%] m-[12%]" />
                                <h3 className="text-lg font-bold">Seamless Sharing</h3>
                                <p className="text-gray-500 dark:text-gray-400">
                                    Easily share files with your team or clients with customizable permissions.
                                </p>
                            </div>

                            <div className="grid gap-1 rounded-lg border border-gray-200 p-6 shadow-sm dark:border-gray-800">
                                <img src={cross} alt="Encryption" />
                                <h3 className="text-lg font-bold">Cross-Platform Access</h3>
                                <p className="text-gray-500 dark:text-gray-400">
                                    Access your files from any device, anywhere, with our mobile and desktop apps.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>


                <section className="w-full py-12 md:py-24 lg:py-32">
                    <div className="flex flex-col justify-center items-center space-y-3 m-8 md:my-14">
                        <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none text-indigo-900 text-center">Ready to Start your Journy</h1>
                        <p className="max-w-[600px] text-gray-500 md:text-xl dark:text-gray-400 text-center">
                            Store, share, and access your files from anywhere anytime with our user-friendly file storage app.
                        </p>
                        <div>
                            <Link
                                className="inline-flex h-10 mt-7 items-center justify-center rounded-full bg-indigo-600 px-8 text-sm font-medium text-gray-50 shadow transition-colors hover:bg-indigo-500 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 dark:bg-gray-50 dark:text-gray-900 dark:hover:bg-gray-50/90 dark:focus-visible:ring-gray-300"
                                to={"/auth"}
                            >
                                Get Started
                            </Link>
                        </div>
                    </div>
                </section>

            </main>
        </div>

        <FooterDetailed />
    </>
    )
}

export default Landing