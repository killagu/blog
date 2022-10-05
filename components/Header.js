import Link from 'next/link';
import Image from 'next/image';
import avatarPic from '../public/avatar.jpeg';

export default function Header({ name }) {
  return (
    <header className="pt-20 pb-12">
      <Image
        src={avatarPic}
        width={'100%'}
        height={'100%'}
        className="w-12 h-12 rounded-full block mx-auto mb-4"/>
      <p className="text-2xl dark:text-white text-center">
        <Link href="/">
          <a>{name}</a>
        </Link>
      </p>
    </header>
  );
}
