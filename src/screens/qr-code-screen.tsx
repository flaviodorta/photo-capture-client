import { cn } from '@/utils/cn';
import { QRCodeCanvas } from 'qrcode.react';
import { useWindowSize } from 'usehooks-ts';

type Props = {
  finishStep: () => void;
  downloadUrl: string;
};

const QrCodeScreen = ({ finishStep, downloadUrl }: Props) => {
  const { width } = useWindowSize();

  const qrCodeSize = (() => {
    if (width <= 375) return 150;
    if (width > 375 || width <= 1024) return 250;
    else return 300;
  })();

  const isIphoneSE = width == 375;

  return (
    <div className='h-full flex items-center'>
      <div className='flex items-center flex-col gap-10 w-3/4 sm:w-1/4 mx-auto'>
        <img
          src='/images/logo.svg'
          alt='Logo'
          className={cn(['w-44 mx-auto', isIphoneSE ? 'mb-8' : 'mb-16'])}
        />
        <div>
          <h2 className='text-3xl font-bold mb-4 text-center'>Obrigado!</h2>
          <p className='text-2xl text-center'>
            Lorem ipsum dolor sit amet consectetur.
          </p>
        </div>
        <QRCodeCanvas value={downloadUrl} size={qrCodeSize} />
        <button
          onClick={finishStep}
          className={cn([
            'px-4 w-full py-2 bg-[var(--primary)] text-white text-xl font-bold rounded-s-sm cursor-pointer',
            isIphoneSE ? 'mt-4' : 'mt-12',
          ])}
        >
          Finalizar
        </button>
      </div>
    </div>
  );
};

export default QrCodeScreen;
