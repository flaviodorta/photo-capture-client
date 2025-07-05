'use client';

import FrameScreen from '@/screens/frame-screen';
import InitialScreen from '@/screens/initial-screen';
import CaptureImageScreen from '@/screens/capture-image-screen';
import SpinnerScreen from '@/screens/spinner-screen';
import { useState } from 'react';
import QrCodeScreen from '@/screens/qr-code-screen';
import { div } from 'framer-motion/client';

export default function Home() {
  const [step, setStep] = useState('initial');
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const [downloadUrl, setDownloadUrl] = useState<string>('');

  switch (step) {
    case 'initial':
      return <InitialScreen onStart={() => setStep('spinner')} />;
    case 'spinner':
      return <SpinnerScreen nextStep={() => setStep('captureImage')} />;
    case 'captureImage':
      return (
        <CaptureImageScreen
          onCapture={(screenshot) => setCapturedImage(screenshot)}
          nextStep={() => setStep('frame')}
        />
      );

    case 'frame':
      return (
        <FrameScreen
          capturedImage={capturedImage}
          previousStep={() => setStep('captureImage')}
          nextStep={() => setStep('qrCode')}
          downloadUrl={downloadUrl}
          setDownloadUrl={setDownloadUrl}
        />
      );
    case 'qrCode':
      return (
        <QrCodeScreen
          finishStep={() => setStep('initial')}
          downloadUrl={downloadUrl}
        />
      );
    default:
      return <div className='flex w-full items-center justify-center'></div>;
  }
}
