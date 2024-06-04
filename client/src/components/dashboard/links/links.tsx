"use client";
import Link from "next/link";
// import { FaHouseMedical } from "react-icons/fa6";
import { FaHome } from "react-icons/fa";
import { CgProfile } from "react-icons/cg";
// import { RiDeleteBin6Line } from "react-icons/ri";
// import { BsHouseAddFill } from "react-icons/bs";

const links = [
  {
    name: "Home",
    href: "/dashboard",
    icon: FaHome,
  },
  {
    name: "Profile",
    href: `/dashboard/{1}`,
    icon: CgProfile,
  },
  // {
  //     name:'Remove Hospital',
  //     href:'/admin/removehospital',
  //     icon: RiDeleteBin6Line
  // },
  // {
  //   name: "Add Departement",
  //   href: "/",
  //   icon: BsHouseAddFill,
  // },
];
const NavLinks = () => {
  return (
    <>
      {links.map((link) => {
        const LinkIcon = link.icon;
        return (
          <Link
            href={link.href}
            key={link.name}
            className="flex h-[48px] md:h-[50px] grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3  hover:bg-sky-100 hover:text-blue-600 md:flex md:flex-col md:my-[20px] md:p-3 "
          >
            <div className="flex flex-row justify-center items-center space-x-4">
              <LinkIcon className="w-6 h-6 md:w-5 md:h-10 mr-2 md:mr-0" />
              <p className="hidden text-center md:block text-sm font-light">{link.name}</p>
            </div>
          </Link>
        );
      })}
    </>
  );
};
export default NavLinks;
