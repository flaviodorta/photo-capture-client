import { useEffect, useState } from 'react';
import { FadeLoader } from 'react-spinners';

type Props = {
  nextStep: () => void;
};

const override: React.CSSProperties = {
  display: 'block',
  margin: '0 auto',
  borderColor: 'red',
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
      <FadeLoader
        color={'#8f8f8f'}
        loading={true}
        cssOverride={override}
        aria-label='Loading Spinner'
        data-testid='loader'
      />
    </div>
  );
};

export default SpinnerScreen;
