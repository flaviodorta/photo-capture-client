import { useEffect, useRef, useState } from 'react';
import Webcam from 'react-webcam';
import { motion } from 'framer-motion';

type Props = {
  onCapture: (screenshot: string | null) => void;
  nextStep: () => void;
};

const CaptureImageScreen = ({ onCapture, nextStep }: Props) => {
  const webcamRef = useRef<Webcam>(null!);

  const handleCapture = () => {
    const screenshot = webcamRef.current.getScreenshot();
    onCapture(screenshot);
    nextStep();
  };

  const [countdown, setCountdown] = useState<number | null>(null);

  useEffect(() => {
    if (countdown === null) return;
    if (countdown === 0) {
      // Tirar foto quando countdown chega em 0
      handleCapture();
      setCountdown(null);
      return;
    }

    const timeout = setTimeout(() => {
      setCountdown((prev) => (prev !== null ? prev - 1 : null));
    }, 1000);

    return () => clearTimeout(timeout);
  }, [countdown]);

  const startCountdown = () => {
    setCountdown(3);
  };

  return (
    <div className='relative flex justify-center flex-col  items-center gap-4'>
      <Webcam
        audio={false}
        ref={webcamRef}
        screenshotFormat='image/jpeg'
        videoConstraints={{
          facingMode: 'user',
        }}
        className='w-screen h-screen object-cover'
      />

      <motion.button
        whileTap={{ scale: 0.85 }}
        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
        onClick={startCountdown}
        className='absolute left-1/2 -translate-x-1/2 bottom-10 rounded-full z-50 border-[#D9D9D9]/50 border-6 w-18 h-18 cursor-pointer'
      ></motion.button>

      <span className='absolute text-[200px] font-bold top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'>
        {countdown}
      </span>
    </div>
  );
};

export default CaptureImageScreen;
