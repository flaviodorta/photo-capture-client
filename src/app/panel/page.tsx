'use client';

import { useEffect, useState } from 'react';

type Participation = {
  date: string;
  count: number;
};

type ImageInfo = {
  id: number;
  url: string;
  createdAt: string;
};

export default function PainelAdmin() {
  const [participations, setParticipations] = useState<Participation[]>([]);
  const [images, setImages] = useState<ImageInfo[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch('http://localhost:4000/panel'); // troque pelo IP real
      const data = await res.json();
      setParticipations(data.participationsPerDay);
      setImages(data.images);
    };

    fetchData();
  }, []);

  console.log(participations);
  console.log(images);

  return (
    <div className='max-w-5xl mx-auto px-4 py-10 space-y-12'>
      <h1 className='text-3xl font-bold text-center'>Painel Administrativo</h1>

      <section>
        <h2 className='text-xl font-semibold mb-4'>📊 Participações por Dia</h2>
        <table className='w-full table-auto border border-gray-300 rounded'>
          <thead>
            <tr className='bg-gray-100 text-left'>
              <th className='p-2'>Data</th>
              <th className='p-2'>Quantidade</th>
            </tr>
          </thead>
          <tbody>
            {participations.map((p) => (
              <tr key={p.date} className='border-t'>
                <td className='p-2'>{p.date}</td>
                <td className='p-2'>{p.count}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      <section>
        <h2 className='text-xl font-semibold mb-4'>🖼️ Imagens Geradas</h2>
        <ul className='space-y-2'>
          {images.map((img) => (
            <li
              key={img.id}
              className='border p-4 rounded shadow-sm flex items-center justify-between'
            >
              <div>
                <p className='text-sm text-gray-700'>ID: {img.id}</p>
                <p className='text-sm text-gray-500'>
                  Criado em: {new Date(img.createdAt).toLocaleString()}
                </p>
              </div>
              <a
                href={img.url}
                target='_blank'
                rel='noopener noreferrer'
                className='text-blue-600 hover:underline font-medium'
              >
                Ver imagem
              </a>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
