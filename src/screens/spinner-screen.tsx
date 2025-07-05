import { useEffect, useState } from 'react';
import { RotatingLines } from 'react-loader-spinner';

type Props = {
  nextStep: () => void;
};

const SpinnerScreen = ({ nextStep }: Props) => {
  const [countdown, setCountdown] = useState<number>(2);

  useEffect(() => {
    if (countdown === 0) {
      nextStep();
    }

    const timeout = setTimeout(() => {
      setCountdown((prev) => prev - 1);
    }, 1000);

    return () => clearTimeout(timeout);
  }, [countdown]);

  return (
    <div
      className='h-full w-full flex items-center justify-center'
      data-testid='spinner'
    >
      <RotatingLines
        strokeColor='grey'
        strokeWidth='5'
        animationDuration='0.75'
        width='48'
        visible={true}
      />
    </div>
  );
};

export default SpinnerScreen;
