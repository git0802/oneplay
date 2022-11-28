import React from 'react'
import { BiEnvelopeOpen, BiGlobe } from 'react-icons/bi'
import { FaLinkedin, FaGithubSquare, FaFacebookSquare, FaInstagramSquare } from 'react-icons/fa'

const Footer = () => {
  return (
    <div className="mt-4 flex items-center tablet:ml-4 justify-center">
      <a
        className="flex items-center px-2"
        href="https://www.linkedin.com/in/ishimwe-ndungutse-charles-079418227/"
        target="_blank"
        rel="noreferrer"
      >
        <FaLinkedin className="text-xl hover:text-main duration-300" />
      </a>
      <a
        className="flex items-center px-2"
        href="https://github.com/NdungutseCharles103"
        target="_blank"
        rel="noreferrer"
      >
        <FaGithubSquare className="text-xl hover:text-main duration-300" />
      </a>
      <a
        className="flex items-center px-2"
        href="https://www.facebook.com/ishimwendungutsecharles"
        target="_blank"
        rel="noreferrer"
      >
        <FaFacebookSquare className="text-xl hover:text-main duration-300" />
      </a>
      <a
        className="flex items-center px-2"
        href="https://www.instagram.com/ndungutse_charles/"
        target="_blank"
        rel="noreferrer"
      >
        <FaInstagramSquare className="text-xl hover:text-main duration-300" />
      </a>
      <a
        className="flex items-center px-2"
        href="mailto:ndungutsecharles103@gmail.com"
        target="_blank"
        rel="noreferrer"
      >
        <BiEnvelopeOpen className="text-xl hover:text-main duration-300" />
      </a>
      <a
        className="flex items-center px-2"
        href="https://www.ndungutsecharles.me"
        target="_blank"
        rel="noreferrer"
      >
        <BiGlobe className="text-xl hover:text-main duration-300" />
      </a>
    </div>
  )
}

export default Footer