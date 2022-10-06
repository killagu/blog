import { useEffect, useState } from 'react';
import crypto from 'crypto';

function getLikeId(title) {
  return crypto.createHash('md5').update(title).digest('hex');
}

async function getLike(id) {
  const response = await fetch(`https://killagu.me/api/v1/blogs/${id}/like`, {
    mode: 'cors',
  });
  const { liked } = await response.json();
  return liked;
}

async function updateLike(id, liked) {
  const response = await fetch(`https://killagu.me/api/v1/blogs/${id}/like`, {
    method: 'POST',
    mode: 'cors',
    body: JSON.stringify({ liked }),
  });
  console.log('response: ', await response.text());
}

export default function Like({ title }) {
  const id = getLikeId(title);
  const [ loding, setLoading ] = useState(true);
  const [ like, setLike ] = useState(false);

  useEffect(() => {
    const getLikeState = async () => {
      const liked = await getLike(id);
      setLike(liked);
      setLoading(false);
    };
    getLikeState();
  }, []);

  const onClick = async () => {
    setLoading(true);
    try {
      await updateLike(id, !like);
      setLike(!like);
    } catch (e) {
      console.log('update like error: ', e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      disabled={loding}
      onClick={() => {
        onClick();
      }}
      className={`col-start-2 col-span-4 w-12 h-12 rounded-full text-3xl align-middle ${like ? 'bg-blue-500 text-blue-500' : 'bg-gray-500 text-gray-500'}`}
    >
      👍
    </button>
  );
}
