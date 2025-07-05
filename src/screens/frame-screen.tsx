'use client';

import { useRef, useState } from 'react';
import html2canvas from 'html2canvas';
import { QRCodeCanvas } from 'qrcode.react';
import { useWindowSize } from 'usehooks-ts';
import { motion } from 'framer-motion';

type Props = {
  capturedImage: string | null;
  previousStep: () => void;
  nextStep: () => void;
  downloadUrl: string;
  setDownloadUrl: (url: string) => void;
};

const FrameScreen = ({
  capturedImage,
  previousStep,
  nextStep,
  downloadUrl,
  setDownloadUrl,
}: Props) => {
  const captureRef = useRef<HTMLDivElement>(null);
  const [showQRCode, setShowQRCode] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const handleGenerateImage = async () => {
    if (!captureRef.current) return;

    const canvas = await html2canvas(captureRef.current);
    const base64 = canvas.toDataURL('image/jpeg');

    const byteString = atob(base64.split(',')[1]);
    const ab = new ArrayBuffer(byteString.length);
    const ia = new Uint8Array(ab);
    for (let i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
    }
    const blob = new Blob([ab], { type: 'image/jpeg' });

    const formData = new FormData();
    formData.append('image', blob, 'foto.jpg');

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/upload`,
        {
          method: 'POST',
          body: formData,
        }
      );

      const data = await response.json();
      console.log('Imagem enviada com sucesso:', data);

      setDownloadUrl(data.url);
      setShowQRCode(true);
    } catch (error) {
      console.error('Erro ao enviar imagem:', error);
    }
  };

  const handleFinish = async () => {
    setShowModal(true);
  };

  const { width } = useWindowSize();

  const qrCodeSize = (() => {
    if (width <= 375) return 100;
    if (width > 375 || width <= 1024) return 150;
    else return 200;
  })();

  return (
    <div className='relative w-fit mx-auto h-screen flex justify-center items-center flex-col'>
      <div ref={captureRef} className='relative h-[70%] overflow-hidden'>
        <img
          style={{
            all: 'initial',
            height: '100%',
            zIndex: -1,
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
          }}
          src={capturedImage!}
        />
        <img src='/images/frame.svg' className='h-full w-full' />
      </div>

      <div className='flex mt-8 w-full gap-4 justify-center'>
        {!(showQRCode && downloadUrl) ? (
          <>
            <button
              onClick={previousStep}
              className='button-transition cursor-pointer border-4 text-lg sm:text-4xl w-full font-bold border-[var(--primary)] rounded-sm p-3 text-[var(--primary)]'
            >
              Refazer
            </button>
            <button
              onClick={handleGenerateImage}
              className='button-transition cursor-pointer w-full text-lg sm:text-4xl font-bold text-white rounded-sm p-3 bg-[var(--primary)]'
            >
              Continuar
            </button>
          </>
        ) : (
          <button
            onClick={handleFinish}
            className='button-transition cursor-pointer w-full text-lg sm:text-4xl font-bold text-white rounded-sm p-3 bg-[var(--primary)]'
          >
            Finalizar
          </button>
        )}
      </div>

      {showQRCode && (
        <motion.div
          initial={{ x: 100, opacity: 0.5 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ type: 'spring', stiffness: 100, damping: 15 }}
          className='absolute w-fit bg-white right-2 top-1/2 py-2 px-4 rounded-sm shadow-2xl'
        >
          <p className='mb-4 text-sm sm:text-lg font-medium'>Fazer download</p>
          <QRCodeCanvas value={downloadUrl} size={qrCodeSize} />
        </motion.div>
      )}

      {showModal && (
        <div className='fixed inset-0 bg-black/50 flex items-center justify-center z-50'>
          <motion.div
            initial={{ y: 50, opacity: 0.5 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ type: 'spring', stiffness: 100, damping: 15 }}
            className='bg-white mx-5 px-10 py-12 rounded-2xl shadow-lg text-center flex flex-col gap-6 max-w-sm w-full'
          >
            <h2 className='text-3xl font-bold mb-4'>Obrigado!</h2>
            <p className='text-2xl'>Lorem ipsum dolor sit amet consectetur.</p>

            <button
              onClick={nextStep}
              className='button-transition cursor-pointer bg-[var(--primary)] text-white px-6 py-4 mt-2 rounded font-bold text-xl'
            >
              Continuar
            </button>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default FrameScreen;
