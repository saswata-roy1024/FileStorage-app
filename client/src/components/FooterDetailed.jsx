import React from 'react'
import { Link } from "react-router-dom"

function FooterDetailed() {
  return (
    <footer className="bg-gray-100 p-6 md:py-12 w-full dark:bg-gray-800">
    <div className="container max-w-7xl grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-8 text-sm">
      <div className="grid gap-1">
        <h3 className="font-semibold">Product</h3>
        <Link href="#">Features</Link>
        <Link href="#">Pricing</Link>
        <Link href="#">Security</Link>
        <Link href="#">FAQ</Link>
      </div>
      <div className="grid gap-1">
        <h3 className="font-semibold">Company</h3>
        <Link href="#">About</Link>
        <Link href="#">Blog</Link>
        <Link href="#">Careers</Link>
        <Link href="#">Contact</Link>
      </div>
      <div className="grid gap-1">
        <h3 className="font-semibold">Support</h3>
        <Link href="#">Help Center</Link>
        <Link href="#">Documentation</Link>
        <Link href="#">Community</Link>
        <Link href="#">Status</Link>
      </div>
      <div className="grid gap-1">
        <h3 className="font-semibold">Legal</h3>
        <Link href="#">Terms of Service</Link>
        <Link href="#">Privacy Policy</Link>
        <Link href="#">Cookie Policy</Link>
        <Link href="#">Acceptable Use</Link>
      </div>
      <div className="grid gap-1">
        <h3 className="font-semibold">Follow Us</h3>
        <Link href="#">Twitter</Link>
        <Link href="#">Facebook</Link>
        <Link href="#">LinkedIn</Link>
        <Link href="#">Instagram</Link>
      </div>
    </div>
    <div className="container max-w-7xl mt-8 text-sm text-gray-500 dark:text-gray-400">
      © 2024 File Storage App. All rights reserved.
    </div>
  </footer>
  )
}

export default FooterDetailed