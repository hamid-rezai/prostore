import Image from "next/image";
import Link from "next/link";
import { APP_NAME } from "@/lib/constants";
import Menu from "./menu";

const Header = () => {
  return (
    <header className='w-full border-b'>
      <div className='wrapper flex-between'>
        <div className='flex-start'>
          <Link href='/' className='flex-start ml-4'>
            <Image
              src='./images/logo.svg'
              alt={`${APP_NAME} logo`}
              width={48}
              height={48}
              priority={true}
            />
            <span className="hidden lg:block font-bold text-2xl ml-4">
              {APP_NAME}
            </span>
          </Link>
        </div>
        <div>
          <Menu/>
        </div>
      </div>
    </header>
  );
};

export default Header;
